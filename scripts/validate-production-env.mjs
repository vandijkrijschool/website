const expectedUrl = "https://voorbeeld.vandijkrijschool.nl";
const errors = [];

if (process.env.NEXT_PUBLIC_SITE_URL !== expectedUrl) {
  errors.push(`NEXT_PUBLIC_SITE_URL must equal ${expectedUrl}`);
}
if (process.env.APP_ENVIRONMENT !== "production") {
  errors.push("APP_ENVIRONMENT must equal production");
}
if (!/^[0-9a-f]{40}$/i.test(process.env.APP_REVISION ?? "")) {
  errors.push("APP_REVISION must be a full 40-character Git commit SHA");
}

if (errors.length > 0) {
  for (const error of errors) process.stderr.write(`${error}\n`);
  process.exit(78);
}

process.stdout.write("Production configuration is valid.\n");
