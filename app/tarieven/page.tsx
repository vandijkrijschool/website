import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Shield } from "../components/Icons";
import DriveYouLogo from "../components/DriveYouLogo";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { formatPrice, pricing } from "../lib/content";
import { corePageMetadata } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/tarieven");

function PriceTable({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; amount: number; detail?: string }[];
}) {
  return <section className="price-section"><h2>{title}</h2><div className="price-table">{rows.map((row) => <div className="price-row" key={row.label}><div><strong>{row.label}</strong>{row.detail ? <small>{row.detail}</small> : null}</div><span>{formatPrice(row.amount)}</span></div>)}</div></section>;
}

export default function RatesPage() {
  const normalSingleRates = pricing.singleRates.filter((rate) => !["installment-administration-fee", "driveyou-guarantee-fund"].includes(rate.id));
  return (
    <main id="main-content">
      <PageHero eyebrow="Volledige prijslijst" title="Rijles- en examenkosten" accent="helder op een rij." intro="Alle tarieven zijn inclusief btw. Een rijles duurt 50 minuten en een pakket blijft 12 maanden geldig."><Breadcrumbs currentPath="/tarieven" items={[{ label: "Tarieven" }]} /><div className="button-row page-hero__actions"><Link className="button" href="/proefles">Plan intake <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/lespakketten">Vergelijk startpakketten</Link></div></PageHero>
      <section className="section"><div className="site-shell pricing-layout">
        <PriceTable title="Losse tarieven" rows={normalSingleRates.map((rate) => ({ label: rate.name, amount: rate.amount, detail: rate.id === "itheorie" && "recommendedRetailAmount" in rate && typeof rate.recommendedRetailAmount === "number" ? `Adviesprijs ${formatPrice(rate.recommendedRetailAmount)}` : "applicability" in rate ? "Eenmalig voor nieuwe leerlingen" : undefined }))} />
        <PriceTable title="Vervolg rijlessen" rows={pricing.followUpLessonPackages.map((item) => ({ label: `${item.lessonCount} rijlessen`, amount: item.amount, detail: `${formatPrice(item.amountPerLesson)} per rijles` }))} />
        <PriceTable title="Herexamenpakketten" rows={pricing.retestPackages.map((item) => ({ label: item.name, amount: item.amount, detail: item.includes.join(" + ") }))} />
        <PriceTable title="Startpakketten" rows={pricing.starterPackages.map((item) => ({ label: item.name, amount: item.amount, detail: `${item.lessonCount} rijlessen · zie pakketpagina voor alle onderdelen` }))} />
      </div></section>
      <section className="section section--soft"><div className="site-shell info-split"><div><span className="eyebrow">Eenmalige kosten</span><h2>Alles vooraf duidelijk.</h2><ul className="checklist"><li><Check width="17" /> Voor nieuwe leerlingen geldt € 39,50 inschrijfkosten.</li><li><Check width="17" /> Het DriveYOU-garantiefonds is optioneel en kost eenmalig € 41,50.</li><li><Check width="17" /> Betalen in 2, 3 of 4 termijnen kost eenmalig € 39 administratiekosten.</li></ul><p>Voor je inschrijving ontvang je een compleet overzicht van het gekozen pakket en de toepasselijke kosten.</p></div><aside className="notice-card notice-card--driveyou"><DriveYouLogo inverse /><Shield width="25" /><h3>Vrijwillig extra verzekerd</h3><p>Voor € 41,50 eenmalig kun je vrijwillig deelnemen. Valt je instructeur langdurig of permanent uit, dan zorgt het fonds er volgens de voorwaarden voor dat vooruitbetaalde rijlessen en/of CBR-examens kosteloos bij een andere aangesloten DriveYOU-instructeur worden voortgezet.</p><a className="text-link" href="https://www.driveyou.nl/garantiefonds" rel="noreferrer" target="_blank">Meer over het garantiefonds <ArrowRight width="17" /></a></aside></div></section>
      <section className="section section--compact"><div className="site-shell split-cta"><div><span className="eyebrow">Actuele tarieven</span><h2>Geldig vanaf 1 september 2026.</h2><p>Alle bedragen zijn inclusief btw. Rijlespakketten zijn 12 maanden geldig vanaf de eerste les.</p></div><Link className="button" href="/faq">Lees de FAQ <ArrowRight width="17" /></Link></div></section>
    </main>
  );
}
