const expectedUrl = "https://voorbeeld.vandijkrijschool.nl";
const errors = [];
let parsed;

try {
  parsed = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "");
} catch {
  errors.push("NEXT_PUBLIC_SITE_URL must be a valid absolute URL");
}

if (process.env.NEXT_PUBLIC_SITE_URL !== expectedUrl) {
  errors.push(`NEXT_PUBLIC_SITE_URL must equal ${expectedUrl}`);
}
if (
  parsed &&
  (parsed.protocol !== "https:" || parsed.origin !== expectedUrl)
) {
  errors.push("NEXT_PUBLIC_SITE_URL must be the explicitly approved temporary HTTPS origin");
}
if (process.env.APP_ENVIRONMENT !== "production") {
  errors.push("APP_ENVIRONMENT must equal production");
}
if (!/^[0-9a-f]{40}$/i.test(process.env.APP_REVISION ?? "")) {
  errors.push("APP_REVISION must be a full 40-character Git commit SHA");
}
if (!["true", "false"].includes(process.env.NEXT_PUBLIC_INDEXING_ENABLED ?? "")) {
  errors.push("NEXT_PUBLIC_INDEXING_ENABLED must explicitly equal true or false");
}
if (process.env.LEAD_SMTP_HOSTS !== "mail.mijndomein.nl") {
  errors.push("LEAD_SMTP_HOSTS must equal mail.mijndomein.nl");
}
if (process.env.LEAD_SMTP_PORT !== "587") {
  errors.push("LEAD_SMTP_PORT must equal 587");
}
if (!/^[^\s@]+@vandijkrijschool\.nl$/i.test(process.env.LEAD_SMTP_USER ?? "")) {
  errors.push("LEAD_SMTP_USER must be a vandijkrijschool.nl mailbox");
}
if (!process.env.LEAD_SMTP_PASSWORD) {
  errors.push("LEAD_SMTP_PASSWORD must be configured as a production secret");
}

if (errors.length > 0) {
  for (const error of errors) process.stderr.write(`${error}\n`);
  process.exit(78);
}

process.stdout.write(`Production configuration is valid; indexing=${process.env.NEXT_PUBLIC_INDEXING_ENABLED}.\n`);
