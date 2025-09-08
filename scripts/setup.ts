#!/usr/bin/env bun
import { execSync } from "child_process";
import path from "path";
import fs from "fs";

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

  // fallback: parent of scripts (previous behavior)
  return path.resolve(__dirname, "..");
}

const root = findRepoRoot(__dirname);

type Cmd = { cmd: string };

const steps: Cmd[] = [
  { cmd: "bun install" },
  { cmd: "docker compose up -d" },
  { cmd: "bunx prisma generate" },
  { cmd: "bunx prisma migrate dev --name joemama" },
  { cmd: "docker compose down" },
];

function runCommand(command: string) {
  console.log("\n→ Running:", command);
  try {
    execSync(command, { stdio: "inherit", cwd: root, env: process.env });
  } catch (err: any) {
    console.error(`\n✖ Command failed: ${command}`);
    if (err.stdout) console.error(String(err.stdout));
    if (err.stderr) console.error(String(err.stderr));
    process.exit(err.status ?? 1);
  }
}

function main() {
  console.log("Repository root:", root);
  for (const step of steps) runCommand(step.cmd);
  console.log("\nAll steps completed successfully.");
}

if (require.main === module) main();
