import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";

const chat = new ChatOpenAI({ temperature: 0 });

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI Credentials");
}

export const openai = new OpenAI({
  modelName: "text-davinci-003",
  temperature: 0,
  maxTokens: 500,
});

export const chatOpenAi = new ChatOpenAI({
  temperature: 0,
  maxTokens: 500,
  verbose: true,
});
