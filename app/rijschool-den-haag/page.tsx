import type { Metadata } from "next";
import RegionPage from "../components/RegionPage";
import { regionBySlug } from "../lib/content";
import { pageMetadata } from "../lib/site";

const denHaag = regionBySlug.get("den-haag")!;

export const metadata: Metadata = pageMetadata(
  "Rijschool Den Haag",
  denHaag.metaDescription,
  denHaag.canonicalPath,
  { imageBase: denHaag.imageBase },
);

export default function DenHaagPage() {
  return <RegionPage region={denHaag} />;
}
