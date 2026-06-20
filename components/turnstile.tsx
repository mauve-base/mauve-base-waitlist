"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/** Whether the widget is wired up (site key present). */
export const turnstileEnabled = !!SITE_KEY;

/**
 * Cloudflare Turnstile widget. Reports the solved token via `onToken` (and an
 * empty string when it expires/errors/resets). Bumping `resetSignal` forces a
 * fresh challenge — used after a failed submit, since a token is single-use.
 * Renders nothing when no site key is configured (local dev).
 */
export function Turnstile({
  onToken,
  resetSignal = 0,
}: {
  onToken: (token: string) => void;
  resetSignal?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Render as soon as the Turnstile script global is available. We deliberately
  // do NOT rely on <Script onLoad>: on client-side navigations the script is
  // already cached, so onLoad never fires again — which left the widget
  // intermittently unrendered. Instead we poll briefly for window.turnstile and
  // render the instant it's ready, which covers both fresh loads and soft navs.
  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;
    let attempts = 0;

    function tryRender() {
      if (cancelled || widgetIdRef.current) return;
      if (SITE_KEY && window.turnstile && containerRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          callback: (token) => onToken(token),
          "expired-callback": () => onToken(""),
          "error-callback": () => onToken(""),
        });
        return;
      }
      if (attempts++ < 150) setTimeout(tryRender, 100); // retry up to ~15s
    }

    tryRender();

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // widget already gone — nothing to do
        }
        widgetIdRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset to a fresh challenge when asked.
  useEffect(() => {
    if (resetSignal > 0 && widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch {
        // ignore
      }
      onToken("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal]);

  if (!SITE_KEY) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <div ref={containerRef} />
    </>
  );
}
