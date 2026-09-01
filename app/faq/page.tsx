import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield } from "../components/Icons";
import { Breadcrumbs, JsonLd, PageHero } from "../components/SiteChrome";
import { faqFacts, formatPrice, guaranteeFundFee, singleRateById } from "../lib/content";
import { corePageMetadata, siteConfig } from "../lib/site";

export const metadata: Metadata = corePageMetadata("/faq");

const statusCopy: Record<string, string> = {
  timeSensitiveNeedsVerification: "Tijdgevoelig — vóór publieke indexering opnieuw bevestigen.",
  sourceProvidedTermsNeedVerification: "Brongegeven — aanvullende betaalvoorwaarden ontbreken.",
  sourceProvidedAndExternallyConfirmed: "Brongegeven — actualiteit bij iedere inhoudsreview controleren.",
};

export default function FaqPage() {
  const theory = singleRateById.get("itheorie")!;
  return (
    <main id="main-content">
      <PageHero eyebrow="Brongetrouwe antwoorden" title="Veelgestelde vragen" accent="met actualiteitsstatus." intro="De vier vragen en antwoorden hieronder komen rechtstreeks uit het aangeleverde document. Tijdgevoelige antwoorden zijn zichtbaar gemarkeerd."><Breadcrumbs currentPath="/faq" items={[{ label: "Veelgestelde vragen" }]} /></PageHero>
      <section className="section"><div className="site-shell faq-page"><section><h2>Rijlessen, planning en theorie</h2><div className="faq-list">{faqFacts.map((fact) => <details key={fact.id}><summary>{fact.question}<span>+</span></summary><p>{fact.answer}</p><small className="verification-flag">{statusCopy[fact.status]}</small></details>)}</div></section></div></section>
      <section className="section section--soft"><div className="site-shell info-split"><article className="notice-card"><Shield width="25" /><h2>DriveYOU-garantiefonds</h2><p>De eenmalige bijdrage bedraagt {formatPrice(guaranteeFundFee.amount)}. Volgens de bron kunnen vooruitbetaalde lessen en/of CBR-examens bij uitval van de instructeur kosteloos worden voortgezet bij een andere DriveYOU-instructeur.</p><small className="verification-flag">Verplicht karakter en actuele toepasselijkheid nog bevestigen.</small></article><article className="notice-card"><Shield width="25" /><h2>iTheorie</h2><p>Online studeren, 50 proefexamens, livestream en leren in eigen tempo voor {formatPrice(theory.amount)} bij een adviesprijs van € 79.</p><Link className="text-link" href="/theorie">Bekijk alle theorie-inhoud <ArrowRight width="17" /></Link></article></div></section>
      <section className="section section--compact"><div className="site-shell split-cta"><div><span className="eyebrow">Nog een vraag?</span><h2>De contactflow blijft veilig lokaal.</h2><p>Totdat privacyverantwoordelijkheid en een echt endpoint bestaan, verzendt het formulier niets.</p></div><div className="button-row"><Link className="button" href="/contact">Bekijk contactdemo <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/tarieven">Bekijk tarieven</Link></div></div></section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqFacts.map((fact) => ({ "@type": "Question", name: fact.question, acceptedAnswer: { "@type": "Answer", text: fact.answer } })), url: `${siteConfig.url}/faq` }} />
    </main>
  );
}
