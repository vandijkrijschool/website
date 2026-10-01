import type { Metadata } from "next";
import Link from "next/link";
import DriveYouLogo from "../components/DriveYouLogo";
import { ArrowRight, Check, Shield } from "../components/Icons";
import { Breadcrumbs, JsonLd } from "../components/SiteChrome";
import { corePageMetadata, siteConfig } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/over-ons");

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="about-hero">
        <div className="about-hero__glow" aria-hidden="true" />
        <div className="site-shell about-hero__grid">
          <figure className="about-portrait">
            <div className="about-portrait__frame">
              <img alt="Eric van Dijk, rijinstructeur en eigenaar van Van Dijk Rijschool" fetchPriority="high" height="960" src="/images/eric-van-dijk.jpg" width="960" />
            </div>
            <figcaption><span>Eric van Dijk</span><small>Rijinstructeur &amp; zelfstandig ondernemer</small></figcaption>
          </figure>
          <div className="about-hero__copy">
            <Breadcrumbs currentPath="/over-ons" items={[{ label: "Over mij" }]} />
            <span className="eyebrow">Even voorstellen</span>
            <h1>Rustig, geduldig <em>en duidelijk.</em></h1>
            <p className="about-hero__lead">Mijn naam is Eric van Dijk. Als zelfstandig ondernemer ben ik franchisenemer bij DriveYOU en run ik mijn eigen rijschool: Van Dijk Rijschool.</p>
            <p>Na ruim 10 jaar als vrachtwagenchauffeur te hebben gewerkt, vond ik het tijd voor een nieuwe stap in mijn carrière. De ervaring die ik als beroepschauffeur heb opgedaan, neem ik mee in mijn lessen. Veiligheid, verkeersinzicht en vooruitkijken zijn voor mij dan ook belangrijke onderdelen van het leren autorijden.</p>
            <ul className="about-signature"><li><Check width="17" /> Persoonlijke aandacht</li><li><Check width="17" /> Een duidelijke uitleg</li><li><Check width="17" /> Veilig en zelfstandig leren rijden</li></ul>
          </div>
        </div>
      </section>

      <section className="section about-story"><div className="site-shell about-story__grid">
        <div className="about-story__heading"><span className="eyebrow">Mijn aanpak</span><h2>Op je gemak achter het stuur.</h2></div>
        <div className="about-story__copy"><p>Als instructeur ben ik rustig, geduldig en duidelijk. Ik vind het belangrijk dat je je tijdens de rijlessen op je gemak voelt en dat er ruimte is om vragen te stellen en fouten te maken. Met een beetje humor op z’n tijd maken we het natuurlijk ook gezellig.</p><p>Tegelijkertijd ben ik serieus wanneer dat nodig is en werk ik gericht toe naar één doel: jou zelfstandig en met vertrouwen de weg op helpen.</p><p>Iedere leerling is anders. Daarom vind ik persoonlijke aandacht belangrijk en pas ik mijn uitleg en begeleiding aan op wat jij nodig hebt. Mijn doel is niet alleen dat je slaagt voor je rijbewijs, maar vooral dat je daarna met een veilig en goed gevoel zelfstandig de weg op kunt.</p></div>
      </div></section>

      <section className="section section--soft"><div className="site-shell about-offroad">
        <div><span className="eyebrow">Buiten de rijlessen</span><h2>Auto’s blijven de rode draad.</h2></div>
        <div className="about-offroad__card"><p>Ook buiten het autorijden ben ik graag met auto’s bezig. Ik kijk regelmatig naar autoprogramma’s en vind het leuk om alles rondom auto’s en autorijden te volgen. Daarnaast speel ik graag op mijn PS5 en ga ik in mijn vrije tijd graag op pad.</p><p>Qua muziek luister ik eigenlijk naar van alles. Blues en country staan regelmatig op, maar een goed Nederlandstalig nummer kan ik ook zeker waarderen. Het hangt vooral af van mijn stemming. Eén ding is wel duidelijk: hardcore zul je bij mij niet snel horen. <span aria-label="knipoog" role="img">😉</span></p></div>
      </div></section>

      <section className="section about-partner"><div className="site-shell info-split">
        <div><DriveYouLogo inverse /><span className="eyebrow">Zelfstandig franchisenemer</span><h2>Persoonlijk les, met een landelijk vangnet.</h2><p>Je hebt rechtstreeks contact met mij en volgt alle lessen bij een vaste instructeur. DriveYOU ondersteunt als overkoepelend formule- en kwaliteitsplatform.</p><a className="text-link" href="https://www.driveyou.nl/garantiefonds" rel="noreferrer" target="_blank">Meer over DriveYOU en het garantiefonds <ArrowRight width="17" /></a></div>
        <aside className="notice-card"><Shield width="25" /><h3>Vrijwillig extra verzekerd</h3><p>Voor € 41,50 eenmalig kun je vrijwillig deelnemen aan het DriveYOU-garantiefonds. Valt je instructeur langdurig of permanent uit, dan kunnen vooruitbetaalde rijlessen en/of CBR-examens volgens de voorwaarden kosteloos bij een andere aangesloten instructeur worden voortgezet.</p></aside>
      </div></section>

      <section className="about-closing"><div className="site-shell about-closing__grid">
        <div><span className="eyebrow">Samen de weg op</span><h2>Ik kijk ernaar uit om jou te begeleiden op weg naar je rijbewijs!</h2><div className="button-row"><Link className="button" href="/proefles">Plan een gratis proefles <ArrowRight width="18" /></Link><Link className="button button--ghost" href="/lespakketten">Bekijk de pakketten</Link></div></div>
        <figure className="about-car"><img alt="DriveYOU-lesauto" height="629" loading="lazy" src="/images/driveyou-auto.png" width="1400" /></figure>
      </div></section>

      <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: "Eric van Dijk", jobTitle: "Rijinstructeur", worksFor: { "@id": siteConfig.organizationId }, url: `${siteConfig.url}/over-ons` }} />
    </main>
  );
}
