import type { Metadata } from "next";
import { ArrowRight, MapPin, Shield, Users } from "../components/Icons";
import { IconCards, SplitCta } from "../components/PageSections";
import { SectionHeading } from "../components/Marketing";
import ResponsiveImage from "../components/ResponsiveImage";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { corePageMetadata, siteConfig } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/over-ons");

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Van Dijk Rijschool" title="Persoonlijke rijles met" accent="rust en aandacht." intro="Ruben van Dijk helpt leerlingen in Den Haag en de omliggende regio stap voor stap naar veilig en zelfstandig rijden."><Breadcrumbs currentPath="/over-ons" items={[{ label: "Over ons" }]} /></PageHero>
      <section className="section"><div className="site-shell story-grid"><div><SectionHeading eyebrow="Jouw instructeur" title="Leren zelfstandig beslissen." /><p>Ruben is WRM-gecertificeerd en geeft sinds 2014 rijles. Zijn aanpak is rustig, duidelijk en praktisch: eerst begrijpen wat er gebeurt, daarna steeds zelfstandiger handelen.</p><p>Tijdens de gratis proefles bespreek je ervaring, zelfvertrouwen en planning. Daarna ontvang je een persoonlijk pakket- en lesadvies.</p></div><figure className="story-visual"><ResponsiveImage imageBase="intake-bij-lesauto" alt="Kennismaking naast de zwarte Van Dijk Rijschool-lesauto" priority sizes="(max-width: 820px) 100vw, 50vw" /><span>Ruben van Dijk · rijinstructeur</span></figure></div></section>
      <section className="section section--soft"><div className="site-shell"><SectionHeading eyebrow="Waarom Van Dijk" title="Persoonlijk, flexibel en duidelijk." /><IconCards items={[{ icon: Users, title: "Vaste instructeur", text: "Eén vertrouwd gezicht tijdens je volledige rijopleiding." },{ icon: Shield, title: "Veilige opbouw", text: "Oefenen op jouw niveau met concrete feedback na iedere les." },{ icon: MapPin, title: "17 werkgebieden", text: "Ophalen bij huis, school, werk of een afgesproken station." },{ icon: Shield, title: "Digitale voortgang", text: "Afspraken, leerdoelen en lesverslagen overzichtelijk in NXTDRIVE." }]} /></div></section>
      <section className="section"><div className="site-shell info-split"><div><SectionHeading eyebrow="Aangesloten bij DriveYOU" title="Zelfstandig met een sterk vangnet." /><p>{siteConfig.name} werkt als zelfstandige rijschool binnen DriveYOU. Dankzij het garantiefonds kunnen vooruitbetaalde lessen en CBR-examens bij uitval kosteloos worden voortgezet bij een andere aangesloten instructeur.</p><a className="text-link" href="https://www.driveyou.nl/garantiefonds/" rel="noreferrer" target="_blank">Bekijk de DriveYOU-voorwaarden <ArrowRight width="17" /></a></div><aside className="notice-card"><Shield width="25" /><h3>DriveYOU-garantiefonds</h3><p>Iedere nieuwe leerling betaalt eenmalig € 41,50. Zo blijft je vooruitbetaalde rijopleiding beschermd.</p></aside></div></section>
      <SplitCta title="Klaar om kennis te maken?" text="Plan een gratis proefles of vergelijk eerst onze vijf rijlespakketten." primaryHref="/proefles" primaryLabel="Plan proefles" />
    </main>
  );
}
