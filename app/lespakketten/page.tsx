import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock, Shield, Sparkles } from "../components/Icons";
import { AssuranceStrip, PackageCards, SectionHeading } from "../components/Marketing";
import { Breadcrumbs, JsonLd, PageHero } from "../components/SiteChrome";
import { extraLessonPrice, formatPrice, isCommercialStructuredDataEnabled, packages, pageMetadata, siteConfig } from "../lib/site";

export const metadata: Metadata = pageMetadata(
  "Rijlespakketten Den Haag",
  "Vergelijk de rijlespakketten van Van Dijk Rijschool. Bekijk 20, 30 en 40 lesuren, pakketonderdelen en prijzen of stel jouw route samen.",
  "/lespakketten",
);

export default function PackagesPage() {
  const rows = [
    ["Rijlessen", ...packages.map((item) => String(item.lessons))],
    ["Praktijkexamen", true, true, true],
    ["Tussentijdse toets", false, true, true],
    ["Herexamenregeling*", false, false, true],
    ["NXTDRIVE voortgang", true, true, true],
  ];
  return (
    <main id="main-content">
      <PageHero eyebrow="Duidelijke pakketkeuze" title="Kies een lespakket dat" accent="bij jouw startpunt past." intro="Drie vaste routes met een heldere inhoud. Gebruik de configurator als je nog twijfelt; tijdens de intake controleren we samen of jouw keuze passend is."><Breadcrumbs currentPath="/lespakketten" items={[{ label: "Lespakketten" }]} /></PageHero>
      <section className="section"><div className="site-shell"><PackageCards /><AssuranceStrip /><p className="fineprint">Losse rijles: {formatPrice(extraLessonPrice)} per lesuur. *Herexamenregeling volgens de demo-pakketvoorwaarden. Alle bedragen zijn mockprijzen; er vindt geen echte verkoop plaats.</p></div></section>
      <section className="section section--soft"><div className="site-shell"><SectionHeading eyebrow="Snel vergelijken" title="Wat zit er in ieder pakket?" text="Op mobiel kun je de tabel horizontaal verschuiven. De pakketkaarten hierboven blijven altijd de belangrijkste inhoudsbron." /><div className="comparison-wrap"><table className="comparison-table"><thead><tr><th>Onderdeel</th>{packages.map((item) => <th key={item.id}>{item.name}<span>{formatPrice(item.price)}</span></th>)}</tr></thead><tbody>{rows.map(([label, ...values]) => <tr key={String(label)}><th>{String(label)}</th>{values.map((value, index) => <td key={index}>{typeof value === "boolean" ? value ? <Check width="19" /> : <span className="table-dash">—</span> : String(value)}</td>)}</tr>)}</tbody></table></div></div></section>
      <section className="section"><div className="site-shell card-triptych"><article><Clock width="24" /><h3>Lesuren en afspraken</h3><p>Een pakket wordt uitgedrukt in lesuren van 60 minuten. Kies je afspraken van 90 minuten, dan bestaat een pakket van 30 lesuren bijvoorbeeld uit ongeveer twintig afspraken.</p></article><article><Shield width="24" /><h3>Voorwaarden vooraf duidelijk</h3><p>De demo-voorwaarden leggen geldigheidsduur, annulering, betaling, examenkosten en de herexamenregeling concreet uit.</p></article><article><Sparkles width="24" /><h3>Later uitbreidbaar</h3><p>Blijkt tijdens de opleiding dat extra lesuren verstandig zijn? Dan bespreken we dit tijdig en blijft je lesplan transparant.</p></article></div></section>
      <section className="section section--compact"><div className="site-shell split-cta"><div><span className="eyebrow">Hulp bij kiezen</span><h2>Laat de cockpit met je meedenken.</h2><p>Vier korte stappen geven je een voorlopig pakketadvies zonder dat je eerst contactgegevens hoeft achter te laten.</p></div><div className="button-row"><Link className="button" href="/configurator">Start de configurator <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/proefles">Vraag een intake aan</Link></div></div></section>
      {isCommercialStructuredDataEnabled ? <JsonLd data={packages.map((item) => ({ "@context": "https://schema.org", "@type": "Product", name: item.name, description: item.description, brand: { "@type": "Brand", name: siteConfig.name }, offers: { "@type": "Offer", priceCurrency: "EUR", price: item.price, availability: "https://schema.org/InStock", url: `${siteConfig.url}/lespakketten#${item.id}` } }))} /> : null}
    </main>
  );
}
