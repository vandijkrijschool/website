import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Car, Check, Gauge, RouteIcon, Shield, Smartphone } from "../components/Icons";
import { SplitCta } from "../components/PageSections";
import { SectionHeading } from "../components/Marketing";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = pageMetadata(
  "Zo werken onze rijlessen",
  "Van kennismaking en lesplanning tot voortgang en praktijkexamen: bekijk stap voor stap hoe rijles bij Van Dijk Rijschool werkt.",
  "/werkwijze",
);

export default function MethodPage() {
  const steps = [
    { number: "01", icon: Calendar, title: "Kennismaking", text: "We bespreken je ervaring, zelfvertrouwen, doelen en beschikbare lesmomenten." },
    { number: "02", icon: RouteIcon, title: "Persoonlijk lesplan", text: "Je krijgt een duidelijke route met leerdoelen die kan worden aangepast aan je ontwikkeling." },
    { number: "03", icon: Car, title: "Rijlessen", text: "Je oefent in een logisch tempo en neemt steeds meer onderdelen zelfstandig over." },
    { number: "04", icon: Gauge, title: "Voortgang", text: "Na iedere fase is duidelijk wat goed gaat en wat tijdens de volgende lessen aandacht krijgt." },
    { number: "05", icon: Shield, title: "Examenvoorbereiding", text: "We werken toe naar veilig en zelfstandig rijden, niet naar het uit het hoofd leren van routes." },
  ];
  return (
    <main id="main-content">
      <PageHero eyebrow="Eén duidelijke route" title="Zo verloopt jouw weg" accent="naar het rijbewijs." intro="Een goede rijopleiding is geen verzameling losse afspraken. Iedere les heeft een doel en bouwt voort op wat je al beheerst."><Breadcrumbs items={[{ label: "Werkwijze" }]} /></PageHero>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Stap voor stap" title="Van startniveau naar zelfstandigheid." /><div className="process-list">{steps.map(({ number, icon: StepIcon, title, text }) => <article key={number}><span>{number}</span><i><StepIcon width="25" /></i><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
      <section className="section section--soft" id="nxtdrive"><div className="site-shell info-split"><div><SectionHeading eyebrow="Ondersteund door NXTDRIVE" title="Overzicht binnen én buiten de les." /><p>De leerlingomgeving ondersteunt de persoonlijke begeleiding. Je kunt er afspraken, actuele leerdoelen en voortgang terugvinden, terwijl de instructeur het lesplan actueel houdt.</p><ul className="checklist"><li><Check width="17" /> Lesplanning en afspraken</li><li><Check width="17" /> Persoonlijke leerdoelen</li><li><Check width="17" /> Voortgang per onderdeel</li><li><Check width="17" /> Voorbereiding op de volgende les</li></ul><Link className="button button--ghost" href="/leerlingomgeving">Bekijk leerlingomgeving <ArrowRight width="17" /></Link></div><div className="nxtdrive-showcase"><div className="nxtdrive-showcase__phone"><span>NXTDRIVE</span><article><small>Volgende afspraak</small><strong>Rijles 13</strong><em>Dinsdag · 14:30</em></article><article><small>Jouw voortgang</small><div className="mini-ring">68%</div></article><article><small>Volgend doel</small><strong>Zelfstandig invoegen</strong></article></div><div className="nxtdrive-showcase__caption"><Smartphone width="21" /><span>Alles op één plek</span></div></div></div></section>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Geen standaardtempo" title="Bijsturen hoort bij goed lesgeven." text="Je lesplan is richtinggevend, geen rigide schema. Gaat een onderdeel snel, dan kun je verder. Heb je meer oefening nodig, dan maken we daar bewust ruimte voor." /><div className="card-triptych"><article><RouteIcon width="24" /><h3>Vooruitkijken</h3><p>Je weet wat het doel van de volgende les is en waarom dat onderdeel belangrijk is.</p></article><article><Gauge width="24" /><h3>Evalueren</h3><p>Voortgang wordt besproken in begrijpelijke taal, zonder verrassingen aan het einde van je pakket.</p></article><article><Shield width="24" /><h3>Verantwoord beslissen</h3><p>Een examen wordt pas aangevraagd wanneer de voorwaarden en jouw ontwikkeling dit toelaten.</p></article></div></div></section>
      <SplitCta title="Klaar voor een persoonlijk startplan?" text="Vraag een intake aan of laat de pakketconfigurator eerst met je meedenken." />
    </main>
  );
}

