"use client";
import { useState } from "react";
import ResumeUpload from "@/components/ResumeUpload";
import ScoreCard from "@/components/ScoreCard";
import ImprovementsList from "@/components/ImprovementsList";
import DownloadButton from "@/components/DownloadButton";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [isResume, setIsResume] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [improvements, setImprovements] = useState<string[]>([]);
  const [improvedResume, setImprovedResume] = useState("");
  const [summary, setSummary] = useState("");
  const [keyTakeaways, setKeyTakeaways] = useState<string[]>([]);

  const analyze = async () => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resume: resumeText,
        job: "Frontend Developer with React and TypeScript", 
      }),
    });

    const data = await res.json();

    // If API returns "score", it's a resume
    if ("score" in data) {
      setIsResume(true);
      setScore(data.score);
      setImprovements(data.improvements || []);
      setImprovedResume(data.improvedResume || "");
    }
    // If API returns "summary", it's another type of document
    else if ("summary" in data) {
      setIsResume(false);
      setSummary(data.summary || "");
      setKeyTakeaways(data.keyTakeaways || []);
    }
  };

  return (
    <main className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">AI PDF Analyzer</h1>

      <ResumeUpload onExtracted={(text) => {
        setResumeText(text);
        const keywords = ["experience", "education", "skills", "resume", "cv"];
        const isLikelyResume = keywords.some(k => text.toLowerCase().includes(k));
        setIsResume(isLikelyResume);
      }} />

      <Button onClick={analyze} disabled={!resumeText}>
        Analyze
      </Button>

      {/* Resume-specific output */}
      {isResume && score !== null && (
        <>
          <ScoreCard score={score} />
          <h2 className="text-lg font-semibold">Suggestions</h2>
          <ImprovementsList list={improvements} />
          <DownloadButton content={improvedResume} />
        </>
      )}

      {/* Other document output */}
      {!isResume && summary && (
        <>
          <h2 className="text-lg font-semibold">Summary</h2>
          <p className="bg-gray-100 p-4 rounded">{summary}</p>
          <h2 className="text-lg font-semibold mt-4">Key Takeaways</h2>
          <ul className="list-disc pl-6">
            {keyTakeaways.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
