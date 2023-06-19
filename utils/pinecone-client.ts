import { PineconeClient } from "@pinecone-database/pinecone";

let pineconeInstance: PineconeClient | null = null;

export async function getPineconeInstance(): Promise<PineconeClient> {
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
