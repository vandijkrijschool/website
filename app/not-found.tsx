import Link from "next/link";
import { ArrowRight, RouteIcon } from "./components/Icons";

export default function NotFound() {
  return <main id="main-content" className="not-found"><div><span><RouteIcon width="34" /></span><small>404 · Verkeerde afslag</small><h1>Deze route bestaat niet.</h1><p>Ga terug naar de homepage of vergelijk de beschikbare lespakketten.</p><div className="button-row"><Link className="button" href="/">Naar de homepage <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/lespakketten">Bekijk lespakketten</Link></div></div></main>;
}
