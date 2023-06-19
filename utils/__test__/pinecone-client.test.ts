import {
  getPineconeClientInstance,
  getPineconeStore,
} from "../pinecone-client";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PineconeClient } from "@pinecone-database/pinecone";

describe("getPineconeInstance", () => {
  it("should return the pinecone instance", async () => {
    const result = await getPineconeClientInstance();
    expect(result).toBeInstanceOf(PineconeClient);
  });
});

describe("getPineconeStore", () => {
  it("should return the configured pinecone store", async () => {
    const result = await getPineconeStore();
    expect(result).toBeInstanceOf(PineconeStore);
  });
});
