import { basicChat } from "../VectorDBQAChain";

describe("basicChat", () => {
  it("should return some text from openai", async () => {
    const result = await basicChat("hello my name is alex.");
    console.info("##########1:", result);
    expect(result).toMatch(/alex/i);
  }, 40000);
});
