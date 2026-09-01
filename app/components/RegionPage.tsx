import Link from "next/link";
import { ArrowRight, Car, Check, MapPin, RouteIcon, Shield } from "./Icons";
import { AreaLinks, SplitCta } from "./PageSections";
import { SectionHeading } from "./Marketing";
import ResponsiveImage from "./ResponsiveImage";
import { Breadcrumbs, JsonLd, PageHero } from "./SiteChrome";
import { getNearbyRegions, type Region } from "../lib/content";
import { siteConfig } from "../lib/site";

export default function RegionPage({ region }: { region: Region }) {
  const nearby = getNearbyRegions(region);
  return (
    <main id="main-content">
      <PageHero eyebrow={`Werkgebied ${region.displayName}`} title="Rijschool in" accent={`${region.displayName}.`} intro={region.metaDescription}><Breadcrumbs currentPath={region.canonicalPath} items={[{ label: "Werkgebied", href: "/werkgebied" }, { label: region.displayName }]} /><div className="button-row page-hero__actions"><Link className="button" href={`/proefles?regio=${region.slug}`}>Bekijk proeflesprototype <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/tarieven">Bekijk tarieven</Link></div></PageHero>
      <figure className="region-photo-hero"><ResponsiveImage imageBase={region.imageBase} alt={region.alt} priority sizes="100vw" /><figcaption className="site-shell"><span>SFEERIMPRESSIE · {region.displayName.toUpperCase()}</span><strong>{region.intro}</strong></figcaption></figure>
      <section className="section"><div className="site-shell local-intro"><div><SectionHeading eyebrow={`Mogelijke lescontext in ${region.displayName}`} title="Afwisseling die past bij jouw ontwikkeling." /><p>{region.context}</p><ul className="checklist">{region.situations.map((item) => <li key={item}><Check width="17" /> {item}</li>)}</ul><p className="verification-flag">Lokale verkeerscontext, ophaalgebied en actuele beschikbaarheid moeten door de instructeur worden bevestigd.</p></div><aside className="notice-card"><MapPin width="25" /><h3>Geen lokale vestiging geclaimd</h3><p>{region.displayName} is één van de zeventien werkgebieden. Deze pagina publiceert geen fictief adres, filiaal of vast ophaalpunt.</p></aside></div></section>
      <section className="section section--soft"><div className="site-shell card-triptych"><article><Car width="24" /><h3>Rustig beginnen</h3><p>Start met situaties die passen bij je huidige basis en zelfvertrouwen.</p></article><article><RouteIcon width="24" /><h3>Complexiteit opbouwen</h3><p>Voeg drukkere en onbekende situaties pas toe wanneer de basis dat toelaat.</p></article><article><Shield width="24" /><h3>Zelfstandig toepassen</h3><p>Leer algemene verkeersprincipes gebruiken zonder een vaste route uit het hoofd te leren.</p></article></div></section>
      <section className="section"><div className="site-shell"><SectionHeading eyebrow="In de buurt" title={`Bekijk omliggende werkgebieden rond ${region.displayName}.`} text="De links helpen navigeren tussen logisch nabije plaatsen; ze suggereren geen aparte vestigingen." /><AreaLinks items={nearby} /><div className="region-service-links"><Link href="/proefles">Proefles <ArrowRight width="16" /></Link><Link href="/tarieven">Tarieven <ArrowRight width="16" /></Link><Link href="/lespakketten">Lespakketten <ArrowRight width="16" /></Link><Link href="/werkwijze">Werkwijze <ArrowRight width="16" /></Link></div></div></section>
      <SplitCta title={`Bekijk een mogelijke start in ${region.displayName}.`} text="Leg je voorkeuren veilig vast in het prototype. Er ontstaat nog geen aanvraag of boeking." />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", "@id": `${siteConfig.url}${region.canonicalPath}#service`, name: `Autorijlessen in ${region.displayName}`, serviceType: "Autorijles", provider: { "@id": siteConfig.organizationId }, areaServed: { "@type": "Place", name: region.displayName }, url: `${siteConfig.url}${region.canonicalPath}` }} />
    </main>
  );
}
