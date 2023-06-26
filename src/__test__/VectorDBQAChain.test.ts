import { chatHandler } from "../VectorDBQAChain";

describe("chatHandler", () => {
  it("should return some text from openai", async () => {
    const result = await chatHandler("hello my name is alex.");
    console.info("##########1:", result);
    expect(result).toMatch(/alex/i);
  }, 40000);
});
