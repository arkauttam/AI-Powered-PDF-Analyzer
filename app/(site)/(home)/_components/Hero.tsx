import { Sparkles, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import ResumeUpload from '@/components/ResumeUpload';
import { useRouter } from 'next/navigation';

export default function Hero({
    analyze,
    setResumeText,
    setIsResume,
    isAnalyzing,
    setJobDesc,
    heading,
    subheading
}: {
    heading: string;
    subheading: string;
    analyze: () => void;
    setResumeText: (text: string) => void;
    setIsResume: (isResume: boolean) => void;
    isAnalyzing: boolean;
    setJobDesc: (job: string) => void;
}) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const router = useRouter();
    return (
        <section className="px-4 sm:px-6 hero min-h-screen flex items-center py-24 md:py-12 my-20">
            <div className="container mx-auto flex flex-col sm:flex-col lg:flex-row items-center gap-8 md:gap-16 justify-between">
                <div className="flex-1 text-center lg:text-left max-w-2xl">
                    <h1 className="text-[2.8rem] md:text-[3.8rem] font-bold font-heading mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                        Discover Profound Insights from Books in Minutes
                    </h1>
                    <p className="font-mono text-lg md:text-xl text-muted-foreground mb-8">
                        Harness advanced AI to get concise summaries, key takeaways, and quotes tailored for busy minds. Experience the future of reading today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button size="xl" className="gap-2 text-lg" variant="primary">
                                    <Sparkles className="w-5 h-5" />
                                    Get Started
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="md:w-96 sm:w-80 w-64 bg-card backdrop-blur-md border border-border/10 rounded-2xl p-6">
                                <ResumeUpload
                                    onExtracted={(text) => {
                                        setResumeText(text);
                                        const keywords = ["experience", "education", "skills", "resume", "cv"];
                                        const isLikelyResume = keywords.some(k => text.toLowerCase().includes(k));
                                        setIsResume(isLikelyResume);
                                    }}
                                    analyze={analyze}
                                    selectedFile={selectedFile}
                                    setSelectedFile={setSelectedFile}
                                    isAnalyzing={isAnalyzing}
                                    setJobDesc={setJobDesc}
                                />
                            </PopoverContent>
                        </Popover>
                        <Button size="xl" variant="outline" className="gap-2 text-lg" onClick={() => router.push("/#features")}>
                            <Info className="w-5 h-5" />
                            Learn More
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                        <div className="text-center">
                            <span className="text-3xl md:text-4xl font-bold font-heading text-accent">10,000+</span>
                            <p className="text-sm uppercase text-muted-foreground tracking-wide font-bold font-serif">
                                Books Summarized
                            </p>
                        </div>
                        <div className="text-center">
                            <span className="text-3xl md:text-4xl font-bold font-heading text-accent">98%</span>
                            <p className="text-sm uppercase text-muted-foreground tracking-wide font-bold font-serif">
                                Accuracy
                            </p>
                        </div>
                        <div className="text-center">
                            <span className="text-3xl md:text-4xl font-bold font-heading text-accent">500K+</span>
                            <p className="text-sm uppercase text-muted-foreground tracking-wide font-bold font-serif">
                                Users
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 hero-visual">
                    <div className="book-container">
                        <div className="book">
                            <div className="book-cover">
                                <h3 className="book-title">{heading || "The Psychology of Money"}</h3>
                                <p className="book-author">{subheading || "Morgan Housel"}</p>
                            </div>
                            <div className="book-spine"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}