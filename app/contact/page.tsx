import type { Metadata } from "next";
import { DemoNotice } from "../components/DemoContent";
import { Clock, MapPin, Phone, RouteIcon, Shield } from "../components/Icons";
import LeadForm from "../components/LeadForm";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata, siteConfig } from "../lib/site";

export const metadata: Metadata = pageMetadata(
  "Contact met Van Dijk Rijschool Den Haag",
  "Neem contact op met Van Dijk Rijschool voor vragen over rijlessen, lespakketten, een intake of de actuele beschikbaarheid in regio Den Haag.",
  "/contact",
);

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Persoonlijk contact" title="Waar kunnen we je" accent="mee helpen?" intro="Stel je vraag over rijlessen, pakketten, overstappen of beschikbaarheid. We reageren via de contactmethode die jij kiest."><Breadcrumbs currentPath="/contact" items={[{ label: "Contact" }]} /></PageHero>
      <section className="section">
        <div className="site-shell">
          <DemoNotice
            title="Bedrijfsgegevens actueel, formulier nog in demonstratiemodus."
            text="Het telefoonnummer, adres en KVK-nummer hieronder zijn de bedrijfsgegevens van Van Dijk - Rijschool. Het formulier toont de volledige interactie, maar verzendt nog geen gegevens."
          />
          <div className="contact-layout">
            <div className="contact-options">
              <article><span><Phone width="23" /></span><div><small>Telefoon</small><h3>{siteConfig.phone}</h3><p>Neem telefonisch contact op voor vragen over rijlessen, intake of beschikbaarheid.</p><a className="text-link" href={siteConfig.phoneHref}>Bel Van Dijk - Rijschool</a></div></article>
              <article><span><MapPin width="23" /></span><div><small>Vestigingsadres</small><h3>{siteConfig.address.street}</h3><p>{siteConfig.address.postalCode} {siteConfig.address.locality}</p></div></article>
              <article><span><Shield width="23" /></span><div><small>Handelsregister</small><h3>KVK {siteConfig.chamberOfCommerceNumber}</h3><p>Handelsnaam: {siteConfig.tradeName}</p><a className="text-link" href={siteConfig.chamberOfCommerceUrl} target="_blank" rel="noreferrer">Bekijk bij KVK</a></div></article>
              <article><span><RouteIcon width="23" /></span><div><small>Werkgebied</small><h3>Regio Den Haag</h3><p>Den Haag, Scheveningen, Rijswijk, Voorburg en Leidschendam, afhankelijk van beschikbaarheid.</p><a className="text-link" href="/rijschool-den-haag">Bekijk het lesgebied</a></div></article>
              <div className="availability-note"><Clock width="19" /><p>Het formulier blijft lokaal en simuleert de reactie. Bel voor direct contact via <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.</p></div>
            </div>
            <div id="contactformulier"><LeadForm kind="contact" /></div>
          </div>
        </div>
      </section>
    </main>
  );
}
