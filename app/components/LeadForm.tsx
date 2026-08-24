"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Mail, Message, Phone } from "./Icons";
import { packages } from "../lib/site";

export default function LeadForm({ kind = "proefles" }: { kind?: "proefles" | "contact" }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [packageName, setPackageName] = useState("");

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
    if (name.length < 2 || (!email && !phone) || !consent) {
      setError("Vul je naam, minimaal één contactmogelijkheid en de privacytoestemming in.");
      return;
    }
    if (postcode && !/^[1-9][0-9]{3}\s?[A-Za-z]{2}$/.test(postcode)) {
      setError("Controleer de postcode, bijvoorbeeld 2583 AB.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span><Check width="30" /></span>
        <small>Formulier succesvol gecontroleerd</small>
        <h2>Jouw aanvraag staat klaar.</h2>
        <p>Dit is een interactief prototype: er is nog niets verzonden. Bij de productie-integratie wordt deze stap gekoppeld aan de echte Van Dijk/NXTDRIVE-intakeflow.</p>
        <button className="button" type="button" onClick={() => setSubmitted(false)}>Formulier opnieuw bekijken</button>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <div className="lead-form__heading">
        <span className="eyebrow">{kind === "proefles" ? "Jouw aanvraag" : "Contactformulier"}</span>
        <h2>{kind === "proefles" ? "Vertel ons wanneer je wilt starten." : "Waar kunnen we je mee helpen?"}</h2>
        <p>Een aanvraag is nog geen definitieve boeking. We nemen persoonlijk contact op om de mogelijkheden te bespreken.</p>
      </div>
      {packageName ? <div className="selected-package"><Check width="17" /><span>Gekozen route: <strong>{packageName}</strong></span></div> : null}
      <div className="form-grid">
        <label><span>Voor- en achternaam *</span><input name="naam" autoComplete="name" placeholder="Jouw naam" /></label>
        <label><span>Postcode</span><input name="postcode" autoComplete="postal-code" placeholder="2583 AB" /></label>
        <label><span>E-mailadres</span><input name="email" type="email" autoComplete="email" placeholder="naam@voorbeeld.nl" /></label>
        <label><span>Telefoonnummer</span><input name="telefoon" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" /></label>
        <label><span>Voorkeur contact</span><select name="contactvoorkeur" defaultValue="WhatsApp"><option>WhatsApp</option><option>Telefonisch</option><option>E-mail</option></select></label>
        <label><span>Gewenst startmoment</span><select name="startmoment" defaultValue="Zo snel mogelijk"><option>Zo snel mogelijk</option><option>Binnen een maand</option><option>Over 1 tot 3 maanden</option><option>Ik weet het nog niet</option></select></label>
        <label className="form-grid__full"><span>Waar kunnen we rekening mee houden?</span><textarea name="bericht" rows={5} placeholder="Vertel kort over je rijervaring, beschikbaarheid of vraag." /></label>
      </div>
      <fieldset className="contact-preference"><legend>Je mag contact opnemen via</legend><label><input type="checkbox" defaultChecked /> <Phone width="17" /> Bellen</label><label><input type="checkbox" defaultChecked /> <Message width="17" /> WhatsApp</label><label><input type="checkbox" /> <Mail width="17" /> E-mail</label></fieldset>
      <label className="consent"><input type="checkbox" name="toestemming" /><span>Ik ga ermee akkoord dat Van Dijk Rijschool contact met mij opneemt over deze aanvraag. Bekijk de <Link href="/privacy">privacyverklaring</Link>.</span></label>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <button className="button" type="submit">{kind === "proefles" ? "Vraag mijn intake aan" : "Verstuur mijn vraag"} <ArrowRight width="17" /></button>
      <p className="form-note">Prototype: dit formulier verzendt nog geen gegevens en slaat geen persoonsgegevens op.</p>
    </form>
  );
}
