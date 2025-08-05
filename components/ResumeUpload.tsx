import { Input } from "@/components/ui/input";
import { LoaderCircle, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function ResumeUpload({
  onExtracted,
  analyze,
  selectedFile,
  setSelectedFile,
  isAnalyzing
}: {
  onExtracted: (text: string) => void;
  analyze: () => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  isAnalyzing: boolean;

}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

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
  };

  return (
    <>
      <h3 className="text-xl font-bold font-heading text-foreground mb-2">
        Upload Your Book PDF
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Upload a PDF to get instant summaries and insights with BookAI Pro.
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