import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata } from "../lib/site";

export const metadata = pageMetadata(
  "Privacyverklaring voor het websiteprototype",
  "Lees hoe de lokale demo omgaat met formulierinvoer en configuratorgegevens.",
  "/privacy",
  { noIndex: true },
);

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Noindex privacy-informatie" title="De huidige demo verwerkt" accent="geen persoonsgegevens extern." intro="Een definitieve privacyverklaring vereist nog een bevestigde verwerkingsverantwoordelijke, contactroute, bewaartermijnen en echte verwerkers."><Breadcrumbs currentPath="/privacy" items={[{ label: "Privacy" }]} /></PageHero>
      <section className="section"><article className="site-shell legal-copy">
        <p className="legal-warning">Prototype — formulierinvoer blijft in de geopende browser en wordt niet verzonden of opgeslagen.</p>
        <h2>1. Invoer in formulieren</h2><p>De contact- en proeflesdemo vragen om naam, e-mail of telefoon en kunnen postcode, beschikbaarheid en een toelichting bevatten. Gebruik voor tests fictieve gegevens.</p>
        <h2>2. Lokale validatie</h2><p>De browser gebruikt de invoer uitsluitend om labels, foutmeldingen, plannerstates en een lokale demostatus te tonen. Er is geen leadendpoint, database, e-mail- of NXTDRIVE-koppeling.</p>
        <h2>3. Configuratoropslag</h2><p>Niet-persoonlijke configuratiekeuzes kunnen tijdelijk in sessionStorage en in een deelbare URL staan. Het gaat om ervaring, planningsvoorkeuren, pakket en betaaltermijnen.</p>
        <h2>4. Geen externe tracking</h2><p>De aangeleverde applicatie gebruikt geen advertentiecookies, analytics of marketingprofielen. Een latere productie-integratie vraagt een nieuwe privacybeoordeling.</p>
        <h2>5. Open beslispunten</h2><p>De juridische handelsnaam, verwerkingsverantwoordelijke, contactgegevens, doeleinden, grondslagen, bewaartermijnen, ontvangers en rechtenprocedure moeten nog primair worden vastgesteld.</p>
      </article></section>
    </main>
  );
}
