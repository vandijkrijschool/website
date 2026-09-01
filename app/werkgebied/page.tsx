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
      <PageHero eyebrow="Ons werkgebied" title="Rijles in" accent="17 plaatsen." intro="Van Den Haag en Delft tot Pijnacker en heel Westland: plan rijles in jouw eigen omgeving."><Breadcrumbs currentPath="/werkgebied" items={[{ label: "Werkgebied" }]} /></PageHero>
      <section className="section"><div className="site-shell area-hub"><div className="area-hub__intro"><span className="eyebrow">Alle plaatsen</span><h2>Kies jouw regio.</h2><p>In iedere plaats bieden we lessen van 60 minuten, flexibele lestijden en ophalen bij huis, school, werk of een afgesproken station.</p></div>{clusters.map((cluster) => <section className="area-cluster" key={cluster.id}><div><h3>{cluster.title}</h3><p>{cluster.text}</p></div><div className="area-link-grid">{regions.filter((region) => region.cluster === cluster.id).map((region) => <Link href={region.canonicalPath} key={region.slug}><MapPin width="18" /><span><small>Werkgebied</small><strong>{region.displayName}</strong></span><ArrowRight width="17" /></Link>)}</div></section>)}</div></section>
      <section className="section section--soft"><div className="site-shell"><div className="local-showcase__intro"><div><span className="eyebrow">Jouw regio in beeld</span><h2>Leren rijden in jouw omgeving.</h2></div><p>Rustige woonstraten, dorpse wegen, rotondes en druk stadsverkeer bieden voor iedere fase passende oefenmogelijkheden.</p></div><div className="workarea-gallery"><figure><ResponsiveImage imageBase="voorburg-herenstraat-oude-kerk" alt="Zwarte Van Dijk Rijschool-lesauto bij de Herenstraat en Oude Kerk in Voorburg" sizes="(max-width: 820px) 100vw, 33vw" /><figcaption>Rijles in Voorburg</figcaption></figure><figure><ResponsiveImage imageBase="pijnacker-polderroute" alt="Zwarte Van Dijk Rijschool-lesauto op een polderweg bij Pijnacker" sizes="(max-width: 820px) 100vw, 33vw" /><figcaption>Rijles in Pijnacker</figcaption></figure><figure><ResponsiveImage imageBase="wateringen-centrum-lesauto" alt="Zwarte Van Dijk Rijschool-lesauto in een herkenbaar straatbeeld bij Wateringen" sizes="(max-width: 820px) 100vw, 33vw" /><figcaption>Rijles in Wateringen</figcaption></figure></div><p className="local-showcase__note"><Sparkles width="15" /> Meestal kun je binnen 7 dagen starten.</p></div></section>
    </main>
  );
}
