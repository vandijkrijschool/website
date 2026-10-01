import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";

const facts = JSON.parse(await readFile(new URL("../data/site-facts.json", import.meta.url), "utf8"));
const build = spawn(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    APP_ENVIRONMENT: "production",
    NEXT_PUBLIC_SITE_URL: facts.web.intendedCanonicalOrigin.value,
    NEXT_PUBLIC_INDEXING_ENABLED: "true",
  },
});
build.on("error", (error) => { console.error(error); process.exitCode = 1; });
build.on("exit", (code) => { process.exitCode = code ?? 1; });
