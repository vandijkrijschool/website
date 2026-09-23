import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata, siteConfig } from "../lib/site";

export const metadata = pageMetadata(
  "Privacyverklaring",
  "Lees hoe Van Dijk – Rijschool omgaat met persoonsgegevens, formulieren en de digitale leerlingomgeving.",
  "/privacy",
  { noIndex: true },
);

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Jouw privacy" title="We gaan zorgvuldig om" accent="met je gegevens." intro="We gebruiken persoonsgegevens alleen voor contact, lesplanning, voortgang en de uitvoering van je rijopleiding."><Breadcrumbs currentPath="/privacy" items={[{ label: "Privacy" }]} /></PageHero>
      <section className="section"><article className="site-shell legal-copy">
        <p className="legal-warning">Laatst bijgewerkt op 23 september 2026.</p>
        <h2>1. Wie is verantwoordelijk?</h2><p>{siteConfig.legalName} is verantwoordelijk voor de verwerking van persoonsgegevens. KVK {siteConfig.contact.kvk.value}, BTW-id {siteConfig.contact.vatId.value}. Voor privacyvragen kun je mailen naar <a href={`mailto:${siteConfig.contact.email.value}`}>{siteConfig.contact.email.value}</a>.</p>
        <h2>2. Welke gegevens gebruiken we?</h2><p>Via het intake- en contactformulier kun je je naam, e-mailadres, telefoonnummer, postcode, beschikbaarheid, pakketvoorkeur en een toelichting invullen. In PlanGo kunnen afspraken, leerdoelen, voortgang en lesverslagen worden verwerkt.</p>
        <h2>3. Waarom gebruiken we deze gegevens?</h2><p>We gebruiken je gegevens om vragen te beantwoorden, een proefles of rijles af te stemmen, de lesovereenkomst uit te voeren, je voortgang bij te houden en te voldoen aan wettelijke administratieplichten.</p>
        <h2>4. Versturen van het formulier</h2><p>Het formulier verstuurt je aanvraag rechtstreeks naar info@vandijkrijschool.nl. De website bewaart de ingevulde gegevens niet in een eigen database. De gegevens worden alleen gebruikt om je vraag of proeflesaanvraag te behandelen.</p>
        <h2>5. Dienstverleners</h2><p>Voor planning en voortgang gebruiken we PlanGo. Voor de franchiseformule en het garantiefonds werken we samen met DriveYou. We delen alleen gegevens die nodig zijn voor de betreffende dienstverlening.</p>
        <h2 id="cookies">6. Cookiebeleid</h2><p>Deze website gebruikt geen advertentiecookies, marketingprofielen of trackingcookies. Alleen technisch noodzakelijke browserfuncties kunnen worden gebruikt om de website goed en veilig te laten werken.</p>
        <h2>7. Jouw rechten</h2><p>Je kunt vragen om inzage, correctie, verwijdering, beperking of overdracht van je persoonsgegevens. Stuur je verzoek naar <a href={`mailto:${siteConfig.contact.email.value}`}>{siteConfig.contact.email.value}</a>.</p>
      </article></section>
    </main>
  );
}
