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
      <PageHero eyebrow="Gratis proefles" title="Kies direct een" accent="moment dat bij je past." intro="Maak 60 minuten kennis met de lesauto, je instructeur en onze persoonlijke aanpak. De proefles is gratis bij ieder startpakket."><Breadcrumbs currentPath="/proefles" items={[{ label: "Proefles" }]} /></PageHero>
      <figure className="intake-photo"><ResponsiveImage imageBase="intake-bij-lesauto" alt="Kennismaking naast de zwarte Van Dijk Rijschool-lesauto" priority sizes="100vw" /><figcaption className="site-shell"><span className="eyebrow">Persoonlijke kennismaking</span><strong>Ontdek welk lespakket en tempo bij jou passen.</strong></figcaption></figure>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="In drie stappen gepland" title="Snel een passende proefles vinden." /><IconCards items={[{ icon: Calendar, title: "Kies jouw dag", text: "Selecteer een voorkeursdag en één of meer dagdelen." },{ icon: Gauge, title: "Bekijk open momenten", text: "De agenda toont drie passende beschikbare tijden." },{ icon: Check, title: "Bevestig je keuze", text: "Kies het moment dat het beste in jouw planning past." },{ icon: Shield, title: "Persoonlijke opvolging", text: "Je ontvangt binnen één werkdag een definitieve bevestiging." }]} /></div></section>
      <section className="section section--soft"><div className="site-shell form-layout"><div className="booking-aside"><SectionHeading eyebrow="Zo werkt het" title="Al jouw voorkeuren bij elkaar." /><p>Heb je de pakketconfigurator gebruikt? Dan nemen we je pakket, ervaring, gewenste ritme en betaalvoorkeur automatisch mee.</p><div className="booking-flow-rail"><article><span>01</span><div><strong>Kies dag en dagdelen</strong><small>Meerdere dagdelen mogelijk</small></div></article><article><span>02</span><div><strong>Bekijk drie momenten</strong><small>Actuele beschikbaarheid</small></div></article><article><span>03</span><div><strong>Vul je gegevens in</strong><small>Reactie binnen één werkdag</small></div></article></div><ul className="checklist checklist--large"><li><Check width="18" /> Gratis proefles van 60 minuten</li><li><Check width="18" /> Persoonlijk pakketadvies</li><li><Check width="18" /> Ophalen bij huis, school of werk</li></ul><div className="location-note"><MapPin width="22" /><div><strong>17 werkgebieden</strong><span>Overdag, ’s avonds en op zaterdag beschikbaar.</span></div></div></div><LeadForm /></div></section>
    </main>
  );
}
