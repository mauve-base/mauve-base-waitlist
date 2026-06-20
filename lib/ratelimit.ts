import { Ratelimit } from "@upstash/ratelimit";
import { getRedis } from "./redis";

/**
 * Rate limiting for the public waitlist signup. Two independent sliding windows:
 *  - per IP    — caps how fast one source can fire the endpoint at all.
 *  - per email — caps how often a single address can be targeted, so the
 *                endpoint can't be used to email-bomb one victim.
 * When Redis isn't configured (local dev) we skip limiting entirely, and if a
 * limiter call throws we fail OPEN — a flaky Redis shouldn't block real signups,
 * and Turnstile is still in front of this.
 */
type Limiters = { ip: Ratelimit; email: Ratelimit };

let cached: Limiters | null = null;
let resolved = false;

function getLimiters(): Limiters | null {
  if (resolved) return cached;
  resolved = true;

  const redis = getRedis();
  if (!redis) {
    cached = null;
    return null;
  }

  cached = {
    ip: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "60 s"),
      prefix: "wl:rl:ip",
      analytics: false,
    }),
    email: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "3600 s"),
      prefix: "wl:rl:email",
      analytics: false,
    }),
  };
  return cached;
}

export type RateResult = { ok: true } | { ok: false; retryAfterSec: number };

export async function checkWaitlistRateLimit(
  ip: string,
  email: string,
): Promise<RateResult> {
  const limiters = getLimiters();
  if (!limiters) return { ok: true }; // not configured → skip

  try {
    const [ipRes, emailRes] = await Promise.all([
      limiters.ip.limit(ip),
      limiters.email.limit(email),
    ]);

    if (ipRes.success && emailRes.success) return { ok: true };

    const now = Date.now();
    const resets = [
      ipRes.success ? 0 : ipRes.reset,
      emailRes.success ? 0 : emailRes.reset,
    ];
    const retryAfterSec = Math.max(
      1,
      Math.ceil((Math.max(...resets) - now) / 1000),
    );
    return { ok: false, retryAfterSec };
  } catch (err) {
    console.error("Rate limit check failed (allowing request):", err);
    return { ok: true }; // fail open
  }
}
