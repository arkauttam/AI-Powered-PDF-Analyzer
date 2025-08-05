import { Input } from "@/components/ui/input";
import { LoaderCircle, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function ResumeUpload({
  onExtracted,
  setJobDesc,
  analyze,
  selectedFile,
  setSelectedFile,
  isAnalyzing
}: {
  onExtracted: (text: string) => void;
  setJobDesc: (job: string) => void;
  analyze: () => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  isAnalyzing: boolean;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const extractJobDescription = (text: string): string => {
    // Simple keyword-based extraction for job description
    const jobKeywords = ["job description", "position", "role", "title", "career objective"];
    const lines = text.split('\n');
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      if (jobKeywords.some(keyword => lowerLine.includes(keyword))) {
        return line.trim();
      }
    }
    // Fallback to common job titles or first line if no keywords found
    const commonJobTitles = ["developer", "engineer", "manager", "analyst", "designer"];
    for (const line of lines) {
      if (commonJobTitles.some(title => line.toLowerCase().includes(title))) {
        return line.trim();
      }
    }
    return lines[0]?.trim() || "Unknown Job Description";
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data?.text) {
        onExtracted(data.text);
        const jobDescription = extractJobDescription(data.text);
        setJobDesc(jobDescription);
        setIsUploaded(true);
      } else {
        console.error("Upload failed:", data);
        setSelectedFile(null);
        setIsUploaded(false);
        alert("Failed to upload PDF. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setSelectedFile(null);
      setIsUploaded(false);
      alert("An error occurred during upload. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setIsUploaded(false);
    onExtracted("");
    setJobDesc("");
  };

  return (
    <>
      <h3 className="text-xl font-bold font-heading text-foreground mb-2">
        Upload Your Resume or Document PDF
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Upload a PDF to get instant analysis or summaries with AI assistance.
      </p>
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-xl p-4 mb-4">
        <Upload className="w-8 h-8 text-primary mb-2" />
        <label
          htmlFor="pdf-upload"
          className="cursor-pointer bg-primary text-white py-1.5 px-3 rounded-lg text-sm hover:bg-primary-dark transition-all"
        >
          Choose PDF
        </label>
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFile}
          disabled={isUploading}
        />
        {selectedFile && (
          <p className="text-sm text-muted-foreground mt-2">
            Selected: {selectedFile.name}
          </p>
        )}
        {isUploading && (
          <p className="text-sm text-primary mt-2 animate-pulse">Uploading...</p>
        )}
      </div>
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          disabled={!selectedFile || isUploading}
          className="w-full sm:w-auto"
        >
          Clear
        </Button>
        <Button
          size="sm"
          onClick={analyze}
          disabled={isUploading || isAnalyzing}
          className="w-full sm:w-auto gap-2"
        >
          {isAnalyzing ? (
            <>
              <LoaderCircle className="w-4 h-4 text-white animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 rotate-180" />
              Analyze
            </>
          )}
        </Button>
      </div>
    </>
  );
}