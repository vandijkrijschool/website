import type { Metadata } from "next";
import { Calendar, Car, Check, Gauge, MapPin } from "../components/Icons";
import LeadForm from "../components/LeadForm";
import { IconCards } from "../components/PageSections";
import { SectionHeading } from "../components/Marketing";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = pageMetadata(
  "Proefles autorijden in Den Haag",
  "Maak kennis met Van Dijk Rijschool en ontdek welk startpunt bij jou past. Vraag een proefles of persoonlijke intake aan in regio Den Haag.",
  "/proefles",
);

export default function TrialLessonPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Kennismaken zonder druk" title="Vraag jouw persoonlijke" accent="intake of proefles aan." intro="Bespreek je ervaring, planning en doelen. Zo bepalen we samen een realistisch startpunt voordat je een definitieve pakketkeuze maakt."><Breadcrumbs items={[{ label: "Proefles / intake" }]} /></PageHero>
      <figure className="intake-photo"><img src="/images/intake-instructor.webp" alt="Kennismaking met de rijinstructeur voor de eerste rijles" width="1672" height="941" loading="eager" decoding="async" /><figcaption className="site-shell"><span className="eyebrow">Jouw eerste moment</span><strong>Laagdrempelig kennismaken vóór je een pakket kiest.</strong></figcaption></figure>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Wat kun je verwachten?" title="Een eerste kennismaking met een duidelijk doel." /><IconCards items={[{ icon: Car, title: "Kennismaken", text: "Je maakt kennis met de instructeur, de auto en de manier van begeleiden." },{ icon: Gauge, title: "Startniveau", text: "We kijken naar ervaring, zelfvertrouwen en wat je al zelfstandig kunt uitvoeren." },{ icon: Calendar, title: "Direct een moment kiezen", text: "Selecteer je voorkeursdag en dagdelen en kies daarna uit drie openstaande NXTDRIVE-momenten." },{ icon: Check, title: "Persoonlijk advies", text: "Na de kennismaking krijg je een eerlijk voorstel voor de beste vervolgstap." }]} /></div></section>
      <section className="section section--soft"><div className="site-shell form-layout"><div className="booking-aside"><SectionHeading eyebrow="Van voorkeur naar afspraak" title="Plan zonder heen-en-weer berichten." /><p>De nieuwe NXTDRIVE-widget maakt het plannen overzichtelijk. Jij geeft aan wanneer je kunt en kiest daarna zelf een passend openstaand moment.</p><div className="booking-flow-rail"><article><span>01</span><div><strong>Kies je voorkeursdag</strong><small>Maandag tot en met zaterdag</small></div></article><article><span>02</span><div><strong>Selecteer dagdelen</strong><small>Ochtend, middag en/of avond</small></div></article><article><span>03</span><div><strong>Vergelijk drie momenten</strong><small>Kies direct het moment dat bij je past</small></div></article></div><ul className="checklist checklist--large"><li><Check width="18" /> Geen betaling nodig bij de aanvraag</li><li><Check width="18" /> Jouw voorkeuren blijven zichtbaar</li><li><Check width="18" /> Persoonlijke bevestiging vanuit Van Dijk</li></ul><div className="location-note"><MapPin width="22" /><div><strong>Regio Den Haag</strong><span>Den Haag, Scheveningen, Rijswijk, Voorburg en Leidschendam—onder voorbehoud van actuele beschikbaarheid.</span></div></div></div><LeadForm /></div></section>
    </main>
  );
}
