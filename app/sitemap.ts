import type { MetadataRoute } from "next";
import { sitemapDefinition } from "./lib/content";
import { isIndexingEnabled, siteConfig } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexingEnabled) return [];
  return sitemapDefinition.routes.map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
  }));
}
