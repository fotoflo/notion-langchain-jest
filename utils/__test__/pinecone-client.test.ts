import { getPineconeInstance } from "../pinecone-client";
import { PineconeClient } from "@pinecone-database/pinecone";

describe("getPineconeInstance", () => {
  it("should return the pinecone instance", async () => {
    const result = await getPineconeInstance();
    expect(result).toBeInstanceOf(PineconeClient);
  });
});
