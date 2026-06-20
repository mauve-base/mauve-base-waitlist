const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Server-side verification of a Cloudflare Turnstile token.
 *
 * Fail posture:
 *  - Secret configured  → verify the token against Cloudflare; reject on failure.
 *  - Secret missing in PRODUCTION → reject (fail closed). A misconfigured prod
 *    deploy must not silently drop the only human check.
 *  - Secret missing in DEV → allow (skip), so `npm run dev` works without keys.
 *    For local testing of the real path, use Cloudflare's always-passes test
 *    keys (sitekey 1x00000000000000000000AA / secret 1x000...0000000000000AA).
 */
export async function verifyTurnstile(
  token: string,
  ip?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "TURNSTILE_SECRET_KEY missing in production — rejecting submission.",
      );
      return false;
    }
    return true; // dev: skip
  }

  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data?.success === true;
  } catch (err) {
    console.error("Turnstile verification request failed:", err);
    return false;
  }
}
