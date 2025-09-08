import { API } from "../api";

async function saveNote({ content }: { content: string }) {
  const client = await API.getClient();
  const saveResponse = await client.notes.add({ body: { content } });

  if (saveResponse.status !== 200) {
    const error = `${saveResponse.status} ${saveResponse.body}`;
    console.error(`Error saving note: ${error}`);
    throw new Error(error);
  }

  return saveResponse.body;
}

export default saveNote;
