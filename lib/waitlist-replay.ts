import { getRedis } from "./redis";

/**
 * Single-use bookkeeping for confirmation tokens. Once a token is redeemed we
 * remember its id (a hash, never the token/PII itself) so the link can't be
 * replayed to re-subscribe someone who later unsubscribed. Best-effort: if Redis
 * isn't configured (local dev) these no-op, and the flow falls back to Resend's
 * own idempotent "already exists" handling.
 */
const KEY_PREFIX = "wl:used:";

export async function wasTokenUsed(tokenId: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  try {
    return (await redis.exists(`${KEY_PREFIX}${tokenId}`)) === 1;
  } catch (err) {
    console.error("Single-use token check failed (treating as unused):", err);
    return false;
  }
}

export async function rememberTokenUsed(
  tokenId: string,
  ttlSeconds: number,
): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.set(`${KEY_PREFIX}${tokenId}`, 1, {
      ex: Math.max(60, ttlSeconds),
    });
  } catch (err) {
    console.error("Single-use token mark failed:", err);
  }
}
