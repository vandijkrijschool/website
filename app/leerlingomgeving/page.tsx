import Link from "next/link";
import { ArrowRight, Check, Lock, Shield } from "../components/Icons";
import ResponsiveImage from "../components/ResponsiveImage";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata } from "../lib/site";

export const metadata = pageMetadata(
  "Leerlingomgeving in PlanGo",
  "Lees hoe leerlingen via PlanGo inzicht krijgen in afspraken, leerdoelen, voortgang en lesverslagen.",
  "/leerlingomgeving",
  { noIndex: true, imageBase: "plango-tablet-met-lesauto" },
);

export default function StudentPortalPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="PlanGo leerlingomgeving"
        title="Jouw rijopleiding"
        accent="altijd binnen handbereik."
        intro="Bekijk je agenda, voortgang, persoonlijke leerdoelen en lesverslagen overzichtelijk in PlanGo."
      >
        <Breadcrumbs currentPath="/leerlingomgeving" items={[{ label: "Leerlingomgeving" }]} />
      </PageHero>

      <section className="section section--soft">
        <div className="site-shell local-intro">
          <div className="portal-login">
            <span><Lock width="27" /></span>
            <small>Alles op één plek</small>
            <h2>Je persoonlijke rijlesoverzicht.</h2>
            <p>Na je inschrijving ontvang je de gegevens voor je persoonlijke leerlingomgeving in PlanGo.</p>
            <ul className="checklist">
              <li><Check width="17" /> Agenda en lestijden</li>
              <li><Check width="17" /> Persoonlijke leerdoelen</li>
              <li><Check width="17" /> Voortgang en lesverslagen</li>
            </ul>
            <Link className="button button--ghost" href="/contact">Hulp bij toegang <ArrowRight width="17" /></Link>
          </div>
          <figure className="local-photo">
            <ResponsiveImage imageBase="plango-tablet-met-lesauto" alt="Tablet met een lesvoortgangsoverzicht en de Van Dijk-lesauto op de achtergrond" sizes="(max-width: 820px) 100vw, 50vw" />
            <figcaption><Shield width="22" /><span>PlanGo</span><strong>Alles overzichtelijk</strong><small>Agenda · doelen · voortgang</small></figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}
