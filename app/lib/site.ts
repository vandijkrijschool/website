import type { Metadata } from "next";

export const siteConfig = {
  name: "Van Dijk Rijschool",
  shortName: "Van Dijk",
  title: "Van Dijk Rijschool — Premium Rijschool Den Haag",
  description:
    "Persoonlijke autorijlessen en duidelijke lespakketten in Den Haag en omgeving. Stel online jouw rijopleiding samen en plan een vrijblijvende intake.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vandijkrijschool.nl",
  areaLabel: "Den Haag en omgeving",
  areas: ["Den Haag", "Scheveningen", "Rijswijk", "Voorburg", "Leidschendam"],
} as const;

export const isProductionSite =
  process.env.NEXT_PUBLIC_SITE_MODE === "production";

export const packages = [
  {
    id: "instap",
    name: "Instappakket",
    lessons: 20,
    price: 1250,
    featured: false,
    description: "Een compacte route voor leerlingen met aanleg of eerdere rijervaring.",
    features: ["20 rijlessen", "Praktijkexamen", "Persoonlijk lesplan", "NXTDRIVE-inzicht"],
  },
  {
    id: "meest-gekozen",
    name: "Meest gekozen",
    lessons: 30,
    price: 1950,
    description: "De uitgebalanceerde opleiding met extra voorbereiding richting het examen.",
    featured: true,
    features: [
      "30 rijlessen",
      "Praktijkexamen",
      "Tussentijdse toets",
      "Persoonlijk lesplan",
      "NXTDRIVE-inzicht",
    ],
  },
  {
    id: "zeker-slagen",
    name: "Zeker Slagen",
    lessons: 40,
    price: 2450,
    featured: false,
    description: "Maximale voorbereiding en extra zekerheid tijdens jouw rijopleiding.",
    features: [
      "40 rijlessen",
      "Praktijkexamen",
      "Tussentijdse toets",
      "Gratis herexamen*",
      "NXTDRIVE-inzicht",
    ],
  },
] as const;

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
