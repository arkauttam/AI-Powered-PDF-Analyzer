import { Button } from "@/components/ui/button";

export default function DownloadButton({ content }: { content: string }) {
  const download = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "improved_resume.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return <Button onClick={download}>Download Improved Resume</Button>;
}
