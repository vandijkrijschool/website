import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Gauge, Shield, Star, Users } from "../components/Icons";
import { SplitCta } from "../components/PageSections";
import { SectionHeading } from "../components/Marketing";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = pageMetadata(
  "Ervaringen met Van Dijk Rijschool",
  "Ontdek waarop leerlingen een rijschool en instructeur beoordelen: persoonlijke begeleiding, planning, voortgang en examenvoorbereiding.",
  "/reviews",
);

export default function ReviewsPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Echte ervaringen tellen" title="Wat leerlingen mogen" accent="verwachten van begeleiding." intro="Voor dit prototype plaatsen we bewust geen verzonnen namen, cijfers of reviews. Bij livegang worden uitsluitend geverifieerde ervaringen vanuit de officiële bron getoond."><Breadcrumbs items={[{ label: "Ervaringen" }]} /></PageHero>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Waar goede begeleiding zichtbaar wordt" title="Meer dan alleen een eindcijfer." text="Een beoordeling zegt het meest wanneer duidelijk is waarop die gebaseerd is. Daarom krijgt iedere echte review straks een bron en, waar toegestaan, een datum." /><div className="review-aspects"><article><Users width="25" /><h3>Persoonlijke aandacht</h3><p>Voelt de leerling zich gehoord en sluit de uitleg aan op zijn of haar manier van leren?</p></article><article><Gauge width="25" /><h3>Duidelijke voortgang</h3><p>Is inzichtelijk wat goed gaat, wat aandacht nodig heeft en waarom een vervolgstap wordt gekozen?</p></article><article><Shield width="25" /><h3>Rust en veiligheid</h3><p>Is er ruimte om fouten te bespreken en situaties opnieuw op te bouwen zonder onnodige druk?</p></article><article><Star width="25" /><h3>Eerlijke voorbereiding</h3><p>Worden verwachtingen rond lessen, kosten en examenmomenten tijdig en duidelijk besproken?</p></article></div></div></section>
      <section className="section section--soft"><div className="site-shell review-placeholder"><div className="review-placeholder__stars"><Star width="22" /><Star width="22" /><Star width="22" /><Star width="22" /><Star width="22" /></div><small>Geverifieerde reviewkoppeling</small><h2>Reviews worden bij livegang uit de officiële bron geladen.</h2><p>Zo voorkomen we fictieve testimonials, verouderde beoordelingen en een beoordelingsscore die niet controleerbaar is. Ook structured data wordt pas geactiveerd als dezelfde echte reviews zichtbaar op de pagina staan.</p><ul className="checklist"><li><Check width="17" /> Bron zichtbaar</li><li><Check width="17" /> Geen handmatig opgehoogde score</li><li><Check width="17" /> Alleen publiceerbare reviewtekst</li></ul><Link className="button button--ghost" href="/contact">Vraag naar actuele ervaringen <ArrowRight width="17" /></Link></div></section>
      <SplitCta title="Zelf ervaren hoe Van Dijk lesgeeft?" text="Een kennismaking geeft je een beter beeld dan iedere losse review. Bespreek jouw verwachtingen tijdens een intake." />
    </main>
  );
}

