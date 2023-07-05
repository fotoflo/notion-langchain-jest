import { ingest } from "@/scripts/ingest-files";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // OpenAI recommends replacing newlines with spaces for best results

    const response = await ingest();
    debugger;

    res.status(200).json(response);
  } catch (error: any) {
    console.log("error", error);
    res.status(500).json({ error: error?.message || "Unknown error." });
  }
}
