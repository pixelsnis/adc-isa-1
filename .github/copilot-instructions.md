<!-- GitHub Copilot instructions for contributors and automated coding agents -->

# Quick orientation for AI coding agents

This repo is a monorepo with three primary workspaces: `app` (Expo React Native), `server` (Express + ts-rest), and shared `contract` + `types` packages used to generate typed HTTP endpoints.

Keep changes small and focused. The server is intended to run on Bun in development, and the mobile app uses Expo.

## Architecture (big picture)

- Top-level workspaces: `app/`, `server/`, `contract/`, `types/`.
- `contract/` (see `contract/index.ts`) defines a single aggregated ts-rest contract exported as `Contract`. The server and client both import this to ensure type-safe client/server calls.
- `server/` (entry: `server/index.ts`) uses `@ts-rest/express` and a resolver map (see `server/src/resolvers/index.ts`) wired from the `contract` package. Each top-level namespace (ai, account, notes) maps to a resolver file in `server/src/resolvers/`.
- Authentication: Supabase JWTs are accepted. Server middleware in `server/index.ts` calls `validateAuth` (see `server/src/lib/jwt-verify.ts`) and stores per-request data with `AsyncLocalStorage` in `server/src/lib/request-context.ts`. Resolvers call `getRequestContext()` (or access the `requestContext`) to obtain `userId`.
- Client: `app/lib/api/index.ts` initializes a ts-rest client using the active Supabase session access token and base URL (default `http://localhost:3000`). The app authenticates with Supabase via `app/lib/supabase.ts`.
- Database: Prisma schema is in `prisma/schema.prisma`. Prisma client generation outputs to `types/generated` using `zod-prisma-types`.

## Developer workflows & commands (explicit)

- Install deps for full monorepo (use Bun at repo root):
  - `bun install`
- Run server in dev (from repo root):
  - `bun run server/index.ts` or `bun --watch run server/index.ts` (there is a `server` script in the root `package.json` and `server/package.json` adds `bun --watch run index.ts`).
- Run the Expo app (in `app/`):
  - `cd app && npm install && npm start` (or `npx expo start`). The `app/README.md` contains standard Expo commands.
- Prisma and types:
  - Prisma uses `DATABASE_URL` env to access Postgres and has migrations in `prisma/migrations/`.
  - Generated Zod types are placed under `types/generated` (generator in `prisma/schema.prisma`). When editing schema or running migrations, run Prisma generation and then ensure `types` are present in the workspace.

## Project-specific conventions & patterns

- Contract-first API: The canonical API surface is the `Contract` exported from `contract/index.ts`. Always update `contract/definitions/*` and `contract/init.ts` when adding endpoints so both client and server stay in sync.
- Resolver wiring: `server/src/resolvers/index.ts` uses `s.router(Contract, {...})` to map contract namespaces to resolvers. Implement new methods inside the appropriate namespace file (e.g., `server/src/resolvers/notes.ts`).
- Auth flow:
  - Client gets a Supabase access token via `app/lib/supabase.ts` and sends it as a Bearer token to the API.
  - Server verifies tokens using Supabase JWKS in `server/src/lib/jwt-verify.ts` and maps the `sub` claim to `userId` inside `requestContext`.
  - Public endpoints: `/account/exists` is explicitly allowed unauthenticated in middleware; other endpoints require auth.
- Request-scoped context: Use the exported `requestContext` / `getRequestContext()` in resolvers to access `userId` rather than reading headers directly.

## Integration points & external dependencies

- Supabase (Auth + client): `app/lib/supabase.ts` and server uses Supabase JWKS for token verification. The project encodes the Supabase URL and a publishable key in `app/lib/supabase.ts` (note: these are public/publishable keys).
- Prisma: `prisma/schema.prisma` and generated client. DB URL comes from `DATABASE_URL` env var. Migrations are under `prisma/migrations`.
- AI / memory libs: Server depends on `@ai-sdk/openai`, `mem0ai` and custom `@waffles/contract` package from the monorepo `contract` package.

## Concrete examples to reference

- Server entry & auth middleware: `server/index.ts` (shows middleware sequence, use of `validateAuth`, and `requestContext.run`).
- Contract wiring: `contract/index.ts` and `contract/init.ts` (show initContract and router usage).
- Client initialization: `app/lib/api/index.ts` (shows how `initClient(Contract, {...})` is created using Supabase session access token).
- Request context helper: `server/src/lib/request-context.ts` (pattern for AsyncLocalStorage usage).

## What AI agents should do (actionable guidance)

- When adding an endpoint:
  - Update `contract/definitions/<namespace>.ts` first.
  - Implement resolver in `server/src/resolvers/<namespace>.ts` and ensure it uses `getRequestContext()` for auth-sensitive data.
  - Update `app/` client calls to use `API.getClient()` from `app/lib/api/index.ts` and include necessary Supabase auth calls.
- When changing auth behavior, update `server/src/lib/jwt-verify.ts` and the middleware in `server/index.ts` together.
- Preserve public keys and endpoints: `app/lib/supabase.ts` contains the Supabase URL and publishable key that the app depends on for auth flows. Do not accidentally convert these to secret-only locations without updating client code.

## Files to inspect first

- `server/index.ts` — server app, auth middleware, ts-rest wiring
- `server/src/resolvers/*` — resolver implementations (ai, account, notes)
- `contract/*` — API contract and definitions
- `app/lib/api/index.ts` and `app/lib/supabase.ts` — client wiring and auth
- `prisma/schema.prisma` — DB model and generator targets

## Known gaps / assumptions

- Production deployment is not configured here (server listens on port 3000 and notes "needs to be changed for production").
- Local development expects Bun available for server tasks; Expo requires npm/Node for the app workspace.

If any of the above is unclear or you'd like extra examples (e.g., a sample resolver implementation or an example end-to-end request flow), tell me which area to expand and I'll iterate.

## API SDK (how to use the fully-typed client)

This repo exposes a fully-typed SDK generated from the `Contract` in `contract/`. The client helper lives in `app/lib/api/index.ts` and wraps `@ts-rest/core`'s `initClient`.

Quick contract/client pattern:

- Server side: endpoints are defined in `contract/definitions/*.ts` and wired to implementations in `server/src/resolvers/*` via `server/src/resolvers/index.ts`.
- Client side: call `API.getClient()` from `app/lib/api/index.ts` to get a typed client configured with the current Supabase access token.

Minimal usage example (inside app code):

1. Acquire a client instance

```ts
const client = await API.getClient();
```

2. Call a namespaced endpoint (example: notes.list)

```ts
const res = await client.notes.list.query();
// res is strongly typed according to `contract/definitions/notes.ts`
```

3. Example for a protected call: ensure user is signed-in via `app/lib/supabase.ts` so `API.getClient()` can read the access token.

Notes and caveats:

- Base URL: the client uses `process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000"` as the default base URL (see `app/lib/api/index.ts`). Update that env var for simulators or remote servers.
- Auth: `API.getClient()` throws if there is no access token. For background tasks or unauthenticated calls, use `initClient(Contract, { baseUrl })` directly and pass necessary headers.
- Adding endpoints: always edit `contract/definitions/<namespace>.ts` first. The TypeScript types will flow to both server resolvers and client usage.
- Error handling: `@ts-rest` responses are typed; check the contract response shapes. Network or auth errors will still throw — catch and translate to UI-friendly errors.

Files to reference: `contract/index.ts`, `contract/definitions/*.ts`, `app/lib/api/index.ts`, and `server/src/resolvers/*`.
