import { getConvoChain } from "../ConvoChain";

describe("ConversationalRetrievalQAChain", () => {
  xit("it should return a chat about alex", async () => {
    const chain = await getConvoChain("alex");
    const response0 = await chain.call({
      input: "hi my name is alex and i'm from new York",
    });

    console.log(`Response0: `, response0);

    const response1 = await chain.call({
      input: "what's my name and where do i come from?",
    });

    const response2 = await chain.call({
      input: "and what is the vacation policy?",
    });

    console.log(`Response1: `, response1);
    expect(JSON.parse(response1.response)[0].data.content).toMatch(/alex/i);

    console.log(`Response2: `, response2);

    debugger;
    expect(JSON.parse(response2.response)[0].data.content).toMatch(
      /unlimited paid leave/i
    );
  }, 40000);
});
