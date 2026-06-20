import { Redis } from "@upstash/redis";

/**
 * Shared Upstash Redis client, or `null` when the connection env vars aren't
 * configured (e.g. local dev). Callers MUST treat `null` as "this safety net
 * isn't available here" and degrade gracefully — never crash a request because
 * Redis isn't wired up. On Vercel, provision Upstash (Marketplace integration)
 * and `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` are injected.
 */
let client: Redis | null = null;
let resolved = false;

export function getRedis(): Redis | null {
  if (resolved) return client;
  resolved = true;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "Upstash Redis env vars are missing in production — rate limiting and single-use tokens are disabled.",
      );
    }
    client = null;
    return null;
  }

  client = new Redis({ url, token });
  return client;
}
