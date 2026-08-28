import type { MetadataRoute } from "next";
import { siteConfig } from "./lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.tradeName,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#08090b",
    theme_color: "#ffc21c",
    lang: "nl-NL",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
