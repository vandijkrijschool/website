import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Check, Gauge, Lock, Smartphone } from "../components/Icons";
import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = { ...pageMetadata("Leerlingomgeving", "Bekijk hoe leerlingen van Van Dijk Rijschool via NXTDRIVE inzicht krijgen in afspraken, leerdoelen en voortgang.", "/leerlingomgeving"), robots: { index: false, follow: true } };

export default function StudentPortalPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="NXTDRIVE leerlingomgeving" title="Jouw rijopleiding" accent="altijd binnen handbereik." intro="Bekijk je lesagenda, leerdoelen en ontwikkeling in één beveiligde omgeving. De echte login wordt tijdens de NXTDRIVE-koppeling geactiveerd."><Breadcrumbs items={[{ label: "Leerlingomgeving" }]} /></PageHero>
      <section className="section"><div className="site-shell portal-layout"><div className="portal-login"><span><Lock width="27" /></span><small>Beveiligde toegang</small><h2>Inloggen via NXTDRIVE</h2><p>De productieversie stuurt leerlingen door naar de juiste beveiligde tenantomgeving. Dit prototype verwerkt geen accounts of wachtwoorden.</p><button className="button" disabled type="button">Login wordt gekoppeld <ArrowRight width="17" /></button><Link className="text-link" href="/contact">Hulp nodig met toegang?</Link></div><div className="portal-preview"><div className="portal-preview__nav"><strong>NXTDRIVE</strong><span>Dashboard</span></div><div className="portal-preview__welcome"><small>Welkom terug</small><h3>Goed op weg naar zelfstandig rijden.</h3></div><div className="portal-preview__grid"><article><Calendar width="21" /><small>Volgende les</small><strong>Dinsdag 14:30</strong><span>90 minuten</span></article><article><Gauge width="21" /><small>RIS-voortgang</small><strong>68%</strong><span>Volgende doel: invoegen</span></article><article><Smartphone width="21" /><small>Lesvoorbereiding</small><strong>2 aandachtspunten</strong><span>Bekijk voor vertrek</span></article><article><Check width="21" /><small>Deze week</small><strong>3 doelen afgerond</strong><span>Ga zo door</span></article></div></div></div></section>
    </main>
  );
}

