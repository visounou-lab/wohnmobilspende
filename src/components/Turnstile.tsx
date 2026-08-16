"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

interface TurnstileProps {
  onVerify: (token: string) => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          theme?: string;
        },
      ) => string;
      reset: (id?: string) => void;
    };
  }
}

/**
 * Cloudflare-Turnstile-Widget. Wird nur angezeigt, wenn ein Site-Key
 * konfiguriert ist. Ohne Site-Key greift der serverseitige Honeypot-Schutz.
 */
export function Turnstile({ onVerify }: TurnstileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;
    const tryRender = () => {
      if (window.turnstile && ref.current && widgetId.current === null) {
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          callback: (token: string) => onVerify(token),
          "expired-callback": () => onVerify(""),
          theme: "light",
        });
        return true;
      }
      return false;
    };
    if (!tryRender()) {
      const interval = setInterval(() => {
        if (tryRender()) clearInterval(interval);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [siteKey, onVerify]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
      />
      <div ref={ref} className="min-h-[65px]" />
    </>
  );
}
