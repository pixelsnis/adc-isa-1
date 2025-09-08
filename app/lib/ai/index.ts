import { ModelMessage } from "ai";
import { API } from "../api";

async function askAI(
  messages: ModelMessage[]
): Promise<ModelMessage[] | undefined> {
  try {
    const client = await API.getClient();
    const response = await client.ai.ask({ body: { messages } });

    if (response.status === 200) {
      return response.body.response_messages;
    }

    throw new Error(`AI request failed with status ${response.status}`);
  } catch (err) {
    console.error("AI request failed", err);
    return undefined;
  }
}

const AIService = {
  ask: askAI,
};

export default AIService;
