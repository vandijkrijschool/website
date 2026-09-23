import type { Metadata } from "next";
import { Calendar, Check, Gauge, MapPin, Shield } from "../components/Icons";
import LeadForm from "../components/LeadForm";
import { IconCards } from "../components/PageSections";
import { SectionHeading } from "../components/Marketing";
import ResponsiveImage from "../components/ResponsiveImage";
import { Breadcrumbs } from "../components/SiteChrome";
import { corePageMetadata } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/proefles");

export default function TrialLessonPage() {
  return (
    <main id="main-content">
      <section className="section section--soft trial-form-first"><div className="site-shell form-layout form-layout--form-first"><LeadForm /><div className="booking-aside"><Breadcrumbs currentPath="/proefles" items={[{ label: "Proefles" }]} /><SectionHeading eyebrow="Persoonlijke intake" title="Vertel ons wanneer je wilt starten." /><p>Geef je pakketvoorkeur, gewenste startmoment en beschikbaarheid door. Je aanvraag komt direct binnen op info@vandijkrijschool.nl.</p><ul className="checklist checklist--large"><li><Check width="18" /> Gratis proefles van 50 minuten</li><li><Check width="18" /> Persoonlijk pakketadvies</li><li><Check width="18" /> Ophalen bij huis, school of werk</li></ul><div className="location-note"><MapPin width="22" /><div><strong>17 werkgebieden</strong><span>Beschikbaarheid stemmen we persoonlijk met je af.</span></div></div></div></div></section>
      <figure className="intake-photo"><ResponsiveImage imageBase="intake-bij-lesauto" alt="Kennismaking naast de zwarte Van Dijk Rijschool-lesauto" priority sizes="100vw" /><figcaption className="site-shell"><span className="eyebrow">Persoonlijke kennismaking</span><strong>Ontdek welk lespakket en tempo bij jou passen.</strong></figcaption></figure>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="In drie stappen aangevraagd" title="Snel jouw voorkeuren doorgeven." /><IconCards items={[{ icon: Calendar, title: "Kies jouw voorkeur", text: "Geef een voorkeursdag en één of meer dagdelen door." },{ icon: Gauge, title: "Vertel over je ervaring", text: "We stemmen het gesprek en lesadvies af op jouw startniveau." },{ icon: Check, title: "Verstuur je aanvraag", text: "Je aanvraag wordt direct naar onze mailbox verzonden." },{ icon: Shield, title: "Persoonlijke afstemming", text: "We spreken samen een definitief moment voor de proefles af." }]} /></div></section>
    </main>
  );
}
