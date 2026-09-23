import { parseLeadSubmission, sendLeadEmail } from "../../lib/lead-mail";

export const runtime = "nodejs";

const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMax = 5;
const requestLog = new Map<string, number[]>();

function clientAddress(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(address: string) {
  const now = Date.now();
  const recent = (requestLog.get(address) ?? []).filter((timestamp) => now - timestamp < rateLimitWindowMs);
  if (recent.length >= rateLimitMax) return true;
  recent.push(now);
  requestLog.set(address, recent);
  return false;
}

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 20_000) return json({ error: "De aanvraag is te groot." }, 413);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "De aanvraag kon niet worden gelezen." }, 400);
  }

  const parsed = parseLeadSubmission(payload);
  if (!parsed.ok) return json({ error: parsed.error }, 400);
  if (parsed.honeypot) return json({ ok: true }, 200);
  if (isRateLimited(clientAddress(request))) {
    return json({ error: "Er zijn te veel aanvragen verstuurd. Probeer het over enkele minuten opnieuw." }, 429);
  }

  try {
    await sendLeadEmail(parsed.lead);
    return json({ ok: true }, 200);
  } catch (error) {
    console.error("Lead e-mail delivery failed", error instanceof Error ? error.message : "unknown error");
    return json({ error: "Verzenden is tijdelijk niet gelukt. Bel of mail ons rechtstreeks." }, 502);
  }
}
