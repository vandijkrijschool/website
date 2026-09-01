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
      <PageHero eyebrow="Autorijbewijs B" title="Rijlessen met een" accent="duidelijke opbouw." intro={`Een rijles duurt 60 minuten en kost ${formatPrice(singleLesson.amount)}. Je rijdt in een vaste lesauto met persoonlijke begeleiding op jouw niveau.`}><Breadcrumbs currentPath="/rijlessen" items={[{ label: "Rijlessen" }]} /><div className="button-row page-hero__actions"><Link className="button" href="/proefles">Plan gratis proefles <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/tarieven">Alle tarieven</Link></div></PageHero>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="Jouw ontwikkeling centraal" title="Van basisbediening naar zelfstandig rijden." text="We stemmen iedere les af op je ervaring, voortgang en zelfvertrouwen. Na afloop zie je in NXTDRIVE precies waar je staat en wat je volgende leerdoel is." /><IconCards items={[{ icon: Car, title: "Voertuigbeheersing", text: "Bediening, kijktechniek en een veilige plaats op de weg." },{ icon: RouteIcon, title: "Verkeersinzicht", text: "Situaties leren herkennen, risico’s afwegen en tijdig kiezen." },{ icon: Shield, title: "Zelfstandig rijden", text: "Steeds meer verkeerssituaties verantwoord zonder voortdurende aanwijzing uitvoeren." },{ icon: Gauge, title: "Examenvoorbereiding", text: "Gericht oefenen op onderdelen die nog aandacht vragen." }]} /></div></section>
      <section className="lesson-photo-band"><ResponsiveImage imageBase="rijles-interieur-den-haag" alt="Rijles vanuit de auto in stedelijk verkeer in Den Haag" sizes="100vw" /><div className="site-shell"><div><span className="eyebrow">Onderweg in Den Haag</span><strong>Rustig opbouwen naar zelfstandig verkeersinzicht.</strong></div></div></section>
      <section className="section section--soft"><div className="site-shell curriculum"><div><SectionHeading eyebrow="Persoonlijk lesplan" title="Niet iedere leerling leert hetzelfde." text="Ervaring, zelfvertrouwen en regelmaat verschillen. Tijdens de gratis proefles ontvang je een persoonlijk advies voor je lesopbouw." /><div className="source-fact"><strong>Gemiddeld traject</strong><p>Een leerling heeft gemiddeld ongeveer {siteFacts.operationalClaims.averageLessonCount.value} rijlessen nodig.</p><small>Met twee lessen per week bouw je snel routine op.</small></div></div><div className="curriculum__track">{["Basisbediening", "Kijken en beslissen", "Complexer verkeer", "Zelfstandig rijden", "Examenvoorbereiding"].map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{item}</strong><i style={{ width: `${48 + index * 11}%` }} /></div></article>)}</div></div></section>
      <section className="section"><div className="site-shell info-split"><div><SectionHeading eyebrow="Digitale rijlesmap" title="Altijd inzicht via NXTDRIVE." /><p>Bij ieder startpakket krijg je toegang tot je digitale rijlesmap. Bekijk afspraken, persoonlijke leerdoelen, voortgang en lesverslagen op één plek.</p></div><aside className="notice-card"><Shield width="25" /><h3>Duidelijke afspraken</h3><p>Iedere les duurt 60 minuten, pakketprijzen zijn inclusief btw en pakketten blijven 12 maanden geldig. Kosteloos annuleren kan tot 48 uur vooraf.</p><Link className="text-link" href="/faq">Bekijk veelgestelde vragen <ArrowRight width="17" /></Link></aside></div></section>
      <SplitCta title="Vergelijk eerst de actuele mogelijkheden." text="Bekijk alle tarieven of gebruik de configurator voor een reproduceerbaar pakketvoorstel." primaryHref="/tarieven" primaryLabel="Bekijk tarieven" />
    </main>
  );
}
