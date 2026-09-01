import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Shield, Sparkles } from "../components/Icons";
import { AssuranceStrip, PackageCards, SectionHeading } from "../components/Marketing";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { formatPrice, packages, registrationFee } from "../lib/content";
import { corePageMetadata } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/lespakketten");

const comparisonRows = [
  "100% gratis proefles",
  "praktijkexamen",
  "digitale rijlesmap",
  "tussentijdse toets",
  "iTheoriepakket",
];

export default function PackagesPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Rijlespakketten" title="Vergelijk vijf pakketten" accent="voor jouw rijopleiding." intro="Pakket 20, 30, 40 en 50 bevatten een gratis proefles, rijlessen, praktijkexamen en digitale rijlesmap. Alles-in-1 voegt iTheorie en de tussentijdse toets toe."><Breadcrumbs currentPath="/lespakketten" items={[{ label: "Lespakketten" }]} /></PageHero>
      <section className="section"><div className="site-shell"><PackageCards /><AssuranceStrip /><p className="fineprint">Alle startpakketten zijn inclusief btw en exclusief {formatPrice(registrationFee.amount)} inschrijfkosten en € 41,50 voor het DriveYOU-garantiefonds. Deze eenmalige kosten gelden voor nieuwe leerlingen.</p></div></section>
      <section className="section section--soft"><div className="site-shell"><SectionHeading eyebrow="Pakketten vergelijken" title="Wat is bij ieder pakket inbegrepen?" text="Bekijk in één oogopslag hoeveel rijlessen en welke extra onderdelen je krijgt." /><div className="comparison-wrap"><table className="comparison-table"><thead><tr><th>Onderdeel</th>{packages.map((item) => <th key={item.id}>{item.name}<span>{formatPrice(item.amountCents)}</span></th>)}</tr></thead><tbody><tr><th>Rijlessen</th>{packages.map((item) => <td key={item.id}>{item.lessonCount}</td>)}</tr>{comparisonRows.map((label) => <tr key={label}><th>{label}</th>{packages.map((item) => <td key={item.id}>{item.includes.includes(label) ? <Check width="19" aria-label="Inbegrepen" /> : <span className="table-dash">—</span>}</td>)}</tr>)}</tbody></table></div></div></section>
      <section className="section"><div className="site-shell card-triptych"><article><Shield width="24" /><h3>12 maanden geldig</h3><p>Gebruik je pakket in jouw tempo. De geldigheid start op de datum van je eerste rijles.</p></article><article><Sparkles width="24" /><h3>Alles-in-1</h3><p>35 rijlessen, proefles, praktijkexamen, tussentijdse toets, iTheorie en digitale rijlesmap voor {formatPrice(packages.find((item) => item.id === "all-in-one")!.amountCents)}.</p></article><article><Check width="24" /><h3>Betalen in termijnen</h3><p>Kies voor betaling in 2, 3 of 4 termijnen tegen eenmalig € 39 administratiekosten.</p></article></div></section>
      <section className="section section--compact"><div className="site-shell split-cta"><div><span className="eyebrow">Hulp bij kiezen</span><h2>Gebruik de configurator.</h2><p>Bewaar ervaring, planning, pakket en betaalvoorkeur in één deelbare link.</p></div><div className="button-row"><Link className="button" href="/configurator">Start de configurator <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/tarieven">Bekijk alle tarieven</Link></div></div></section>
    </main>
  );
}
