import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Shield } from "../components/Icons";
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
  const normalSingleRates = pricing.singleRates.filter((rate) => rate.id !== "installment-administration-fee");
  return (
    <main id="main-content">
      <PageHero eyebrow="Volledige prijslijst" title="Rijles- en examenkosten" accent="helder op een rij." intro="Alle tarieven zijn inclusief btw. Een rijles duurt 60 minuten en een pakket blijft 12 maanden geldig."><Breadcrumbs currentPath="/tarieven" items={[{ label: "Tarieven" }]} /><div className="button-row page-hero__actions"><Link className="button" href="/configurator">Stel een pakket samen <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/lespakketten">Vergelijk startpakketten</Link></div></PageHero>
      <section className="section"><div className="site-shell pricing-layout">
        <PriceTable title="Losse tarieven" rows={normalSingleRates.map((rate) => ({ label: rate.name, amount: rate.amount, detail: rate.id === "itheorie" && "recommendedRetailAmount" in rate && typeof rate.recommendedRetailAmount === "number" ? `Adviesprijs ${formatPrice(rate.recommendedRetailAmount)}` : "applicability" in rate ? "Eenmalig voor nieuwe leerlingen" : undefined }))} />
        <PriceTable title="Vervolg rijlessen" rows={pricing.followUpLessonPackages.map((item) => ({ label: `${item.lessonCount} rijlessen`, amount: item.amount, detail: `${formatPrice(item.amountPerLesson)} per rijles` }))} />
        <PriceTable title="Herexamenpakketten" rows={pricing.retestPackages.map((item) => ({ label: item.name, amount: item.amount, detail: item.includes.join(" + ") }))} />
        <PriceTable title="Startpakketten" rows={pricing.starterPackages.map((item) => ({ label: item.name, amount: item.amount, detail: `${item.lessonCount} rijlessen · zie pakketpagina voor alle onderdelen` }))} />
      </div></section>
      <section className="section section--soft"><div className="site-shell info-split"><div><span className="eyebrow">Eenmalige kosten</span><h2>Alles vooraf duidelijk.</h2><ul className="checklist"><li><Check width="17" /> Voor nieuwe leerlingen geldt € 39,50 inschrijfkosten.</li><li><Check width="17" /> Het DriveYOU-garantiefonds bedraagt eenmalig € 41,50.</li><li><Check width="17" /> Betalen in 2, 3 of 4 termijnen kost eenmalig € 39 administratiekosten.</li></ul><p>De configurator telt de inschrijfkosten en het garantiefonds automatisch mee in je persoonlijke totaal.</p></div><aside className="notice-card"><Shield width="25" /><h3>DriveYOU-garantiefonds</h3><p>Kun je niet verder bij je eigen instructeur, dan worden vooruitbetaalde lessen en CBR-examens kosteloos voortgezet bij een andere DriveYOU-instructeur.</p><a className="text-link" href="https://www.driveyou.nl/garantiefonds/" rel="noreferrer" target="_blank">Lees de voorwaarden bij DriveYOU <ArrowRight width="17" /></a></aside></div></section>
      <section className="section section--compact"><div className="site-shell split-cta"><div><span className="eyebrow">Actuele tarieven</span><h2>Geldig vanaf 1 september 2026.</h2><p>Alle bedragen zijn inclusief btw. Rijlespakketten zijn 12 maanden geldig vanaf de eerste les.</p></div><Link className="button" href="/faq">Lees de FAQ <ArrowRight width="17" /></Link></div></section>
    </main>
  );
}
