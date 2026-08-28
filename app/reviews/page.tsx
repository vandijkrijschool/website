import type { Metadata } from "next";
import { DemoNotice } from "../components/DemoContent";
import { Gauge, Shield, Star, Users } from "../components/Icons";
import { SplitCta } from "../components/PageSections";
import { SectionHeading } from "../components/Marketing";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { demoReviews } from "../lib/demo";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = pageMetadata(
  "Ervaringen met Van Dijk Rijschool",
  "Bekijk demonstratievoorbeelden van de toekomstige reviewpresentatie van Van Dijk Rijschool en ontdek welke onderdelen van begeleiding centraal staan.",
  "/reviews",
);

export default function ReviewsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Ervaringen in beeld"
        title="Zo krijgt vertrouwen"
        accent="een geloofwaardige plek."
        intro="Deze gevulde prototypepagina laat zien hoe echte leerlingervaringen straks premium en controleerbaar worden gepresenteerd. Alle onderstaande namen en teksten zijn herkenbaar gelabelde demo-inhoud."
      >
        <Breadcrumbs currentPath="/reviews" items={[{ label: "Ervaringen" }]} />
      </PageHero>

      <section className="section">
        <div className="site-shell">
          <DemoNotice
            title="Zes fictieve reviews voor een volledig gevuld prototype."
            text="Deze kaarten blijven voor de demo herkenbaar fictief. Ze worden bewust niet als Review- of AggregateRating-data aan zoekmachines aangeboden."
          />
          <div className="review-grid">
            {demoReviews.map((review) => (
              <article className="review-card" key={`${review.name}-${review.area}`}>
                <div className="review-card__top">
                  <span className="review-avatar" aria-hidden="true">{review.initials}</span>
                  <div><strong>{review.name}</strong><small>Fictief demoprofiel · {review.area}</small></div>
                  <span className="demo-pill">Demo-review</span>
                </div>
                <div className="review-stars" aria-label={`${review.rating} van 5 sterren`} role="img">
                  {Array.from({ length: review.rating }, (_, index) => <Star width="17" key={index} />)}
                </div>
                <blockquote>“{review.quote}”</blockquote>
                <footer><span>Voorbeeldtraject</span><strong>{review.route}</strong></footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Waar goede begeleiding zichtbaar wordt"
            title="Meer dan alleen een eindcijfer."
            text="De demopagina toont niet alleen een score, maar ook waarop de ervaring is gebaseerd. Zo voelt de presentatie compleet zonder een echte reviewbron te suggereren."
          />
          <div className="review-aspects">
            <article><Users width="25" /><h3>Persoonlijke aandacht</h3><p>Sluit de uitleg aan op de leerling en voelt die zich gehoord?</p></article>
            <article><Gauge width="25" /><h3>Duidelijke voortgang</h3><p>Is zichtbaar wat goed gaat, wat aandacht nodig heeft en waarom?</p></article>
            <article><Shield width="25" /><h3>Rust en veiligheid</h3><p>Is er ruimte om fouten te bespreken en opnieuw te oefenen?</p></article>
            <article><Star width="25" /><h3>Eerlijke voorbereiding</h3><p>Worden verwachtingen rond lessen, kosten en examen tijdig besproken?</p></article>
          </div>
        </div>
      </section>

      <SplitCta title="Zelf ervaren hoe Van Dijk lesgeeft?" text="Een kennismaking geeft je een beter beeld dan iedere losse review. Bespreek jouw verwachtingen tijdens een intake." />
    </main>
  );
}
