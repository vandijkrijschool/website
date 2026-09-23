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
      <PageHero eyebrow="Gratis proefles" title="Plan jouw persoonlijke" accent="intake en proefles." intro="Maak 50 minuten kennis met de lesauto, je instructeur en onze persoonlijke aanpak. De proefles is gratis bij ieder startpakket."><Breadcrumbs currentPath="/proefles" items={[{ label: "Proefles" }]} /></PageHero>
      <figure className="intake-photo"><ResponsiveImage imageBase="intake-bij-lesauto" alt="Kennismaking naast de zwarte Van Dijk Rijschool-lesauto" priority sizes="100vw" /><figcaption className="site-shell"><span className="eyebrow">Persoonlijke kennismaking</span><strong>Ontdek welk lespakket en tempo bij jou passen.</strong></figcaption></figure>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="In drie stappen aangevraagd" title="Snel jouw voorkeuren doorgeven." /><IconCards items={[{ icon: Calendar, title: "Kies jouw voorkeur", text: "Geef een voorkeursdag en één of meer dagdelen door." },{ icon: Gauge, title: "Vertel over je ervaring", text: "We stemmen het gesprek en lesadvies af op jouw startniveau." },{ icon: Check, title: "Verstuur je aanvraag", text: "Het formulier zet je bericht klaar in WhatsApp of e-mail." },{ icon: Shield, title: "Persoonlijke afstemming", text: "We spreken samen een definitief moment voor de proefles af." }]} /></div></section>
      <section className="section section--soft"><div className="site-shell form-layout"><div className="booking-aside"><SectionHeading eyebrow="Zo werkt het" title="Al jouw voorkeuren bij elkaar." /><p>Kies je pakketvoorkeur, gewenste startmoment en beschikbaarheid. Zo kunnen we je gericht adviseren.</p><div className="booking-flow-rail"><article><span>01</span><div><strong>Kies dag en dagdelen</strong><small>Meerdere dagdelen mogelijk</small></div></article><article><span>02</span><div><strong>Vul je gegevens in</strong><small>Inclusief rijervaring en voorkeuren</small></div></article><article><span>03</span><div><strong>Verstuur je aanvraag</strong><small>Via WhatsApp of e-mail</small></div></article></div><ul className="checklist checklist--large"><li><Check width="18" /> Gratis proefles van 50 minuten</li><li><Check width="18" /> Persoonlijk pakketadvies</li><li><Check width="18" /> Ophalen bij huis, school of werk</li></ul><div className="location-note"><MapPin width="22" /><div><strong>17 werkgebieden</strong><span>Beschikbaarheid stemmen we persoonlijk met je af.</span></div></div></div><LeadForm /></div></section>
    </main>
  );
}
