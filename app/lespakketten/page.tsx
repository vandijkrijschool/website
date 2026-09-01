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
      <PageHero eyebrow="Actuele startpakketten" title="Vergelijk vijf pakketten" accent="uit één prijsbron." intro="Pakket 20, 30, 40 en 50 bevatten exact de vier aangeleverde onderdelen. Alles-in-1 voegt iTheorie en de tussentijdse toets toe."><Breadcrumbs currentPath="/lespakketten" items={[{ label: "Lespakketten" }]} /></PageHero>
      <section className="section"><div className="site-shell"><PackageCards /><AssuranceStrip /><p className="fineprint">Alle startpakketten zijn volgens het document exclusief {formatPrice(registrationFee.amount)} inschrijfkosten. Of die kosten en het garantiefonds onvermijdbaar zijn, is nog niet bevestigd; daarom worden ze niet stilzwijgend opgeteld.</p></div></section>
      <section className="section section--soft"><div className="site-shell"><SectionHeading eyebrow="Exact vergelijken" title="Wat staat in de aangeleverde pakketinhoud?" text="Een vinkje betekent uitsluitend dat het onderdeel letterlijk in de bron bij dat pakket staat." /><div className="comparison-wrap"><table className="comparison-table"><thead><tr><th>Onderdeel</th>{packages.map((item) => <th key={item.id}>{item.name}<span>{formatPrice(item.amountCents)}</span></th>)}</tr></thead><tbody><tr><th>Rijlessen</th>{packages.map((item) => <td key={item.id}>{item.lessonCount}</td>)}</tr>{comparisonRows.map((label) => <tr key={label}><th>{label}</th>{packages.map((item) => <td key={item.id}>{item.includes.includes(label) ? <Check width="19" aria-label="Inbegrepen" /> : <span className="table-dash">—</span>}</td>)}</tr>)}</tbody></table></div></div></section>
      <section className="section"><div className="site-shell card-triptych"><article><Shield width="24" /><h3>Geen verzonnen inclusies</h3><p>Geen startpakket claimt een gratis herexamen of tussentijdse toets wanneer dat niet in de bron staat.</p></article><article><Sparkles width="24" /><h3>Alles-in-1</h3><p>35 rijlessen, proefles, praktijkexamen, tussentijdse toets, iTheorie en digitale rijlesmap voor {formatPrice(packages.find((item) => item.id === "all-in-one")!.amountCents)}.</p></article><article><Check width="24" /><h3>Prijs in centen</h3><p>Bedragen zoals € 39,50 en € 41,50 blijven exact en worden nergens afgerond naar hele euro’s.</p></article></div></section>
      <section className="section section--compact"><div className="site-shell split-cta"><div><span className="eyebrow">Hulp bij kiezen</span><h2>Gebruik de configurator.</h2><p>Bewaar ervaring, planning, pakket en betaalvoorkeur in één deelbare link.</p></div><div className="button-row"><Link className="button" href="/configurator">Start de configurator <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/tarieven">Bekijk alle tarieven</Link></div></div></section>
    </main>
  );
}
