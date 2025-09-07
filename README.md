# Waffles

## Getting Started

1. Install dependencies:

```
bun i
```

2. Start Docker services:

```
docker compose up -d
```

3. Generate Prisma client. In monorepo root (/), run:

```
bunx prisma generate
```

4. Migrate database. You can name the migration anything when prompted. Run:

```
bunx prisma migrate dev
```

5. Shut down the Docker services:

```
docker compose down
```

## Running the App

1. To run the app, first, start the Docker services:

```
docker compose up -d
```

2. Start the server:

```
cd server
bun run dev
```

3. In a split terminal, start the Expo app:

```
cd app
bunx expo start
```

4. To shut everything down when you're done:

```
docker compose down
```
