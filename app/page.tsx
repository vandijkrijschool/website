import Link from "next/link";
import { ArrowRight, Car, Check, MapPin, RouteIcon, Shield, Sparkles } from "./components/Icons";
import { AssuranceStrip, PackageCards, SectionHeading, TrustRail } from "./components/Marketing";
import ResponsiveImage from "./components/ResponsiveImage";
import { faqFacts, formatPrice, regions, singleRateById } from "./lib/content";

export default function Home() {
  const singleLesson = singleRateById.get("single-driving-lesson")!;
  return (
    <main id="main-content">
      <section className="home-hero">
        <ResponsiveImage imageBase="hero-den-haag-blue-hour" alt="Zwarte Van Dijk Rijschool-lesauto met de Haagse skyline tijdens het blauwe uur" className="home-hero__image" priority sizes="100vw" />
        <div className="home-hero__shade" /><div className="home-hero__route" aria-hidden="true" />
        <div className="site-shell home-hero__inner"><div className="home-hero__copy">
          <h1>Jouw rijopleiding, <em>helder van start.</em></h1>
          <p>Persoonlijke rijlessen, transparante bronprijzen en een veilig proeflesprototype voor Den Haag, Delft, Pijnacker en Westland.</p>
          <div className="button-row"><Link className="button" href="/proefles">Bekijk de proeflesflow <ArrowRight width="18" /></Link><Link className="button button--ghost" href="/tarieven">Bekijk alle tarieven</Link></div>
          <div className="hero-proof"><span><Check width="16" /> Losse rijles {formatPrice(singleLesson.amount)}</span><span><Check width="16" /> 5 actuele startpakketten</span><span><MapPin width="16" /> 17 werkgebieden</span></div>
        </div></div>
        <TrustRail />
      </section>

      <section className="home-about" aria-labelledby="home-about-title"><div className="site-shell home-about__grid">
        <div className="home-about__copy"><span className="eyebrow">Over Van Dijk Rijschool</span><h2 id="home-about-title">Leren rijden met een duidelijke opbouw.</h2><p>De rijopleiding draait om stapsgewijs leren kijken, beslissen en zelfstandig handelen. Een persoonlijk lesplan geeft richting zonder onbevestigde garanties over lesduur, wachttijd of slagingskans.</p><ul><li><Check width="17" /> Pakketinhoud exact volgens de aangeleverde bron</li><li><Check width="17" /> Mogelijke bijkomende kosten apart zichtbaar</li><li><Check width="17" /> Lokale pagina’s zonder fictieve vestigingen</li></ul><Link className="button button--ghost" href="/werkwijze">Bekijk de werkwijze <ArrowRight width="17" /></Link></div>
        <figure className="home-about__visual"><ResponsiveImage imageBase="rijles-interieur-den-haag" alt="Rijles vanuit de auto in stedelijk verkeer in Den Haag" sizes="(max-width: 820px) 100vw, 50vw" /><span className="home-about__location"><MapPin width="16" /> Sfeerimpressie</span></figure>
      </div></section>

      <section className="section section--cockpit"><div className="site-shell"><div className="cockpit-shell">
        <div className="cockpit-shell__header"><div><span className="eyebrow">Vierstapsconfigurator</span><h2>Bewaar en deel al jouw keuzes.</h2></div><div className="cockpit-steps" aria-label="Configuratorstappen"><span className="is-active">1 <b>Ervaring</b></span><span>2 <b>Planning</b></span><span>3 <b>Pakket</b></span><span>4 <b>Advies</b></span></div></div>
        <div className="cockpit-preview"><div className="cockpit-question"><small>Volledige state</small><h3>Niet alleen een pakket-ID.</h3><div className="choice is-active"><span>Ervaring en vertrouwen</span><Check width="17" /></div><div className="choice"><span>Start- en beschikbaarheidsvoorkeur</span></div><div className="choice"><span>Pakket en betaaltermijnen</span></div></div>
          <div className="cockpit-route-card"><span className="route-card__icon"><RouteIcon width="24" /></span><small>Transparante berekening</small><h3>Integer eurocenten</h3><ul><li><Check width="16" /> Alle vijf startpakketten</li><li><Check width="16" /> € 39 termijnkosten wanneer gekozen</li><li><Check width="16" /> Onbevestigde kosten niet opgeteld</li></ul><div><span>Deelbaar</span><strong>alle keuzes</strong></div></div>
          <div className="cockpit-stats"><article><Shield width="21" /><div><small>Prijslogica</small><strong>Geen afrondfouten</strong></div></article><article><RouteIcon width="21" /><div><small>Herstel</small><strong>Sessie + URL</strong></div></article><article><Car width="21" /><div><small>Vervolg</small><strong>Naar proefles</strong></div></article></div>
        </div>
        <div className="cockpit-shell__footer"><p><Sparkles width="18" /> De configurator geeft een voorstel, geen garantie voor het benodigde aantal lessen.</p><Link className="button" href="/configurator">Start de configurator <ArrowRight width="17" /></Link></div>
      </div></div></section>

      <section className="section" id="pakketten"><div className="site-shell"><SectionHeading eyebrow="Actuele bronpakketten" title="Vijf pakketten, één prijsbron." text="Dezelfde bedragen en onderdelen worden gebruikt op de homepage, pakketpagina, tarieven, FAQ en configurator." /><PackageCards /><AssuranceStrip /><p className="fineprint">Volgens de bron zijn de startpakketten exclusief € 39,50 inschrijfkosten. Of deze kosten en het DriveYOU-garantiefonds verplicht zijn, moet nog zakelijk worden bevestigd.</p></div></section>

      <section className="section section--region"><div className="site-shell region-grid"><div><SectionHeading eyebrow="Exact 17 werkgebieden" title="Eén rijschool, geen fictieve filialen." text="Van Dijk noemt zeventien plaatsen als werkgebied. Beschikbaarheid en ophaalpunten worden pas na persoonlijke bevestiging vastgelegd." /><div className="area-chips">{regions.map((region) => <Link href={region.canonicalPath} key={region.slug}><MapPin width="15" /> {region.displayName}</Link>)}</div><div className="button-row"><Link className="button" href="/werkgebied">Bekijk het volledige werkgebied <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/proefles">Proeflesprototype</Link></div></div><div className="region-map" aria-hidden="true"><span className="region-map__road region-map__road--one" /><span className="region-map__road region-map__road--two" /><span className="region-map__road region-map__road--three" /><span className="region-map__pin"><MapPin width="30" /></span><strong>17 PLAATSEN</strong><small>Den Haag · Delft · Pijnacker · Westland</small></div></div></section>

      <section className="section section--local-showcase" aria-labelledby="local-showcase-title"><div className="site-shell"><div className="local-showcase__intro"><div><span className="eyebrow">De regio in beeld</span><h2 id="local-showcase-title">De juiste Van Dijk-lesauto in iedere scène.</h2></div><p>De gegenereerde locatiebeelden zijn visueel gecontroleerd, maar blijven sfeerimpressies totdat voertuigdetails, bestickering en locaties zakelijk zijn goedgekeurd.</p></div><div className="local-gallery">
        <figure className="local-gallery__card local-gallery__card--featured"><ResponsiveImage imageBase="den-haag-hofvijver-binnenhof" alt="Zwarte Van Dijk Rijschool-lesauto bij de Hofvijver en het Binnenhof in Den Haag" sizes="(max-width: 960px) 100vw, 58vw" /><figcaption><small><MapPin width="14" /> Sfeerimpressie</small><strong>Den Haag</strong><span>Hofvijver en Binnenhof.</span></figcaption></figure>
        <figure className="local-gallery__card local-gallery__card--wide"><ResponsiveImage imageBase="scheveningen-kurhaus-boulevard" alt="Zwarte Van Dijk Rijschool-lesauto op de boulevard bij het Kurhaus in Scheveningen" sizes="(max-width: 960px) 100vw, 42vw" /><figcaption><small><MapPin width="14" /> Sfeerimpressie</small><strong>Scheveningen</strong><span>Boulevard en Kurhaus.</span></figcaption></figure>
        <figure className="local-gallery__card local-gallery__card--peace"><ResponsiveImage imageBase="delft-oostpoort-lesauto" alt="Zwarte Van Dijk Rijschool-lesauto bij de Oostpoort in Delft" sizes="(max-width: 560px) 100vw, 50vw" /><figcaption><small><MapPin width="14" /> Sfeerimpressie</small><strong>Delft</strong><span>Oostpoort aan het water.</span></figcaption></figure>
        <figure className="local-gallery__card local-gallery__card--digital"><ResponsiveImage imageBase="naaldwijk-lesauto" alt="Zwarte Van Dijk Rijschool-lesauto in een straatbeeld bij Naaldwijk" sizes="(max-width: 560px) 100vw, 50vw" /><figcaption><small><MapPin width="14" /> Sfeerimpressie</small><strong>Naaldwijk</strong><span>Westlandse omgeving.</span></figcaption></figure>
      </div><p className="local-showcase__note"><Sparkles width="15" /> Sfeerimpressies — geen bewijs van echte lessen op deze locaties.</p></div></section>

      <section className="section"><div className="site-shell faq-teaser"><SectionHeading eyebrow="Bronvragen" title="Praktische informatie met verificatiestatus." /><div className="faq-list">{faqFacts.map((fact) => <details key={fact.id}><summary>{fact.question}<span>+</span></summary><p>{fact.answer}</p><small className="verification-flag">{fact.status === "sourceProvidedAndExternallyConfirmed" ? "Bronbevestigd" : "Actualiteit vóór live indexering bevestigen"}</small></details>)}</div><Link className="text-link" href="/faq">Bekijk alle broninformatie <ArrowRight width="17" /></Link></div></section>

      <section className="home-closing-cta" aria-labelledby="home-closing-cta-title"><div className="site-shell home-closing-cta__inner"><div><span className="eyebrow">Klaar voor de eerste stap?</span><h2 id="home-closing-cta-title">Kies eerst wat je wilt vergelijken.</h2></div><div className="button-row"><Link className="button" href="/tarieven">Alle tarieven <ArrowRight width="18" /></Link><Link className="button button--ghost" href="/configurator">Stel je pakket samen</Link></div></div></section>

      <section className="partner-band"><div className="site-shell partner-band__inner"><div><small>Aangeleverde relatie</small><strong>DriveYOU</strong></div><i /><div><small>Veilige demo</small><strong>NXTDRIVE-prototype</strong></div><p>De precieze juridische DriveYOU-relatie en echte NXTDRIVE-koppeling blijven releasegates. De website claimt geen boeking of gegevensoverdracht.</p></div></section>
    </main>
  );
}
