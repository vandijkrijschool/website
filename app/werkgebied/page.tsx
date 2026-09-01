import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "../components/Icons";
import ResponsiveImage from "../components/ResponsiveImage";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { regions } from "../lib/content";
import { corePageMetadata } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/werkgebied");

const clusters = [
  { id: "den-haag", title: "Den Haag en omliggende steden", text: "Den Haag, Scheveningen, Rijswijk, Voorburg en Leidschendam." },
  { id: "delft-pijnacker", title: "Delft en Pijnacker-Nootdorp", text: "Delft, Den Hoorn, Nootdorp en Pijnacker." },
  { id: "westland", title: "Westland", text: "De Lier, Honselersdijk, Kwintsheul, Monster, Naaldwijk, Poeldijk, ’s-Gravenzande en Wateringen." },
] as const;

export default function ServiceAreaPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Eén werkgebiedhub" title="Rijles in exact" accent="17 plaatsen." intro="Van Dijk presenteert één rijschool met zeventien werkgebieden, geen losse filialen of fictieve vestigingsadressen."><Breadcrumbs currentPath="/werkgebied" items={[{ label: "Werkgebied" }]} /></PageHero>
      <section className="section"><div className="site-shell area-hub"><div className="area-hub__intro"><span className="eyebrow">Alle plaatsen</span><h2>Kies jouw regio.</h2><p>Iedere plaats heeft een eigen pagina, eigen sfeerbeeld, veilige lokale copy en links naar nabijgelegen gebieden. Ophaalpunten en actuele beschikbaarheid blijven onbevestigd.</p></div>{clusters.map((cluster) => <section className="area-cluster" key={cluster.id}><div><h3>{cluster.title}</h3><p>{cluster.text}</p></div><div className="area-link-grid">{regions.filter((region) => region.cluster === cluster.id).map((region) => <Link href={region.canonicalPath} key={region.slug}><MapPin width="18" /><span><small>Werkgebied</small><strong>{region.displayName}</strong></span><ArrowRight width="17" /></Link>)}</div></section>)}</div></section>
      <section className="section section--soft"><div className="site-shell"><div className="local-showcase__intro"><div><span className="eyebrow">Eigen beelden per gebied</span><h2>Drie representatieve sfeerimpressies.</h2></div><p>Alle zeventien detailpagina’s gebruiken het locatiebeeld uit het centrale manifest. De beelden blijven sfeerimpressies tot menselijke merk- en locatiegoedkeuring.</p></div><div className="workarea-gallery"><figure><ResponsiveImage imageBase="voorburg-herenstraat-oude-kerk" alt="Zwarte Van Dijk Rijschool-lesauto bij de Herenstraat en Oude Kerk in Voorburg" sizes="(max-width: 820px) 100vw, 33vw" /><figcaption>Voorburg · sfeerimpressie</figcaption></figure><figure><ResponsiveImage imageBase="pijnacker-polderroute" alt="Zwarte Van Dijk Rijschool-lesauto op een polderweg bij Pijnacker" sizes="(max-width: 820px) 100vw, 33vw" /><figcaption>Pijnacker · sfeerimpressie</figcaption></figure><figure><ResponsiveImage imageBase="wateringen-centrum-lesauto" alt="Zwarte Van Dijk Rijschool-lesauto in een herkenbaar straatbeeld bij Wateringen" sizes="(max-width: 820px) 100vw, 33vw" /><figcaption>Wateringen · sfeerimpressie</figcaption></figure></div><p className="local-showcase__note"><Sparkles width="15" /> Geen afgebeelde scène bewijst een echte les of ophaallocatie.</p></div></section>
    </main>
  );
}
