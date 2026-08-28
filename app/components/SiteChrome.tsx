import Link from "next/link";
import {
  ArrowRight,
  Lock,
  MapPin,
  Smartphone,
} from "./Icons";
import {
  footerNavigation,
  primaryNavigation,
  siteConfig,
} from "../lib/site";
import MobileNav from "./MobileNav";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand ${compact ? "brand--compact" : ""}`} href="/" aria-label="Van Dijk Rijschool home">
      <img src="/images/vd-mark.jpg" alt="" width="72" height="58" />
      <span className="brand__copy">
        <strong>VAN DIJK</strong>
        <small>RIJSCHOOL</small>
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="site-shell site-header__inner">
        <Brand compact />
        <nav className="desktop-nav" aria-label="Hoofdnavigatie">
          {primaryNavigation.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="header-login" href="/leerlingomgeving">
            <Lock width="16" /> Leerlingomgeving
          </Link>
          <Link className="button button--small" href="/proefles">
            Plan intake <ArrowRight width="16" />
          </Link>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>Persoonlijke autorijlessen, flexibel gepland en digitaal ondersteund in Den Haag en omgeving.</p>
            <div className="footer-badges">
              <span><MapPin width="16" /> {siteConfig.areaLabel}</span>
              <span><Smartphone width="16" /> Voortgang via NXTDRIVE</span>
            </div>
          </div>
          <div>
            <h3>Rijopleiding</h3>
            {primaryNavigation.slice(0, 3).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            <Link href="/configurator">Pakket samenstellen</Link>
            <Link href="/proefles">Proefles / intake</Link>
          </div>
          <div>
            <h3>Van Dijk</h3>
            {footerNavigation.slice(2).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            <Link href="/leerlingomgeving">Leerlingomgeving</Link>
          </div>
          <div>
            <h3>Werkgebied</h3>
            <Link href="/rijschool-den-haag">Rijschool Den Haag</Link>
            <Link href="/regio/scheveningen">Rijschool Scheveningen</Link>
            <Link href="/regio/rijswijk">Rijschool Rijswijk</Link>
            <Link href="/regio/voorburg">Rijschool Voorburg</Link>
            <Link href="/regio/leidschendam">Rijschool Leidschendam</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Van Dijk Rijschool</span>
          <span className="footer-affiliation">drive<span>•</span>you franchisenemer · Powered by NXTDRIVE · Premium prototype</span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/voorwaarden">Voorwaarden</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Breadcrumbs({ items, currentPath }: { items: { label: string; href?: string }[]; currentPath: string }) {
  const structuredItems = [
    { label: "Home", href: "/" },
    ...items.map((item, index) => ({ label: item.label, href: item.href ?? (index === items.length - 1 ? currentPath : "/") })),
  ];
  return (
    <>
      <nav className="breadcrumbs" aria-label="Kruimelpad">
        <Link href="/">Home</Link>
        {items.map((item) => (
          <span key={item.label}>
            <span aria-hidden="true">/</span>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </span>
        ))}
      </nav>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: structuredItems.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, item: new URL(item.href, siteConfig.url).toString() })) }} />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero__glow" />
      <div className="site-shell page-hero__inner">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title} {accent ? <em>{accent}</em> : null}</h1>
          <p>{intro}</p>
          {children}
        </div>
        <div className="page-hero__route" aria-hidden="true">
          <span>01</span><i /><span>02</span><i /><span>03</span><i /><span>04</span>
        </div>
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
