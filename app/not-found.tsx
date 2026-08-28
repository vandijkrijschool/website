import Link from "next/link";
import { ArrowRight, RouteIcon } from "./components/Icons";

export default function NotFound() {
  return <main id="main-content" className="not-found"><div><span><RouteIcon width="34" /></span><small>404 · Verkeerde afslag</small><h1>Deze route bestaat niet.</h1><p>Ga terug naar de homepage of stel direct jouw lespakket samen.</p><div className="button-row"><Link className="button" href="/">Naar de homepage <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/configurator">Pakket samenstellen</Link></div></div></main>;
}
