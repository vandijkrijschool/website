import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RegionPage from "../../components/RegionPage";
import { regionBySlug, regions } from "../../lib/content";
import { pageMetadata } from "../../lib/site";

const dynamicRegions = regions.filter((region) => region.slug !== "den-haag");

export const dynamicParams = false;

export function generateStaticParams() {
  return dynamicRegions.map((region) => ({ slug: region.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const region = regionBySlug.get(slug);
  if (!region || region.slug === "den-haag") return {};
  return pageMetadata(`Rijschool ${region.displayName}`, region.metaDescription, region.canonicalPath, { imageBase: region.imageBase });
}

export default async function DynamicRegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = regionBySlug.get(slug);
  if (!region || region.slug === "den-haag") notFound();
  return <RegionPage region={region} />;
}
