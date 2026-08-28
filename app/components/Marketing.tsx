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
    { icon: Users, title: "Persoonlijk & geduldig", text: "Les op een tempo dat bij jou past" },
    { icon: Calendar, title: "Flexibele lestijden", text: "Rond school, werk en andere afspraken" },
    { icon: Gauge, title: "Gerichte vooruitgang", text: "Duidelijke leerdoelen per les" },
    { icon: Car, title: "Moderne lesaanpak", text: "Inzicht en planning via NXTDRIVE" },
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
          {item.featured ? <span className="package-card__badge">Meest gekozen</span> : null}
          <div className="package-card__top">
            <span className="package-card__number">{String(item.lessons).padStart(2, "0")}</span>
            <div><small>lesuren</small><h3>{item.name}</h3></div>
          </div>
          {!compact ? <p>{item.description}</p> : null}
          <ul>
            {item.features.slice(0, compact ? 3 : undefined).map((feature) => (
              <li key={feature}><Check width="17" /> {feature}</li>
            ))}
          </ul>
          <div className="package-card__price">
            <span>Totaalprijs</span>
            <strong>{formatPrice(item.price)}</strong>
          </div>
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
      <span><Clock width="18" /> Lestempo afgestemd op jouw agenda</span>
    </div>
  );
}
