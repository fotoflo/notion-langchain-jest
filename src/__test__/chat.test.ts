import { basicChat } from "../chat";

describe("basicChat", () => {
  it("should return some text from openai", async () => {
    const result1 = await basicChat("hello my name is alex");
    console.log("my name is alex: ", result1);

    const result2 = await basicChat("what is my name");
    console.log("what is my name? ", result2);

    expect(typeof result2).toBe("string");
    expect(result2).toContain("alex");
  }, 20000);
});
