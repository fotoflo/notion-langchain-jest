import { ConversationalRetrievalQAChain } from "langchain/chains";
import { openai } from "@/utils/openai-client";
import { BufferMemory } from "langchain/memory";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { getPineconeStore } from "@/utils/pinecone-client";

export const getConvoChain = async (key: string) => {
  const pinecone = await getPineconeStore();

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `please understand this converstaion and respond:. 
      `
    ),
    new MessagesPlaceholder(key),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

  const chain = ConversationalRetrievalQAChain.fromLLM(
    openai,
    pinecone.asRetriever(),
    {
      memory: new BufferMemory({
        returnMessages: true,
        memoryKey: key,
      }),
    }
  );

  return chain;
};
