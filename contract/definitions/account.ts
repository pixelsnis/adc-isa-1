import { UserSchema } from "@waffles/types";
import c from "../init";
import z from "zod";

export const AccountContract = c.router({
  get: {
    method: "GET",
    path: "/account",
    responses: {
      200: UserSchema,
    },
  },
  create: {
    method: "POST",
    path: "/account",
    body: z.object({
      name: z.string(),
      email: z.string(),
    }),
    responses: {
      201: UserSchema,
    },
  },
});
