import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata, siteConfig } from "../lib/site";

export const metadata = pageMetadata("Privacyverklaring", "Lees hoe Van Dijk - Rijschool in deze website omgaat met formulierinvoer en lokale configuratorgegevens.", "/privacy");

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Privacy" title="Zorgvuldig omgaan met" accent="jouw gegevens." intro="Deze verklaring legt uit wat de interactieve website wel en niet met formulierinvoer doet. De bedrijfsgegevens zijn actueel; formulieren werken nog in demonstratiemodus.">
        <Breadcrumbs currentPath="/privacy" items={[{ label: "Privacy" }]} />
      </PageHero>
      <section className="section"><article className="site-shell legal-copy">
        <p className="legal-warning">De formulieren verzenden nog geen gegevens. Invoer wordt alleen lokaal gebruikt om de werking van de website te demonstreren.</p>
        <h2>1. Welke gegevens je kunt invullen</h2><p>De contact- en proeflesformulieren vragen om een naam, e-mailadres of telefoonnummer en kunnen daarnaast postcode, beschikbaarheid en een vrije toelichting bevatten. Gebruik voor een demonstratie bij voorkeur fictieve gegevens.</p>
        <h2>2. Wat de demo met invoer doet</h2><p>Formulierinvoer wordt alleen in de geopende browser gebruikt om validatie, foutmeldingen en een successtatus te tonen. De demo verzendt deze gegevens niet, schrijft ze niet naar een database en stuurt geen e-mail of sms.</p>
        <h2>3. Lokale configuratorgegevens</h2><p>De pakketconfigurator kan keuzes tijdelijk in de sessie-opslag van de browser bewaren, zodat een bezoeker na navigeren verder kan gaan. Deze gegevens bevatten geen naam of contactgegevens en verdwijnen wanneer de browsersessie wordt beëindigd.</p>
        <h2>4. NXTDRIVE en DriveYou</h2><p>NXTDRIVE-activiteiten, proeflesmomenten, leerlingprofielen en DriveYou-verwijzingen worden lokaal gesimuleerd. Er gaat vanuit dit prototype geen informatie naar deze of andere externe partijen.</p>
        <h2>5. Cookies en statistieken</h2><p>Het prototype gebruikt geen advertentiecookies, analytics, trackers of marketingprofielen. Er is daarom geen cookiebanner nodig voor de gedemonstreerde werking.</p>
        <h2>6. Contact en bedrijfsgegevens</h2><p>{siteConfig.tradeName}, {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.locality}. KVK-nummer: {siteConfig.chamberOfCommerceNumber}. Telefonisch bereikbaar via <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>. Versie: 28 augustus 2026.</p>
      </article></section>
    </main>
  );
}
