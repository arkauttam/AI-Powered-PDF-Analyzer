import dbConnect from "@/lib/mongodb";
import Resume from "@/models/Resume";
import { analyzeDocument } from "@/lib/langchain";
import type { NextApiRequest, NextApiResponse } from "next";

interface AnalyzeRequestBody {
  resume: string;
  job: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { resume, job } = req.body as AnalyzeRequestBody;

    if (!resume || !job) {
      return res.status(400).json({ error: "Missing resume or job description" });
    }

    // Connect to DB
    await dbConnect();

    // Analyze the resume
    const result = await analyzeDocument(resume, job);

    // Save to MongoDB
    await Resume.create({
      resumeText: resume,
      jobDescription: job,
      ...result,
    });

    return res.status(200).json(result);
  } catch (err: any) {
    console.error("Analyze API Error:", err);
    return res.status(500).json({ error: err.message || "Server Error" });
  }
}
