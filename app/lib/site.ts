import type { Metadata } from "next";
import {
  coreRouteMetadata,
  formatPrice,
  getOgImagePath,
  packages,
  regions,
  siteFacts,
  type CoreRoute,
} from "./content";

export { formatPrice, packages, regions };

const intendedOrigin = siteFacts.web.intendedCanonicalOrigin.value;
const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL || intendedOrigin;

export const isProductionEnvironment = process.env.APP_ENVIRONMENT === "production";
export const isIndexingEnabled =
  isProductionEnvironment && process.env.NEXT_PUBLIC_INDEXING_ENABLED === "true";

export function validateProductionOrigin(origin: string) {
  let parsed: URL;
  try {
    parsed = new URL(origin);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL moet een geldige absolute URL zijn.");
  }
  if (
    parsed.protocol !== "https:" ||
    !parsed.hostname ||
    /^(?:localhost|127\.0\.0\.1|0\.0\.0\.0)$/i.test(parsed.hostname) ||
    parsed.origin !== intendedOrigin
  ) {
    throw new Error(`Ongeldige productie-origin: ${origin}.`);
  }
  return parsed.origin;
}

if (isProductionEnvironment) validateProductionOrigin(configuredOrigin);

export const siteConfig = {
  name: siteFacts.brand.publicName.value,
  tradeName: siteFacts.brand.publicName.value,
  shortName: "Van Dijk",
  title: "Van Dijk Rijschool | Rijles in Den Haag en regio",
  description: coreRouteMetadata["/"].description,
  url: configuredOrigin.replace(/\/$/, ""),
  intendedOrigin,
  organizationId: `${configuredOrigin.replace(/\/$/, "")}/#organization`,
  websiteId: `${configuredOrigin.replace(/\/$/, "")}/#website`,
  legalName: siteFacts.brand.legalName,
  contact: siteFacts.contactFromRepository,
  areaLabel: "Den Haag, Delft, Pijnacker en Westland",
  areas: regions.map((region) => region.displayName),
} as const;

// De tijdelijke bedrijfs- en prijsgegevens zijn mock-data. Houd commerciële
// structured data uitgeschakeld om die niet als feitelijke aanbiedingen te publiceren.
export const isCommercialStructuredDataEnabled = false;

export const primaryNavigation = [
  { href: "/rijlessen", label: "Rijlessen" },
  { href: "/lespakketten", label: "Lespakketten" },
  { href: "/tarieven", label: "Tarieven" },
  { href: "/werkwijze", label: "Werkwijze" },
  { href: "/werkgebied", label: "Werkgebied" },
] as const;

export const footerNavigation = [
  { href: "/configurator", label: "Pakketconfigurator" },
  { href: "/proefles", label: "Proefles aanvragen" },
  { href: "/theorie", label: "iTheorie" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/faq", label: "Veelgestelde vragen" },
  { href: "/contact", label: "Contact" },
] as const;

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  options: { imageBase?: string; noIndex?: boolean } = {},
): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  const imageUrl = new URL(getOgImagePath(options.imageBase), siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical },
    ...(options.noIndex
      ? { robots: { index: false, follow: isIndexingEnabled } }
      : {}),
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${siteConfig.name} — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function corePageMetadata(path: CoreRoute): Metadata {
  const route = coreRouteMetadata[path];
  return pageMetadata(route.title, route.description, path, { imageBase: route.imageBase });
}
