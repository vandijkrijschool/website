import Link from "next/link";
import { ArrowRight, Calendar, Car, Check, Clock, Gauge, Shield, Users } from "./Icons";
import { formatPrice, packages } from "../lib/site";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export function TrustRail() {
  const items = [
    { icon: Users, title: "Persoonlijke aanpak", text: "Lesopbouw afgestemd op jouw niveau" },
    { icon: Calendar, title: "Snel starten", text: "Meestal binnen 7 dagen je eerste les" },
    { icon: Gauge, title: "Duidelijke prijzen", text: "Vooraf inzicht in alle vaste kosten" },
    { icon: Car, title: "Flexibel lessen", text: "Overdag, ’s avonds en op zaterdag" },
  ];

  return (
    <div className="trust-rail" role="region" aria-label="Voordelen van Van Dijk Rijschool">
      <div className="site-shell trust-rail__grid">
        {items.map(({ icon: ItemIcon, title, text }) => (
          <article key={title}>
            <span><ItemIcon width="22" /></span>
            <div><strong>{title}</strong><small>{text}</small></div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function PackageCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`package-grid ${compact ? "package-grid--compact" : ""}`}>
      {packages.map((item) => (
        <article className={`package-card ${item.featured ? "package-card--featured" : ""}`} id={item.id} key={item.id}>
          {item.featured ? <span className="package-card__badge">Inclusief iTheorie en toets</span> : null}
          <div className="package-card__top">
            <span className="package-card__number">{String(item.lessonCount).padStart(2, "0")}</span>
            <div><small>rijlessen</small><h3>{item.name}</h3></div>
          </div>
          {!compact ? <p>{item.description}</p> : null}
          <ul>
            {item.includes.slice(0, compact ? 4 : undefined).map((feature) => (
              <li key={feature}><Check width="17" /> {feature}</li>
            ))}
          </ul>
          <div className="package-card__price">
            <span>Pakketprijs</span>
            <strong>{formatPrice(item.amountCents)}</strong>
          </div>
          <p className="package-card__fee-note">Exclusief eenmalig € 39,50 inschrijfkosten en € 41,50 garantiefonds.</p>
          <Link className={item.featured ? "button" : "button button--ghost"} href={`/configurator?pakket=${item.id}`}>
            Kies dit pakket <ArrowRight width="17" />
          </Link>
        </article>
      ))}
    </div>
  );
}

export function AssuranceStrip() {
  return (
    <div className="assurance-strip">
      <span><Shield width="18" /> Duidelijke pakketinhoud</span>
      <span><Check width="18" /> Persoonlijk advies vóór je start</span>
      <span><Clock width="18" /> 12 maanden pakketgeldigheid</span>
    </div>
  );
}
