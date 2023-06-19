import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from "@/config/pinecone";

let pineconeInstance: PineconeClient | null = null;

export async function getPineconeClientInstance(): Promise<PineconeClient> {
  if (pineconeInstance) {
    return pineconeInstance;
  }

  if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
    throw new Error("Pinecone environment or api key vars missing");
  }

  try {
    const pinecone = new PineconeClient();
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT ?? "", //this is in the dashboard
      apiKey: process.env.PINECONE_API_KEY ?? "",
    });

    pineconeInstance = pinecone;
    return pineconeInstance;
  } catch (error) {
    console.error("Failed to initialize Pinecone Client", error);
    throw new Error("Failed to initialize Pinecone Client");
  }
}

export async function getPineconeStore() {
  const pinecone = await getPineconeClientInstance();
  const pineconeArgs = {
    pineconeIndex: pinecone.Index(PINECONE_INDEX_NAME),
    namespace: PINECONE_NAME_SPACE,
  };

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    pineconeArgs
  );

  return vectorStore;
}
