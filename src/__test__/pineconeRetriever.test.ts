import { pineconeRetriever } from "../pineconeRetriever";

describe("pineconeRetriever", () => {
  it("it should retreive something from pinecone", async () => {
    const results = await pineconeRetriever({ query: "vacation time", k: 5 });

    console.log(`got ${results.length} results from pinecone`);

    const longest = results.reduce((acc, curr) => {
      if (curr.pageContent.length > acc.pageContent.length) {
        return curr;
      } else {
        return acc;
      }
    });

    console.log(`longest length: `, longest.pageContent.length);
    console.log(`longest: `, longest);
    expect(results).toBeTruthy();
  }, 40000);
});
