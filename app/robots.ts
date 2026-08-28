import type { MetadataRoute } from "next";
import { isProductionSite, siteConfig } from "./lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/leerlingomgeving"],
      },
    ],
    sitemap: isProductionSite ? `${siteConfig.url}/sitemap.xml` : undefined,
    host: siteConfig.url,
  };
}
