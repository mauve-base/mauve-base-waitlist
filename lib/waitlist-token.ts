import {
  createCipheriv,
  createDecipheriv,
  createHash,
  hkdfSync,
  randomBytes,
} from "node:crypto";

// Confirmation links are valid for 48 hours after signup.
const TOKEN_TTL_MS = 48 * 60 * 60 * 1000;

const IV_BYTES = 12; // AES-GCM standard nonce length
const TAG_BYTES = 16; // AES-GCM auth tag length

export type WaitlistData = {
  email: string;
  name: string;
  company: string;
  category: string; // "vendor" | "restaurant" | "other"
  role: string; // free-text detail when category === "other", else ""
};

/**
 * Stateless double opt-in tokens. We have no database, so the verification link
 * carries the entire signup (email + name + company + category + role) plus an
 * expiry. The payload is **encrypted** with AES-256-GCM — so the contents can't
 * be forged, altered, OR read by anyone who happens to see the link (it lands in
 * mailboxes, browser history and server access logs). GCM's auth tag doubles as
 * the integrity check, so a tampered token simply fails to decrypt. The contact
 * is only created in Resend when this token is verified, so an address never
 * lands in the audience until its owner clicks the link. The same secret
 * encrypts and decrypts, so a token is only valid on this deployment.
 */
function getKey(): Buffer {
  // A dedicated secret is preferred, but the Resend API key is already a
  // high-entropy server-only secret, so we fall back to it to keep setup simple.
  const secret = process.env.WAITLIST_TOKEN_SECRET || process.env.RESEND_API_KEY;
  if (!secret) {
    throw new Error(
      "Missing WAITLIST_TOKEN_SECRET (and RESEND_API_KEY fallback) — cannot sign waitlist tokens.",
    );
  }
  // Derive a fixed 32-byte AES key from the secret. The secret is the entropy;
  // the salt/info just domain-separate this use from any other use of the key.
  const derived = hkdfSync(
    "sha256",
    secret,
    "mauve-waitlist-token",
    "aes-256-gcm",
    32,
  );
  return Buffer.from(derived);
}

export function createVerificationToken(
  data: WaitlistData,
  now = Date.now(),
): string {
  const plaintext = Buffer.from(
    JSON.stringify({
      e: data.email,
      n: data.name,
      c: data.company,
      k: data.category,
      r: data.role,
      x: now + TOKEN_TTL_MS,
    }),
  );
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv("aes-256-gcm", getKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  // Token = base64url(iv || tag || ciphertext) — one opaque, URL-safe string.
  return Buffer.concat([iv, tag, ciphertext]).toString("base64url");
}

export type VerifyResult =
  | { ok: true; data: WaitlistData }
  | { ok: false; reason: "invalid" | "expired" };

export function verifyVerificationToken(
  token: string,
  now = Date.now(),
): VerifyResult {
  if (!token) return { ok: false, reason: "invalid" };

  const raw = Buffer.from(token, "base64url");
  if (raw.length < IV_BYTES + TAG_BYTES + 1) return { ok: false, reason: "invalid" };

  const iv = raw.subarray(0, IV_BYTES);
  const tag = raw.subarray(IV_BYTES, IV_BYTES + TAG_BYTES);
  const ciphertext = raw.subarray(IV_BYTES + TAG_BYTES);

  let decoded: Record<string, unknown>;
  try {
    const decipher = createDecipheriv("aes-256-gcm", getKey(), iv);
    decipher.setAuthTag(tag);
    // .final() throws if the auth tag doesn't match (forged/garbled token).
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    decoded = JSON.parse(plaintext.toString("utf8"));
  } catch {
    return { ok: false, reason: "invalid" };
  }

  const email = typeof decoded.e === "string" ? decoded.e : null;
  const exp = typeof decoded.x === "number" ? decoded.x : null;
  if (!email || !exp) return { ok: false, reason: "invalid" };
  if (now > exp) return { ok: false, reason: "expired" };

  return {
    ok: true,
    data: {
      email,
      name: typeof decoded.n === "string" ? decoded.n : "",
      company: typeof decoded.c === "string" ? decoded.c : "",
      category: typeof decoded.k === "string" ? decoded.k : "",
      role: typeof decoded.r === "string" ? decoded.r : "",
    },
  };
}

/**
 * Stable, non-reversible id for a token, used as the single-use redemption key
 * (so we never store the token — and therefore the PII — itself).
 */
export function getTokenId(token: string): string {
  return createHash("sha256").update(token).digest("base64url");
}
