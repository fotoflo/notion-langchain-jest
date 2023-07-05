import { openai } from "@/utils/openai-client";
import { getPineconeStore } from "@/utils/pinecone-client";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BaseMemory } from "langchain/memory";

export const chatHandlerWithBufferWindowMemory = async (
  question: string,
  memory: BaseMemory
) => {
  const model = openai;
  const vectorStore = await getPineconeStore();

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      returnSourceDocuments: false,
      memory,
    }
  );

  const sanitizedQuestion = question.trim().replaceAll("\n", " ");
  const response = await chain.call({
    question: sanitizedQuestion,
  });

  return response.text;
};
