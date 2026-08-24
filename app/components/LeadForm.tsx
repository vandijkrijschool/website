"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Mail, Message, Phone } from "./Icons";
import { packages } from "../lib/site";
import TrialBookingWidget from "./TrialBookingWidget";

function formatAppointment(value: string) {
  const match = value.match(/^(\d{4}-\d{2}-\d{2})-(\d{2}:\d{2})$/);
  if (!match) return value;
  const date = new Date(`${match[1]}T12:00:00`);
  return `${new Intl.DateTimeFormat("nl-NL", { weekday: "long", day: "numeric", month: "long" }).format(date)} · ${match[2]}`;
}

export default function LeadForm({ kind = "proefles" }: { kind?: "proefles" | "contact" }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [packageName, setPackageName] = useState("");
  const [appointment, setAppointment] = useState("");
  const [bookingInvalid, setBookingInvalid] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const id = new URLSearchParams(window.location.search).get("pakket");
      setPackageName(packages.find((item) => item.id === id)?.name ?? "");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("naam") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("telefoon") ?? "").trim();
    const postcode = String(data.get("postcode") ?? "").trim();
    const consent = data.get("toestemming");
    const channels = data.getAll("contactkanalen").map(String);
    if (name.length < 2 || (!email && !phone) || !consent) {
      setError("Vul je naam, minimaal één contactmogelijkheid en de privacytoestemming in.");
      return;
    }
    const hasReachableChannel = channels.some((channel) => channel === "email" ? Boolean(email) : Boolean(phone));
    if (!hasReachableChannel) {
      setError("Kies minimaal één contactkanaal waarvoor je ook contactgegevens hebt ingevuld.");
      return;
    }
    if (kind === "proefles" && !appointment) {
      setBookingInvalid(true);
      setError("Kies eerst één van de drie beschikbare proeflesmomenten.");
      window.setTimeout(() => document.getElementById("proeflesplanner")?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
      return;
    }
    if (postcode && !/^[1-9][0-9]{3}\s?[A-Za-z]{2}$/.test(postcode)) {
      setError("Controleer de postcode, bijvoorbeeld 2583 AB.");
      return;
    }
    setError("");
    setBookingInvalid(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span><Check width="30" /></span>
        <small>Formulier succesvol gecontroleerd</small>
        <h2>{kind === "proefles" ? "Jouw proefles staat klaar." : "Jouw aanvraag staat klaar."}</h2>
        {kind === "proefles" && appointment ? <p className="form-success__booking"><Check width="16" /> Gekozen NXTDRIVE-moment: <strong>{formatAppointment(appointment)}</strong></p> : null}
        <p>Dit is een interactief prototype: er is nog niets verzonden. Bij de productie-integratie wordt deze stap gekoppeld aan de echte Van Dijk/NXTDRIVE-intakeflow.</p>
        <button className="button" type="button" onClick={() => setSubmitted(false)}>Formulier opnieuw bekijken</button>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <div className="lead-form__heading">
        <span className="eyebrow">{kind === "proefles" ? "Jouw aanvraag" : "Contactformulier"}</span>
        <h2>{kind === "proefles" ? "Plan jouw proefles in drie stappen." : "Waar kunnen we je mee helpen?"}</h2>
        <p>{kind === "proefles" ? "Kies je voorkeuren en selecteer daarna direct één van drie beschikbare NXTDRIVE-momenten." : "Een aanvraag is nog geen definitieve boeking. We nemen persoonlijk contact op om de mogelijkheden te bespreken."}</p>
      </div>
      {packageName ? <div className="selected-package"><Check width="17" /><span>Gekozen route: <strong>{packageName}</strong></span></div> : null}
      <div className="form-grid">
        <label><span>Voor- en achternaam *</span><input name="naam" autoComplete="name" placeholder="Jouw naam" /></label>
        <label><span>Postcode</span><input name="postcode" autoComplete="postal-code" placeholder="2583 AB" /></label>
        <label><span>E-mailadres</span><input name="email" type="email" autoComplete="email" placeholder="naam@voorbeeld.nl" /></label>
        <label><span>Telefoonnummer</span><input name="telefoon" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" /></label>
        {kind === "contact" ? <label><span>Gewenst startmoment</span><select name="startmoment" defaultValue="Zo snel mogelijk"><option>Zo snel mogelijk</option><option>Binnen een maand</option><option>Over 1 tot 3 maanden</option><option>Ik weet het nog niet</option></select></label> : <div className="form-mini-assurance"><Check width="16" /><span>Geen betaling nodig om aan te vragen</span></div>}
      </div>
      {kind === "proefles" ? <TrialBookingWidget value={appointment} invalid={bookingInvalid} onChange={(nextValue) => { setAppointment(nextValue); setBookingInvalid(false); if (nextValue) setError(""); }} /> : null}
      <label className="form-message"><span>Waar kunnen we rekening mee houden?</span><textarea name="bericht" rows={5} placeholder="Vertel kort over je rijervaring, beschikbaarheid of vraag." /></label>
      <fieldset className="contact-preference"><legend>Je mag contact opnemen via</legend><label><input type="checkbox" defaultChecked name="contactkanalen" value="phone" /> <Phone width="17" /> Bellen</label><label><input type="checkbox" defaultChecked name="contactkanalen" value="whatsapp" /> <Message width="17" /> WhatsApp</label><label><input type="checkbox" name="contactkanalen" value="email" /> <Mail width="17" /> E-mail</label></fieldset>
      <label className="consent"><input type="checkbox" name="toestemming" /><span>Ik ga ermee akkoord dat Van Dijk Rijschool contact met mij opneemt over deze aanvraag. Bekijk de <Link href="/privacy">privacyverklaring</Link>.</span></label>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <button className="button lead-form__submit" type="submit">{kind === "proefles" ? "Plan mijn proefles" : "Verstuur mijn vraag"} <ArrowRight width="17" /></button>
      <p className="form-note">Prototype: dit formulier verzendt nog geen gegevens en slaat geen persoonsgegevens op.</p>
    </form>
  );
}
