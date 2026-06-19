/**
 * Resolves the public origin (e.g. "https://mauvebase.com") used to build
 * absolute links in emails and redirects. Prefers NEXT_PUBLIC_SITE_URL when set;
 * otherwise derives it from the incoming request's forwarded headers so it works
 * unchanged in local dev and behind a proxy in production.
 */
export function getOrigin(request: Request): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/+$/, "");

  const headers = request.headers;
  const host =
    headers.get("x-forwarded-host") ?? headers.get("host") ?? "localhost:3000";
  const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])(:|$)/.test(host);
  const proto =
    headers.get("x-forwarded-proto") ?? (isLocal ? "http" : "https");

  return `${proto}://${host}`;
}
