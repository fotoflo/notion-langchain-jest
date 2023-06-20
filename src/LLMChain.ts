import { openai } from "@/utils/openai-client";
import { getPineconeStore } from "@/utils/pinecone-client";
import { LLMChain } from "langchain/chains";
import { BaseMemory } from "langchain/memory";

import { PromptTemplate } from "langchain/prompts";

export const basicChat = async (query: string, memory: BaseMemory) => {
  const model = openai;
  const vectorStore = await getPineconeStore();

  query = query.trim().replaceAll("\n", " ");
  const prompt = PromptTemplate.fromTemplate("user submits query: {query}");

  const chain = new LLMChain({ llm: model, prompt });

  const response = await chain.call({ query });

  return response.text;
};
