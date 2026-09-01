import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata } from "../lib/site";

export const metadata = pageMetadata(
  "Privacyverklaring",
  "Lees hoe Van Dijk Rijschool omgaat met persoonsgegevens, formulieren en de digitale leerlingomgeving.",
  "/privacy",
  { noIndex: true },
);

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Jouw privacy" title="We gaan zorgvuldig om" accent="met je gegevens." intro="We gebruiken persoonsgegevens alleen voor contact, lesplanning, voortgang en de uitvoering van je rijopleiding."><Breadcrumbs currentPath="/privacy" items={[{ label: "Privacy" }]} /></PageHero>
      <section className="section"><article className="site-shell legal-copy">
        <p className="legal-warning">Laatst bijgewerkt op 1 september 2026.</p>
        <h2>1. Wie is verantwoordelijk?</h2><p>Van Dijk Rijschool, Voorbeeldlaan 24, 2511 AB Den Haag, is verantwoordelijk voor de verwerking van persoonsgegevens. Voor privacyvragen kun je mailen naar info@voorbeeld.vandijkrijschool.nl.</p>
        <h2>2. Welke gegevens gebruiken we?</h2><p>Via contact- en proeflesformulieren kunnen we naam, e-mailadres, telefoonnummer, postcode, beschikbaarheid, pakketvoorkeur en je bericht ontvangen. In de leerlingomgeving verwerken we afspraken, leerdoelen, voortgang en lesverslagen.</p>
        <h2>3. Waarom gebruiken we deze gegevens?</h2><p>We gebruiken je gegevens om vragen te beantwoorden, een proefles of rijles te plannen, de overeenkomst uit te voeren, je voortgang bij te houden en te voldoen aan wettelijke administratieplichten.</p>
        <h2>4. Bewaartermijnen en partners</h2><p>Contactaanvragen bewaren we maximaal 24 maanden. Financiële administratie bewaren we zeven jaar. Voor planning en voortgang gebruiken we NXTDRIVE; voor het garantiefonds werken we samen met DriveYOU. Met dienstverleners maken we passende privacy- en beveiligingsafspraken.</p>
        <h2>5. Cookies en configurator</h2><p>De configurator bewaart niet-persoonlijke keuzes tijdelijk in je browsersessie en eventueel in een deelbare URL. We gebruiken geen advertentiecookies of marketingprofielen.</p>
        <h2>6. Jouw rechten</h2><p>Je kunt vragen om inzage, correctie, verwijdering, beperking of overdracht van je gegevens. Mail je verzoek naar info@voorbeeld.vandijkrijschool.nl; je ontvangt binnen één maand een reactie.</p>
      </article></section>
    </main>
  );
}
