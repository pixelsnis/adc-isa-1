#!/usr/bin/env bun
import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Script: scripts/setup.ts
// Purpose: run a set of repo setup commands in sequence with logging and error handling.

const MARKER_FILES = ["bun.lockb", "package.json", ".git"];

function findRepoRoot(startDir: string): string {
  let dir = path.resolve(startDir);
  const { root: fsRoot } = path.parse(dir);

  while (true) {
    for (const marker of MARKER_FILES) {
      if (fs.existsSync(path.join(dir, marker))) return dir;
    }
    if (dir === fsRoot) break;
    dir = path.dirname(dir);
  }

  // fallback: parent of scripts
  return path.resolve(startDir, "..");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = findRepoRoot(__dirname);

type Cmd = { cmd: string };

const steps: Cmd[] = [
  { cmd: "bun install" },
  { cmd: "docker compose up -d" },
  { cmd: "bunx prisma generate" },
  { cmd: "bunx prisma migrate dev --name joemama --force --accept-data-loss" },
  { cmd: "docker compose down" },
];

function runCommand(command: string) {
  console.log("\n→ Running:", command);
  try {
    execSync(command, { stdio: "inherit", cwd: root, env: process.env });
  } catch (err: any) {
    console.error(`\n✖ Command failed: ${command}`);
    // err.stdout / err.stderr may be Buffers
    if (err.stdout) console.error(String(err.stdout));
    if (err.stderr) console.error(String(err.stderr));
    // err.status may be undefined — fall back to generic code 1
    process.exit(typeof err.status === "number" ? err.status : 1);
  }
}

function main() {
  console.log("Repository root:", root);
  // ensure we are running in repo root
  try {
    process.chdir(root);
  } catch (e) {
    console.warn("Could not chdir to repo root:", e);
  }

  for (const step of steps) runCommand(step.cmd);
  console.log("\nAll steps completed successfully.");
}

// ESM-friendly "is this the main module?" check
const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);
if (isMain) {
  main();
}
