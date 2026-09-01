import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata } from "../lib/site";

export const metadata = pageMetadata(
  "Voorwaarden nog te bevestigen",
  "Overzicht van zakelijke voorwaarden die nog moeten worden aangeleverd voor Van Dijk Rijschool.",
  "/voorwaarden",
  { noIndex: true },
);

export default function TermsPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Noindex releasegate" title="Les- en pakketvoorwaarden" accent="zijn nog niet aangeleverd." intro="De eerdere fictieve voorwaarden zijn verwijderd. Deze pagina benoemt uitsluitend welke afspraken ontbreken en publiceert geen verzonnen juridische tekst."><Breadcrumbs currentPath="/voorwaarden" items={[{ label: "Voorwaarden" }]} /></PageHero>
      <section className="section"><article className="site-shell legal-copy">
        <p className="legal-warning">Geen bindende voorwaarden — zakelijke en juridische bevestiging vereist vóór echte inschrijving of betaling.</p>
        <h2>1. Les en planning</h2><p>Lesduur, annulering, no-show, ophaalafspraken en startbeschikbaarheid zijn niet bevestigd.</p>
        <h2>2. Pakketten en betaling</h2><p>Pakketgeldigheid, btw-status, restitutie, betalingstermijnen en het onvermijdbare karakter van inschrijfkosten moeten nog worden vastgelegd.</p>
        <h2>3. Examens</h2><p>De bron noemt examenprijzen en enkele pakketonderdelen, maar geen geldigheid, annuleringsregeling of precieze examendekking.</p>
        <h2>4. DriveYOU-garantiefonds</h2><p>De bron beschrijft de werking en een bijdrage van € 41,50. Toepasselijkheid, verplicht karakter en de actuele externe voorwaarden moeten worden bevestigd.</p>
        <h2>5. Proefles</h2><p>De bron vermeldt een 100% gratis proefles in startpakketten, maar specificeert geen duur of overige voorwaarden.</p>
        <h2>6. Volgende stap</h2><p>Publiceer pas bindende voorwaarden nadat de ondernemer en een bevoegde juridisch adviseur de volledige tekst hebben goedgekeurd.</p>
      </article></section>
    </main>
  );
}
