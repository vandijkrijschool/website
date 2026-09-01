import assetsJson from "../../data/assets.json" with { type: "json" };
import pricingJson from "../../data/pricing.json" with { type: "json" };
import regionsJson from "../../data/regions.json" with { type: "json" };
import siteFactsJson from "../../data/site-facts.json" with { type: "json" };
import sitemapJson from "../../data/sitemap.json" with { type: "json" };

export type StarterPackageId =
  | "starter-20"
  | "starter-30"
  | "starter-40"
  | "starter-50"
  | "all-in-one";

export type StarterPackage = {
  id: StarterPackageId;
  name: string;
  amountCents: number;
  lessonCount: number;
  registrationFeeIncluded: false;
  includes: string[];
  description: string;
  featured: boolean;
};

export type Region = {
  name: string;
  displayName: string;
  slug: string;
  canonicalPath: string;
  cluster: string;
  nearbySlugs: string[];
  imageBase: string;
  alt: string;
  editorialDirection: string;
  metaDescription: string;
  intro: string;
  context: string;
  situations: string[];
};

type RegionCopy = Pick<
  Region,
  "metaDescription" | "intro" | "context" | "situations"
>;

const regionCopyBySlug: Record<string, RegionCopy> = {
  "den-haag": {
    metaDescription: "Rijles in Den Haag met persoonlijke begeleiding en een duidelijk lesplan. Bekijk de werkwijze, actuele pakketten en mogelijkheden voor een proefles.",
    intro: "Den Haag brengt rustige woonstraten, stedelijke hoofdwegen en veel verschillende verkeersdeelnemers dicht bij elkaar.",
    context: "Je start in overzichtelijke woonstraten en bouwt door naar tramverkeer, meerstrooks kruispunten en de drukke verbindingen van de stad. Ophalen kan thuis, op school, bij werk of bij een afgesproken station in Den Haag.",
    situations: ["Woonstraten en 30-kilometerzones", "Tram-, bus- en fietsverkeer", "Meerstrooks kruispunten", "Overgangen naar doorgaande wegen"],
  },
  "den-hoorn": {
    metaDescription: "Rijles in Den Hoorn en omgeving, met aandacht voor dorpse wegen, regionale verbindingen en stapsgewijze examenvoorbereiding.",
    intro: "Den Hoorn ligt tussen dorpse wegen, Delftse stedelijkheid en de open omgeving van Midden-Delfland.",
    context: "De combinatie van rustige dorpswegen, open polder en de aansluiting op Delft maakt Den Hoorn geschikt om beheersing, snelheid en verkeersinzicht gevarieerd te oefenen.",
    situations: ["Rustige dorpswegen", "Overgangen naar stedelijk verkeer", "Regionale verbindingswegen", "Open polderomgeving"],
  },
  "de-lier": {
    metaDescription: "Rijles in De Lier met begeleiding die aansluit op jouw niveau. Ontdek de aanpak, tarieven en beschikbare rijlespakketten.",
    intro: "De Lier combineert een dorps karakter met regionale wegen en de kenmerkende glastuinbouwomgeving van Westland.",
    context: "In De Lier oefen je met dorpsstraten, smalle verbindingen en het karakteristieke glastuinbouwverkeer. Vanuit de rustige basis bouwen we verder op richting drukkere Westlandse wegen.",
    situations: ["Dorpsstraten", "Glastuinbouwverkeer", "Landelijke verbindingen", "Overgangen richting omliggende plaatsen"],
  },
  delft: {
    metaDescription: "Rijles in Delft met aandacht voor uiteenlopende verkeerssituaties. Bekijk hoe Van Dijk Rijschool je voorbereidt op zelfstandig rijden.",
    intro: "Delft kent veel fietsers, stedelijke verbindingen en een duidelijke overgang tussen historische en nieuwere stadsdelen.",
    context: "Delft biedt een sterke mix van fietsers, trams, woonwijken en stedelijke hoofdwegen. We stemmen de route af op jouw niveau en halen je op bij huis, school, werk of station Delft.",
    situations: ["Fietsers en voetgangers", "Tram- en stadsverkeer", "Woonwijken", "Stedelijke hoofdwegen"],
  },
  honselersdijk: {
    metaDescription: "Rijles in Honselersdijk en Westland met een helder leerplan. Vergelijk pakketten of plan een proefles.",
    intro: "Honselersdijk ligt in een actieve Westlandse omgeving met dorpswegen, kassen en bestemmingsverkeer.",
    context: "In Honselersdijk leer je vooruitkijken tussen bestemmingsverkeer, vrachtverkeer en rustige dorpswegen. Zo ontwikkel je controle in zowel compacte als open verkeerssituaties.",
    situations: ["Dorpswegen", "Bestemmingsverkeer", "Glastuinbouwomgeving", "Regionale verbindingen"],
  },
  kwintsheul: {
    metaDescription: "Rijles in Kwintsheul met persoonlijke voortgang en praktische voorbereiding. Bekijk tarieven, pakketten en proeflesmogelijkheden.",
    intro: "Kwintsheul heeft een kleinschalige dorps- en poldercontext, met verbindingen richting Wateringen en andere Westlandse plaatsen.",
    context: "Kwintsheul is ideaal om nauwkeurig positie te kiezen op smallere wegen en daarna door te rijden richting Wateringen, Naaldwijk en de regionale hoofdwegen.",
    situations: ["Smalle dorpswegen", "Polderwegen", "Kruisingen en voorrang", "Verbindingen richting Wateringen"],
  },
  leidschendam: {
    metaDescription: "Rijles in Leidschendam met gestructureerde begeleiding voor stad en regio. Bekijk de werkwijze en kies een passend pakket.",
    intro: "Leidschendam biedt een overgang tussen historische kades, woongebieden en grotere stedelijke verbindingen.",
    context: "Van de kades en bruggen rond het oude centrum tot rotondes en grotere verbindingswegen: in Leidschendam groeit iedere les mee met jouw vaardigheid en zelfvertrouwen.",
    situations: ["Bruggen en kades", "Woon- en winkelverkeer", "Rotondes", "Grotere verbindingswegen"],
  },
  monster: {
    metaDescription: "Rijles in Monster en omgeving met aandacht voor verschillende wegtypen. Ontdek de aanpak van Van Dijk Rijschool.",
    intro: "Monster verbindt een dorpsomgeving met Westlandse wegen en de kust- en duincontext.",
    context: "In Monster wisselen dorpsverkeer, kustgerichte wegen en regionale verbindingen elkaar af. Dat helpt je soepel schakelen tussen rustige en dynamische situaties.",
    situations: ["Dorpsverkeer", "Westlandse verbindingen", "Kustgerichte wegen", "Wisselende snelheidsregimes"],
  },
  naaldwijk: {
    metaDescription: "Rijles in Naaldwijk met een persoonlijk lesplan en inzicht in je voortgang. Bekijk pakketten, tarieven en proefles.",
    intro: "Naaldwijk is een centraal punt in Westland met centrumverkeer, rotondes en verbindingen naar omliggende plaatsen.",
    context: "Naaldwijk combineert centrumverkeer, rotondes en regionale wegen. Je kunt worden opgehaald bij huis, school, werk of een centraal afgesproken punt in de omgeving.",
    situations: ["Centrumverkeer", "Rotondes", "Woonstraten", "Regionale Westlandwegen"],
  },
  nootdorp: {
    metaDescription: "Rijles in Nootdorp met begeleiding voor woongebied en regionale wegen. Bekijk de werkwijze en plan een proefles.",
    intro: "Nootdorp kent woonwijken, open polderwegen en verbindingen naar Delft, Pijnacker en de Haagse regio.",
    context: "Nootdorp biedt een natuurlijke opbouw van rustige woonwijken naar polderwegen en drukkere aansluitingen richting Delft, Pijnacker en Den Haag.",
    situations: ["Moderne woonwijken", "Polderwegen", "Regionale kruisingen", "Verbindingen naar stad en regio"],
  },
  pijnacker: {
    metaDescription: "Rijles in Pijnacker met aandacht voor zelfstandig en zeker rijden. Vergelijk pakketten en ontdek de lesaanpak.",
    intro: "Pijnacker combineert woongebieden met open polder en wegen met verschillende snelheidsregimes.",
    context: "In Pijnacker oefen je vlot met snelheidswisselingen, kijkgedrag en ruimtekiezen. Rustige woonstraten en open polderwegen liggen dicht bij elkaar.",
    situations: ["Woongebied", "Polderomgeving", "Snelheidswisselingen", "Regionale verbindingen"],
  },
  poeldijk: {
    metaDescription: "Rijles in Poeldijk en omgeving met persoonlijke begeleiding. Bekijk actuele tarieven en mogelijkheden voor een proefles.",
    intro: "Poeldijk ligt tussen dorpswegen, glastuinbouw en verbindingen richting Den Haag en Naaldwijk.",
    context: "Poeldijk is een afwisselende uitvalsbasis voor dorpswegen, glastuinbouwverkeer en routes richting Den Haag en Naaldwijk. Ophalen binnen de kern is inbegrepen.",
    situations: ["Dorpswegen", "Glastuinbouwverkeer", "Landelijke trajecten", "Verbindingen richting Den Haag en Naaldwijk"],
  },
  rijswijk: {
    metaDescription: "Rijles in Rijswijk met een duidelijke opbouw van basis naar examenvoorbereiding. Bekijk pakketten en werkwijze.",
    intro: "Rijswijk wisselt historische straten en woonwijken af met stedelijke hoofdwegen richting Den Haag en Delft.",
    context: "Rijswijk geeft ruimte om rustig te beginnen en snel door te groeien naar stedelijke hoofdwegen richting Den Haag en Delft. Je lesplan bepaalt iedere volgende stap.",
    situations: ["Oud-Rijswijk", "Woonstraten", "Stedelijke hoofdwegen", "Verbindingen richting Den Haag en Delft"],
  },
  scheveningen: {
    metaDescription: "Rijles in Scheveningen met aandacht voor stedelijk en kustgericht verkeer. Ontdek de lesaanpak en plan een proefles.",
    intro: "Scheveningen kent woonstraten, stedelijke verbindingen en wisselende drukte rond boulevard en kust.",
    context: "In Scheveningen leer je omgaan met trams, fietsers, boulevardverkeer en wisselende drukte. Daardoor bouw je snel overzicht op in levendige stadssituaties.",
    situations: ["Woonstraten", "Tram- en fietsverkeer", "Boulevardomgeving", "Wisselende verkeersdrukte"],
  },
  "s-gravenzande": {
    metaDescription: "Rijles in ’s-Gravenzande met een lesplan dat past bij jouw niveau. Bekijk pakketten, tarieven en proeflesmogelijkheden.",
    intro: "’s-Gravenzande verbindt een dorpscentrum met Westlandse wegen en routes in de richting van de kust.",
    context: "’s-Gravenzande combineert een overzichtelijk centrum met kustverbindingen en brede Westlandse wegen. We plannen lessen overdag, in de avond en op zaterdag.",
    situations: ["Dorpscentrum", "Westlandse wegen", "Kustverbindingen", "Woon- en bestemmingsverkeer"],
  },
  voorburg: {
    metaDescription: "Rijles in Voorburg met persoonlijke begeleiding in uiteenlopende verkeerssituaties. Ontdek de werkwijze en pakketten.",
    intro: "Voorburg combineert historische straten, woonverkeer en stedelijke verbindingen richting Den Haag en Leidschendam.",
    context: "Voorburg biedt historische straten, woonverkeer en stedelijke verbindingen. Je oefent er vooruitkijken, ruimte delen en zelfstandig richting kiezen.",
    situations: ["Historische straten", "Woonverkeer", "Fietsers en voetgangers", "Stedelijke verbindingen"],
  },
  wateringen: {
    metaDescription: "Rijles in Wateringen en omgeving met een duidelijke, stapsgewijze aanpak. Bekijk tarieven en plan een proefles.",
    intro: "Wateringen ligt op de overgang tussen een dorpskern, glastuinbouw en stedelijke wegen richting Den Haag en Rijswijk.",
    context: "Wateringen vormt een goede overgang van dorpse wegen naar stedelijk verkeer richting Den Haag en Rijswijk. Ophalen bij huis, school of werk is mogelijk.",
    situations: ["Dorpskern", "Glastuinbouwomgeving", "Stedelijke overgangen", "Verbindingen richting Den Haag en Rijswijk"],
  },
};

const packageDescriptions: Record<StarterPackageId, string> = {
  "starter-20": "Een startpakket met twintig rijlessen, proefles, praktijkexamen en digitale rijlesmap.",
  "starter-30": "Een startpakket met dertig rijlessen, proefles, praktijkexamen en digitale rijlesmap.",
  "starter-40": "Een startpakket met veertig rijlessen, proefles, praktijkexamen en digitale rijlesmap.",
  "starter-50": "Een startpakket met vijftig rijlessen, proefles, praktijkexamen en digitale rijlesmap.",
  "all-in-one": "Een compleet pakket met 35 rijlessen, iTheorie, tussentijdse toets, praktijkexamen, proefles en digitale rijlesmap.",
};

type RawStarterPackage = (typeof pricingJson.starterPackages)[number];
type RawRegion = (typeof regionsJson.regions)[number];

export const pricing = pricingJson;
export const siteFacts = siteFactsJson;
export const assetManifest = assetsJson;
export const sitemapDefinition = sitemapJson;

export const packages: StarterPackage[] = pricingJson.starterPackages.map((item: RawStarterPackage) => ({
  id: item.id as StarterPackageId,
  name: item.name,
  amountCents: item.amount,
  lessonCount: item.lessonCount,
  registrationFeeIncluded: false,
  includes: [...item.includes],
  description: packageDescriptions[item.id as StarterPackageId],
  featured: item.id === "all-in-one",
}));

export const regions: Region[] = regionsJson.regions.map((item: RawRegion) => ({
  name: item.name,
  displayName: "displayName" in item && item.displayName ? item.displayName : item.name,
  slug: item.slug,
  canonicalPath: item.canonicalPath,
  cluster: item.cluster,
  nearbySlugs: [...item.nearbySlugs],
  imageBase: item.imageBase,
  alt: item.alt,
  editorialDirection: item.editorialDirection,
  ...regionCopyBySlug[item.slug],
}));

export const regionBySlug = new Map(regions.map((region) => [region.slug, region]));
export const singleRateById = new Map(pricing.singleRates.map((rate) => [rate.id, rate]));
export const packageById = new Map(packages.map((item) => [item.id, item]));

export const faqFacts = pricing.faqFacts.map((fact) => ({ ...fact }));
export const registrationFee = singleRateById.get("registration-fee")!;
export const guaranteeFundFee = singleRateById.get("driveyou-guarantee-fund")!;
export const installmentAdministrationFee = singleRateById.get("installment-administration-fee")!;

export const coreRouteMetadata = {
  "/": { title: "Van Dijk Rijschool | Rijles in Den Haag en regio", description: "Persoonlijke rijlessen, actuele pakketten en een gratis proefles bij Van Dijk Rijschool. Bekijk tarieven en het volledige werkgebied.", imageBase: "hero-den-haag-blue-hour" },
  "/rijlessen": { title: "Rijlessen op maat", description: "Lees hoe Van Dijk Rijschool rijlessen opbouwt en bekijk het actuele tarief, de werkwijze en mogelijkheden voor een proefles.", imageBase: "rijles-interieur-den-haag" },
  "/lespakketten": { title: "Rijlespakketten vergelijken", description: "Vergelijk Pakket 20, 30, 40, 50 en Alles-in-1 met de actuele prijzen en exact inbegrepen onderdelen.", imageBase: "hero-den-haag-blue-hour" },
  "/tarieven": { title: "Tarieven rijles en examens", description: "Bekijk losse rijlessen, vervolglessen, herexamenpakketten, examenkosten en bijkomende kosten bij Van Dijk Rijschool.", imageBase: "den-haag-vredespaleis" },
  "/configurator": { title: "Kies je rijlespakket", description: "Stel in vier stappen een rijlespakket samen met actuele prijzen, transparante opties en een deelbare configuratielink.", imageBase: "hero-den-haag-blue-hour" },
  "/proefles": { title: "Proefles aanvragen", description: "Kies direct een beschikbaar moment voor een gratis proefles van 60 minuten in jouw regio.", imageBase: "intake-bij-lesauto" },
  "/theorie": { title: "iTheoriepakket", description: "Online theorie leren met vijftig proefexamens, livestream en leren in eigen tempo. Bekijk inhoud en de prijs van € 65.", imageBase: "theorie-itheorie-met-lesauto" },
  "/werkwijze": { title: "Zo werken de rijlessen", description: "Van kennismaking en lesplan tot voortgang en examenvoorbereiding: bekijk de werkwijze van Van Dijk Rijschool.", imageBase: "nxtdrive-tablet-met-lesauto" },
  "/over-ons": { title: "Over Van Dijk Rijschool", description: "Maak kennis met instructeur Ruben van Dijk, de persoonlijke lesaanpak en de aansluiting bij DriveYOU.", imageBase: "intake-bij-lesauto" },
  "/faq": { title: "Veelgestelde vragen over rijles", description: "Praktische antwoorden over lesduur, starten, betalen in termijnen, ophaalservice en de geldigheid van theorie.", imageBase: "hero-den-haag-blue-hour" },
  "/contact": { title: "Contact", description: "Neem telefonisch, per e-mail of via het contactformulier contact op met Van Dijk Rijschool in Den Haag.", imageBase: "den-haag-hofvijver-binnenhof" },
  "/werkgebied": { title: "Werkgebied", description: "Bekijk alle zeventien werkgebieden van Van Dijk Rijschool rond Den Haag, Delft, Pijnacker en Westland.", imageBase: "den-haag-hofvijver-binnenhof" },
} as const;

export type CoreRoute = keyof typeof coreRouteMetadata;

export function formatPrice(amountCents: number) {
  const hasCents = amountCents % 100 !== 0;
  const formatted = new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(amountCents / 100);
  return `€ ${formatted}`;
}

export function getNearbyRegions(region: Region) {
  return region.nearbySlugs
    .map((slug) => regionBySlug.get(slug))
    .filter((item): item is Region => Boolean(item))
    .slice(0, 4);
}

export function getImageDimensions(imageBase: string) {
  const isGeneral = assetsJson.general.some((image) => image.imageBase === imageBase);
  return isGeneral ? { width: 1600, height: 779 } : { width: 1600, height: 901 };
}

export function getOgImagePath(imageBase?: string) {
  const hasLocationOg = regions.some((region) => region.imageBase === imageBase)
    || imageBase === "den-haag-vredespaleis";
  return hasLocationOg && imageBase
    ? `/images/og/${imageBase}-og-1200x630.jpg`
    : "/images/og/van-dijk-rijschool-og-1200x630.jpg";
}

function assertUnique(values: string[], label: string) {
  if (new Set(values).size !== values.length) throw new Error(`${label} bevat dubbele waarden.`);
}

export function validateContentData() {
  if (regionsJson.count !== 17 || regions.length !== 17) {
    throw new Error(`Er moeten exact 17 werkgebieden zijn; ontvangen: ${regions.length}.`);
  }
  assertUnique(regions.map((region) => region.slug), "Regioslugs");
  assertUnique(regions.map((region) => region.canonicalPath), "Regiocanonicals");

  for (const item of packages) {
    if (!item.id || !item.name || !Number.isInteger(item.amountCents) || item.amountCents <= 0) {
      throw new Error(`Pakket ${item.id || "zonder id"} mist verplichte velden.`);
    }
    if (!Number.isInteger(item.lessonCount) || item.lessonCount <= 0 || item.includes.length < 4) {
      throw new Error(`Pakket ${item.id} heeft ongeldige les- of inhoudsvelden.`);
    }
  }

  const sitemapRoutes = sitemapJson.routes.map((route) => route.path);
  if (sitemapJson.expectedIndexableCount !== 29 || sitemapRoutes.length !== 29) {
    throw new Error(`De sitemapbron moet exact 29 routes bevatten; ontvangen: ${sitemapRoutes.length}.`);
  }
  assertUnique(sitemapRoutes, "Sitemaproutes");
  const excluded = new Set(sitemapJson.excludedRoutes.map((route) => route.path));
  for (const route of sitemapRoutes) {
    if (!route.startsWith("/") || route.includes("?") || excluded.has(route)) {
      throw new Error(`Ongeldige indexeerbare sitemaproute: ${route}.`);
    }
  }
  for (const region of regions) {
    if (!sitemapRoutes.includes(region.canonicalPath)) {
      throw new Error(`Regiocanonical ontbreekt in sitemap: ${region.canonicalPath}.`);
    }
    if (!regionCopyBySlug[region.slug]) throw new Error(`Unieke regiocopy ontbreekt voor ${region.slug}.`);
  }
  for (const supportRoute of ["/reviews", "/leerlingomgeving"]) {
    const rule = sitemapJson.excludedRoutes.find((item) => item.path === supportRoute);
    if (!rule || rule.robots !== "noindex,follow") {
      throw new Error(`Ondersteunende route ${supportRoute} moet noindex,follow blijven.`);
    }
  }
  return true;
}

validateContentData();
