import Link from "next/link";
import { ArrowRight, Check, MapPin } from "./Icons";

export function IconCards({ items }: { items: { icon: React.ComponentType<{ width?: string | number }>; title: string; text: string }[] }) {
  return (
    <div className="icon-card-grid">
      {items.map(({ icon: CardIcon, title, text }) => <article key={title}><span><CardIcon width="24" /></span><h3>{title}</h3><p>{text}</p></article>)}
    </div>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return <ul className="checklist">{items.map((item) => <li key={item}><Check width="17" /> {item}</li>)}</ul>;
}

export function SplitCta({ title, text, primaryHref = "/proefles", primaryLabel = "Vraag een intake aan" }: { title: string; text: string; primaryHref?: string; primaryLabel?: string }) {
  return (
    <section className="section section--compact"><div className="site-shell split-cta"><div><span className="eyebrow">Volgende stap</span><h2>{title}</h2><p>{text}</p></div><div className="button-row"><Link className="button" href={primaryHref}>{primaryLabel} <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/configurator">Stel eerst je pakket samen</Link></div></div></section>
  );
}

export function AreaLinks() {
  const areas = [
    ["Den Haag", "/rijschool-den-haag"],
    ["Scheveningen", "/regio/scheveningen"],
    ["Rijswijk", "/regio/rijswijk"],
    ["Voorburg", "/regio/voorburg"],
    ["Leidschendam", "/regio/leidschendam"],
  ];
  return <div className="area-link-grid">{areas.map(([label, href]) => <Link href={href} key={href}><MapPin width="18" /><span><small>Rijschool</small><strong>{label}</strong></span><ArrowRight width="17" /></Link>)}</div>;
}
