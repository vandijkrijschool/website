import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata } from "../lib/site";

export const metadata = pageMetadata(
  "Algemene voorwaarden",
  "Lees de les-, pakket-, betaal- en annuleringsvoorwaarden van Van Dijk Rijschool.",
  "/voorwaarden",
  { noIndex: true },
);

export default function TermsPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Duidelijke afspraken" title="Les- en pakketvoorwaarden" accent="zonder verrassingen." intro="Hier vind je de belangrijkste afspraken over rijlessen, pakketten, betaling, annuleren en examens."><Breadcrumbs currentPath="/voorwaarden" items={[{ label: "Voorwaarden" }]} /></PageHero>
      <section className="section"><article className="site-shell legal-copy">
        <p className="legal-warning">Versie 1 september 2026 · Van toepassing op nieuwe inschrijvingen en pakketten.</p>
        <h2>1. Rijlessen en planning</h2><p>Een standaard rijles duurt 60 minuten. Je kunt tot 48 uur voor aanvang kosteloos verplaatsen of annuleren. Bij een latere annulering of no-show wordt de gereserveerde lestijd in rekening gebracht. Ophalen is mogelijk bij huis, school, werk of een afgesproken station binnen het werkgebied.</p>
        <h2>2. Pakketten en betaling</h2><p>Alle bedragen zijn inclusief btw. Een pakket blijft 12 maanden geldig vanaf de eerste rijles. Nieuwe leerlingen betalen eenmalig € 39,50 inschrijfkosten en € 41,50 voor het DriveYOU-garantiefonds. Betaling kan in één keer of in 2, 3 of 4 termijnen; bij termijnen geldt eenmalig € 39 administratiekosten.</p>
        <h2>3. Examens</h2><p>Een praktijkexamen of tussentijdse toets wordt aangevraagd zodra leerling en instructeur samen bepalen dat de voorbereiding passend is. De prijs omvat aanvraag, gebruik van de lesauto en begeleiding. Voor verplaatsen of annuleren gelden de actuele termijnen van het CBR.</p>
        <h2>4. DriveYOU-garantiefonds</h2><p>Bij uitval van de eigen instructeur kunnen vooruitbetaalde rijlessen en CBR-examens kosteloos worden voortgezet bij een andere aangesloten DriveYOU-instructeur. De eenmalige bijdrage bedraagt € 41,50.</p>
        <h2>5. Gratis proefles</h2><p>De proefles duurt 60 minuten en is gratis bij inschrijving voor een startpakket. Je maakt kennis met de lesauto, krijgt een niveau-inschatting en ontvangt persoonlijk pakketadvies.</p>
        <h2>6. Vragen en klachten</h2><p>Vragen of klachten kun je sturen naar info@voorbeeld.vandijkrijschool.nl. Je ontvangt binnen vijf werkdagen een inhoudelijke reactie.</p>
      </article></section>
    </main>
  );
}
