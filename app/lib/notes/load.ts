import { UserNote, UserNoteSchema } from "@waffles/types";
import { API } from "../api";
import { supabase } from "../supabase";

async function loadNotes() {
  const session = await supabase.auth.getSession();
  if (!session.data.session?.access_token) {
    throw new Error("No access token");
  }

  const result = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/notes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.data.session.access_token}`,
    },
  });

  if (!result.ok) {
    throw new Error(`Failed to load notes: ${result.statusText}`);
  }

  const data = await result.json();
  const parsed = UserNoteSchema.array().parse(data);

  return parsed;
}

export default loadNotes;
