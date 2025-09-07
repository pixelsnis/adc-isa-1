# isa-1 — Getting started (quick)

This repo is a small monorepo that contains an Expo mobile app (`app/`), a type-first API server (`server/`) wired from a `contract/`, and database schema & generated types (`prisma/`, `types/`).
Prerequisites

- macOS / Linux / Windows with WSL
- Bun (for running the server): https://bun.sh
- Docker & Docker Compose (for optional services)
- Node.js + npm (for the Expo app)

Quick start (recommended)

1. Install repository dependencies (root, uses Bun):

```zsh
bun install
```

2. Start the Docker services:

```zsh
docker compose up -d
```

This command will read `docker-compose.yml` in the repo root and start services in detached mode. If you don't use Docker locally, skip this step, but ensure any required services (e.g., Postgres) are reachable and `DATABASE_URL` is set.

3. Start the API server (dev mode)

This runs `server/index.ts` using Bun. The server listens on http://localhost:3000 by default.

```zsh
cd server
bun run dev
```

4. Start the mobile app (optional)

```zsh
cd app
bun install
bunx expo start
```

Notes and gotchas

- Environment variables: The server and Prisma expect `DATABASE_URL` for Postgres. If you rely on Docker, ensure the docker compose exposes the DB and your `DATABASE_URL` points to it.
- Auth: The app uses Supabase for auth. `app/lib/supabase.ts` already contains the public project URL & publishable key used by the client. The server verifies tokens using the project's JWKS endpoint (see `server/src/lib/jwt-verify.ts`).
- Ports: The server defaults to port 3000. If another service uses port 3000, either stop that service or change the server listen port in `server/index.ts`.
- Type-safety: The API surface is contract-first — see `contract/index.ts` and `contract/definitions/*`. When changing endpoints, update the contract definitions first so types flow to server and client.

Basic troubleshooting

- "Server crashes on start": check Bun is installed and run `bun --version`; run `bun run dev:server` and inspect logs.
- "DB connection refused": confirm `DATABASE_URL` and that Dockerized Postgres is running (`docker compose ps`).
- "No access token" in the app: sign in through the Expo UI or ensure the app's Supabase client has a persisted session.

Where to look next

- API wiring & middleware: `server/index.ts`
- Resolvers (server implementations): `server/src/resolvers/*` (ai, account, notes)
- Contract (typed API surface): `contract/index.ts` and `contract/definitions/*`
- Client helper (typed SDK): `app/lib/api/index.ts`

If anything here is unclear or you'd like a short script to automate these steps, tell me which OS and whether you prefer Docker-managed DB or a local DB and I'll add a ready-to-run helper.
