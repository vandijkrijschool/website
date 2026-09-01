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
          <p>Persoonlijke rijlessen, duidelijke tarieven en direct een gratis proefles plannen in Den Haag, Delft, Pijnacker en Westland.</p>
          <div className="button-row"><Link className="button" href="/proefles">Plan gratis proefles <ArrowRight width="18" /></Link><Link className="button button--ghost" href="/tarieven">Bekijk alle tarieven</Link></div>
          <div className="hero-proof"><span><Check width="16" /> Losse rijles {formatPrice(singleLesson.amount)}</span><span><Check width="16" /> 5 actuele startpakketten</span><span><MapPin width="16" /> 17 werkgebieden</span></div>
        </div></div>
        <TrustRail />
      </section>

      <section className="home-about" aria-labelledby="home-about-title"><div className="site-shell home-about__grid">
        <div className="home-about__copy"><span className="eyebrow">Over Van Dijk Rijschool</span><h2 id="home-about-title">Leren rijden met een duidelijke opbouw.</h2><p>Je werkt stap voor stap aan kijken, beslissen en zelfstandig handelen. Iedere rijles duurt 60 minuten en sluit aan op jouw niveau en voortgang.</p><ul><li><Check width="17" /> Starten binnen 7 dagen</li><li><Check width="17" /> Ophalen bij huis, school of werk</li><li><Check width="17" /> Lessen overdag, ’s avonds en op zaterdag</li></ul><Link className="button button--ghost" href="/werkwijze">Bekijk de werkwijze <ArrowRight width="17" /></Link></div>
        <figure className="home-about__visual"><ResponsiveImage imageBase="rijles-interieur-den-haag" alt="Rijles vanuit de auto in stedelijk verkeer in Den Haag" sizes="(max-width: 820px) 100vw, 50vw" /><span className="home-about__location"><MapPin width="16" /> Den Haag</span></figure>
      </div></section>

      <section className="section section--cockpit"><div className="site-shell"><div className="cockpit-shell">
        <div className="cockpit-shell__header"><div><span className="eyebrow">Vierstapsconfigurator</span><h2>Bewaar en deel al jouw keuzes.</h2></div><div className="cockpit-steps" aria-label="Configuratorstappen"><span className="is-active">1 <b>Ervaring</b></span><span>2 <b>Planning</b></span><span>3 <b>Pakket</b></span><span>4 <b>Advies</b></span></div></div>
        <div className="cockpit-preview"><div className="cockpit-question"><small>Jouw voorkeuren</small><h3>Alles in één overzicht.</h3><div className="choice is-active"><span>Ervaring en vertrouwen</span><Check width="17" /></div><div className="choice"><span>Startmoment en beschikbaarheid</span></div><div className="choice"><span>Pakket en betaaltermijnen</span></div></div>
          <div className="cockpit-route-card"><span className="route-card__icon"><RouteIcon width="24" /></span><small>Duidelijke berekening</small><h3>Compleet totaal</h3><ul><li><Check width="16" /> Alle vijf startpakketten</li><li><Check width="16" /> Termijnkosten wanneer gekozen</li><li><Check width="16" /> Vaste kosten direct meegerekend</li></ul><div><span>Deelbaar</span><strong>alle keuzes</strong></div></div>
          <div className="cockpit-stats"><article><Shield width="21" /><div><small>Prijs</small><strong>Helder vooraf</strong></div></article><article><RouteIcon width="21" /><div><small>Bewaren</small><strong>Sessie + link</strong></div></article><article><Car width="21" /><div><small>Vervolg</small><strong>Naar proefles</strong></div></article></div>
        </div>
        <div className="cockpit-shell__footer"><p><Sparkles width="18" /> De configurator geeft een voorstel, geen garantie voor het benodigde aantal lessen.</p><Link className="button" href="/configurator">Start de configurator <ArrowRight width="17" /></Link></div>
      </div></div></section>

      <section className="section" id="pakketten"><div className="site-shell"><SectionHeading eyebrow="Rijlespakketten" title="Vijf pakketten, helder vergeleken." text="Kies het aantal lessen dat bij je past. Proefles, praktijkexamen en digitale rijlesmap zijn in ieder startpakket inbegrepen." /><PackageCards /><AssuranceStrip /><p className="fineprint">Pakketprijzen zijn inclusief btw en exclusief eenmalig € 39,50 inschrijfkosten en € 41,50 voor het DriveYOU-garantiefonds.</p></div></section>

      <section className="section section--region"><div className="site-shell region-grid"><div><SectionHeading eyebrow="Rijles dichtbij" title="Actief in 17 plaatsen." text="We halen je op bij huis, school, werk of een afgesproken station binnen ons volledige werkgebied." /><div className="area-chips">{regions.map((region) => <Link href={region.canonicalPath} key={region.slug}><MapPin width="15" /> {region.displayName}</Link>)}</div><div className="button-row"><Link className="button" href="/werkgebied">Bekijk het volledige werkgebied <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/proefles">Plan een proefles</Link></div></div><div className="region-map" aria-hidden="true"><span className="region-map__road region-map__road--one" /><span className="region-map__road region-map__road--two" /><span className="region-map__road region-map__road--three" /><span className="region-map__pin"><MapPin width="30" /></span><strong>17 PLAATSEN</strong><small>Den Haag · Delft · Pijnacker · Westland</small></div></div></section>

      <section className="section section--local-showcase" aria-labelledby="local-showcase-title"><div className="site-shell"><div className="local-showcase__intro"><div><span className="eyebrow">Onderweg in jouw regio</span><h2 id="local-showcase-title">Van rustige woonstraat tot druk stadsverkeer.</h2></div><p>Je oefent in gevarieerde verkeerssituaties rond Den Haag, Delft, Pijnacker en Westland, passend bij jouw niveau.</p></div><div className="local-gallery">
        <figure className="local-gallery__card local-gallery__card--featured"><ResponsiveImage imageBase="den-haag-hofvijver-binnenhof" alt="Zwarte Van Dijk Rijschool-lesauto bij de Hofvijver en het Binnenhof in Den Haag" sizes="(max-width: 960px) 100vw, 58vw" /><figcaption><small><MapPin width="14" /> Rijlesgebied</small><strong>Den Haag</strong><span>Hofvijver en Binnenhof.</span></figcaption></figure>
        <figure className="local-gallery__card local-gallery__card--wide"><ResponsiveImage imageBase="scheveningen-kurhaus-boulevard" alt="Zwarte Van Dijk Rijschool-lesauto op de boulevard bij het Kurhaus in Scheveningen" sizes="(max-width: 960px) 100vw, 42vw" /><figcaption><small><MapPin width="14" /> Rijlesgebied</small><strong>Scheveningen</strong><span>Boulevard en Kurhaus.</span></figcaption></figure>
        <figure className="local-gallery__card local-gallery__card--peace"><ResponsiveImage imageBase="delft-oostpoort-lesauto" alt="Zwarte Van Dijk Rijschool-lesauto bij de Oostpoort in Delft" sizes="(max-width: 560px) 100vw, 50vw" /><figcaption><small><MapPin width="14" /> Rijlesgebied</small><strong>Delft</strong><span>Oostpoort aan het water.</span></figcaption></figure>
        <figure className="local-gallery__card local-gallery__card--digital"><ResponsiveImage imageBase="naaldwijk-lesauto" alt="Zwarte Van Dijk Rijschool-lesauto in een straatbeeld bij Naaldwijk" sizes="(max-width: 560px) 100vw, 50vw" /><figcaption><small><MapPin width="14" /> Rijlesgebied</small><strong>Naaldwijk</strong><span>Westlandse omgeving.</span></figcaption></figure>
      </div><p className="local-showcase__note"><Sparkles width="15" /> Afwisselende routes voor iedere fase van je rijopleiding.</p></div></section>

      <section className="section"><div className="site-shell faq-teaser"><SectionHeading eyebrow="Veelgestelde vragen" title="Praktische informatie voor een goede start." /><div className="faq-list">{faqFacts.map((fact) => <details key={fact.id}><summary>{fact.question}<span>+</span></summary><p>{fact.answer}</p></details>)}</div><Link className="text-link" href="/faq">Bekijk alle antwoorden <ArrowRight width="17" /></Link></div></section>

      <section className="home-closing-cta" aria-labelledby="home-closing-cta-title"><div className="site-shell home-closing-cta__inner"><div><span className="eyebrow">Klaar voor de eerste stap?</span><h2 id="home-closing-cta-title">Kies eerst wat je wilt vergelijken.</h2></div><div className="button-row"><Link className="button" href="/tarieven">Alle tarieven <ArrowRight width="18" /></Link><Link className="button button--ghost" href="/configurator">Stel je pakket samen</Link></div></div></section>

      <section className="partner-band"><div className="site-shell partner-band__inner"><div><small>Aangesloten bij</small><strong>DriveYOU</strong></div><i /><div><small>Digitale rijlesmap</small><strong>NXTDRIVE</strong></div><p>Plan je lessen online, volg je voortgang en bekijk na iedere rijles je persoonlijke leerdoelen.</p></div></section>
    </main>
  );
}
