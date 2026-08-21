import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/content";
import { RevealInit } from "@/components/RevealInit";
import { GoogleTag } from "@/components/GoogleTag";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wohnmobilspende.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Wohnmobil Spende",
    "Wohnmobil verschenken",
    "Wohnmobil für Bedürftige",
    "Wohnmobil kostenlos",
    "karitative Initiative",
    "Nächstenliebe",
    "Hilfe für Menschen",
    "soziale Hilfe",
    "zweite Chance",
    "Hymer",
  ],
  authors: [{ name: "Elisabeth Pillwatsch" }],
  alternates: {
    canonical: "/",
  },
  // Das Open-Graph-Bild wird über die Datei app/opengraph-image.png
  // bereitgestellt (Next.js Dateikonvention) – daher hier keine images-Liste.
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: siteUrl,
  description: SITE.description,
  inLanguage: "de-DE",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <RevealInit />
        <GoogleTag />
      </body>
    </html>
  );
}
