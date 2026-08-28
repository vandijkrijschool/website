import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Car, Check, Gauge, RouteIcon, Shield, Smartphone } from "../components/Icons";
import { IconCards, SplitCta } from "../components/PageSections";
import { SectionHeading } from "../components/Marketing";
import { Breadcrumbs, JsonLd, PageHero } from "../components/SiteChrome";
import { isCommercialStructuredDataEnabled, pageMetadata, siteConfig } from "../lib/site";

export const metadata: Metadata = pageMetadata(
  "Rijlessen in regio Den Haag",
  "Ontdek hoe de autorijlessen van Van Dijk Rijschool zijn opgebouwd, wat je leert en hoe planning en voortgang in Den Haag worden begeleid.",
  "/rijlessen",
);

export default function LessonsPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Autorijbewijs B" title="Rijlessen met een" accent="duidelijke opbouw." intro="Je leert niet alleen handelingen uitvoeren, maar zelfstandig kijken, beslissen en veilig deelnemen aan het verkeer. Elke les sluit aan op jouw actuele niveau."><Breadcrumbs currentPath="/rijlessen" items={[{ label: "Rijlessen" }]} /><div className="button-row page-hero__actions"><Link className="button" href="/proefles">Vraag een intake aan <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/lespakketten">Bekijk pakketten</Link></div></PageHero>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Jouw ontwikkeling centraal" title="Van voertuigbediening naar zelfstandig rijden." text="De rijopleiding is opgebouwd uit overzichtelijke onderdelen. Je oefent eerst met voldoende ondersteuning en neemt steeds meer verantwoordelijkheid zodra je daar klaar voor bent." /><IconCards items={[{ icon: Car, title: "Voertuigbeheersing", text: "Bediening, kijktechniek, plaats op de weg en soepel omgaan met de auto." },{ icon: RouteIcon, title: "Verkeersinzicht", text: "Situaties vroeg herkennen, risico’s inschatten en tijdig veilige keuzes maken." },{ icon: Shield, title: "Zelfstandig rijden", text: "Verantwoord handelen in uiteenlopende situaties zonder constante aanwijzingen." },{ icon: Gauge, title: "Examenvoorbereiding", text: "Gericht oefenen op onderdelen die nog aandacht vragen, zonder examenroutes uit het hoofd te leren." }]} /></div></section>
      <section className="lesson-photo-band"><img src="/images/rijles-interieur.webp" alt="Autorijles met instructeur in het centrum van Den Haag" width="1672" height="941" loading="lazy" decoding="async" /><div className="site-shell"><div><span className="eyebrow">Aandacht op het juiste moment</span><strong>Uitleg die rustig blijft, ook wanneer het verkeer drukker wordt.</strong></div></div></section>
      <section className="section section--soft"><div className="site-shell curriculum"><div><SectionHeading eyebrow="Persoonlijk lesplan" title="Niet iedere leerling leert hetzelfde." text="Ervaring, zelfvertrouwen, regelmaat en leerstijl verschillen. Daarom gebruiken we een lesplan dat richting geeft, maar kan worden aangepast aan jouw ontwikkeling." /><ul className="checklist"><li><Check width="17" /> Vaste leerdoelen per fase</li><li><Check width="17" /> Duidelijke terugblik na de les</li><li><Check width="17" /> Volgende stap vooraf inzichtelijk</li><li><Check width="17" /> Extra aandacht waar jij die nodig hebt</li></ul></div><div className="curriculum__track">{["Basisbediening", "Kijken & beslissen", "Complex verkeer", "Zelfstandig rijden", "Examenvoorbereiding"].map((item,index) => <article key={item}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{item}</strong><i style={{ width: `${48+index*11}%` }} /></div></article>)}</div></div></section>
      <section className="section"><div className="site-shell info-split"><div><SectionHeading eyebrow="Plannen rond jouw week" title="Ritme maakt leren makkelijker." /><p>Regelmatig rijden helpt om vaardigheden vast te houden. Samen zoeken we een tempo dat haalbaar is naast school, werk of andere verplichtingen. Beschikbaarheid wordt altijd persoonlijk bevestigd.</p><div className="metric-row"><article><Calendar width="22" /><strong>1–3×</strong><span>per week mogelijk</span></article><article><Gauge width="22" /><strong>60–120</strong><span>minuten per afspraak</span></article></div></div><aside className="notice-card"><Smartphone width="25" /><h3>Digitale ondersteuning via NXTDRIVE</h3><p>Bekijk je planning, actuele leerdoelen en voortgang in één overzicht. Zo weet je voor en na de les waar je aan werkt.</p><Link className="text-link" href="/werkwijze#nxtdrive">Zo werkt NXTDRIVE <ArrowRight width="17" /></Link></aside></div></section>
      <SplitCta title="Ontdek jouw beste startpunt." text="Met een persoonlijke intake krijgen jij en de instructeur een eerlijk beeld van je ervaring en gewenste planning." />
      {isCommercialStructuredDataEnabled ? <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "Autorijlessen categorie B", provider: { "@type": "DrivingSchool", name: siteConfig.name }, areaServed: siteConfig.areas, url: `${siteConfig.url}/rijlessen`, serviceType: "Autorijles" }} /> : null}
    </main>
  );
}
