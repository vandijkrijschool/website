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

if (errors.length > 0) {
  for (const error of errors) process.stderr.write(`${error}\n`);
  process.exit(78);
}

process.stdout.write(`Production configuration is valid; indexing=${process.env.NEXT_PUBLIC_INDEXING_ENABLED}.\n`);
