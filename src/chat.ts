import { basicChat } from "./ConversationalRetrievalQAChain";

export const chatHandler = async (question: string) => {
  return await basicChat(question);
};
