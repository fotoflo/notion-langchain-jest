import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { processMarkDownFiles } from "@/utils/helpers";
import { ingestDoc } from "@/utils/pinecone-client";
import { PineconeStore } from "langchain/vectorstores/pinecone";

/* Name of directory to retrieve files from. You can change this as required */
const directoryPath = "docs";
const defaultCount = 300;
const defaultChunkSize = 2000;
const defaultChunkOverlap = 200;

interface IngestProps {
  count?: number;
  chunkSize?: number;
  chunkOverlap?: number;
}

export const ingest = async ({
  count = defaultCount,
  chunkSize = defaultChunkSize,
  chunkOverlap = defaultChunkOverlap,
}: IngestProps = {}): Promise<PineconeStore[]> => {
  if (count > defaultCount) {
    console.warn(`Warning: The count is larger than ${defaultCount}.`);
  }

  try {
    /* Load raw docs from the markdown files in the directory */
    const rawDocs = await processMarkDownFiles(directoryPath, count);

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.info("Split docs:", docs);

    const promises: Promise<PineconeStore>[] = [];
    docs.some(async (doc, i) => {
      if (i > count) {
        return true;
      }
      console.log("Ingesting doc:", doc);
      const promise = ingestDoc(doc);
      promises.push(promise);

      return false;
    });

    return await Promise.all(promises);
  } catch (error) {
    const ts = new Date().toISOString();
    console.error(ts + " Error:", error);
    throw new Error(ts + " Failed to ingest your data");
  }
};
