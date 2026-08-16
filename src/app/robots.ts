import type { MetadataRoute } from "next";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wohnmobilspende.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // API-Endpunkte nicht indexieren.
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
