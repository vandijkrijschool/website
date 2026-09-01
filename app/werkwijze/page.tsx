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
    { number: "02", icon: RouteIcon, title: "Persoonlijk lesplan", text: "Bepaal een passende opbouw zonder vaste route of doorlooptijd te beloven." },
    { number: "03", icon: Car, title: "Rijlessen", text: "Oefen stapsgewijs en neem steeds meer onderdelen zelfstandig over." },
    { number: "04", icon: Gauge, title: "Voortgang", text: "Bespreek wat goed gaat en welk leerdoel daarna aandacht krijgt." },
    { number: "05", icon: Shield, title: "Examenvoorbereiding", text: "Werk toe naar veilig en zelfstandig rijden zonder routes uit het hoofd te leren." },
  ];
  return (
    <main id="main-content">
      <PageHero eyebrow="Eén duidelijke route" title="Zo kan jouw weg naar" accent="het rijbewijs verlopen." intro="De site beschrijft een veilige lesopbouw, maar vult geen onbevestigde lesduur, planning, examenstatus of garantie in."><Breadcrumbs currentPath="/werkwijze" items={[{ label: "Werkwijze" }]} /></PageHero>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Stap voor stap" title="Van startniveau naar zelfstandigheid." /><div className="process-list">{steps.map(({ number, icon: StepIcon, title, text }) => <article key={number}><span>{number}</span><i><StepIcon width="25" /></i><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
      <section className="section section--soft" id="digitaal"><div className="site-shell local-intro"><div><SectionHeading eyebrow="Digitale ondersteuning" title="Rijlesmap en NXTDRIVE blijven gescheiden." /><p>De bron bevestigt een digitale rijlesmap als pakketonderdeel. Of deze map NXTDRIVE is, is nog niet vastgesteld. De NXTDRIVE-planner en leerlingomgeving op deze site blijven daarom zichtbaar gelabelde prototypes.</p><ul className="checklist"><li><Check width="17" /> Geen echte beschikbaarheid</li><li><Check width="17" /> Geen account of persoonsgegevens</li><li><Check width="17" /> Geen boekingsbevestiging</li><li><Check width="17" /> Productkoppeling nog te bevestigen</li></ul><Link className="button button--ghost" href="/leerlingomgeving">Bekijk de noindex-demo <ArrowRight width="17" /></Link></div><figure className="local-photo"><ResponsiveImage imageBase="nxtdrive-tablet-met-lesauto" alt="Tablet met een bewust onscherp lesvoortgangsoverzicht en de Van Dijk-lesauto op de achtergrond" sizes="(max-width: 820px) 100vw, 50vw" /><figcaption><Shield width="22" /><span>Prototype</span><strong>Geen echte interface</strong><small>Geen leesbare persoonsgegevens</small></figcaption></figure></div></section>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Bijsturen hoort erbij" title="Een lesplan is richtinggevend." text="De daadwerkelijke voortgang bepaalt welke onderdelen meer of minder aandacht krijgen. De website berekent daarom geen lesweken of examendatum." /><div className="card-triptych"><article><RouteIcon width="24" /><h3>Vooruitkijken</h3><p>Maak het volgende leerdoel begrijpelijk en concreet.</p></article><article><Gauge width="24" /><h3>Evalueren</h3><p>Bespreek voortgang zonder commerciële resultaatclaim.</p></article><article><Shield width="24" /><h3>Verantwoord beslissen</h3><p>Vraag een examen pas aan wanneer voorwaarden en ontwikkeling passend zijn.</p></article></div></div></section>
      <SplitCta title="Begin met een brongetrouwe pakketkeuze." text="Vergelijk de vijf startpakketten of vul de configurator in." primaryHref="/lespakketten" primaryLabel="Vergelijk pakketten" />
    </main>
  );
}
