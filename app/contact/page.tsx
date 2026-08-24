import type { Metadata } from "next";
import { Clock, Mail, MapPin, Message, Phone } from "../components/Icons";
import LeadForm from "../components/LeadForm";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
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
      <section className="section"><div className="site-shell contact-layout"><div className="contact-options"><article><span><Message width="23" /></span><div><small>Snel en laagdrempelig</small><h3>WhatsApp</h3><p>Handig voor een korte vraag of om een geschikt belmoment af te spreken.</p><a className="text-link" href="#contactformulier">Start via het formulier</a></div></article><article><span><Phone width="23" /></span><div><small>Persoonlijk overleggen</small><h3>Telefonisch</h3><p>Laat je nummer en voorkeurstijd achter; we nemen contact met je op.</p><a className="text-link" href="#contactformulier">Vraag een belmoment aan</a></div></article><article><span><Mail width="23" /></span><div><small>Uitgebreide vraag</small><h3>E-mail</h3><p>Gebruik het formulier en kies e-mail als voorkeurskanaal.</p><a className="text-link" href="#contactformulier">Schrijf je bericht</a></div></article><article><span><MapPin width="23" /></span><div><small>Werkgebied</small><h3>Regio Den Haag</h3><p>Rijlessen op afspraak in Den Haag en omliggende plaatsen.</p><a className="text-link" href="/rijschool-den-haag">Bekijk het lesgebied</a></div></article><div className="availability-note"><Clock width="19" /><p>Omdat lessen en examens doorlopen, kunnen we niet altijd direct opnemen. Een terugbelverzoek voorkomt onnodig wachten.</p></div></div><div id="contactformulier"><LeadForm kind="contact" /></div></div></section>
    </main>
  );
}

