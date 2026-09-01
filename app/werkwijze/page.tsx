import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Car, Check, Gauge, RouteIcon, Shield } from "../components/Icons";
import { SplitCta } from "../components/PageSections";
import { SectionHeading } from "../components/Marketing";
import ResponsiveImage from "../components/ResponsiveImage";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { corePageMetadata } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/werkwijze");

export default function MethodPage() {
  const steps = [
    { number: "01", icon: Calendar, title: "Kennismaking", text: "Bespreek ervaring, zelfvertrouwen en planningsvoorkeuren." },
    { number: "02", icon: RouteIcon, title: "Persoonlijk lesplan", text: "Bepaal samen de beste opbouw, lesfrequentie en het pakket dat bij je past." },
    { number: "03", icon: Car, title: "Rijlessen", text: "Oefen stapsgewijs en neem steeds meer onderdelen zelfstandig over." },
    { number: "04", icon: Gauge, title: "Voortgang", text: "Bespreek wat goed gaat en welk leerdoel daarna aandacht krijgt." },
    { number: "05", icon: Shield, title: "Examenvoorbereiding", text: "Werk toe naar veilig en zelfstandig rijden zonder routes uit het hoofd te leren." },
  ];
  return (
    <main id="main-content">
      <PageHero eyebrow="Eén duidelijke route" title="Zo verloopt jouw weg naar" accent="het rijbewijs." intro="Van gratis proefles tot praktijkexamen: je werkt met een vaste instructeur, duidelijke leerdoelen en inzicht in je voortgang."><Breadcrumbs currentPath="/werkwijze" items={[{ label: "Werkwijze" }]} /></PageHero>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Stap voor stap" title="Van startniveau naar zelfstandigheid." /><div className="process-list">{steps.map(({ number, icon: StepIcon, title, text }) => <article key={number}><span>{number}</span><i><StepIcon width="25" /></i><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
      <section className="section section--soft" id="digitaal"><div className="site-shell local-intro"><div><SectionHeading eyebrow="Digitale ondersteuning" title="Jouw rijopleiding in NXTDRIVE." /><p>Plan rijlessen, bekijk je persoonlijke leerdoelen en lees na iedere les de feedback van je instructeur terug.</p><ul className="checklist"><li><Check width="17" /> Agenda en lestijden</li><li><Check width="17" /> Persoonlijke leerdoelen</li><li><Check width="17" /> Voortgang per onderdeel</li><li><Check width="17" /> Lesverslagen en feedback</li></ul><Link className="button button--ghost" href="/leerlingomgeving">Bekijk de leerlingomgeving <ArrowRight width="17" /></Link></div><figure className="local-photo"><ResponsiveImage imageBase="nxtdrive-tablet-met-lesauto" alt="Tablet met een lesvoortgangsoverzicht en de Van Dijk-lesauto op de achtergrond" sizes="(max-width: 820px) 100vw, 50vw" /><figcaption><Shield width="22" /><span>NXTDRIVE</span><strong>Alles overzichtelijk</strong><small>Agenda · doelen · voortgang</small></figcaption></figure></div></section>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Bijsturen hoort erbij" title="Een lesplan groeit met je mee." text="Jouw voortgang bepaalt welke onderdelen meer of minder aandacht krijgen. Zo besteed je iedere les aan wat jou echt verder helpt." /><div className="card-triptych"><article><RouteIcon width="24" /><h3>Vooruitkijken</h3><p>Maak het volgende leerdoel begrijpelijk en concreet.</p></article><article><Gauge width="24" /><h3>Evalueren</h3><p>Bespreek na iedere les wat goed ging en wat je verder gaat oefenen.</p></article><article><Shield width="24" /><h3>Verantwoord beslissen</h3><p>Vraag het praktijkexamen aan zodra je veilig en zelfstandig rijdt.</p></article></div></div></section>
      <SplitCta title="Kies het pakket dat bij je past." text="Vergelijk de vijf startpakketten of stel in vier stappen je persoonlijke route samen." primaryHref="/lespakketten" primaryLabel="Vergelijk pakketten" />
    </main>
  );
}
