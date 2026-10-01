import type { MetadataRoute } from "next";
import { regions, sitemapDefinition } from "./lib/content";
import { isIndexingEnabled, siteConfig } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexingEnabled) return [];
  return sitemapDefinition.routes.map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified: sitemapDefinition.lastModified,
    images: route.path === "/over-ons"
      ? [new URL("/images/eric-van-dijk.jpg", siteConfig.url).toString(), new URL("/images/driveyou-auto.png", siteConfig.url).toString()]
      : regions.filter((region) => region.canonicalPath === route.path).map((region) => new URL(`/images/${region.imageBase}-1600.webp`, siteConfig.url).toString()),
  }));
}
