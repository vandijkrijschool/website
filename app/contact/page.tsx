import type { Metadata } from "next";
import { Mail, MapPin, Phone, Shield } from "../components/Icons";
import LeadForm from "../components/LeadForm";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { corePageMetadata, siteConfig } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/contact");

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Contact" title="We helpen je graag" accent="persoonlijk verder." intro="Bel, mail of stuur een bericht. Op werkdagen ontvang je binnen één werkdag een reactie."><Breadcrumbs currentPath="/contact" items={[{ label: "Contact" }]} /></PageHero>
      <section className="section"><div className="site-shell"><div className="contact-layout"><div className="contact-options">
        <article><span><Phone width="23" /></span><div><small>Telefoon en WhatsApp</small><h3><a href={`tel:${siteConfig.contact.telephone.value.replace(/\s/g, "")}`}>{siteConfig.contact.telephone.displayValue}</a></h3><p>Bereikbaar op werkdagen van 08:00 tot 21:00 en zaterdag van 08:00 tot 17:00.</p></div></article>
        <article><span><Mail width="23" /></span><div><small>E-mail</small><h3><a href={`mailto:${siteConfig.contact.email.value}`}>{siteConfig.contact.email.value}</a></h3><p>Je ontvangt meestal dezelfde werkdag een persoonlijk antwoord.</p></div></article>
        <article><span><MapPin width="23" /></span><div><small>Leslocatie</small><h3>{siteConfig.contact.streetAddress.value}</h3><p>{siteConfig.contact.postalCode.value} {siteConfig.contact.locality.value} · KVK {siteConfig.contact.kvk.value}</p></div></article>
        <article><span><Shield width="23" /></span><div><small>Openingstijden</small><h3>Maandag t/m zaterdag</h3><p>{siteConfig.contact.openingHours.value.join(" · ")}</p></div></article>
      </div><div id="contactformulier"><LeadForm kind="contact" /></div></div></div></section>
    </main>
  );
}
