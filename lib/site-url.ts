/**
 * Resolves the public origin (e.g. "https://mauvebase.com") used to build
 * absolute links in emails and redirects.
 *
 * In production we REQUIRE `NEXT_PUBLIC_SITE_URL`. We deliberately do NOT fall
 * back to request headers there: `Host` / `X-Forwarded-Host` are attacker-
 * controllable, and trusting them would let someone point confirmation links or
 * redirects at their own domain (link poisoning / open redirect). In local dev
 * the env var is usually unset, so we derive the origin from the request to keep
 * `npm run dev` zero-config.
 */
export function getOrigin(request: Request): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/+$/, "");

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be set in production — refusing to derive the public origin from untrusted request headers.",
    );
  }

  const headers = request.headers;
  const host =
    headers.get("x-forwarded-host") ?? headers.get("host") ?? "localhost:3000";
  const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])(:|$)/.test(host);
  const proto =
    headers.get("x-forwarded-proto") ?? (isLocal ? "http" : "https");

  return `${proto}://${host}`;
}
