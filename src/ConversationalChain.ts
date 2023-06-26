import { ConversationChain } from "langchain/chains";
import { openai } from "@/utils/openai-client";
import { BufferMemory } from "langchain/memory";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

export const conversationChain = async () => {
  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `please understand this converstaion and respond:. 
      `
    ),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

  const chain = new ConversationChain({
    memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
    prompt: chatPrompt,
    llm: openai,
  });

  const response = await chain.call({
    input: "hi my name is alex and i'm from new York",
  });

  console.log(`Response: `, response);

  const response1 = await chain.call({
    input: "what's my name and where do i come from?",
  });

  console.log(`Response1: `, response1);

  return response1;
};
