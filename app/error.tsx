"use client";

import Link from "next/link";
import { ArrowRight, RouteIcon } from "./components/Icons";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="route-state" id="main-content">
      <div>
        <span className="route-state__icon"><RouteIcon width="32" /></span>
        <small>Tijdelijke omleiding</small>
        <h1>Deze route kon niet worden geladen.</h1>
        <p>Er zijn geen formuliergegevens verzonden of verloren gegaan. Probeer de pagina opnieuw of ga terug naar de homepage.</p>
        <div className="button-row">
          <button className="button" onClick={reset} type="button">Probeer opnieuw <ArrowRight width="17" /></button>
          <Link className="button button--ghost" href="/">Naar de homepage</Link>
        </div>
      </div>
    </main>
  );
}

