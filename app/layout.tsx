import React from 'react';
import { Inconsolata, Quicksand } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/sonner";

const inconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inconsolata',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-quicksand',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inconsolata.variable} ${quicksand.variable}`}>
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}