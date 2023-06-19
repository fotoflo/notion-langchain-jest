import { openai } from "@/utils/openai-client";
import { getPineconeStore } from "@/utils/pinecone-client";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";

export const basicChat = async (question: string) => {
  const sanitizedQuestion = question.trim().replaceAll("\n", " ");

  // const prompt = `You are a helpful bot that answers questions about Accelerating Asia.
  // The following is a conversation with a user.
  // If there's a link in the doc, please put it in an <a> tag and append it to https://www.notion.so/acceleratingasia/
  // without the md extension.  Also who should i ask about, please include their contact info in the response
  // The user is a human and you are a bot. \n\nUser: ${sanitizedQuestion}\nBot:`;

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
