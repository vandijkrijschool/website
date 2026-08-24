import type { MetadataRoute } from "next";
import { siteConfig } from "./lib/site";

const routes = [
  "",
  "/rijlessen",
  "/lespakketten",
  "/configurator",
  "/proefles",
  "/werkwijze",
  "/over-ons",
  "/reviews",
  "/faq",
  "/contact",
  "/rijschool-den-haag",
  "/regio/scheveningen",
  "/regio/rijswijk",
  "/regio/voorburg",
  "/regio/leidschendam",
  "/leerlingomgeving",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route || "/", siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/proefles" || route === "/configurator" || route === "/rijschool-den-haag" ? 0.9 : 0.7,
  }));
}
