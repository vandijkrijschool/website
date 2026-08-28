import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Car, Check, MapPin, RouteIcon, Shield } from "../../components/Icons";
import { AreaLinks, SplitCta } from "../../components/PageSections";
import { SectionHeading } from "../../components/Marketing";
import { Breadcrumbs, JsonLd, PageHero } from "../../components/SiteChrome";
import { isCommercialStructuredDataEnabled, pageMetadata, siteConfig } from "../../lib/site";

const areas = {
  scheveningen: {
    name: "Scheveningen",
    title: "Rijles in Scheveningen met een duidelijke opbouw.",
    description: "Volg rijles in Scheveningen met een heldere opbouw die aansluit op jouw ervaring en beschikbaarheid. Bekijk pakketten en vraag een intake aan.",
    intro: "Van rustige woonstraten tot de boulevard, trams, fietsers en wisselende drukte rond strand en evenementen: je leert situaties stap voor stap lezen.",
    situations: ["Woonstraten en voorrangssituaties", "Boulevard en wisselende verkeersdrukte", "Tramverkeer en fietsers", "Verbindingen richting Den Haag"],
    context: "Scheveningen combineert smalle woonstraten met brede doorgaande routes en drukke momenten rond kust en evenementen. De lesopbouw volgt altijd jouw niveau; lokale herkenning is ondersteunend, nooit een truc om routes uit het hoofd te leren.",
  },
  rijswijk: {
    name: "Rijswijk",
    title: "Rijschool voor Rijswijk en omgeving.",
    description: "Ontdek de mogelijkheden voor rijles in Rijswijk. Vergelijk lespakketten, stel je eigen pakket samen of vraag een intake aan.",
    intro: "Oefen in een gevarieerde omgeving met woonwijken, doorgaande wegen, stedelijk verkeer en verbindingen richting Den Haag.",
    situations: ["Rustige woonwijken", "Doorgaande stedelijke wegen", "Drukke kruispunten", "Verbindingen richting Den Haag en snelweg"],
    context: "Rijswijk biedt een prettige afwisseling voor leerlingen die eerst rust nodig hebben en later meer dynamiek aankunnen. Je oefent kijkgedrag, rijstrookkeuze, snelheidsaanpassing en zelfstandige besluitvorming.",
  },
  voorburg: {
    name: "Voorburg",
    title: "Persoonlijke rijles in Voorburg.",
    description: "Rijles volgen in Voorburg? Lees hoe Van Dijk Rijschool werkt en kies een pakket dat aansluit op jouw ervaring en tempo.",
    intro: "Leer veilig omgaan met smalle woonstraten, fietsers, drukke verbindingswegen en verkeerssituaties richting Den Haag.",
    situations: ["Smalle woonstraten", "Fietsers en voetgangers", "Drukke verbindingswegen", "Zelfstandig navigeren richting Den Haag"],
    context: "In Voorburg wisselen rustige en drukkere routes elkaar snel af. Dat helpt om verkeersinzicht op te bouwen: vooruitkijken, ruimte maken en op tijd beslissen zonder gehaast te raken.",
  },
  leidschendam: {
    name: "Leidschendam",
    title: "Rijles in Leidschendam op jouw niveau.",
    description: "Bekijk rijlessen in Leidschendam, de beschikbare pakketten en de mogelijkheid om een persoonlijke intake aan te vragen.",
    intro: "Bouw rustig op van woonwijken en winkelverkeer naar complexere hoofdwegen en verbindingen rond de N14.",
    situations: ["Woonwijken en winkelverkeer", "Rotondes en voorrangssituaties", "Hoofdwegen rond de N14", "Complexere verbindingen richting regio Den Haag"],
    context: "Leidschendam kent woonwijken, winkelgebieden en belangrijke regionale verbindingen. De instructeur kiest situaties die passen bij wat je al zelfstandig kunt verwerken.",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(areas).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = areas[slug as keyof typeof areas];
  if (!area) return {};
  return pageMetadata(`Rijschool ${area.name}`, area.description, `/regio/${slug}`);
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areas[slug as keyof typeof areas];
  if (!area) notFound();
  return (
    <main id="main-content">
      <PageHero eyebrow={`Autorijschool ${area.name}`} title={area.title.replace(` ${area.name}`, "")} accent={area.name} intro={area.intro}><Breadcrumbs currentPath={`/regio/${slug}`} items={[{ label: "Regio", href: "/rijschool-den-haag" }, { label: area.name }]} /><div className="button-row page-hero__actions"><Link className="button" href="/proefles">Vraag een intake aan <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/configurator">Stel je pakket samen</Link></div></PageHero>
      <section className="section"><div className="site-shell local-intro"><div><SectionHeading eyebrow={`Leren rijden in ${area.name}`} title="Afwisseling die past bij jouw ontwikkeling." /><p>{area.context}</p><ul className="checklist">{area.situations.map((item) => <li key={item}><Check width="17" /> {item}</li>)}</ul></div><figure className="local-photo"><img src={slug === "scheveningen" ? "/images/scheveningen-drive.webp" : "/images/den-haag-drive.webp"} alt={`Lesauto tijdens rijles in ${area.name}`} width="1672" height="941" loading="eager" decoding="async" /><figcaption><MapPin width="22" /><span>Werkgebied</span><strong>{area.name}</strong><small>Beschikbaarheid op aanvraag</small></figcaption></figure></div></section>
      <section className="section section--soft"><div className="site-shell card-triptych"><article><Car width="24" /><h3>Rustig beginnen</h3><p>De eerste verkeerssituaties sluiten aan op je basisniveau en zelfvertrouwen.</p></article><article><RouteIcon width="24" /><h3>Complexiteit opbouwen</h3><p>Pas wanneer de basis voldoende zelfstandig gaat, voegen we drukkere en onbekende situaties toe.</p></article><article><Shield width="24" /><h3>Zelfstandig toepassen</h3><p>Je leert algemene verkeersprincipes gebruiken, ook op routes waar je nog niet eerder hebt gereden.</p></article></div></section>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Regio Den Haag" title="Bekijk ook de omliggende lesgebieden." text="Exacte ophaallocaties en lestijden worden tijdens de intake persoonlijk bevestigd." /><AreaLinks /></div></section>
      <SplitCta title={`Wil je starten met rijles in ${area.name}?`} text="Vertel ons hoeveel ervaring je hebt en wanneer je meestal beschikbaar bent. We controleren persoonlijk wat mogelijk is." />
      {isCommercialStructuredDataEnabled ? <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: `Autorijlessen in ${area.name}`, provider: { "@type": "DrivingSchool", name: siteConfig.name }, areaServed: { "@type": "City", name: area.name }, url: `${siteConfig.url}/regio/${slug}`, serviceType: "Autorijles" }} /> : null}
    </main>
  );
}
