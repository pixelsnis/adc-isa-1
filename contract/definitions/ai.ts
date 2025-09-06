import type { ModelMessage } from "ai";
import c from "../init";
import z from "zod";

export const AIContract = c.router({
  ask: {
    method: "POST",
    path: "/ai/ask",
    body: z.object({
      messages: z.array(z.custom<ModelMessage>()),
    }),
    responses: {
      200: z.object({
        response_messages: z.array(z.custom<ModelMessage>()),
      }),
    },
  },
});
