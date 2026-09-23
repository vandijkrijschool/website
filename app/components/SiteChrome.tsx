import Link from "next/link";
import {
  ArrowRight,
  Lock,
} from "./Icons";
import {
  primaryNavigation,
  siteConfig,
} from "../lib/site";
import MobileNav from "./MobileNav";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand ${compact ? "brand--compact" : ""}`} href="/" aria-label={`${siteConfig.tradeName} homepage`}>
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
          <section>
            <h2>Van Dijk – Rijschool</h2>
            <p>De snelste weg naar jouw rijbewijs</p>
            <p>Zelfstandig franchisenemer van DriveYou</p>
            <p>KVK {siteConfig.contact.kvk.value}</p>
            <p>BTW-id {siteConfig.contact.vatId.value}</p>
          </section>
          <section>
            <h2>Contact</h2>
            <a href={`tel:${siteConfig.contact.telephone.value.replace(/\s/g, "")}`}>{siteConfig.contact.telephone.displayValue}</a>
            <a href={`mailto:${siteConfig.contact.email.value}`}>{siteConfig.contact.email.value} ↗</a>
            <p>{siteConfig.contact.locality.value}</p>
          </section>
          <section>
            <h2>Informatie</h2>
            <Link href="/voorwaarden">Algemene voorwaarden</Link>
            <Link href="/privacy">Privacyverklaring</Link>
            <Link href="/privacy#cookies">Cookiebeleid</Link>
          </section>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Van Dijk – Rijschool · Alle rechten voorbehouden</span>
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
