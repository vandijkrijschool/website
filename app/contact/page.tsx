import type { Metadata } from "next";
import { DemoNotice } from "../components/DemoContent";
import { Clock, Mail, MapPin, Message, Phone } from "../components/Icons";
import LeadForm from "../components/LeadForm";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { demoContact } from "../lib/demo";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = pageMetadata(
  "Contact met Van Dijk Rijschool Den Haag",
  "Neem contact op met Van Dijk Rijschool voor vragen over rijlessen, lespakketten, een intake of de actuele beschikbaarheid in regio Den Haag.",
  "/contact",
);

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Persoonlijk contact" title="Waar kunnen we je" accent="mee helpen?" intro="Stel je vraag over rijlessen, pakketten, overstappen of beschikbaarheid. We reageren via de contactmethode die jij kiest."><Breadcrumbs items={[{ label: "Contact" }]} /></PageHero>
      <section className="section">
        <div className="site-shell">
          <DemoNotice
            title="Contactpagina volledig gevuld met veilige voorbeeldgegevens."
            text="Het telefoonnummer, e-mailadres en de openingstijden zijn demo-data en niet actief. Gebruik het formulier om de interactie en successtatus van het prototype te bekijken."
          />
          <div className="contact-layout">
            <div className="contact-options">
              <article><span><Message width="23" /></span><div><small>Demo WhatsApp</small><h3>{demoContact.phone}</h3><p>Voorbeeldkanaal voor een korte vraag of een geschikt belmoment.</p><a className="text-link" href="#contactformulier">Open het demoformulier</a></div></article>
              <article><span><Phone width="23" /></span><div><small>Voorbeeldbeschikbaarheid</small><h3>Telefonisch</h3><p>{demoContact.availability}</p><a className="text-link" href="#contactformulier">Vraag een demobelmoment aan</a></div></article>
              <article><span><Mail width="23" /></span><div><small>Demo e-mailadres</small><h3>{demoContact.email}</h3><p>Wordt vóór livegang vervangen door het officiële zakelijke adres.</p><a className="text-link" href="#contactformulier">Schrijf een demobericht</a></div></article>
              <article><span><MapPin width="23" /></span><div><small>Werkgebied</small><h3>Regio Den Haag</h3><p>{demoContact.location}</p><a className="text-link" href="/rijschool-den-haag">Bekijk het lesgebied</a></div></article>
              <div className="availability-note"><Clock width="19" /><p>Prototype-responstijden zijn niet bindend. De echte bereikbaarheid en reactietermijn worden vóór livegang bevestigd.</p></div>
            </div>
            <div id="contactformulier"><LeadForm kind="contact" /></div>
          </div>
        </div>
      </section>
    </main>
  );
}
