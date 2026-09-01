import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Gauge, Smartphone, Users } from "../components/Icons";
import { IconCards, SplitCta } from "../components/PageSections";
import { SectionHeading } from "../components/Marketing";
import ResponsiveImage from "../components/ResponsiveImage";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { formatPrice, singleRateById } from "../lib/content";
import { corePageMetadata } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/theorie");

export default function TheoryPage() {
  const theory = singleRateById.get("itheorie")!;
  const recommended = "recommendedRetailAmount" in theory && typeof theory.recommendedRetailAmount === "number" ? theory.recommendedRetailAmount : 7900;
  return (
    <main id="main-content">
      <PageHero eyebrow="Complete digitale theorieopleiding" title="Leer voor je theorie met" accent="iTheorie." intro={`Het iTheoriepakket kost volgens de bron ${formatPrice(theory.amount)} bij een adviesprijs van ${formatPrice(recommended)}.`}><Breadcrumbs currentPath="/theorie" items={[{ label: "iTheorie" }]} /><div className="button-row page-hero__actions"><Link className="button" href="/contact">Bekijk de contactdemo <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/lespakketten#all-in-one">Alles-in-1 bekijken</Link></div></PageHero>
      <section className="section"><div className="site-shell local-intro"><div><SectionHeading eyebrow="Inhoud uit de bron" title="Studeren wanneer het jou uitkomt." text="De digitale opleiding combineert lesmateriaal, oefening en uitleg zonder een slagingsgarantie te suggereren." /><ul className="checklist"><li><Check width="17" /> Online studeren</li><li><Check width="17" /> 50 proefexamens</li><li><Check width="17" /> Les via livestream</li><li><Check width="17" /> Leren waar en wanneer je wilt, in eigen tempo</li></ul><p>De oefenexamens zijn volgens de bron gebaseerd op de stijl van CBR-theorie-examens. Het pakket kan via de rijinstructeur worden besteld en is inbegrepen bij Alles-in-1.</p></div><figure className="local-photo"><ResponsiveImage imageBase="theorie-itheorie-met-lesauto" alt="Digitale theorievoorbereiding met de Van Dijk Rijschool-lesauto buiten in beeld" priority sizes="(max-width: 820px) 100vw, 50vw" /><figcaption><Smartphone width="22" /><span>iTheorie</span><strong>{formatPrice(theory.amount)}</strong><small>Adviesprijs {formatPrice(recommended)}</small></figcaption></figure></div></section>
      <section className="section section--soft"><div className="site-shell"><SectionHeading eyebrow="Zo is het pakket opgebouwd" title="Leren, oefenen en live uitleg." /><IconCards items={[{ icon: Smartphone, title: "Online studeren", text: "Digitale toegang om in eigen tempo door het lesmateriaal te gaan." },{ icon: Gauge, title: "50 proefexamens", text: "Oefenen met examens die aansluiten op de stijl van het CBR-theorie-examen." },{ icon: Users, title: "Livestream", text: "De aangeleverde pakketinhoud vermeldt les via livestream." },{ icon: Check, title: "In Alles-in-1", text: "Het theoriepakket staat letterlijk als onderdeel van Alles-in-1 vermeld." }]} /></div></section>
      <section className="section"><div className="site-shell assurance-panel"><Check width="27" /><div><h2>Theorie is anderhalf jaar geldig.</h2><p>Na het behalen van het theorie-examen heb je volgens de bron anderhalf jaar de tijd om te slagen voor het praktijkexamen.</p><small className="verification-flag">Brongegeven; bij inhoudsreview opnieuw controleren op actualiteit.</small></div></div></section>
      <SplitCta title="Vergelijk de pakketten." text="Alles-in-1 bevat iTheorie; de vier andere startpakketten vermelden dit onderdeel niet." primaryHref="/lespakketten" primaryLabel="Vergelijk pakketten" />
    </main>
  );
}
