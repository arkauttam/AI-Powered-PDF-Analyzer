import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";

export async function analyzeDocument(text: string, jobDesc?: string) {
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    apiKey: process.env.GOOGLE_API_KEY!,
  });

  const resumeKeywords = ["experience", "education", "skills", "resume", "cv"];
  const isResume = resumeKeywords.some((k) => text.toLowerCase().includes(k));

  let prompt = "";

  if (isResume && jobDesc) {
    // Resume analysis prompt with focus on projects, skills, name, and profession
    prompt = `
You are a resume analysis assistant. Respond ONLY with a valid JSON object, nothing else.
The format should be:
{
  "heading": "Candidate's full name",
  "subheading": "Candidate's profession or job title",
  "score": number between 0 and 100,
  "improvements": [ "tip1", "tip2", ... ],
  "improvedResume": "Improved resume text"
}

Analyze the resume based on alignment of projects and skills with both the job description and the candidate's profession (subheading).
Provide a score (0-100) reflecting how well the candidate's projects and skills match the job requirements and their stated profession.
List at least 3 specific improvements focusing on enhancing project descriptions and skill relevance, tailored to both the job description and the candidate's profession.
Extract the candidate's full name for the heading and their profession or job title for the subheading from the resume text. If name or profession cannot be determined, use "Unknown Candidate" and "Unknown Profession" respectively.


Resume text:
${text}

Job description:
${jobDesc}
`;
  } else {
    // Generic PDF summarization prompt with document title, subheading, and notable quotes
    prompt = `
You are a document summarization assistant.
Summarize the document in a concise paragraph under a "Summary" section.
List 5 key takeaways under a "Key Takeaways" section.
Include at least 5 notable quotes under a "Notable Quotes" section with a subheading "Significant Statements".
Extract the document title for the heading and a relevant subheading (e.g., a subtitle or key theme) from the document text. If the title or subheading cannot be determined, use "Untitled Document" and "General Overview" respectively.

Return the response as JSON:
{
  "heading": "Document title",
  "subheading": "Document subtitle or theme",
  "summary": "Short paragraph",
  "keyTakeaways": ["point1", "point2", "point3","point4", "point5",...],
  "notableQuotes": ["quote1", "quote2", "quote3", "quote4", "quote5", ...]
}

Document text:
${text}
`;
  }

  const result = await model.invoke([new HumanMessage(prompt)]);

  // Extract text safely
  const raw =
    result.text ||
    (Array.isArray(result.content) &&
    typeof result.content[0] === "object" &&
    "text" in result.content[0]
      ? (result.content[0] as { text: string }).text
      : "") ||
    "";

  // Extract JSON using regex
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) {
    return isResume
      ? {
          heading: "Unknown Candidate",
          subheading: "Unknown Profession",
          score: 0,
          improvements: [],
          improvedResume: "Parsing failed.",
        }
      : {
          heading: "Untitled Document",
          subheading: "General Overview",
          summary: "Parsing failed.",
          keyTakeaways: [],
          notableQuotes: [],
        };
  }

  try {
    return JSON.parse(match[0]);
  } catch {
    return isResume
      ? {
          heading: "Unknown Candidate",
          subheading: "Unknown Profession",
          score: 0,
          improvements: [],
          improvedResume: "Parsing failed.",
        }
      : {
          heading: "Untitled Document",
          subheading: "General Overview",
          summary: "Parsing failed.",
          keyTakeaways: [],
          notableQuotes: [],
        };
  }
}
