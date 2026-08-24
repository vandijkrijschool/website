import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Car,
  Check,
  Clock,
  Gauge,
  MapPin,
  RouteIcon,
  Shield,
  Smartphone,
  Sparkles,
} from "./components/Icons";
import { AssuranceStrip, PackageCards, SectionHeading, TrustRail } from "./components/Marketing";
import { JsonLd } from "./components/SiteChrome";
import { packages, siteConfig } from "./lib/site";

export default function Home() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <img className="home-hero__image" src="/images/hero-car.png" alt="Zwarte lesauto van Van Dijk Rijschool" width="1672" height="941" />
        <div className="home-hero__shade" />
        <div className="home-hero__route" aria-hidden="true" />
        <div className="site-shell home-hero__inner">
          <div className="home-hero__copy">
            <span className="eyebrow">Professioneel · Persoonlijk · Doelgericht</span>
            <h1>De snelste weg naar <em>jouw rijbewijs.</em></h1>
            <p>Persoonlijke autorijlessen, flexibel gepland en ondersteund door een duidelijk digitaal lesplan voor Den Haag en omgeving.</p>
            <div className="button-row">
              <Link className="button" href="/configurator">Stel mijn lespakket samen <ArrowRight width="18" /></Link>
              <Link className="button button--ghost" href="/proefles">Vraag een intake aan</Link>
            </div>
            <div className="hero-proof">
              <span><Check width="16" /> Persoonlijk startadvies</span>
              <span><Check width="16" /> Inzicht via NXTDRIVE</span>
              <span><MapPin width="16" /> Regio Den Haag</span>
            </div>
          </div>
        </div>
      </section>

      <TrustRail />

      <section className="section section--cockpit">
        <div className="site-shell">
          <div className="cockpit-shell">
            <div className="cockpit-shell__header">
              <div><span className="eyebrow">Lespakket cockpit</span><h2>Stel jouw ideale lespakket samen.</h2></div>
              <div className="cockpit-steps" aria-label="Configuratorstappen">
                <span className="is-active">1 <b>Ervaring</b></span>
                <span>2 <b>Tempo</b></span>
                <span>3 <b>Onderdelen</b></span>
                <span>4 <b>Advies</b></span>
              </div>
            </div>
            <div className="cockpit-preview">
              <div className="cockpit-question">
                <small>Stap 1 van 4</small>
                <h3>Hoeveel rijervaring heb je?</h3>
                <div className="choice is-active"><span>Nog niet gereden</span><Check width="17" /></div>
                <div className="choice"><span>Een beetje ervaring</span></div>
                <div className="choice"><span>Al wat kilometers</span></div>
              </div>
              <div className="cockpit-route-card">
                <span className="route-card__icon"><RouteIcon width="24" /></span>
                <small>Jouw voorlopige route</small>
                <h3>Meest gekozen</h3>
                <ul>
                  <li><Check width="16" /> 30 rijlessen</li>
                  <li><Check width="16" /> Praktijkexamen</li>
                  <li><Check width="16" /> Tussentijdse toets</li>
                </ul>
                <div><span>Totaalprijs</span><strong>€ 1.950</strong></div>
              </div>
              <div className="cockpit-stats">
                <article><Gauge width="21" /><div><small>Lestempo</small><strong>2× per week</strong></div></article>
                <article><Clock width="21" /><div><small>Indicatie</small><strong>10–15 weken</strong></div></article>
                <article><Smartphone width="21" /><div><small>Voortgang</small><strong>Via NXTDRIVE</strong></div></article>
              </div>
            </div>
            <div className="cockpit-shell__footer">
              <p><Sparkles width="18" /> Geen zorgen: dit is een voorlopig advies. Tijdens de intake kijken we samen wat echt past.</p>
              <Link className="button" href="/configurator">Start de configurator <ArrowRight width="17" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="pakketten">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Drie heldere routes"
            title="Een pakket dat past bij jouw startpunt."
            text="Vergelijk de drie vaste routes of gebruik de configurator voor een persoonlijk voorlopig advies. Definitieve inhoud en beschikbaarheid bevestigen we tijdens de intake."
          />
          <PackageCards />
          <AssuranceStrip />
          <p className="fineprint">*De herexamenregeling van Zeker Slagen geldt onder voorwaarden. Alle pakketprijzen in dit prototype moeten vóór publicatie worden bevestigd.</p>
        </div>
      </section>

      <section className="section section--soft">
        <div className="site-shell">
          <SectionHeading eyebrow="Zo werkt het" title="Van eerste contact naar zelfstandig rijden." align="center" />
          <div className="journey-grid">
            {[
              ["01", "Kennismaken", "We bespreken je ervaring, planning en doelen tijdens een intake of proefles.", Calendar],
              ["02", "Persoonlijk plan", "Je krijgt een heldere lesroute die kan worden aangepast als jouw ontwikkeling daarom vraagt.", RouteIcon],
              ["03", "Leren & groeien", "Elke les bouwt logisch voort op de vorige, met duidelijke aandachtspunten en leerdoelen.", Gauge],
              ["04", "Klaar voor examen", "We werken gericht toe naar zelfstandig, veilig en verantwoord rijden.", Shield],
            ].map(([number, title, text, StepIcon]) => {
              const IconComponent = StepIcon as typeof Calendar;
              return <article key={String(number)}><span>{String(number)}</span><IconComponent width="24" /><h3>{String(title)}</h3><p>{String(text)}</p></article>;
            })}
          </div>
          <div className="centered-action"><Link className="text-link" href="/werkwijze">Bekijk onze volledige werkwijze <ArrowRight width="17" /></Link></div>
        </div>
      </section>

      <section className="section">
        <div className="site-shell feature-split">
          <div>
            <SectionHeading
              eyebrow="Jouw rijopleiding in beeld"
              title="Altijd weten waar je staat."
              text="Via NXTDRIVE houd je overzicht over geplande lessen, persoonlijke leerdoelen en de ontwikkeling van jouw rijvaardigheid. Zo blijft de rijopleiding duidelijk voor leerling én instructeur."
            />
            <ul className="feature-list">
              <li><Calendar width="20" /><div><strong>Lesagenda</strong><span>Bekijk aankomende afspraken en lestijden.</span></div></li>
              <li><Gauge width="20" /><div><strong>Voortgang</strong><span>Inzicht in vaardigheden en actuele leerdoelen.</span></div></li>
              <li><Car width="20" /><div><strong>Lesvoorbereiding</strong><span>Weet vooraf waar je tijdens de volgende les aan werkt.</span></div></li>
            </ul>
            <Link className="button button--ghost" href="/werkwijze#nxtdrive">Ontdek de leerlingomgeving</Link>
          </div>
          <div className="progress-device" aria-label="Voorbeeld van NXTDRIVE voortgang">
            <div className="progress-device__top"><span>NXTDRIVE</span><small>Goed op weg</small></div>
            <div className="progress-device__score"><div><strong>68%</strong><span>RIS-voortgang</span></div></div>
            <div className="progress-device__cards">
              <article><small>Volgende les</small><strong>Dinsdag · 14:30</strong><span>90 minuten</span></article>
              <article><small>Volgend leerdoel</small><strong>Invoegen & uitvoegen</strong><span>Zelfstandig toepassen</span></article>
            </div>
            <div className="skill-bars"><span style={{ width: "82%" }} /><span style={{ width: "64%" }} /><span style={{ width: "48%" }} /></div>
          </div>
        </div>
      </section>

      <section className="section section--region">
        <div className="site-shell region-grid">
          <div>
            <SectionHeading
              eyebrow="Lokaal vertrouwd"
              title="Rijles in Den Haag en omgeving."
              text="Je leert omgaan met uiteenlopende verkeerssituaties: van rustige woonstraten tot trams, fietsers, drukke kruispunten en doorgaande stadsroutes. Altijd stap voor stap."
            />
            <div className="area-chips">
              {siteConfig.areas.map((area) => <span key={area}><MapPin width="15" /> {area}</span>)}
            </div>
            <div className="button-row">
              <Link className="button" href="/rijschool-den-haag">Rijschool Den Haag <ArrowRight width="17" /></Link>
              <Link className="button button--ghost" href="/contact">Controleer jouw postcode</Link>
            </div>
          </div>
          <div className="region-map" aria-hidden="true">
            <span className="region-map__road region-map__road--one" />
            <span className="region-map__road region-map__road--two" />
            <span className="region-map__road region-map__road--three" />
            <span className="region-map__pin"><MapPin width="30" /></span>
            <strong>DEN HAAG</strong><small>52.0705° N · 4.3007° E</small>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-shell faq-teaser">
          <SectionHeading eyebrow="Goed om te weten" title="Veelgestelde vragen over starten met rijles." />
          <div className="faq-list">
            {[
              ["Vanaf welke leeftijd mag ik beginnen?", "Je mag vanaf 16,5 jaar starten met autorijlessen. Voor het praktijkexamen gelden aanvullende leeftijds- en begeleidingsregels."],
              ["Hoeveel rijlessen heb ik nodig?", "Dat verschilt per leerling. Ervaring, leersnelheid, regelmaat en zelfvertrouwen spelen allemaal mee. Daarom geven we pas na een intake een definitief advies."],
              ["Kan ik lessen rond school of werk plannen?", "We bespreken samen welke lesmomenten haalbaar zijn. Beschikbaarheid verschilt per periode; een aanvraag is daarom nog geen definitieve boeking."],
              ["Kan ik overstappen van een andere rijschool?", "Ja. Een korte intake is dan de eerlijkste manier om je huidige niveau te bepalen en onnodige dubbele lessen te voorkomen."],
            ].map(([question, answer]) => (
              <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
            ))}
          </div>
          <Link className="text-link" href="/faq">Bekijk alle veelgestelde vragen <ArrowRight width="17" /></Link>
        </div>
      </section>

      <section className="partner-band">
        <div className="site-shell partner-band__inner">
          <div><small>Aangesloten als</small><strong>drive<span>•</span>you franchisenemer</strong></div>
          <i />
          <div><small>Digitale rijopleiding via</small><strong>NXTDRIVE</strong></div>
          <p>Van Dijk blijft jouw persoonlijke rijschool; technologie ondersteunt het contact, de planning en jouw voortgang.</p>
        </div>
      </section>

      <JsonLd
        data={packages.map((item) => ({
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${siteConfig.name} ${item.name}`,
          description: item.description,
          brand: { "@type": "Brand", name: siteConfig.name },
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: item.price,
            availability: "https://schema.org/InStock",
            url: `${siteConfig.url}/lespakketten#${item.id}`,
          },
        }))}
      />
    </main>
  );
}
