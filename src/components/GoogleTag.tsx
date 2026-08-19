"use client";

import Script from "next/script";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// ID der Google-Tag (Google Ads). Über Env überschreibbar.
const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID ?? "AW-18369454196";

/**
 * Google-Tag (Google Ads) mit Consent Mode v2.
 *
 * DSGVO-konform: Die Einwilligung ist standardmäßig auf "denied" gesetzt.
 * Erst wenn die Besucher:innen im Cookie-Banner zustimmen, wird die
 * Einwilligung auf "granted" aktualisiert (siehe CookieBanner).
 */
export function GoogleTag() {
  if (!GTAG_ID) return null;

  return (
    <>
      {/* Consent-Standard + gtag-Initialisierung – vor dem Laden von gtag.js. */}
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', '${GTAG_ID}');
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
