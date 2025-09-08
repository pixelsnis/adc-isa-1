# Waffles

> Waffles is a simple note app that can construct memories around your notes. Add anything in, and ask questions to a language model with the broad context of your entire note base!

https://github.com/user-attachments/assets/5f4d2cb5-8aa1-4c44-96ee-170502783b33

## Tech Stack

- Frontend: Expo React Native
- Backend:
  - Server: Express with `ts-rest` for typed contract
  - Authentication: Supabase
  - Database: Postgres 16 with `pgvector` (run locally through Docker)
  - ORM: Prisma
  - LLM: OpenAI `gpt-5-mini`
  - Embedding: OpenAI `text-embedding-3-small`

## Getting Started

To run Waffles on your machine, you will need the following:

- Bun (https://bun.sh)
- Docker (https://docker.com)
- A Supabase project (https://supabase.com)

1. Start by cloning the repo:

```
git clone https://github.com/pixelsnis/adc-isa-1.git
```

2. Set up the environment variables - create `.env` files in `/`, `/server` and `/app`, referring to the `.env.example` in each for the correct variables.

3. Run `bun run setup`. This will run the setup script, including database migrations.

4. Split your terminal into two. In the first, run:

```
docker compose up -d
cd server
bun run dev
```

5. In the second terminal, run:

```
cd app
bunx expo start
```

That's it! Happy Waffling!
