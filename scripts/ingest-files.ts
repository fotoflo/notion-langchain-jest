import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores";
import { pinecone } from "@/utils/pinecone-client";
import { processMarkDownFiles } from "@/utils/helpers";
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from "@/config/pinecone";

/* Name of directory to retrieve files from. You can change this as required */
const directoryPath = "docs";

export const run = async () => {
  try {
    /*load raw docs from the markdown files in the directory */
    const rawDocs = await processMarkDownFiles(directoryPath);

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log("split docs", docs);

    console.log("creating vector store...");
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings();

    const pineconeArgs = {
      pineconeIndex: pinecone.Index(PINECONE_INDEX_NAME),
      namespace: PINECONE_NAME_SPACE,
    };

    const promises = docs.map(async (doc) => {
      console.log("ingesting doc", doc);
      await PineconeStore.fromDocuments([doc], embeddings, pineconeArgs);
    });

    return await Promise.all(promises);
  } catch (error) {
    const ts = new Date().toISOString();
    console.log(ts + " error", error);
    throw new Error(ts + " Failed to ingest your data");
  }
};
