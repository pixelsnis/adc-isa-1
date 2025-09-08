import { API } from "../api";

async function loadBits() {
  const client = await API.getClient();

  const listResponse = await client.notes.list();
  if (listResponse.status !== 200) {
    const error = `${listResponse.status} ${listResponse.body}`;
    console.error(`Error loading notes: ${error}`);
    throw new Error(error);
  }

  return listResponse.body;
}

export default loadBits;
