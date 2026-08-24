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
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Wat kun je verwachten?" title="Een eerste kennismaking met een duidelijk doel." /><IconCards items={[{ icon: Car, title: "Kennismaken", text: "Je maakt kennis met de instructeur, de auto en de manier van begeleiden." },{ icon: Gauge, title: "Startniveau", text: "We kijken naar ervaring, zelfvertrouwen en wat je al zelfstandig kunt uitvoeren." },{ icon: Calendar, title: "Planning", text: "We bespreken haalbare lesmomenten en welk ritme bij jouw week past." },{ icon: Check, title: "Persoonlijk advies", text: "Na de kennismaking krijg je een eerlijk voorstel voor de beste vervolgstap." }]} /></div></section>
      <section className="section section--soft"><div className="site-shell form-layout"><div><SectionHeading eyebrow="Voor je instapt" title="Dit nemen we samen door." /><ul className="checklist checklist--large"><li><Check width="18" /> Heb je al eerder rijlessen gevolgd?</li><li><Check width="18" /> Wanneer wil je ongeveer beginnen?</li><li><Check width="18" /> Welke momenten passen meestal in je agenda?</li><li><Check width="18" /> Zijn er situaties waar je tegenop ziet?</li><li><Check width="18" /> Vanuit welke postcode wil je meestal starten?</li></ul><div className="location-note"><MapPin width="22" /><div><strong>Regio Den Haag</strong><span>Den Haag, Scheveningen, Rijswijk, Voorburg en Leidschendam—onder voorbehoud van actuele beschikbaarheid.</span></div></div></div><LeadForm /></div></section>
    </main>
  );
}
