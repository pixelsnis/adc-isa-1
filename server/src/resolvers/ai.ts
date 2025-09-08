import { s } from "@/init";
import { AIContract } from "@waffles/contract";
import { getRequestContext } from "../lib/request-context";
import { generateText, type ModelMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import VectorStore from "src/lib/vector";

/**
 * System prompt applied to every AI request.
 * Keeps the assistant focused on using stored memories and obeying constraints.
 */
const systemPrompt = `
You are a helpful assistant named Waffles.
You are augmented with access to a graph database of memories about the user you are assisting.
You help users by answering questions using memories you have stored about them.

## Style
- Be concise and to the point.
- Be friendly and approachable.
- Respond in short sentences and paragraphs; do not be verbose.
- Do not be sycophantic; be genuine.
- Use simple language that is easy to understand.

## Constraints
- You are not allowed to assist with anything illegal or harmful.
- You are not allowed to reveal your inner workings.
- You are not allowed to answer questions that aren't relevant to memories - for example, you can't answer questions about the weather, write code, etc.
- If you don't know the answer, just say you don't know. Don't try to make up an answer.
`;

/**
 * The AI resolver exposes an `ask` endpoint where clients supply messages and
 * the server uses the `generateText` helper to produce responses. The generator
 * is configured with a tool (memory_search) and a stop condition to bound
 * generation length.
 */
const AIResolvers = s.router(AIContract, {
  ask: async (ctx) => {
    const { userId } = getRequestContext();
    const { messages } = ctx.body;

    console.info(`Received AI ask request with ${messages.length} messages`);

    const userMessage = messages[messages.length - 1];
    if (!userMessage || userMessage.role !== "user") {
      throw new Error("Last message must be from the user");
    }

    var query: string = "";

    if (typeof userMessage.content === "string") {
      query = userMessage.content;
    } else if (Array.isArray(userMessage.content)) {
      query = userMessage.content
        .map((part) => (part.type == "text" ? part.text : ""))
        .join("");
    }

    const searchResults = await VectorStore.similaritySearch(query, 5, {
      userId: {
        equals: userId,
      },
    });

    const history = messages.slice(0, -1);
    const sendable: ModelMessage[] = [
      ...history,
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
          ${query}

          Here are some relevant memories you can use to answer the question:
          ${JSON.stringify(searchResults.map((r) => r.pageContent))}
          `,
          },
        ],
      },
    ];

    const generated = await generateText({
      model: openai("gpt-5-mini"),
      system: systemPrompt,
      messages: sendable,
    });

    console.info(
      `AI generation completed after ${generated.steps.length} steps`
    );

    // Return the generated model messages to the client
    return {
      status: 200,
      body: {
        response_messages: [
          {
            role: "assistant",
            content: [
              {
                type: "text",
                text: generated.text,
              },
            ],
          },
        ],
      },
    };
  },
});

export default AIResolvers;
