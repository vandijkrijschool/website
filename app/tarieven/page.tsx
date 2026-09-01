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
      <PageHero eyebrow="Volledige prijslijst" title="Rijles- en examenkosten" accent="zonder mockprijzen." intro="Alle bedragen komen rechtstreeks uit het aangeleverde document en worden centraal als integer eurocenten beheerd."><Breadcrumbs currentPath="/tarieven" items={[{ label: "Tarieven" }]} /><div className="button-row page-hero__actions"><Link className="button" href="/configurator">Stel een pakket samen <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/lespakketten">Vergelijk startpakketten</Link></div></PageHero>
      <section className="section"><div className="site-shell pricing-layout">
        <PriceTable title="Losse tarieven" rows={normalSingleRates.map((rate) => ({ label: rate.name, amount: rate.amount, detail: rate.id === "itheorie" && "recommendedRetailAmount" in rate && typeof rate.recommendedRetailAmount === "number" ? `Adviesprijs ${formatPrice(rate.recommendedRetailAmount)}` : "applicability" in rate ? "Toepasselijkheid nog te bevestigen" : undefined }))} />
        <PriceTable title="Vervolg rijlessen" rows={pricing.followUpLessonPackages.map((item) => ({ label: `${item.lessonCount} rijlessen`, amount: item.amount, detail: `${formatPrice(item.amountPerLesson)} per rijles` }))} />
        <PriceTable title="Herexamenpakketten" rows={pricing.retestPackages.map((item) => ({ label: item.name, amount: item.amount, detail: item.includes.join(" + ") }))} />
        <PriceTable title="Startpakketten" rows={pricing.starterPackages.map((item) => ({ label: item.name, amount: item.amount, detail: `${item.lessonCount} rijlessen · zie pakketpagina voor alle onderdelen` }))} />
      </div></section>
      <section className="section section--soft"><div className="site-shell info-split"><div><span className="eyebrow">Bijkomende kosten</span><h2>Niet verbergen en niet dubbel tellen.</h2><ul className="checklist"><li><Check width="17" /> Startpakketten zijn volgens de bron exclusief € 39,50 inschrijfkosten.</li><li><Check width="17" /> Het DriveYOU-garantiefonds bedraagt eenmalig € 41,50.</li><li><Check width="17" /> Betalen in 2, 3 of 4 termijnen kost eenmalig € 39 administratiekosten.</li></ul><p>Van de inschrijfkosten en het garantiefonds moet nog worden bevestigd of ze altijd verplicht zijn. Daarom toont de site deze posten apart en nog niet in een onvermijdbaar totaal.</p></div><aside className="notice-card"><Shield width="25" /><h3>DriveYOU-garantiefonds</h3><p>Volgens de bron doen leerlingen rechtstreeks zaken met een zelfstandige DriveYOU-instructeur. Als die niet kan doorgaan, worden vooruitbetaalde lessen en/of CBR-examens kosteloos voortgezet bij een andere DriveYOU-instructeur.</p><a className="text-link" href="https://www.driveyou.nl/garantiefonds/" rel="noreferrer" target="_blank">Lees de actuele voorwaarden bij DriveYOU <ArrowRight width="17" /></a><small className="verification-flag">Toepasselijkheid op Van Dijk en iedere leerling nog bevestigen.</small></aside></div></section>
      <section className="section section--compact"><div className="site-shell split-cta"><div><span className="eyebrow">Prijsbron</span><h2>Ingangsdatum nog te bevestigen.</h2><p>De bron is ontvangen op 31 augustus 2026, maar bevat geen expliciete ingangs- of vervaldatum, btw-status of pakketgeldigheid.</p></div><Link className="button" href="/faq">Lees de FAQ <ArrowRight width="17" /></Link></div></section>
    </main>
  );
}
