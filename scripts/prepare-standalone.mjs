import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const standalone = resolve(root, ".next/standalone");

await mkdir(resolve(standalone, ".next"), { recursive: true });
await rm(resolve(standalone, "public"), { force: true, recursive: true });
await rm(resolve(standalone, ".next/static"), { force: true, recursive: true });
await cp(resolve(root, "public"), resolve(standalone, "public"), { recursive: true });
await cp(resolve(root, ".next/static"), resolve(standalone, ".next/static"), { recursive: true });

process.stdout.write("Standalone static assets prepared.\n");
