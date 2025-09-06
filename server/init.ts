import { PrismaClient } from "@prisma/client";
import { initServer } from "@ts-rest/express";

/**
 * The server helper from `@ts-rest/express` used to create typed routers.
 * Exported so resolvers can call `s.router(...)` with the strongly typed contract.
 */
export const s = initServer();

/**
 * Prisma client instance for database access. Kept as a singleton so the
 * application re-uses the same connection pool across modules.
 */
export const prisma = new PrismaClient();
