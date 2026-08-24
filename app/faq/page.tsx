import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/Icons";
import { Breadcrumbs, JsonLd, PageHero } from "../components/SiteChrome";
import { pageMetadata, siteConfig } from "../lib/site";

export const metadata: Metadata = pageMetadata(
  "Veelgestelde vragen over rijles",
  "Antwoorden op vragen over rijlessen, lespakketten, examens, planning, betaling, overstappen en een proefles bij Van Dijk Rijschool.",
  "/faq",
);

const faqGroups = [
  {
    title: "Starten met rijles",
    items: [
      ["Vanaf welke leeftijd mag ik beginnen met rijles?", "Je mag vanaf 16,5 jaar starten met autorijlessen. Voor het praktijkexamen en begeleid rijden gelden aanvullende wettelijke regels."],
      ["Hoe werkt een intake of proefles?", "We bespreken je ervaring en doelen, maken kennis in of rond de lesauto en geven daarna een voorlopig advies over de lesopbouw. Een aanvraag is nog geen definitieve boeking."],
      ["Wat moet ik meenemen naar de eerste les?", "Neem in ieder geval een geldig identiteitsbewijs mee wanneer dat voor de afspraak is afgesproken. De definitieve instructies ontvang je bij de bevestiging."],
      ["Kan ik overstappen van een andere rijschool?", "Ja. Omdat je al rijervaring hebt, beoordelen we tijdens een korte intake welke vaardigheden al voldoende zelfstandig zijn en waar nog winst te behalen is."],
    ],
  },
  {
    title: "Planning en lessen",
    items: [
      ["Hoeveel rijlessen heb ik nodig?", "Dat verschilt per persoon. Ervaring, regelmaat, zelfvertrouwen en leersnelheid spelen mee. Een configurator kan alleen een indicatie geven; het definitieve advies volgt tijdens de opleiding."],
      ["Hoe lang duurt een rijles?", "In het prototype kun je kiezen tussen afspraken van 60, 90 en 120 minuten. De daadwerkelijk aangeboden lesduur wordt bij livegang met Van Dijk bevestigd."],
      ["Kan ik naast school of werk lessen?", "We bespreken welke momenten haalbaar zijn en proberen een regelmatig ritme te vinden. Beschikbaarheid kan per periode verschillen."],
      ["Kan ik thuis of op school worden opgehaald?", "Ophaalmogelijkheden hangen af van het lesgebied, de route en de planning. Geef je gewenste locatie door bij de intake; daarna wordt bevestigd wat mogelijk is."],
      ["Wat gebeurt er als ik een les moet annuleren?", "De exacte annuleringstermijn en eventuele kosten worden vastgelegd in de lesvoorwaarden. Deze worden vóór je definitieve inschrijving beschikbaar gesteld."],
    ],
  },
  {
    title: "Pakketten en examens",
    items: [
      ["Wat zit er in een rijlespakket?", "De pakketpagina toont per route het aantal lesuren en de inbegrepen examenonderdelen. Controleer altijd de voorwaarden en actuele prijs vóór je definitief boekt."],
      ["Kan ik ook losse lessen volgen?", "In het aangeleverde prijsvoorstel staat een losse les van €60 per lesuur. Voor livegang moet Van Dijk bevestigen wanneer en onder welke voorwaarden losse lessen beschikbaar zijn."],
      ["Wat is een tussentijdse toets?", "Een tussentijdse toets is een officieel oefenmoment dat lijkt op het praktijkexamen. De instructeur bespreekt of en wanneer dit onderdeel binnen jouw route passend is."],
      ["Wanneer kan het praktijkexamen worden aangevraagd?", "Dat hangt af van je voortgang, wettelijke vereisten, beschikbaarheid en de afspraken in jouw pakket. Een gewenste datum is daarom nooit automatisch gegarandeerd."],
      ["Betekent Zeker Slagen dat ik gegarandeerd slaag?", "Nee. Zeker Slagen is een pakketnaam, geen resultaatgarantie. De herexamenregeling geldt alleen volgens de bijbehorende voorwaarden."],
      ["Kan ik in termijnen betalen?", "De betaalmogelijkheden en termijnen moeten vóór publicatie worden bevestigd en komen daarna duidelijk bij ieder pakket te staan."],
    ],
  },
  {
    title: "Digitaal en regio",
    items: [
      ["Hoe gebruik ik NXTDRIVE?", "Na je inschrijving krijg je toegang tot de leerlingomgeving voor planning, leerdoelen en voortgang, voor zover deze functies binnen jouw opleiding zijn geactiveerd."],
      ["In welke plaatsen geeft Van Dijk rijles?", "Het beoogde werkgebied bestaat uit Den Haag, Scheveningen, Rijswijk, Voorburg en Leidschendam. Beschikbaarheid en exacte dekking worden bij je aanvraag gecontroleerd."],
    ],
  },
];

export default function FaqPage() {
  const flatFaq = faqGroups.flatMap((group) => group.items);
  return (
    <main id="main-content">
      <PageHero eyebrow="Alles helder voor je start" title="Veelgestelde vragen" accent="over rijles." intro="Van leeftijd en planning tot pakketten en examens. Staat jouw vraag er niet bij? Neem dan persoonlijk contact op."><Breadcrumbs items={[{ label: "Veelgestelde vragen" }]} /></PageHero>
      <section className="section"><div className="site-shell faq-page">{faqGroups.map((group) => <section key={group.title}><h2>{group.title}</h2><div className="faq-list">{group.items.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>)}</div></section>
      <section className="section section--compact"><div className="site-shell split-cta"><div><span className="eyebrow">Nog een vraag?</span><h2>We denken persoonlijk met je mee.</h2><p>Gebruik het contactformulier of vraag direct een vrijblijvende intake aan.</p></div><div className="button-row"><Link className="button" href="/contact">Neem contact op <ArrowRight width="17" /></Link><Link className="button button--ghost" href="/proefles">Vraag een intake aan</Link></div></div></section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: flatFaq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })), url: `${siteConfig.url}/faq` }} />
    </main>
  );
}
