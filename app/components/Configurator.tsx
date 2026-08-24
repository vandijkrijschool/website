"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Minus, Plus, RouteIcon, Share, Sparkles } from "./Icons";
import { formatPrice, packages } from "../lib/site";

type Experience = "none" | "some" | "experienced" | "transfer" | "exam";
type Confidence = "uncertain" | "neutral" | "confident";
type PackageId = (typeof packages)[number]["id"];

const experienceOptions: { value: Experience; title: string; text: string }[] = [
  { value: "none", title: "Nog niet gereden", text: "Ik begin helemaal vanaf het begin." },
  { value: "some", title: "Een beetje ervaring", text: "Ik heb ongeveer 1 tot 10 uur gereden." },
  { value: "experienced", title: "Al wat kilometers", text: "Ik heb meer dan 10 uur rijervaring." },
  { value: "transfer", title: "Ik wil overstappen", text: "Ik vervolg mijn opleiding bij Van Dijk." },
  { value: "exam", title: "Ik heb al examen gedaan", text: "Ik wil gericht verder na een examenpoging." },
];

const confidenceOptions: { value: Confidence; title: string }[] = [
  { value: "uncertain", title: "Nog onzeker" },
  { value: "neutral", title: "Redelijk op mijn gemak" },
  { value: "confident", title: "Zelfverzekerd" },
];

function recommendationFor(experience: Experience | null, confidence: Confidence | null): PackageId {
  const experienceScore = experience === "none" ? 2 : experience === "some" ? 1 : experience === "transfer" || experience === "exam" ? 1 : 0;
  const confidenceScore = confidence === "uncertain" ? 2 : confidence === "neutral" ? 1 : 0;
  const score = experienceScore + confidenceScore;
  if (score >= 4) return "zeker-slagen";
  if (score >= 2) return "meest-gekozen";
  return "instap";
}

export default function Configurator() {
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [confidence, setConfidence] = useState<Confidence | null>(null);
  const [sessionsPerWeek, setSessionsPerWeek] = useState<1 | 2 | 3>(2);
  const [sessionMinutes, setSessionMinutes] = useState<60 | 90 | 120>(90);
  const [desiredStart, setDesiredStart] = useState("Zo snel mogelijk");
  const [availability, setAvailability] = useState<string[]>(["Na school of werk", "Flexibel"]);
  const [selectedId, setSelectedId] = useState<PackageId>("meest-gekozen");
  const [manualSelection, setManualSelection] = useState(false);
  const [extraLessons, setExtraLessons] = useState(0);
  const [error, setError] = useState("");
  const [shared, setShared] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const recommendedId = useMemo(() => recommendationFor(experience, confidence), [experience, confidence]);
  const activeId = manualSelection ? selectedId : recommendedId;
  const activePackage = packages.find((item) => item.id === activeId) ?? packages[1];
  const totalLessons = activePackage.lessons + extraLessons;
  const totalPrice = activePackage.price + extraLessons * 60;
  const appointments = Math.ceil((totalLessons * 60) / sessionMinutes);
  const weeks = Math.ceil((totalLessons * 60) / (sessionsPerWeek * sessionMinutes));
  const personalIntake = experience === "transfer" || experience === "exam";

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = window.sessionStorage.getItem("van-dijk-configurator-v1");
        if (stored) {
          const parsed = JSON.parse(stored) as Record<string, unknown>;
          if (typeof parsed.step === "number") setStep(Math.min(4, Math.max(1, parsed.step)));
          if (experienceOptions.some((item) => item.value === parsed.experience)) setExperience(parsed.experience as Experience);
          if (confidenceOptions.some((item) => item.value === parsed.confidence)) setConfidence(parsed.confidence as Confidence);
        }
        const preset = new URLSearchParams(window.location.search).get("pakket") as PackageId | null;
        if (preset && packages.some((item) => item.id === preset)) {
          setSelectedId(preset);
          setManualSelection(true);
        }
      } catch {
        window.sessionStorage.removeItem("van-dijk-configurator-v1");
      } finally {
        setHydrated(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.sessionStorage.setItem(
      "van-dijk-configurator-v1",
      JSON.stringify({ step, experience, confidence, sessionsPerWeek, sessionMinutes, desiredStart, availability, selectedId, manualSelection, extraLessons }),
    );
  }, [hydrated, step, experience, confidence, sessionsPerWeek, sessionMinutes, desiredStart, availability, selectedId, manualSelection, extraLessons]);

  function goNext() {
    if (step === 1 && (!experience || !confidence)) {
      setError("Kies je rijervaring én hoe zeker je je achter het stuur voelt.");
      return;
    }
    setError("");
    setStep((current) => Math.min(4, current + 1));
  }

  function toggleAvailability(value: string) {
    setAvailability((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  async function shareRoute() {
    const url = `${window.location.origin}/configurator?pakket=${activeId}`;
    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      window.setTimeout(() => setShared(false), 2200);
    } catch {
      setShared(false);
    }
  }

  return (
    <div className="configurator" aria-label="Lespakket configurator">
      <div className="configurator__top">
        <div>
          <span className="eyebrow">Lespakket cockpit</span>
          <h2>Bouw jouw persoonlijke route.</h2>
        </div>
        <div className="configurator__progress" aria-label={`Stap ${step} van 4`}>
          {["Ervaring", "Tempo", "Onderdelen", "Advies"].map((label, index) => (
            <button
              className={step === index + 1 ? "is-active" : step > index + 1 ? "is-complete" : ""}
              key={label}
              onClick={() => index + 1 < step && setStep(index + 1)}
              type="button"
            >
              <span>{step > index + 1 ? <Check width="14" /> : index + 1}</span>
              <b>{label}</b>
            </button>
          ))}
        </div>
      </div>

      <div className="configurator__body">
        <div className="configurator__stage">
          {step === 1 ? (
            <div className="config-step">
              <div className="config-step__heading"><span>01</span><div><small>Jouw startpunt</small><h3>Hoeveel rijervaring heb je?</h3><p>Je kunt dit later nog aanpassen.</p></div></div>
              <div className="option-grid option-grid--wide" role="radiogroup" aria-label="Rijervaring">
                {experienceOptions.map((item) => (
                  <button
                    aria-checked={experience === item.value}
                    className={`option-card ${experience === item.value ? "is-selected" : ""}`}
                    key={item.value}
                    onClick={() => setExperience(item.value)}
                    role="radio"
                    type="button"
                  >
                    <span><strong>{item.title}</strong><small>{item.text}</small></span>
                    <i>{experience === item.value ? <Check width="16" /> : null}</i>
                  </button>
                ))}
              </div>
              <fieldset className="config-fieldset">
                <legend>Hoe zeker voel je je achter het stuur?</legend>
                <div className="segmented-control">
                  {confidenceOptions.map((item) => (
                    <button className={confidence === item.value ? "is-selected" : ""} key={item.value} onClick={() => setConfidence(item.value)} type="button">{item.title}</button>
                  ))}
                </div>
              </fieldset>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="config-step">
              <div className="config-step__heading"><span>02</span><div><small>Jouw tempo</small><h3>Hoe wil je jouw rijopleiding plannen?</h3><p>Je gewenste tempo beïnvloedt de planning, niet automatisch het benodigde aantal lesuren.</p></div></div>
              <fieldset className="config-fieldset">
                <legend>Hoe vaak wil je gemiddeld rijden?</legend>
                <div className="option-grid option-grid--three">
                  {([1, 2, 3] as const).map((value) => (
                    <button className={`option-card ${sessionsPerWeek === value ? "is-selected" : ""}`} key={value} onClick={() => setSessionsPerWeek(value)} type="button">
                      <span><strong>{value}× per week</strong><small>{value === 1 ? "Rustig opbouwen" : value === 2 ? "Aanbevolen ritme" : "Intensief traject"}</small></span>
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="config-fieldset">
                <legend>Hoe lang mag een afspraak duren?</legend>
                <div className="segmented-control">
                  {([60, 90, 120] as const).map((value) => <button className={sessionMinutes === value ? "is-selected" : ""} key={value} onClick={() => setSessionMinutes(value)} type="button">{value} minuten{value === 90 ? " · aanbevolen" : ""}</button>)}
                </div>
                <p className="field-help">Een afspraak van 90 minuten gebruikt 1,5 lesuur. Je pakket blijft duidelijk uitgedrukt in lesuren én afspraken.</p>
              </fieldset>
              <div className="config-two-columns">
                <label className="select-field"><span>Wanneer wil je beginnen?</span><select value={desiredStart} onChange={(event) => setDesiredStart(event.target.value)}><option>Zo snel mogelijk</option><option>Binnen een maand</option><option>Over 1 tot 3 maanden</option><option>Ik weet het nog niet</option></select></label>
                <fieldset className="config-fieldset config-fieldset--flush"><legend>Wanneer ben je meestal beschikbaar?</legend><div className="chip-group">{["Overdag", "Na school of werk", "Avond", "Zaterdag", "Flexibel"].map((item) => <button className={availability.includes(item) ? "is-selected" : ""} key={item} onClick={() => toggleAvailability(item)} type="button">{item}</button>)}</div></fieldset>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="config-step">
              <div className="config-step__heading"><span>03</span><div><small>Jouw onderdelen</small><h3>Kies een route en maak hem compleet.</h3><p>De vaste pakketprijzen zijn leidend. Extra lesuren kun je direct toevoegen.</p></div></div>
              <div className="preset-grid">
                {packages.map((item) => (
                  <button className={`preset-card ${activeId === item.id ? "is-selected" : ""}`} key={item.id} onClick={() => { setSelectedId(item.id); setManualSelection(true); setExtraLessons(0); }} type="button">
                    <small>{item.lessons} lesuren</small><strong>{item.name}</strong><span>{formatPrice(item.price)}</span><i>{activeId === item.id ? <Check width="15" /> : null}</i>
                  </button>
                ))}
              </div>
              {manualSelection && selectedId !== recommendedId ? <div className="recommendation-note"><Sparkles width="18" /><p>Ons voorlopige advies is <strong>{packages.find((item) => item.id === recommendedId)?.name}</strong>, maar jouw gekozen pakket blijft behouden.</p><button type="button" onClick={() => { setManualSelection(false); setExtraLessons(0); }}>Advies overnemen</button></div> : null}
              <div className="module-list">
                <article><div><span>Rijlessen</span><small>Extra lesuren bovenop {activePackage.name}</small></div><div className="counter"><button aria-label="Eén extra lesuur minder" disabled={extraLessons === 0} onClick={() => setExtraLessons((value) => Math.max(0, value - 1))} type="button"><Minus width="16" /></button><strong>{totalLessons}</strong><button aria-label="Eén extra lesuur meer" disabled={totalLessons >= 60} onClick={() => setExtraLessons((value) => Math.min(60 - activePackage.lessons, value + 1))} type="button"><Plus width="16" /></button></div></article>
                <article><div><span>Praktijkexamen</span><small>Inbegrepen in het gekozen pakket</small></div><span className="included"><Check width="16" /> Inbegrepen</span></article>
                <article><div><span>Tussentijdse toets</span><small>{activeId === "instap" ? "Niet inbegrepen in dit pakket" : "Inbegrepen in het gekozen pakket"}</small></div><span className={activeId === "instap" ? "not-included" : "included"}>{activeId === "instap" ? "Niet inbegrepen" : <><Check width="16" /> Inbegrepen</>}</span></article>
                <article><div><span>Herexamenregeling*</span><small>Uitsluitend volgens de voorwaarden van Zeker Slagen</small></div><span className={activeId === "zeker-slagen" ? "included" : "not-included"}>{activeId === "zeker-slagen" ? <><Check width="16" /> Inbegrepen</> : "Niet inbegrepen"}</span></article>
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="config-step config-result">
              <div className="config-result__check"><Check width="36" /></div>
              <span className="eyebrow">Jouw voorlopige advies</span>
              <h3>{personalIntake ? "Eerst persoonlijk jouw niveau bekijken." : `Waarschijnlijk past ${activePackage.name} bij jou.`}</h3>
              <p>{personalIntake ? "Je hebt al een belangrijk deel van je rijopleiding achter de rug. Daarom is een korte intake eerlijker dan automatisch een standaardpakket voorschrijven." : `Op basis van jouw ervaring, zelfvertrouwen en gewenste lestempo biedt ${activePackage.name} waarschijnlijk een passende basis. Tijdens een intake bepalen we samen de definitieve lesopbouw.`}</p>
              <div className="result-route">
                <div><small>Pakket</small><strong>{activePackage.name}</strong></div>
                <div><small>Lesuren</small><strong>{totalLessons}</strong></div>
                <div><small>Afspraken</small><strong>ca. {appointments}</strong></div>
                <div><small>Lesweken</small><strong>ca. {weeks}</strong></div>
                <div><small>Totaal</small><strong>{formatPrice(totalPrice)}</strong></div>
              </div>
              <div className="result-actions">
                <Link className="button" href={`/proefles?pakket=${activeId}`}>Bespreek mijn route <ArrowRight width="17" /></Link>
                <button className="button button--ghost" onClick={shareRoute} type="button"><Share width="17" /> {shared ? "Link gekopieerd" : "Deel mijn route"}</button>
                <button className="text-button" onClick={() => setStep(3)} type="button">Pas mijn samenstelling aan</button>
              </div>
              <p className="config-disclaimer">De uitkomst is een indicatief voorstel. Beschikbaarheid, voortgang en de uiteindelijke examendatum kunnen de doorlooptijd beïnvloeden.</p>
            </div>
          ) : null}

          {error ? <p className="config-error" role="alert">{error}</p> : null}
        </div>

        <aside className="live-summary" aria-live="polite">
          <div className="live-summary__label"><RouteIcon width="20" /><span>Jouw route</span></div>
          <small>{manualSelection ? "Door jou gekozen" : "Voorlopig geadviseerd"}</small>
          <h3>{activePackage.name}</h3>
          <ul>
            <li><span>Lesuren</span><strong>{totalLessons}</strong></li>
            <li><span>Geschatte afspraken</span><strong>{appointments}</strong></li>
            <li><span>Gemiddeld ritme</span><strong>{sessionsPerWeek}× per week</strong></li>
            <li><span>Geschatte lesduur</span><strong>{weeks} weken</strong></li>
          </ul>
          <div className="live-summary__price"><span>Totaalprijs</span><strong>{formatPrice(totalPrice)}</strong></div>
          <p>Definitief advies na persoonlijke intake.</p>
        </aside>
      </div>

      <div className="configurator__bottom">
        <button className="button button--ghost" disabled={step === 1} onClick={() => { setError(""); setStep((current) => Math.max(1, current - 1)); }} type="button">Vorige stap</button>
        <div><span>Stap {step} van 4</span><b>{totalLessons} lesuren · {formatPrice(totalPrice)}</b></div>
        {step < 4 ? <button className="button" onClick={goNext} type="button">{step === 3 ? "Bekijk mijn advies" : "Volgende stap"} <ArrowRight width="17" /></button> : <Link className="button" href={`/proefles?pakket=${activeId}`}>Vraag intake aan <ArrowRight width="17" /></Link>}
      </div>
    </div>
  );
}
