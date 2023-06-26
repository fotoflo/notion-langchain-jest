import { conversationChain } from "../ConversationalChain";

import { BufferWindowMemory } from "langchain/memory";

describe("basicChat", () => {
  it("should return some text from openai", async () => {
    const memory = new BufferWindowMemory({
      returnMessages: true,
      memoryKey: "chat_history",
    });

    const result1 = await conversationChain();
    console.info("##########1:", result1);

    expect(JSON.parse(result1.response)[0].data.content).toMatch(/alex/i);
  }, 20000);
});
