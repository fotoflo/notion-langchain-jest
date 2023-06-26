import { getConvoChain } from "../ConversationalChain";

describe("getConvoChain", () => {
  it("it should return a chat about alex", async () => {
    const chain = await getConvoChain();
    const response = await chain.call({
      input: "hi my name is alex and i'm from new York",
    });

    console.log(`Response: `, response);

    const response1 = await chain.call({
      input: "what's my name and where do i come from?",
    });

    console.log(`Response1: `, response1);
    expect(JSON.parse(response1.response)[0].data.content).toMatch(/alex/i);
  }, 20000);
});
