'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] max-w-7xl z-50 transition-all duration-300 border border-[rgba(148,163,184,0.1)] rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${isScrolled ? 'py-3 bg-background/95' : 'py-4 sm:py-5 bg-background/80'
        } backdrop-blur-md`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="logo flex items-center gap-2 text-xl sm:text-2xl font-bold font-heading">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-book"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
              <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
              <path d="M3 6l0 13" />
              <path d="M12 6l0 13" />
              <path d="M21 6l0 13" />
            </svg>
          </div>
          BookAI<span className="text-accent">Pro</span>
        </Link>

       

        <div
          className={`${isOpen ? 'flex bg-[linear-gradient(15deg,#151b47,#07192c_80%,#0b1120)]' : 'hidden'
            } border rounded-[20px] h-auto right-0 lg:right-auto lg:flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-10 absolute lg:static top-full w-60 lg:w-auto  bg-transparent p-6 sm:p-8 lg:p-0 transition-all duration-300 border-t lg:border-none border-[rgba(201,208,219,0.1)] shadow-lg lg:shadow-none lg:h-auto lg:z-auto z-40`}
        >
          <Link
            href="#"
            className="relative text-base sm:text-lg font-normal hover:text-accent transition-colors group mt-4 lg:mt-0"
            onClick={() => setIsOpen(false)}
          >
            Home
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#features"
            className="relative text-base sm:text-lg font-normal hover:text-accent transition-colors group"
            onClick={() => setIsOpen(false)}
          >
            Features
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#summary"
            className="relative text-base sm:text-lg font-normal hover:text-accent transition-colors group"
            onClick={() => setIsOpen(false)}
          >
            Summary
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#testimonials"
            className="relative text-base sm:text-lg font-normal hover:text-accent transition-colors group"
            onClick={() => setIsOpen(false)}
          >
            Testimonials
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto sm:hidden block"
            disabled
          >
            Login
          </Button>
          <Button
            size="lg"
            variant="primary"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto sm:hidden block"
            disabled
          >
            Sign Up
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto hidden sm:block"
            disabled
          >
            Login
          </Button>
          <Button
            size="lg"
            variant="primary"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto hidden sm:block"
            disabled
          >
            Sign Up
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex w-11 h-11 rounded-xl"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

        </div>
         <button
          className="lg:hidden text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
}