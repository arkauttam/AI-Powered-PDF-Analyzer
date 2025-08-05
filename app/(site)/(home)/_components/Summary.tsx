
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface SummaryProps {
  heading: string;
  subheading: string;
  isResume: boolean;
  score: number | null;
  improvements: string[];
  improvedResume: string;
  summary: string;
  keyTakeaways: string[];
  notableQuotes: string[];
  jobOpportunities: string[];
}

export default function Summary({
  heading,
  subheading,
  isResume,
  score,
  improvements,
  improvedResume,
  summary,
  keyTakeaways,
  notableQuotes,
  jobOpportunities
}: SummaryProps) {
  return (
    <section id="summary" className="py-12 sm:py-16 md:py-24 my-16 sm:my-20 md:my-28">
      <div className="container mx-auto px-4 sm:px-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-[2.8rem] font-bold font-heading mb-4 relative pb-2">
            Your Personalized Book Summary
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 bg-accent rounded"></span>
          </h2>
          <p className="section-subtitle text-base sm:text-lg md:text-xl text-muted-foreground pt-4">
            {isResume
              ? 'Discover how your resume aligns with the job and get tailored improvement tips.'
              : 'Experience how BookAI Pro transforms lengthy books into concise, actionable insights.'}
          </p>
        </div>
        <div className="summary-container gap-6 items-center justify-between w-full px-8">
          <div className="summary-visual w-full md:w-1/2 max-w-md hidden lg:block ">
            <div className="book-container">
              <div className="book">
                <div className="book-cover">
                  <h3 className="book-title text-lg sm:text-xl md:text-2xl">{heading || "Atomic Habits"}</h3>
                  <p className="book-author text-sm sm:text-base">{subheading || "James Clear"}</p>
                </div>
                <div className="book-spine"></div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full lg:w-1/2 max-w-lg">
            <div className="bg-card rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-[rgba(148,163,184,0.1)]">
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mb-6">
                <Image
                  src="/book.jpeg"
                  alt={heading}
                  width={120}
                  height={180}
                  className="rounded-lg shadow-lg w-full sm:w-full md:w-48 h-60"
                />
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold font-heading">{heading || "Atomic Habits"}</h3>
                  <p className="text-base sm:text-lg text-muted-foreground mb-4">{subheading || "by James Clear"}</p>
                  {!isResume && (
                    <div className="flex flex-col justify-start gap-1 pt-2 sm:pt-4">
                      <div className="flex sm:justify-start gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 sm:w-5 h-4 sm:h-5 text-accent"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.375 2.45a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.375-2.45a1 1 0 00-1.175 0l-3.375 2.45c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.51 9.397c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.97z" />
                          </svg>
                        ))}
                      </div>
                      <h1 className="text-muted-foreground text-sm sm:text-base">
                        4.8/5 (12,000 reviews)
                      </h1>
                    </div>
                  )}
                  {isResume && (
                    <p className="text-lg text-accent font-bold">
                      Score: {score !== null ? `${score}/100` : 'Not available'}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground mb-4 sm:mb-6 text-lg font-bold">
                {summary || "A revolutionary guide to building good habits and breaking bad ones. James Clear reveals practical strategies for forming habits that stick and creating systems for continuous improvement."}
              </p>
              <Accordion type="single" collapsible className="mb-4 sm:mb-6 space-y-4">
                <AccordionItem
                  value="takeaways"
                  className="bg-slate-900/40 hover:bg-slate-50/5 p-2 px-8 border border-[rgba(148,163,184,0.1)] rounded-xl"
                >
                  <AccordionTrigger className="text-sm sm:text-base">
                    {isResume ? 'Improvement Suggestions' : 'Key Takeaways'}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 sm:space-y-4 key-takeaways text-sm sm:text-base">
                      {isResume
                        ? improvements.length > 0
                          ? improvements.map((improvement, index) => (
                            <p key={index}>{improvement}</p>
                          ))
                          : [<li key="no-improvements">No improvement suggestions available.</li>]
                        : keyTakeaways.length > 0
                          ? keyTakeaways.map((takeaway, index) => (
                            <p key={index}>{takeaway}</p>
                          ))
                          : [<li key="no-takeaways">No key takeaways available.</li>]}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="quotes"
                  className="bg-slate-900/40 hover:bg-slate-50/5 p-2 px-8 border border-[rgba(148,163,184,0.1)] rounded-xl"
                >
                  <AccordionTrigger className="text-sm sm:text-base">
                    {isResume ? 'Job Opportunities' : 'Notable Quotes'}
                  </AccordionTrigger>
                  <AccordionContent>
                    {isResume ? (
                      jobOpportunities.length > 0 ? (
                        jobOpportunities.map((job, index) => (
                          <div key={index} className='key-takeaways'>
                            <p className="italic py-1 sm:py-2 text-sm sm:text-base">
                              &quot;{job}&quot;
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm sm:text-base">Not applicable for resume analysis.</p>
                      )
                    ) : notableQuotes.length > 0 ? (
                      notableQuotes.map((quote, index) => (
                        <div key={index} className='key-takeaways'>
                          <p className="italic py-1 sm:py-2 text-sm sm:text-base">
                            &quot;{quote}&quot;
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm sm:text-base">No notable quotes available.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button
                className="gap-2 w-full sm:w-auto py-8 font-bold text-lg"
                size="lg"
                onClick={() => {
                  if (isResume && improvedResume) {
                    const blob = new Blob([improvedResume], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${heading}_Improved_Resume.txt`;
                    link.click();
                    URL.revokeObjectURL(url);
                  } else if (!isResume && summary) {
                    const blob = new Blob(
                      [
                        `Title: ${heading}\nSubtitle: ${subheading}\n\nSummary:\n${summary}\n\nKey Takeaways:\n${keyTakeaways
                          .map((t, i) => `${i + 1}. ${t}`)
                          .join('\n')}\n\nNotable Quotes:\n${notableQuotes
                            .map((q, i) => `${i + 1}. "${q}"`)
                            .join('\n')}`,
                      ],
                      { type: 'text/plain' },
                    );
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${heading}_Summary.txt`;
                    link.click();
                    URL.revokeObjectURL(url);
                  }
                }}
                disabled={isResume ? !improvedResume : !summary}
              >
                <Download className="w-5 h-5" />
                {isResume ? 'Download Improved Resume' : 'Download Full Summary'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
