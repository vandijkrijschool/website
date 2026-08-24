import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Car, Check, MapPin, Shield, Smartphone, Users } from "../components/Icons";
import { IconCards, SplitCta } from "../components/PageSections";
import { SectionHeading } from "../components/Marketing";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = pageMetadata(
  "Over Van Dijk Rijschool",
  "Maak kennis met Van Dijk Rijschool, de persoonlijke lesaanpak en de digitale ondersteuning via DriveYou en NXTDRIVE in regio Den Haag.",
  "/over-ons",
);

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Van Dijk Rijschool" title="Persoonlijke rijles," accent="professioneel georganiseerd." intro="Achter iedere leerling zit een ander verhaal. Daarom combineren we persoonlijke begeleiding met een duidelijke structuur, moderne ondersteuning en korte lijnen."><Breadcrumbs items={[{ label: "Over ons" }]} /></PageHero>
      <section className="section"><div className="site-shell story-grid"><div><SectionHeading eyebrow="Onze visie" title="Niet alleen slagen. Leren zelfstandig rijden." /><p>Het praktijkexamen is een belangrijke mijlpaal, maar niet het enige doel. Je moet na je rijopleiding zelfstandig, veilig en met vertrouwen beslissingen kunnen nemen in het dagelijks verkeer.</p><p>Van Dijk Rijschool richt de lessen daarom in rond inzicht, verantwoordelijkheid en een opbouw die past bij jouw ontwikkeling.</p><ul className="checklist"><li><Check width="17" /> Heldere communicatie</li><li><Check width="17" /> Persoonlijke aandacht</li><li><Check width="17" /> Realistische verwachtingen</li></ul></div><figure className="story-visual"><img src="/images/intake-instructor.webp" alt="Instructeur maakt kennis met een leerling naast de lesauto" width="1672" height="941" loading="eager" decoding="async" /><span>Persoonlijk vanaf de eerste kennismaking</span></figure></div></section>
      <section className="section section--soft"><div className="site-shell"><SectionHeading eyebrow="Wat je mag verwachten" title="Een moderne rijschool met een menselijk gezicht." /><IconCards items={[{ icon: Users, title: "Persoonlijke instructie", text: "Begeleiding die rekening houdt met jouw ervaring, tempo en manier van leren." },{ icon: Shield, title: "Veilig leren kiezen", text: "Niet alleen uitvoeren wat wordt gezegd, maar situaties leren begrijpen en oplossen." },{ icon: Smartphone, title: "Digitaal ondersteund", text: "Planning, leerdoelen en voortgang zijn overzichtelijk beschikbaar via NXTDRIVE." },{ icon: MapPin, title: "Lokaal in de regio", text: "Rijlessen in Den Haag en omliggende plaatsen, afhankelijk van beschikbaarheid." }]} /></div></section>
      <section className="section"><div className="site-shell partnerships"><div><small>Franchiseverband</small><strong>drive<span>•</span>you</strong><p>Van Dijk Rijschool is aangesloten bij DriveYou. De exacte franchisepropositie en kwaliteitsafspraken worden vóór livegang met de officiële gegevens aangevuld.</p></div><i /><div><small>Rijschoolplatform</small><strong>NXTDRIVE</strong><p>NXTDRIVE ondersteunt de intake, planning en voortgang. De persoonlijke begeleiding blijft altijd bij Van Dijk en de instructeur.</p></div></div></section>
      <section className="section section--compact"><div className="site-shell assurance-panel"><Car width="28" /><div><h2>Instructeurprofiel volgt met geverifieerde gegevens.</h2><p>Voor publicatie worden naam, foto, WRM-bevoegdheid, ervaring, lesgebied en lesauto toegevoegd. Het prototype verzint hierover bewust geen claims.</p></div><Link className="button button--ghost" href="/contact">Stel een vraag <ArrowRight width="17" /></Link></div></section>
      <SplitCta title="Kennismaken met onze aanpak?" text="Vraag een persoonlijke intake aan en ontdek of Van Dijk bij jouw manier van leren past." />
    </main>
  );
}
