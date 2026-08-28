import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Lock } from "../components/Icons";
import StudentPortalDemo from "../components/StudentPortalDemo";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = {
  ...pageMetadata(
    "Leerlingomgeving",
    "Bekijk een interactieve demonstratie van hoe leerlingen van Van Dijk Rijschool via NXTDRIVE inzicht krijgen in afspraken, leerdoelen en voortgang.",
    "/leerlingomgeving",
  ),
  robots: { index: false, follow: true },
};

export default function StudentPortalPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="NXTDRIVE leerlingomgeving"
        title="Jouw rijopleiding"
        accent="altijd binnen handbereik."
        intro="Bekijk het volledige demodashboard: wissel tussen agenda, voortgang en lesverslagen. De productieomgeving krijgt een beveiligde persoonlijke login via NXTDRIVE."
      >
        <Breadcrumbs items={[{ label: "Leerlingomgeving" }]} />
      </PageHero>

      <section className="section section--portal">
        <div className="site-shell portal-intro-grid">
          <div className="portal-login">
            <span><Lock width="27" /></span>
            <small>Veilige productie-overdracht</small>
            <h2>Bekijk nu de interactieve demo.</h2>
            <p>Deze showcase verwerkt geen accounts, wachtwoorden of echte leerlinggegevens. In productie wordt de knop gekoppeld aan de juiste beveiligde NXTDRIVE-tenantomgeving.</p>
            <ul className="checklist">
              <li><Check width="17" /> Agenda en lestijden</li>
              <li><Check width="17" /> Persoonlijke leerdoelen</li>
              <li><Check width="17" /> Voortgang en lesverslagen</li>
            </ul>
            <Link className="button button--ghost" href="/contact">Hulp bij toegang <ArrowRight width="17" /></Link>
          </div>
          <div className="portal-demo-callout">
            <small>Demo zonder login</small>
            <strong>Alle schermen zijn gevuld met fictieve leerlingdata.</strong>
            <p>Klik in het dashboard door de vier onderdelen om de volledige ervaring te bekijken.</p>
          </div>
        </div>
        <div className="site-shell"><StudentPortalDemo /></div>
      </section>
    </main>
  );
}
