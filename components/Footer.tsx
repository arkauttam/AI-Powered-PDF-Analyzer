import Link from 'next/link'
import { BrandTwitter, BrandLinkedin, BrandInstagram, BrandGithub } from 'tabler-icons-react'

export default function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Use Cases", "Integrations", "Roadmap"]
    },
    {
      title: "Resources",
      links: ["Blog", "Book Database", "Learning Center", "API Documentation", "Community"]
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Contact", "Partners", "Press Kit"]
    }
  ]

  return (
    <footer className="pt-24 pb-14 bg-[#0c1324] relative border-t border-[rgba(148,163,184,0.1)] w-full">
      <div className="container flex flex-wrap gap-12 mb-16 footer-grid">
        <div className="max-w-xs">
          <div className="relative flex items-center gap-2 text-2xl font-bold mb-6 font-sans z-50">
            <BookIcon />
          </div>

          <p className="text-slate-200 mb-6">
            Harness the power of AI to transform your reading experience. Get instant insights from any book.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/uttam-ghosh-7187a2258/"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BrandTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/uttam-ghosh-7187a2258/"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BrandLinkedin />
            </a>
            <a
              href="https://www.linkedin.com/in/uttam-ghosh-7187a2258/"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BrandInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/uttam-ghosh-7187a2258/"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BrandGithub />
            </a>
          </div>

        </div>

        {footerLinks.map((section, index) => (
          <div key={index} className="footer-links">
            <h3 className="text-xl mb-6 relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-accent">
              {section.title}
            </h3>
            <ul>
              {section.links.map((link, i) => (
                <li key={i} className="mb-3">
                  <a href="#" className="text-slate-200 hover:text-accent hover:pl-1.5 transition-all">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-slate-800 text-center text-slate-200 text-sm">
        <p>
          &copy; 2025 <span className='font-bold'>BookAI</span> <span className="text-accent">Pro</span>. All rights reserved. | 
          
          <a
            href="https://www.linkedin.com/in/uttam-ghosh-7187a2258/"
            className="social-link text-accent pl-2"
            target="_blank"
            rel="noopener noreferrer"
          >
             Uttam Ghosh
          </a> | 

          <a href="#" className="hover:text-accent"> Privacy Policy</a> | <a href="#" className="hover:text-accent">Terms of Service</a>
        </p>
      </div>
    </footer>
  )
}

function BookIcon() {
  return (
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
  )
}