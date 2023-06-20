import { openai } from "@/utils/openai-client";
import { getPineconeStore } from "@/utils/pinecone-client";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";

export const basicChat = async (question: string) => {
  const sanitizedQuestion = question.trim().replaceAll("\n", " ");

  const vectorStore = await getPineconeStore();
  const model = openai;
  // const memory = new BufferWindowMemory();

  const memory = new BufferMemory({
    memoryKey: "chat_history",
  });

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
