import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

const approved = {
  NEXT_PUBLIC_SITE_URL: "https://vandijkrijschool.nl",
  NEXT_PUBLIC_INDEXING_ENABLED: "true",
  APP_ENVIRONMENT: "production",
  APP_REVISION: "0123456789abcdef0123456789abcdef01234567",
  LEAD_SMTP_HOSTS: "mail.mijndomein.nl",
  LEAD_SMTP_PORT: "587",
  LEAD_SMTP_USER: "noreply@vandijkrijschool.nl",
  LEAD_SMTP_PASSWORD: "test-placeholder-not-a-real-credential",
};
const validate = (overrides = {}) => spawnSync(process.execPath, ["scripts/validate-production-env.mjs"], {
  encoding: "utf8",
  env: { ...process.env, ...approved, ...overrides },
});

test("the approved indexable production configuration passes without connecting to SMTP", () => {
  const result = validate();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /indexing=true/);
});

for (const url of ["https://voorbeeld.vandijkrijschool.nl", "https://www.vandijkrijschool.nl", "http://vandijkrijschool.nl", "https://vandijkrijschool.nl/extra", "https://vandijkrijschool.nl?query=1"]) {
  test(`deployment rejects a noncanonical public URL: ${url}`, () => {
    const result = validate({ NEXT_PUBLIC_SITE_URL: url });
    assert.equal(result.status, 78);
    assert.match(result.stderr, /NEXT_PUBLIC_SITE_URL/);
  });
}

for (const enabled of ["false", "", "TRUE"]) {
  test(`deployment cannot silently restore the old noindex gate: ${JSON.stringify(enabled)}`, () => {
    const result = validate({ NEXT_PUBLIC_INDEXING_ENABLED: enabled });
    assert.equal(result.status, 78);
    assert.match(result.stderr, /INDEXING_ENABLED must equal true/);
  });
}

test("missing mail credentials still prevent production deployment", () => {
  const result = validate({ LEAD_SMTP_PASSWORD: "" });
  assert.equal(result.status, 78);
  assert.match(result.stderr, /LEAD_SMTP_PASSWORD/);
  assert.doesNotMatch(result.stderr + result.stdout, /test-placeholder-not-a-real-credential/);
});
