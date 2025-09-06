import { Memory } from "mem0ai/oss";

export const memory = new Memory({
  llm: {
    provider: "openai",
    config: {
      model: "gpt-5-mini-2025-08-07",
      apiKey: process.env.OPENAI_API_KEY,
    },
  },
  embedder: {
    provider: "openai",
    config: {
      model: "text-embedding-3-small",
      apiKey: process.env.OPENAI_API_KEY,
    },
  },
  enableGraph: true,
  graphStore: {
    llm: {
      provider: "openai",
      config: {
        model: "gpt-5-mini-2025-08-07",
        apiKey: process.env.OPENAI_API_KEY,
      },
    },
    provider: "neo4j",
    config: {
      url: process.env.NEO4J_URL!,
      username: process.env.NEO4J_USERNAME!,
      password: process.env.NEO4J_PASSWORD!,
    },
  },
});
