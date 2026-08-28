import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Car, Check, MapPin, RouteIcon, Shield } from "../components/Icons";
import { AreaLinks, IconCards, SplitCta } from "../components/PageSections";
import { SectionHeading } from "../components/Marketing";
import { Breadcrumbs, JsonLd, PageHero } from "../components/SiteChrome";
import { isCommercialStructuredDataEnabled, pageMetadata, siteConfig } from "../lib/site";

export const metadata: Metadata = pageMetadata(
  "Rijschool Den Haag — Autorijles op jouw tempo",
  "Zoek je rijles in Den Haag? Bekijk de persoonlijke lesaanpak, pakketten en mogelijkheden voor een intake bij Van Dijk Rijschool.",
  "/rijschool-den-haag",
);

export default function DenHaagPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Autorijschool regio Den Haag" title="Rijschool in Den Haag voor" accent="les op jouw tempo." intro="Leer stap voor stap omgaan met het afwisselende stadsverkeer van Den Haag—van rustige woonstraten tot trams, fietsers en complexe kruispunten."><Breadcrumbs currentPath="/rijschool-den-haag" items={[{ label: "Rijschool Den Haag" }]} /><div className="button-row page-hero__actions"><Link className="button" href="/proefles">Vraag een intake aan <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/configurator">Stel je pakket samen</Link></div></PageHero>
      <figure className="region-photo-hero"><img src="/images/den-haag-drive.webp" alt="Lesauto van Van Dijk Rijschool bij de Hofvijver in Den Haag" width="1672" height="941" loading="eager" decoding="async" /><figcaption className="site-shell"><span>DEN HAAG</span><strong>Lokaal vertrouwd. Gericht leren.</strong></figcaption></figure>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Lokaal leren rijden" title="Verkeersinzicht groeit door afwisseling." text="Je begint in situaties die passen bij je niveau. Naarmate je zekerder en zelfstandiger wordt, bouwen we uit naar drukkere en complexere verkeersomgevingen." /><IconCards items={[{ icon: Car, title: "Woonstraten", text: "Rustig werken aan voertuigbediening, kijkgedrag en veilige basisbeslissingen." },{ icon: RouteIcon, title: "Stadsverkeer", text: "Anticiperen op fietsers, voetgangers, trams, rijstrookkeuze en drukke kruisingen." },{ icon: Shield, title: "Doorgaande routes", text: "Tempo, invoegen, uitvoegen en zelfstandig navigeren richting randwegen en snelwegen." },{ icon: MapPin, title: "Jouw omgeving", text: "Ophaal- en afzetmogelijkheden worden per postcode en planning persoonlijk bevestigd." }]} /></div></section>
      <section className="section section--soft"><div className="site-shell local-route"><div><SectionHeading eyebrow="Een lesroute, geen examenroute" title="Leren begrijpen in plaats van onthouden." /><p>Een goede rijopleiding leert je omgaan met nieuwe situaties. Daarom oefenen we verkeersprincipes in verschillende delen van de regio en bouwen we complexiteit geleidelijk op.</p><ul className="checklist"><li><Check width="17" /> 30-kilometerzones en woonwijken</li><li><Check width="17" /> Drukke fiets- en voetgangersstromen</li><li><Check width="17" /> Tram- en busverkeer</li><li><Check width="17" /> Meerstrooks kruispunten</li><li><Check width="17" /> Doorgaande wegen en snelwegverbindingen</li></ul></div><div className="region-map region-map--small" aria-hidden="true"><span className="region-map__road region-map__road--one" /><span className="region-map__road region-map__road--two" /><span className="region-map__road region-map__road--three" /><span className="region-map__pin"><MapPin width="30" /></span><strong>DEN HAAG</strong><small>52.0705° N · 4.3007° E</small></div></div></section>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Ook actief rond Den Haag" title="Bekijk het beoogde lesgebied." text="Lokale beschikbaarheid wordt bij iedere aanvraag persoonlijk gecontroleerd." /><AreaLinks /></div></section>
      <section className="section section--soft"><div className="site-shell faq-page faq-page--compact"><section><h2>Rijles in Den Haag: veelgestelde vragen</h2><div className="faq-list"><details><summary>Kan ik bij school, werk of thuis starten?<span>+</span></summary><p>Geef je gewenste locatie door. Afhankelijk van postcode, route en planning bevestigen we wat mogelijk is.</p></details><details><summary>Leer ik omgaan met trams en druk stadsverkeer?<span>+</span></summary><p>Ja, zodra je basisniveau dit toelaat. De instructeur bouwt de complexiteit op zodat je situaties leert begrijpen zonder onnodige overbelasting.</p></details><details><summary>Kan ik ’s avonds of op zaterdag lessen?<span>+</span></summary><p>Beschikbaarheid verschilt. Geef je voorkeur aan bij de intake; dit is pas definitief na persoonlijke bevestiging.</p></details></div></section></div></section>
      <SplitCta title="Start jouw rijopleiding in Den Haag." text="Vertel ons waar je woont, wanneer je wilt starten en hoeveel ervaring je al hebt." />
      {isCommercialStructuredDataEnabled ? <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "Autorijlessen in Den Haag", provider: { "@type": "DrivingSchool", name: siteConfig.name }, areaServed: { "@type": "City", name: "Den Haag" }, url: `${siteConfig.url}/rijschool-den-haag`, serviceType: "Autorijles" }} /> : null}
    </main>
  );
}
