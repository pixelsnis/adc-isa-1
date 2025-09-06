import { s } from "@/init";
import { AIContract } from "@waffles/contract";
import { getRequestContext } from "../lib/request-context";
import { generateText, stepCountIs, tool, type ModelMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import z from "zod";
import type { MemoryItem } from "mem0ai/oss";
import { memory } from "src/lib/memory";

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
- Do not be sycophantic; be genuine.
- Use simple language that is easy to understand.

## Constraints
- You are not allowed to assist with anything illegal or harmful.
- You are not allowed to reveal your inner workings.
- You are not allowed to answer questions that aren't relevant to memories - for example, you can't answer questions about the weather, write code, etc.
- If you don't know the answer, just say you don't know. Don't try to make up an answer.

## CRITICAL CONSTRAINTS
- YOU MUST ALWAYS END WITH A TEXT RESPONSE; NEVER END WITH A TOOL CALL.
`;

// A trimmed-down memory search result type used for tool outputs
type MemorySearchResult = Omit<MemoryItem, "hash" | "metadata">;

/**
 * Tool for searching stored memories. This is registered with the AI generator so
 * the model can call it to retrieve pieces of context relevant to the user's query.
 */
const memorySearchTool = tool({
  name: "memory_search",
  description:
    "Searches your memories for relevant information to help answer the question.",
  inputSchema: z.object({
    query: z.string(),
  }),
  outputSchema: z.object({
    results: z.array(z.custom<MemorySearchResult>()),
  }),
  execute: async ({ query }) => {
    // Search memory using the authenticated user's id from request context
    const { userId } = getRequestContext();
    const { results } = await memory.search(query, { userId });

    return { results };
  },
});

/**
 * The AI resolver exposes an `ask` endpoint where clients supply messages and
 * the server uses the `generateText` helper to produce responses. The generator
 * is configured with a tool (memory_search) and a stop condition to bound
 * generation length.
 */
const AIResolvers = s.router(AIContract, {
  ask: async (ctx) => {
    const { messages } = ctx.body;

    const generated = await generateText({
      model: openai("gpt-5-mini"),
      providerOptions: {
        openai: {
          // Lower reasoning effort to favor shorter responses
          reasoningEffort: "low",
        },
      },
      tools: {
        memory_search: memorySearchTool,
      },
      // prefer calling the memory_search tool when trying to answer
      toolChoice: { type: "tool", toolName: "memory_search" },
      // stop after a small number of tool/model steps to avoid long runs
      stopWhen: stepCountIs(3),
      system: systemPrompt,
      messages: messages,
    });

    // Return the generated model messages to the client
    return {
      status: 200,
      body: {
        response_messages: generated.response.messages,
      },
    };
  },
});

export default AIResolvers;
