import nodemailer from "nodemailer";

const host = process.env.LEAD_SMTP_HOSTS?.split(",")[0]?.trim();
const port = Number(process.env.LEAD_SMTP_PORT);
const user = process.env.LEAD_SMTP_USER;
const password = process.env.LEAD_SMTP_PASSWORD;

if (!host || !Number.isInteger(port) || !user || !password) {
  throw new Error("SMTP configuration is incomplete.");
}

const transport = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  requireTLS: port !== 465,
  name: new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname,
  auth: { user, pass: password },
  authMethod: "LOGIN",
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
  tls: { minVersion: "TLSv1.2", servername: host },
});

try {
  await transport.verify();
  process.stdout.write(`SMTP authentication succeeded for ${user} via ${host}:${port}.\n`);
} catch (error) {
  const details = error && typeof error === "object"
    ? [error.code, error.responseCode, error.command, error.message].filter(Boolean).join(" | ")
    : "unknown SMTP error";
  throw new Error(`SMTP verification failed: ${details}`);
} finally {
  transport.close();
}
