import { VectorDBQAChain } from "langchain/chains";
import { openai } from "@/utils/openai-client";
import { getPineconeStore } from "@/utils/pinecone-client";

export const chatHandler = async (question: string) => {
  const model = openai;
  const vectorStore = await getPineconeStore();

  const sanitizedQuestion = question.trim().replaceAll("\n", " ");

  const prompt = `You are a helpful bot that answers questions about Accelerating Asia.
  The following is a conversation with a user. 
  If there's a link in the doc, please put it in an <a> tag and append it to https://www.notion.so/acceleratingasia/ 
  without the md extension.  Also who should i ask about, please include their contact info in the response
  The user is a human and you are a bot. \n\nUser: ${sanitizedQuestion}\nBot:`;

  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    returnSourceDocuments: false,
  });

  const response = await chain.call({
    returnSourceDocuments: true,
    query: prompt,
  });

  return response.text;
};
