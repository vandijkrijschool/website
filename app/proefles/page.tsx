import type { Metadata } from "next";
import { Calendar, Check, Gauge, MapPin, Shield } from "../components/Icons";
import LeadForm from "../components/LeadForm";
import { IconCards } from "../components/PageSections";
import { SectionHeading } from "../components/Marketing";
import ResponsiveImage from "../components/ResponsiveImage";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { corePageMetadata } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/proefles");

export default function TrialLessonPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="NXTDRIVE-prototype" title="Leg jouw voorkeur voor een" accent="gratis proefles vast." intro="De bron noemt een 100% gratis proefles in ieder startpakket. Voorwaarden en duur zijn nog niet bevestigd; de planner hieronder boekt of verzendt niets."><Breadcrumbs currentPath="/proefles" items={[{ label: "Proefles" }]} /></PageHero>
      <figure className="intake-photo"><ResponsiveImage imageBase="intake-bij-lesauto" alt="Kennismaking naast de zwarte Van Dijk Rijschool-lesauto" priority sizes="100vw" /><figcaption className="site-shell"><span className="eyebrow">Sfeerimpressie</span><strong>Van voorkeur naar een veilig samengestelde demopayload.</strong></figcaption></figure>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Prototype met duidelijke grenzen" title="Alle vereiste plannerstates zijn aanwezig." /><IconCards items={[{ icon: Calendar, title: "Dag en dagdelen", text: "Kies één voorkeursdag en één of meer dagdelen." },{ icon: Gauge, title: "Drie demomomenten", text: "Loading, leeg resultaat, providerfout en timeout zijn ondersteund." },{ icon: Check, title: "Selecteren en bevestigen", text: "Selecteer exact één moment en bevestig het bewust voor het formulier." },{ icon: Shield, title: "Geen schijnboeking", text: "Een lokale successtatus betekent nooit dat NXTDRIVE iets heeft gereserveerd." }]} /></div></section>
      <section className="section section--soft"><div className="site-shell form-layout"><div className="booking-aside"><SectionHeading eyebrow="Volledige payload" title="Voorkeuren blijven bij elkaar." /><p>Een configuratorlink geeft pakket, ervaring, gewenst ritme, beschikbaarheid en betaalvoorkeur door. Het formulier voegt startmoment, voorkeursdag, dagdelen en het bevestigde demotijdslot toe.</p><div className="booking-flow-rail"><article><span>01</span><div><strong>Kies dag en dagdelen</strong><small>Meerdere dagdelen mogelijk</small></div></article><article><span>02</span><div><strong>Bekijk drie demomomenten</strong><small>Met loading- en foutstates</small></div></article><article><span>03</span><div><strong>Selecteer en bevestig</strong><small>Exact één voorkeur in de payload</small></div></article></div><ul className="checklist checklist--large"><li><Check width="18" /> Geen betaling in de demo</li><li><Check width="18" /> Geen persoonsgegevens opgeslagen</li><li><Check width="18" /> Geen afspraak zonder providerbevestiging</li></ul><div className="location-note"><MapPin width="22" /><div><strong>17 werkgebieden</strong><span>Beschikbaarheid en ophaallocatie zijn nog niet bevestigd.</span></div></div></div><LeadForm /></div></section>
    </main>
  );
}
