import type { MetadataRoute } from "next";
import { isIndexingEnabled, siteConfig } from "./lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    ...(isIndexingEnabled ? { sitemap: `${siteConfig.url}/sitemap.xml` } : {}),
  };
}
