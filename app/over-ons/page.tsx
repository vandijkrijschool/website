import type { Metadata } from "next";
import { ArrowRight, MapPin, Shield, Users } from "../components/Icons";
import { IconCards, SplitCta } from "../components/PageSections";
import { SectionHeading } from "../components/Marketing";
import ResponsiveImage from "../components/ResponsiveImage";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { corePageMetadata, siteConfig } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/over-ons");

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Van Dijk Rijschool" title="Persoonlijke rijles met" accent="transparante grenzen." intro="De website gebruikt alleen de bevestigde merknaam. Juridische handelsnaam, eigenaar, instructeurprofiel en precieze DriveYOU-relatie moeten nog primair worden bevestigd."><Breadcrumbs currentPath="/over-ons" items={[{ label: "Over ons" }]} /></PageHero>
      <section className="section"><div className="site-shell story-grid"><div><SectionHeading eyebrow="De lesaanpak" title="Leren zelfstandig beslissen." /><p>De inhoudelijke richting is een rijopleiding waarin basisvaardigheden, verkeersinzicht en zelfstandigheid logisch worden opgebouwd. De website vermijdt onbevestigde ervaring-, resultaat- en beschikbaarheidsclaims.</p><p>Een persoonlijke kennismaking blijft de juiste plek om niveau, planning en verwachtingen te bespreken.</p></div><figure className="story-visual"><ResponsiveImage imageBase="intake-bij-lesauto" alt="Kennismaking naast de zwarte Van Dijk Rijschool-lesauto" priority sizes="(max-width: 820px) 100vw, 50vw" /><span>Sfeerimpressie — geen echte instructeur of leerling geïdentificeerd</span></figure></div></section>
      <section className="section section--soft"><div className="site-shell"><SectionHeading eyebrow="Wat de site wel vastlegt" title="Eén merk, één bron." /><IconCards items={[{ icon: Users, title: "Merknaam", text: `${siteConfig.name} is bevestigd door gebruiker en merkassets.` },{ icon: Shield, title: "Geen fictief team", text: "Er wordt geen gegenereerde persoon als echte eigenaar of instructeur gepresenteerd." },{ icon: MapPin, title: "17 werkgebieden", text: "Plaatsen zijn servicegebieden, geen zeventien losse vestigingen." },{ icon: Shield, title: "Veilige schema-data", text: "Onbevestigd adres, telefoonnummer en KVK staan niet in structured data." }]} /></div></section>
      <section className="section"><div className="site-shell info-split"><div><SectionHeading eyebrow="Aangeleverde DriveYOU-uitleg" title="Zelfstandige instructeurs onder de naam DriveYOU." /><p>Volgens het document zijn rijinstructeurs zelfstandige ondernemers die rijden onder de naam DriveYOU. Een leerling doet rechtstreeks zaken met de rijinstructeur. Het garantiefonds is bedoeld om vooruitbetaalde lessen en/of CBR-examens kosteloos bij een andere DriveYOU-instructeur voort te zetten wanneer de eigen instructeur niet kan doorgaan.</p><a className="text-link" href="https://www.driveyou.nl/garantiefonds/" rel="noreferrer" target="_blank">Bekijk de actuele DriveYOU-voorwaarden <ArrowRight width="17" /></a></div><aside className="notice-card"><Shield width="25" /><h3>Needs verification</h3><p>De juridische handelsnaam, exacte franchise-/handelsrelatie en toepasselijkheid van het garantiefonds op iedere Van Dijk-leerling zijn nog niet primair bevestigd.</p></aside></div></section>
      <SplitCta title="Bekijk de aanpak zonder commerciële aannames." text="Lees de werkwijze of vergelijk de actuele bronpakketten." primaryHref="/werkwijze" primaryLabel="Bekijk werkwijze" />
    </main>
  );
}
