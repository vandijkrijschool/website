import type { Metadata } from "next";
import { Mail, MapPin, Phone, Shield } from "../components/Icons";
import LeadForm from "../components/LeadForm";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { corePageMetadata, siteConfig } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/contact");

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Contact" title="We helpen je graag" accent="persoonlijk verder." intro="Bel, mail of stuur een bericht over rijlessen, pakketten of je intake."><Breadcrumbs currentPath="/contact" items={[{ label: "Contact" }]} /></PageHero>
      <section className="section"><div className="site-shell"><div className="contact-layout"><div className="contact-options">
        <article><span><Phone width="23" /></span><div><small>Telefoon en WhatsApp</small><h3><a href={`tel:${siteConfig.contact.telephone.value.replace(/\s/g, "")}`}>{siteConfig.contact.telephone.displayValue}</a></h3><p>Bel of stuur een WhatsApp-bericht voor vragen over rijlessen, pakketten of een intake.</p></div></article>
        <article><span><Mail width="23" /></span><div><small>E-mail</small><h3><a href={`mailto:${siteConfig.contact.email.value}`}>{siteConfig.contact.email.value}</a></h3><p>Mail je vraag of geef je voorkeuren door via het contactformulier.</p></div></article>
        <article><span><MapPin width="23" /></span><div><small>Werkgebied</small><h3>{siteConfig.contact.locality.value}</h3><p>Bekijk alle plaatsen op de pagina Werkgebied.</p></div></article>
        <article><span><Shield width="23" /></span><div><small>Bedrijfsgegevens</small><h3>KVK {siteConfig.contact.kvk.value}</h3><p>BTW-id {siteConfig.contact.vatId.value}</p></div></article>
      </div><div id="contactformulier"><LeadForm kind="contact" /></div></div></div></section>
    </main>
  );
}
