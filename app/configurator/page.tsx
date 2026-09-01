import type { Metadata } from "next";
import Configurator from "../components/Configurator";
import { Check, Shield, Sparkles } from "../components/Icons";
import { PackageCards, SectionHeading } from "../components/Marketing";
import { Breadcrumbs, JsonLd, PageHero } from "../components/SiteChrome";
import { corePageMetadata, siteConfig } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/configurator");

export default function ConfiguratorPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Jouw keuzes op maat" title="Stel jouw persoonlijke" accent="pakketvoorstel samen." intro="Vier stappen bewaren je ervaring, planning, pakket en betaalvoorkeur. De deelbare link reproduceert alle relevante keuzes."><Breadcrumbs currentPath="/configurator" items={[{ label: "Pakketconfigurator" }]} /></PageHero>
      <section className="section section--configurator"><div className="site-shell"><Configurator /></div></section>
      <section className="section section--soft"><div className="site-shell"><SectionHeading eyebrow="Alle bronpakketten" title="Kies ook rechtstreeks uit vijf pakketten." text="De kaart linkt naar dezelfde configurator en dezelfde centrale prijsbron." /><PackageCards compact /></div></section>
      <section className="section"><div className="site-shell info-split"><div><SectionHeading eyebrow="Transparante grens" title="Een berekening is niet het hele verhaal." /><p>De configurator berekent uitsluitend gekozen, bevestigde prijscomponenten in integer eurocenten. Mogelijke inschrijf- en garantiefondskosten blijven apart zolang hun verplicht karakter niet bevestigd is.</p><ul className="checklist"><li><Check width="17" /> Volledige state in sessie en URL</li><li><Check width="17" /> Geen lesduur of doorlooptijd verzonnen</li><li><Check width="17" /> Geen dubbele bijkomende kosten</li></ul></div><aside className="notice-card"><Sparkles width="25" /><h3>Al ervaring of examen gedaan?</h3><p>Dan adviseert de flow eerst een persoonlijke niveau-inschatting. De pakketkeuze blijft wel volledig beschikbaar.</p></aside></div></section>
      <section className="section section--compact"><div className="site-shell assurance-panel"><Shield width="27" /><div><h2>Geen misleidende totaalprijs.</h2><p>Een volledig verplicht consumententotaal wordt pas getoond nadat inschrijfkosten, garantiefonds, btw en geldigheid zakelijk zijn bevestigd.</p></div></div></section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Van Dijk pakketconfigurator", applicationCategory: "EducationalApplication", operatingSystem: "Web", url: `${siteConfig.url}/configurator`, description: "Interactieve configurator voor een reproduceerbaar rijlespakketvoorstel zonder garantieclaims." }} />
    </main>
  );
}
