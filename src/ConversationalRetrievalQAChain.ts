import { openai } from "@/utils/openai-client";
import { getPineconeStore } from "@/utils/pinecone-client";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BaseMemory } from "langchain/memory";

export const chatHandlerWithBufferWindowMemory = async (
  question: string,
  memory: BaseMemory
) => {
  const sanitizedQuestion = question.trim().replaceAll("\n", " ");

  const vectorStore = await getPineconeStore();
  const model = openai;
  // const memory = new BufferWindowMemory();

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      returnSourceDocuments: false,
      memory,
    }
  );

  const response = await chain.call({
    question: sanitizedQuestion,
  });

  return response.text;
};
