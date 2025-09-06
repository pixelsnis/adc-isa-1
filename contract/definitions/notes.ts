import z from "zod";
import c from "../init";
import { UserNoteSchema } from "@waffles/types";

/**
 * Notes contract describing add and list operations.
 * - add: requires a `content` string in the body and returns the created note
 * - list: returns an array of notes for the authenticated user
 */
export const NotesContract = c.router({
  add: {
    method: "POST",
    description: "Adds a note to the database and adds it to graph memory.",
    path: "/notes",
    body: z.object({
      content: z.string(),
    }),
    responses: {
      200: UserNoteSchema,
    },
  },
  list: {
    method: "GET",
    description: "Retrieves a list of notes for the authenticated user.",
    path: "/notes",
    responses: {
      200: z.array(UserNoteSchema),
    },
  },
});
