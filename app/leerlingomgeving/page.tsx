import Link from "next/link";
import { ArrowRight, Check, Lock } from "../components/Icons";
import StudentPortalDemo from "../components/StudentPortalDemo";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata } from "../lib/site";

export const metadata = pageMetadata(
  "Leerlingomgeving",
  "Bekijk hoe leerlingen via NXTDRIVE inzicht krijgen in afspraken, leerdoelen, voortgang en lesverslagen.",
  "/leerlingomgeving",
  { noIndex: true },
);

export default function StudentPortalPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="NXTDRIVE leerlingomgeving"
        title="Jouw rijopleiding"
        accent="altijd binnen handbereik."
        intro="Bekijk je agenda, voortgang, persoonlijke leerdoelen en lesverslagen in één overzichtelijke omgeving."
      >
        <Breadcrumbs currentPath="/leerlingomgeving" items={[{ label: "Leerlingomgeving" }]} />
      </PageHero>

      <section className="section section--portal">
        <div className="site-shell portal-intro-grid">
          <div className="portal-login">
            <span><Lock width="27" /></span>
            <small>Alles op één plek</small>
            <h2>Ontdek de leerlingomgeving.</h2>
            <p>Na je inschrijving ontvang je persoonlijke toegang tot NXTDRIVE op je telefoon, tablet en computer.</p>
            <ul className="checklist">
              <li><Check width="17" /> Agenda en lestijden</li>
              <li><Check width="17" /> Persoonlijke leerdoelen</li>
              <li><Check width="17" /> Voortgang en lesverslagen</li>
            </ul>
            <Link className="button button--ghost" href="/contact">Hulp bij toegang <ArrowRight width="17" /></Link>
          </div>
          <div className="portal-demo-callout">
            <small>Direct inzicht</small>
            <strong>Van je volgende les tot je laatste voortgangsupdate.</strong>
            <p>Klik door de vier onderdelen om agenda, doelen en lesverslagen te bekijken.</p>
          </div>
        </div>
        <div className="site-shell"><StudentPortalDemo /></div>
      </section>
    </main>
  );
}
