"use client"
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from './_components/Hero';
import Features from './_components/Features';
import Summary from './_components/Summary';
import Testimonials from './_components/Testimonials';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import FadeInUp from '@/components/animations/FadeInUp';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [resumeText, setResumeText] = useState("");
  const [isResume, setIsResume] = useState(false);
  const [jobDesc, setJobDesc] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [improvements, setImprovements] = useState<string[]>([]);
  const [improvedResume, setImprovedResume] = useState("");
  const [summary, setSummary] = useState("");
  const [keyTakeaways, setKeyTakeaways] = useState<string[]>([]);
  const [notableQuotes, setNotableQuotes] = useState<string[]>([]);
  const [jobOpportunities, setJobOpportunities] = useState<string[]>([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') {
      setTheme('light');
      document.documentElement.classList.add('light');
    } else {
      setTheme('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const analyze = async () => {
    if (!resumeText) {
      toast.error("Please upload a PDF before analyzing.");
      return;
    }

    setIsAnalyzing(true);
    const toastId = toast.loading("Analyzing your document...");

    try {
      const response = await axios.post("/api/analyze", {
        resume: resumeText,
        job: jobDesc || "Frontend Developer with React and TypeScript",
      });

      const data = response.data;

      setHeading(data.heading || (data.score ? "Unknown Candidate" : "Untitled Document"));
      setSubheading(data.subheading || (data.score ? "Unknown Profession" : "General Overview"));
      if ("score" in data) {
        setIsResume(true);
        setScore(data.score || 0);
        setImprovements(data.improvements || []);
        setImprovedResume(data.improvedResume || "");
        setSummary(data.summary || "");
        setJobOpportunities(data.jobOpportunities || []);
        setKeyTakeaways([]);
        setNotableQuotes([]);
        toast.success("Resume analysis complete!", { id: toastId });
      } else if ("summary" in data) {
        setIsResume(false);
        setScore(null);
        setImprovements([]);
        setImprovedResume("");
        setSummary(data.summary || "");
        setJobOpportunities([]);
        setKeyTakeaways(data.keyTakeaways || []);
        setNotableQuotes(data.notableQuotes || []);
        toast.success("Document summary generated!", { id: toastId });
      } else {
        toast.error("Unexpected response from server.", { id: toastId });
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze document. Please try again.", { id: toastId });
    } finally {
      setIsAnalyzing(false);
      router.push("/#summary");
    }
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${theme}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Container>
        <FadeInUp delay={0.1}>
          <Hero
            heading={heading}
            subheading={subheading}
            analyze={analyze}
            setResumeText={setResumeText}
            setIsResume={setIsResume}
            isAnalyzing={isAnalyzing}
            setJobDesc={setJobDesc}
          />
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <Features />
        </FadeInUp>

        <FadeInUp delay={0.15}>
          <Summary
            heading={heading}
            subheading={subheading}
            isResume={isResume}
            score={score}
            improvements={improvements}
            improvedResume={improvedResume}
            summary={summary}
            keyTakeaways={keyTakeaways}
            notableQuotes={notableQuotes}
            jobOpportunities={jobOpportunities}
          />
        </FadeInUp>
      </Container>

      <FadeInUp delay={0.2}>
        <Testimonials />
      </FadeInUp>
      <Footer />
    </div>
  );
}
