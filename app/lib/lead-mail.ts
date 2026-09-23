import nodemailer from "nodemailer";

export const leadDestination = "info@vandijkrijschool.nl";

const allowedChannels = new Set(["bellen", "whatsapp", "email"]);
const allowedDayParts = new Set(["ochtend", "middag", "avond"]);

export type LeadSubmission = {
  kind: "proefles" | "contact";
  name: string;
  email: string;
  phone: string;
  postcode: string;
  packageName: string;
  startMoment: string;
  preferredDay: string;
  dayParts: string[];
  channels: string[];
  message: string;
};

type LeadParseResult =
  | { ok: true; lead: LeadSubmission; honeypot: boolean }
  | { ok: false; error: string };

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanList(value: unknown, allowed: Set<string>) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((item): item is string => typeof item === "string" && allowed.has(item)))];
}

export function parseLeadSubmission(payload: unknown): LeadParseResult {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, error: "Ongeldige aanvraag." };
  }

  const input = payload as Record<string, unknown>;
  const kind = input.kind === "contact" ? "contact" : "proefles";
  const name = cleanString(input.name, 120);
  const email = cleanString(input.email, 180).toLowerCase();
  const phone = cleanString(input.phone, 40);
  const postcode = cleanString(input.postcode, 12).toUpperCase();
  const channels = cleanList(input.channels, allowedChannels);
  const dayParts = cleanList(input.dayParts, allowedDayParts);

  if (cleanString(input.website, 200)) {
    return {
      ok: true,
      honeypot: true,
      lead: { kind, name: "", email: "", phone: "", postcode: "", packageName: "", startMoment: "", preferredDay: "", dayParts: [], channels: [], message: "" },
    };
  }
  if (name.length < 2) return { ok: false, error: "Vul je naam in." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Vul een geldig e-mailadres in." };
  if (phone && phone.replace(/\D/g, "").length < 8) return { ok: false, error: "Vul een geldig telefoonnummer in." };
  if (!email && !phone) return { ok: false, error: "Vul een e-mailadres of telefoonnummer in." };
  if (postcode && !/^[1-9][0-9]{3}\s?[A-Z]{2}$/.test(postcode)) return { ok: false, error: "Vul een geldige postcode in." };
  if (!channels.length) return { ok: false, error: "Kies minimaal één voorkeurskanaal." };
  if (input.consent !== true) return { ok: false, error: "Geef toestemming voor de verwerking van je aanvraag." };

  return {
    ok: true,
    honeypot: false,
    lead: {
      kind,
      name,
      email,
      phone,
      postcode,
      packageName: cleanString(input.packageName, 100),
      startMoment: cleanString(input.startMoment, 80),
      preferredDay: cleanString(input.preferredDay, 40),
      dayParts,
      channels,
      message: cleanString(input.message, 3000),
    },
  };
}

function leadLines(lead: LeadSubmission) {
  return [
    lead.kind === "proefles" ? "Nieuwe proeflesaanvraag" : "Nieuw contactbericht",
    "",
    `Naam: ${lead.name}`,
    lead.email ? `E-mail: ${lead.email}` : "",
    lead.phone ? `Telefoon: ${lead.phone}` : "",
    lead.postcode ? `Postcode: ${lead.postcode}` : "",
    lead.packageName ? `Pakketvoorkeur: ${lead.packageName}` : "",
    lead.kind === "proefles" && lead.startMoment ? `Gewenste start: ${lead.startMoment}` : "",
    lead.kind === "proefles" && lead.preferredDay ? `Voorkeursdag: ${lead.preferredDay}` : "",
    lead.kind === "proefles" && lead.dayParts.length ? `Voorkeursdagdelen: ${lead.dayParts.join(", ")}` : "",
    `Voorkeurscontact: ${lead.channels.join(", ")}`,
    lead.message ? "" : "",
    lead.message ? `Toelichting:\n${lead.message}` : "",
    "",
    "Verzonden via vandijkrijschool.nl",
  ].filter((line, index, lines) => line !== "" || (index > 0 && lines[index - 1] !== ""));
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character);
}

export async function sendLeadEmail(lead: LeadSubmission) {
  const hosts = (process.env.LEAD_SMTP_HOSTS ?? "smtp.mijndomein.nl")
    .split(",")
    .map((host) => host.trim())
    .filter(Boolean);
  const port = Number(process.env.LEAD_SMTP_PORT ?? "587");
  const user = process.env.LEAD_SMTP_USER;
  const password = process.env.LEAD_SMTP_PASSWORD;
  if (!user || !password) throw new Error("SMTP credentials are not configured.");
  const siteHost = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://voorbeeld.vandijkrijschool.nl").hostname;
  const lines = leadLines(lead);
  const subject = lead.kind === "proefles"
    ? `[Website] Proeflesaanvraag van ${lead.name}`
    : `[Website] Contactbericht van ${lead.name}`;
  let lastError: unknown;

  for (const host of hosts) {
    try {
      const transport = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        requireTLS: port !== 465,
        name: siteHost,
        auth: { user, pass: password },
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000,
        tls: { minVersion: "TLSv1.2", servername: host },
      });
      await transport.sendMail({
        from: `Van Dijk Rijschool website <${leadDestination}>`,
        to: leadDestination,
        replyTo: lead.email || undefined,
        subject,
        text: lines.join("\n"),
        html: `<div style="font-family:Arial,sans-serif;line-height:1.6"><h1 style="font-size:20px">${escapeHtml(lines[0])}</h1>${lines.slice(2).map((line) => line ? `<p style="margin:6px 0">${escapeHtml(line).replace(/\n/g, "<br>")}</p>` : "<br>").join("")}</div>`,
      });
      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("E-mail kon niet worden afgeleverd.");
}
