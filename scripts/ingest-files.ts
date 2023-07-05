import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { processMarkDownFiles } from "@/utils/helpers";
import { ingestDoc } from "@/utils/pinecone-client";
import { PineconeStore } from "langchain/vectorstores/pinecone";

/* Name of directory to retrieve files from. You can change this as required */
const directoryPath = "docs";

export const ingest = async (count = 100000) => {
  try {
    /*load raw docs from the markdown files in the directory */
    const rawDocs = await processMarkDownFiles(directoryPath);

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 10000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log("split docs", docs);

    console.log("creating vector store...");
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings();

    const promises: Promise<PineconeStore>[] = [];
    docs.some(async (doc, i) => {
      if (i > count) {
        return true;
      }
      console.log("ingesting doc", doc);
      const promise = ingestDoc(doc);
      promises.push(promise);

      return false;
    });

    return await Promise.all(promises);
  } catch (error) {
    const ts = new Date().toISOString();
    console.log(ts + " error", error);
    throw new Error(ts + " Failed to ingest your data");
  }
};
