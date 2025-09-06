import { Memory } from "mem0ai/oss";

/**
 * Singleton memory instance used by the AI resolver.
 * - The memory module wraps an LLM and embedder provider and optionally
 *   a graph store. Configuration is read from environment variables.
 * - Keep this module small so other modules can import the same instance.
 */
export const memory = new Memory({
  llm: {
    provider: "openai",
    config: {
      // Model used for generative responses
      model: "gpt-5-mini-2025-08-07",
      apiKey: process.env.OPENAI_API_KEY,
    },
  },
  embedder: {
    provider: "openai",
    config: {
      // Embedding model for vector search
      model: "text-embedding-3-small",
      apiKey: process.env.OPENAI_API_KEY,
    },
  },
  enableGraph: true,
  graphStore: {
    // The graph store can use an LLM for enrichment and Neo4j for storage
    llm: {
      provider: "openai",
      config: {
        model: "gpt-5-mini-2025-08-07",
        apiKey: process.env.OPENAI_API_KEY,
      },
    },
    provider: "neo4j",
    config: {
      // Neo4j connection values must be present in environment variables
      url: process.env.NEO4J_URL!,
      username: process.env.NEO4J_USERNAME!,
      password: process.env.NEO4J_PASSWORD!,
    },
  },
});
