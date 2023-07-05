import { getPineconeStore } from "@/utils/pinecone-client";

interface RetrieverProps {
  query: string;
  k: number;
}

export const pineconeRetriever = async ({
  query,
  k,
}: RetrieverProps): Promise<any[]> => {
  const pinecone = await getPineconeStore();
  const retriever = pinecone.asRetriever(k);

  const results = await retriever.getRelevantDocuments(query);

  return results;
};
