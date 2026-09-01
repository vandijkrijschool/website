import type { Metadata } from "next";
import { DemoNotice } from "../components/DemoContent";
import { Mail, MapPin, Phone, Shield } from "../components/Icons";
import LeadForm from "../components/LeadForm";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { corePageMetadata } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/contact");

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Veilige contactdemo" title="Stel je vraag zonder" accent="schijnverzending." intro="Telefoon, e-mail, adres, KVK en privacyverantwoordelijke zijn nog niet primair bevestigd. Het formulier valideert daarom alleen lokaal."><Breadcrumbs currentPath="/contact" items={[{ label: "Contact" }]} /></PageHero>
      <section className="section"><div className="site-shell"><DemoNotice title="Contactgegevens en endpoint zijn releasegates." text="De bestaande repositorywaarden worden niet als bevestigde bedrijfsgegevens gepubliceerd. De demo hieronder verzendt en bewaart niets." /><div className="contact-layout"><div className="contact-options">
        <article><span><Phone width="23" /></span><div><small>Telefoon</small><h3>Nog te bevestigen</h3><p>Primair bevestigen door de ondernemer voordat een belknop of schema-telefoonnummer live gaat.</p></div></article>
        <article><span><Mail width="23" /></span><div><small>E-mail</small><h3>Niet aangeleverd</h3><p>Er wordt geen adres verzonnen en geen formulierendpoint gesimuleerd als echte verzending.</p></div></article>
        <article><span><MapPin width="23" /></span><div><small>Adres en KVK</small><h3>Nog te bevestigen</h3><p>Geen onbevestigde lokale vestiging of juridische identiteit in structured data.</p></div></article>
        <article><span><Shield width="23" /></span><div><small>Privacy</small><h3>Demo zonder opslag</h3><p>Totdat verwerkingsverantwoordelijkheid en beveiligde verwerking bestaan, blijft alle invoer lokaal.</p></div></article>
      </div><div id="contactformulier"><LeadForm kind="contact" /></div></div></div></section>
    </main>
  );
}
