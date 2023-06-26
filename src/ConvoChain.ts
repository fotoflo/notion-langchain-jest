import { ConversationChain } from "langchain/chains";
import { openai } from "@/utils/openai-client";
import { BufferMemory } from "langchain/memory";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

export const getConvoChain = async (key: string) => {
  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `please understand this converstaion and respond:. 
      `
    ),
    new MessagesPlaceholder(key),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

  const chain = new ConversationChain({
    memory: new BufferMemory({ returnMessages: true, memoryKey: key }),
    prompt: chatPrompt,
    llm: openai,
  });

  return chain;
};
