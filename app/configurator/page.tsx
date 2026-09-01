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
      <section className="section section--soft"><div className="site-shell"><SectionHeading eyebrow="Alle pakketten" title="Kies ook rechtstreeks uit vijf pakketten." text="Vergelijk lesaantallen, inbegrepen onderdelen en pakketprijzen." /><PackageCards compact /></div></section>
      <section className="section"><div className="site-shell info-split"><div><SectionHeading eyebrow="Compleet overzicht" title="Van pakketprijs tot eindtotaal." /><p>De configurator telt pakketprijs, inschrijfkosten, garantiefonds en eventuele termijnkosten direct voor je op.</p><ul className="checklist"><li><Check width="17" /> Alle voorkeuren in één deelbare link</li><li><Check width="17" /> Rijlessen van 60 minuten</li><li><Check width="17" /> Geen dubbele bijkomende kosten</li></ul></div><aside className="notice-card"><Sparkles width="25" /><h3>Al ervaring of examen gedaan?</h3><p>Dan adviseert de flow eerst een persoonlijke niveau-inschatting. De pakketkeuze blijft wel volledig beschikbaar.</p></aside></div></section>
      <section className="section section--compact"><div className="site-shell assurance-panel"><Shield width="27" /><div><h2>Jouw complete prijs vooraf.</h2><p>Alle bedragen zijn inclusief btw. Het totaal bevat de vaste inschrijfkosten en bijdrage aan het DriveYOU-garantiefonds.</p></div></div></section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Van Dijk pakketconfigurator", applicationCategory: "EducationalApplication", operatingSystem: "Web", url: `${siteConfig.url}/configurator`, description: "Interactieve configurator voor een persoonlijk en compleet rijlespakketvoorstel." }} />
    </main>
  );
}
