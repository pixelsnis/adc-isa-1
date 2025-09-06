import { spawn } from "bun";
import path from "path";

let dockerUp = false;

async function run() {
  // Step 1: Start docker compose
  console.log("Starting docker compose services...");
  const docker = spawn(["docker", "compose", "up", "-d"], {
    stdout: "inherit",
    stderr: "inherit",
  });

  const exitCode = await docker.exited;
  if (exitCode !== 0) {
    console.error(`docker compose failed with exit code ${exitCode}`);
    process.exit(exitCode);
  }
  dockerUp = true;

  // Step 2: Start the Express server
  console.log("Starting Express server...");
  await import(path.join(import.meta.dir, "server", "index.ts"));
}

// Cleanup handler
async function cleanup(signal?: string) {
  if (dockerUp) {
    console.log("\nStopping docker compose services...");
    const down = spawn(["docker", "compose", "down"], {
      stdout: "inherit",
      stderr: "inherit",
    });
    await down.exited;
  }
  process.exit(signal ? 0 : 1);
}

// Handle exit signals
process.on("SIGINT", () => cleanup("SIGINT"));
process.on("SIGTERM", () => cleanup("SIGTERM"));
process.on("exit", () => cleanup());

run().catch((err) => {
  console.error(err);
  cleanup();
});
