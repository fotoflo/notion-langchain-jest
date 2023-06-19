import { basicChat } from "@/src/chat";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "No question in the request" });
  }

  try {
    // OpenAI recommends replacing newlines with spaces for best results

    const response = await basicChat(question);

    res.status(200).json(response);
  } catch (error: any) {
    console.log("error chat api", error);
    res.status(500).json({ error: error?.message || "Unknown error." });
  }
}
