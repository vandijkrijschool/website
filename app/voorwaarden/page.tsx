import { Breadcrumbs, PageHero } from "../components/SiteChrome";
import { pageMetadata } from "../lib/site";

export const metadata = pageMetadata("Demo-lesvoorwaarden", "Volledig ingevulde mockvoorwaarden voor het Van Dijk Rijschool demo-prototype.", "/voorwaarden");

export default function TermsPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Demo-voorwaarden" title="Les- en pakketvoorwaarden" accent="met mockafspraken." intro="Deze volledig ingevulde voorbeeldvoorwaarden maken de klantreis compleet. Ze horen bij de demo, zijn niet bindend en vormen geen echt verkoopaanbod.">
        <Breadcrumbs currentPath="/voorwaarden" items={[{ label: "Voorwaarden" }]} />
      </PageHero>
      <section className="section"><article className="site-shell legal-copy">
        <p className="legal-warning">Mockvoorwaarden — uitsluitend bedoeld om de complete demo-ervaring te tonen.</p>
        <h2>1. Inschrijving en intake</h2><p>Een online demo-aanvraag is geen overeenkomst en reserveert geen moment. Binnen het fictieve klantproces ontstaat een lesovereenkomst pas na persoonlijke bevestiging van het lesplan, de prijs en de startdatum. Voor leerlingen jonger dan achttien jaar wordt toestemming van een ouder of verzorger gevraagd.</p>
        <h2>2. Rijlessen en planning</h2><p>Een lesuur duurt in deze demo 60 minuten; afspraken kunnen 60, 90 of 120 minuten duren. Lessen starten op een afgesproken plek binnen het demolesgebied. Kosteloos annuleren kan tot 24 uur vooraf. Bij een latere annulering telt de gereserveerde lestijd als gebruikt, behalve bij aantoonbare overmacht.</p>
        <h2>3. Lespakketten en betaling</h2><p>Pakketten zijn persoonlijk, niet overdraagbaar en twaalf maanden geldig vanaf de eerste les. Betaling gebeurt in het demoscenario vooraf of in drie gelijke termijnen. Niet-gebruikte lesuren kunnen binnen veertien dagen na aankoop worden geannuleerd zolang nog geen les heeft plaatsgevonden; daarna worden gevolgde uren en aantoonbaar gemaakte examenkosten verrekend.</p>
        <h2>4. Examens en toetsen</h2><p>Een toets of praktijkexamen wordt pas aangevraagd wanneer leerling en instructeur de voorbereiding passend vinden. Beschikbaarheid van het CBR valt buiten de invloed van de rijschool. Identiteitsdocumenten, gezondheidsverklaring en wettelijke toelatingseisen blijven de verantwoordelijkheid van de leerling.</p>
        <h2>5. Herexamenregeling</h2><p>Het mockpakket Zeker Slagen bevat één herexamen wanneer de leerling alle geplande lessen heeft gevolgd, adviezen heeft opgevolgd en het eerste examen binnen de pakketgeldigheid aflegt. Extra rijlessen, medische onderzoeken, tussentijdse toetsen en kosten door te late annulering vallen buiten deze fictieve regeling.</p>
        <h2>6. Gedrag en veiligheid</h2><p>De leerling volgt veiligheidsinstructies op en rijdt niet onder invloed van alcohol, drugs of rijvaardigheid beïnvloedende middelen. De instructeur mag een les onderbreken wanneer veilig rijden niet mogelijk is. Respectloos, bedreigend of agressief gedrag kan het demotraject beëindigen.</p>
        <h2>7. Vragen en klachten</h2><p>In het demoscenario wordt een vraag of klacht binnen vijf werkdagen persoonlijk beantwoord. Omdat dit prototype geen echte dienst levert, kunnen via het formulier geen juridische rechten, betalingen of lesafspraken ontstaan.</p>
      </article></section>
    </main>
  );
}
