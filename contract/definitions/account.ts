import { UserSchema } from "@waffles/types";
import c from "../init";
import z from "zod";

/**
 * Contract describing the account routes.
 * - GET /account returns the authenticated user
 * - POST /account creates a user record with an `email` body
 */
export const AccountContract = c.router({
  get: {
    method: "GET",
    path: "/account",
    responses: {
      200: UserSchema,
    },
  },
  exists: {
    method: "POST",
    path: "/account/exists",
    body: z.object({
      email: z.string().email(),
    }),
    responses: {
      200: z.object({
        exists: z.boolean(),
      }),
    },
  },
  create: {
    method: "POST",
    path: "/account",
    body: z.object({
      email: z.string(),
    }),
    responses: {
      201: UserSchema,
    },
  },
});
