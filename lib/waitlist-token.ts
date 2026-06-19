import { createHmac, timingSafeEqual } from "node:crypto";

// Confirmation links are valid for 48 hours after signup.
const TOKEN_TTL_MS = 48 * 60 * 60 * 1000;

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
 * expiry, signed with an HMAC so the value can't be forged or altered. The
 * contact is only created in Resend when this token is verified — so an address
 * never lands in the audience until its owner clicks the link. The same secret
 * signs and verifies, so a token is only valid on this deployment.
 */
function getSecret(): string {
  // A dedicated secret is preferred, but the Resend API key is already a
  // high-entropy server-only secret, so we fall back to it to keep setup simple.
  const secret = process.env.WAITLIST_TOKEN_SECRET || process.env.RESEND_API_KEY;
  if (!secret) {
    throw new Error(
      "Missing WAITLIST_TOKEN_SECRET (and RESEND_API_KEY fallback) — cannot sign waitlist tokens.",
    );
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createVerificationToken(
  data: WaitlistData,
  now = Date.now(),
): string {
  const payload = Buffer.from(
    JSON.stringify({
      e: data.email,
      n: data.name,
      c: data.company,
      k: data.category,
      r: data.role,
      x: now + TOKEN_TTL_MS,
    }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export type VerifyResult =
  | { ok: true; data: WaitlistData }
  | { ok: false; reason: "invalid" | "expired" };

export function verifyVerificationToken(
  token: string,
  now = Date.now(),
): VerifyResult {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return { ok: false, reason: "invalid" };

  // Constant-time signature check.
  const provided = Buffer.from(sig);
  const expected = Buffer.from(sign(payload));
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return { ok: false, reason: "invalid" };
  }

  let decoded: Record<string, unknown>;
  try {
    decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
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
