import { formatPrice, packages, pricing, registrationFee, singleRateById } from "../lib/content";
import { siteConfig } from "../lib/site";
import { JsonLd } from "./SiteChrome";

export default function DrivingServiceSchema({ packagesOnly = false }: { packagesOnly?: boolean }) {
  const singleLesson = singleRateById.get("single-driving-lesson")!;
  const path = packagesOnly ? "/lespakketten" : "/rijlessen";
  const serviceId = `${siteConfig.url}${path}#service`;
  const offers = packagesOnly ? packages.map((item) => ({
    "@type": "Offer",
    name: item.name,
    url: `${siteConfig.url}/lespakketten#${item.id}`,
    price: (item.amountCents / 100).toFixed(2),
    priceCurrency: "EUR",
    description: `${item.lessonCount} rijlessen. Inbegrepen: ${item.includes.join(", ")}. Inclusief btw; exclusief ${formatPrice(registrationFee.amount)} inschrijfkosten. Deelname aan het DriveYOU-garantiefonds is vrijwillig.`,
    seller: { "@id": siteConfig.organizationId },
    itemOffered: { "@type": "Service", name: item.name, serviceType: "Rijopleiding autorijbewijs B", provider: { "@id": siteConfig.organizationId } },
  })) : [{
    "@type": "Offer",
    name: "Losse rijles",
    url: `${siteConfig.url}/tarieven`,
    price: (singleLesson.amount / 100).toFixed(2),
    priceCurrency: "EUR",
    description: `Eén rijles van ${pricing.commercialTerms.lessonDurationMinutes} minuten, inclusief btw.`,
    seller: { "@id": siteConfig.organizationId },
    itemOffered: { "@id": serviceId },
  }];

  return <JsonLd data={{
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId,
    name: packagesOnly ? "Rijlespakketten Van Dijk Rijschool" : "Autorijlessen Van Dijk Rijschool",
    serviceType: "Rijopleiding autorijbewijs B",
    url: `${siteConfig.url}${path}`,
    mainEntityOfPage: { "@id": `${siteConfig.url}${path}#webpage` },
    provider: { "@id": siteConfig.organizationId },
    areaServed: siteConfig.areas.map((name) => ({ "@type": "Place", name })),
    offers,
  }} />;
}
