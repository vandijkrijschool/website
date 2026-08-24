import type { Metadata } from "next";
import Configurator from "../components/Configurator";
import { ArrowRight, Check, Shield, Sparkles } from "../components/Icons";
import { PackageCards, SectionHeading } from "../components/Marketing";
import { Breadcrumbs, JsonLd, PageHero } from "../components/SiteChrome";
import { pageMetadata, siteConfig } from "../lib/site";

export const metadata: Metadata = pageMetadata(
  "Lespakket samenstellen — Rijschool Den Haag",
  "Stel jouw rijlespakket voor Den Haag en omgeving samen. Vergelijk 20, 30 en 40 lesuren, bekijk direct de pakketprijs en vraag een intake aan.",
  "/configurator",
);

export default function ConfiguratorPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Jouw route op maat" title="Stel jouw persoonlijke" accent="lespakket samen." intro="Beantwoord vier korte stappen over je ervaring, zelfvertrouwen en gewenste lestempo. Je ziet direct welk vast pakket waarschijnlijk bij jouw situatie past.">
        <Breadcrumbs items={[{ label: "Lespakket samenstellen" }]} />
      </PageHero>
      <section className="section section--configurator"><div className="site-shell"><Configurator /></div></section>
      <section className="section section--soft"><div className="site-shell"><SectionHeading eyebrow="Of kies direct" title="De drie vaste lesroutes." text="Je kunt ieder pakket direct selecteren en daarna in de cockpit extra lesuren toevoegen." /><PackageCards compact /></div></section>
      <section className="section"><div className="site-shell info-split"><div><SectionHeading eyebrow="Eerlijk advies" title="Een berekening is nooit het hele verhaal." /><p>De configurator geeft een voorlopig voorstel op basis van jouw antwoorden. Hoeveel lesuren je werkelijk nodig hebt, hangt af van je ontwikkeling tijdens de lessen. Daarom bevestigen we de definitieve route altijd persoonlijk.</p><ul className="checklist"><li><Check width="17" /> Geen verborgen contactformulier vóór je resultaat</li><li><Check width="17" /> Je keuze blijft aanpasbaar</li><li><Check width="17" /> Definitief advies na intake of proefles</li></ul></div><aside className="notice-card"><Sparkles width="25" /><h3>Al ervaring of eerder examen gedaan?</h3><p>Dan is een korte intake eerlijker dan automatisch een standaardpakket adviseren. Je kunt de vaste pakketten wel gewoon vergelijken.</p><a className="text-link" href="/proefles">Plan een persoonlijke intake <ArrowRight width="17" /></a></aside></div></section>
      <section className="section section--compact"><div className="site-shell assurance-panel"><Shield width="27" /><div><h2>Indicatief en zonder garantieclaims.</h2><p>“Zeker Slagen” is de naam van een pakket, geen resultaatgarantie. De herexamenregeling geldt uitsluitend volgens de voorwaarden.</p></div></div></section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Van Dijk Lespakket Cockpit", applicationCategory: "EducationalApplication", operatingSystem: "Web", url: `${siteConfig.url}/configurator`, description: "Interactieve configurator voor een voorlopig rijlespakketadvies." }} />
    </main>
  );
}

