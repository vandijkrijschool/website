import type { Metadata } from "next";
import { extraLessonPrice, packages } from "./packages.js";

export { extraLessonPrice, packages };

export const siteConfig = {
  name: "Van Dijk - Rijschool",
  tradeName: "Van Dijk - Rijschool",
  shortName: "Van Dijk",
  title: "Van Dijk - Rijschool | Rijschool Den Haag",
  description:
    "Persoonlijke autorijlessen en duidelijke lespakketten in Den Haag en omgeving. Stel online jouw rijopleiding samen en plan een vrijblijvende intake.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://voorbeeld.vandijkrijschool.nl",
  phone: "+31 6 59116366",
  phoneHref: "tel:+31659116366",
  chamberOfCommerceNumber: "42130985",
  chamberOfCommerceUrl: "https://www.kvk.nl/bestellen/#/42130985000066352479?origin=search",
  address: {
    street: "Melis Stokelaan 2440",
    postalCode: "2541 GR",
    locality: "'s-Gravenhage",
    countryCode: "NL",
  },
  areaLabel: "Den Haag en omgeving",
  areas: ["Den Haag", "Scheveningen", "Rijswijk", "Voorburg", "Leidschendam"],
} as const;

// Prijzen en formulieren zijn nog demodata. Publiceer daarom geen Product-,
// Offer- of Service-schema totdat commerciële gegevens expliciet zijn bevestigd.
export const isCommercialStructuredDataEnabled = false;

// The public runtime deliberately hides prototype-only scenario controls.
export const isProductionSite = true;

export const primaryNavigation = [
  { href: "/rijlessen", label: "Rijlessen" },
  { href: "/lespakketten", label: "Lespakketten" },
  { href: "/werkwijze", label: "Werkwijze" },
  { href: "/rijschool-den-haag", label: "Regio Den Haag" },
  { href: "/over-ons", label: "Over ons" },
] as const;

export const footerNavigation = [
  { href: "/configurator", label: "Pakketconfigurator" },
  { href: "/proefles", label: "Proefles aanvragen" },
  { href: "/reviews", label: "Ervaringen" },
  { href: "/faq", label: "Veelgestelde vragen" },
  { href: "/contact", label: "Contact" },
] as const;

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [{ url: `${siteConfig.url}/og.png`, width: 1200, height: 630, alt: siteConfig.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}/og.png`],
    },
  };
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
