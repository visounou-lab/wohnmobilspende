"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "ws-cookie-consent";

/** Aktualisiert die Google-Consent-Einstellungen (Consent Mode v2). */
function updateConsent(granted: boolean) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const value = granted ? "granted" : "denied";
  window.gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      } else if (stored === "accepted") {
        // Frühere Einwilligung wiederherstellen.
        updateConsent(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const decide = (value: "accepted" | "essential") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    updateConsent(value === "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] p-4">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl bg-navy p-5 text-beige shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed">
          Wir verwenden technisch notwendige Cookies sowie – nur mit Ihrer
          Einwilligung – Cookies von Google (Google Ads), um den Erfolg unserer
          Werbung zu messen. Ohne Einwilligung findet keine solche Messung statt.
          Mehr dazu in der{" "}
          <Link href="/datenschutz" className="underline">
            Datenschutzerklärung
          </Link>
          .
        </p>
        <div className="flex flex-none gap-2">
          <button
            type="button"
            onClick={() => decide("essential")}
            className="rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white"
          >
            Nur notwendige
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-gold-soft"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
