import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {
  PineconeLibArgs,
  PineconeStore,
} from "langchain/vectorstores/pinecone";

const PINECONE_INDEX_NAME = "notionindex";
const PINECONE_NAME_SPACE = "notion-langchain"; //namespace is optional for your vectors

let pineconeInstance: PineconeClient | null = null;

interface PineconeOptions {
  indexName?: string;
  namespace?: string;
}

// this is the one we want to use to get the retriever
export async function getPineconeStore(options: PineconeOptions = {}) {
  const pinecone = await getPineconeClientInstance();
  const pineconeArgs = {
    pineconeIndex: pinecone.Index(options.indexName ?? PINECONE_INDEX_NAME),
    namespace: options.namespace ?? PINECONE_NAME_SPACE,
  };

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    pineconeArgs
  );

  return vectorStore;
}

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

export async function ingestDoc(doc: Document) {
  const pinecone = await getPineconeClientInstance();

  const pineconeArgs: PineconeLibArgs = {
    pineconeIndex: pinecone.Index(PINECONE_INDEX_NAME),
    namespace: PINECONE_NAME_SPACE,
  };
  const embeddings = new OpenAIEmbeddings();

  return await PineconeStore.fromDocuments([doc], embeddings, pineconeArgs);
}
