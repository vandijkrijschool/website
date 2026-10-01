import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield } from "../components/Icons";
import DriveYouLogo from "../components/DriveYouLogo";
import { Breadcrumbs, JsonLd, PageHero } from "../components/SiteChrome";
import { faqFacts, formatPrice, guaranteeFundFee, singleRateById } from "../lib/content";
import { corePageMetadata, siteConfig } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/faq");

export default function FaqPage() {
  const theory = singleRateById.get("itheorie")!;
  return (
    <main id="main-content">
      <PageHero eyebrow="Praktische informatie" title="Veelgestelde vragen" accent="helder beantwoord." intro="Alles wat je wilt weten over lessen, planning, pakketten, betalen en theorie."><Breadcrumbs currentPath="/faq" items={[{ label: "Veelgestelde vragen" }]} /></PageHero>
      <section className="section"><div className="site-shell faq-page"><section><h2>Rijlessen, planning en theorie</h2><div className="faq-list">{faqFacts.map((fact) => <details key={fact.id}><summary>{fact.question}<span>+</span></summary><p>{fact.answer}</p></details>)}</div></section></div></section>
      <section className="section section--soft"><div className="site-shell info-split"><article className="notice-card notice-card--driveyou"><DriveYouLogo inverse /><Shield width="25" /><h2>DriveYOU-garantiefonds</h2><p>Deelname is vrijwillig en kost eenmalig {formatPrice(guaranteeFundFee.amount)}. Bij langdurige of permanente uitval van je instructeur kunnen vooruitbetaalde rijlessen en/of CBR-examens volgens de voorwaarden kosteloos worden voortgezet bij een andere aangesloten DriveYOU-instructeur.</p><a className="text-link" href="https://www.driveyou.nl/garantiefonds" rel="noreferrer" target="_blank">Meer over het garantiefonds <ArrowRight width="17" /></a></article><article className="notice-card"><Shield width="25" /><h2>iTheorie</h2><p>Online studeren, 50 proefexamens, livestream en leren in eigen tempo voor {formatPrice(theory.amount)} bij een adviesprijs van € 79.</p><Link className="text-link" href="/theorie">Bekijk alle theorie-inhoud <ArrowRight width="17" /></Link></article></div></section>
      <section className="section section--compact"><div className="site-shell split-cta"><div><span className="eyebrow">Nog een vraag?</span><h2>We helpen je graag persoonlijk.</h2><p>Bel, mail of stuur je vraag via het contactformulier.</p></div><div className="button-row"><Link className="button" href="/contact">Neem contact op <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/tarieven">Bekijk tarieven</Link></div></div></section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqFacts.map((fact) => ({ "@type": "Question", name: fact.question, acceptedAnswer: { "@type": "Answer", text: fact.answer } })), url: `${siteConfig.url}/faq` }} />
    </main>
  );
}
