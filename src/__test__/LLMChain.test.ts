import { basicChat } from "../LLMChain";

import { BufferWindowMemory } from "langchain/memory";

describe("basicChat", () => {
  it("should return some text from openai", async () => {
    const memory = new BufferWindowMemory({
      returnMessages: true,
      memoryKey: "chat_history",
    });

    const result1 = await basicChat("hello my name is alex.", memory);
    console.info("##########1:", result1);

    const result2 = await basicChat("what is my name?", memory);
    console.info("##########2:", result2);

    expect(typeof result2).toBe("string");
    expect(result2).toContain("alex");
  }, 20000);
});
