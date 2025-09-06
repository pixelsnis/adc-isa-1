import { PrismaClient } from "@prisma/client";
import { initServer } from "@ts-rest/express";

export const s = initServer();
export const prisma = new PrismaClient();
