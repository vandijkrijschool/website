import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Car, Gauge, RouteIcon, Shield } from "../components/Icons";
import { IconCards, SplitCta } from "../components/PageSections";
import { SectionHeading } from "../components/Marketing";
import ResponsiveImage from "../components/ResponsiveImage";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { formatPrice, singleRateById, siteFacts } from "../lib/content";
import { corePageMetadata } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/rijlessen");

export default function LessonsPage() {
  const singleLesson = singleRateById.get("single-driving-lesson")!;
  return (
    <main id="main-content">
      <PageHero eyebrow="Autorijbewijs B" title="Rijlessen met een" accent="duidelijke opbouw." intro={`Een losse rijles kost volgens de aangeleverde bron ${formatPrice(singleLesson.amount)}. De duur van één rijles is nog niet bevestigd en wordt daarom niet ingevuld.`}><Breadcrumbs currentPath="/rijlessen" items={[{ label: "Rijlessen" }]} /><div className="button-row page-hero__actions"><Link className="button" href="/proefles">Bekijk de proeflesflow <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/tarieven">Alle tarieven</Link></div></PageHero>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Jouw ontwikkeling centraal" title="Van basisbediening naar zelfstandig rijden." text="De lesopbouw kan worden aangepast aan ervaring en voortgang. De site doet geen onbevestigde uitspraak over lesduur, doorlooptijd of slagingskans." /><IconCards items={[{ icon: Car, title: "Voertuigbeheersing", text: "Bediening, kijktechniek en een veilige plaats op de weg." },{ icon: RouteIcon, title: "Verkeersinzicht", text: "Situaties leren herkennen, risico’s afwegen en tijdig kiezen." },{ icon: Shield, title: "Zelfstandig rijden", text: "Steeds meer verkeerssituaties verantwoord zonder voortdurende aanwijzing uitvoeren." },{ icon: Gauge, title: "Examenvoorbereiding", text: "Gericht oefenen op onderdelen die nog aandacht vragen." }]} /></div></section>
      <section className="lesson-photo-band"><ResponsiveImage imageBase="rijles-interieur-den-haag" alt="Rijles vanuit de auto in stedelijk verkeer in Den Haag" sizes="100vw" /><div className="site-shell"><div><span className="eyebrow">Sfeerimpressie</span><strong>Rustig opbouwen naar zelfstandig verkeersinzicht.</strong></div></div></section>
      <section className="section section--soft"><div className="site-shell curriculum"><div><SectionHeading eyebrow="Persoonlijk lesplan" title="Niet iedere leerling leert hetzelfde." text="Ervaring, zelfvertrouwen en regelmaat verschillen. De exacte lesplanning wordt pas persoonlijk bevestigd." /><div className="source-fact"><strong>Bronindicatie</strong><p>Het gemiddelde ligt volgens het aangeleverde document rond {siteFacts.operationalClaims.averageLessonCount.value} rijlessen.</p><small>Needs verification — tijdgevoelige claim vóór indexering actualiseren.</small></div></div><div className="curriculum__track">{["Basisbediening", "Kijken en beslissen", "Complexer verkeer", "Zelfstandig rijden", "Examenvoorbereiding"].map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{item}</strong><i style={{ width: `${48 + index * 11}%` }} /></div></article>)}</div></div></section>
      <section className="section"><div className="site-shell info-split"><div><SectionHeading eyebrow="Digitale rijlesmap" title="De bron noemt een digitale rijlesmap." /><p>De vier startpakketten en Alles-in-1 bevatten een digitale rijlesmap. Er is niet bevestigd dat dit hetzelfde product is als NXTDRIVE; de website houdt die begrippen daarom uitdrukkelijk gescheiden.</p></div><aside className="notice-card"><Shield width="25" /><h3>Geen stilzwijgende aannames</h3><p>Btw-status, lesduur, pakketgeldigheid, annulering en exacte examendekking blijven open zakelijke beslispunten.</p><Link className="text-link" href="/faq">Bekijk de geverifieerde FAQ <ArrowRight width="17" /></Link></aside></div></section>
      <SplitCta title="Vergelijk eerst de actuele mogelijkheden." text="Bekijk alle tarieven of gebruik de configurator voor een reproduceerbaar pakketvoorstel." primaryHref="/tarieven" primaryLabel="Bekijk tarieven" />
    </main>
  );
}
