"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, ShieldCheck, Sparkles, Heart } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl text-zinc-300">
      {/* Subtle top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand info */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="p-1 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-blue-500/50 transition-colors">
                <Image
                  src="/logo.png"
                  alt="iconScrum"
                  width={130}
                  height={36}
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              Next-generation agile project management built for high-velocity software teams. Plan sprints, track issues, and ship quality code faster.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Product links */}
          <div className="col-span-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3 sm:mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Product
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/#features" className="text-zinc-400 hover:text-white transition-colors">
                  Key Features
                </Link>
              </li>
              <li>
                <Link href="/#preview" className="text-zinc-400 hover:text-white transition-colors">
                  Interactive Board
                </Link>
              </li>
              <li>
                <Link href="/#workflow" className="text-zinc-400 hover:text-white transition-colors">
                  Agile Workflow
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-zinc-400 hover:text-white transition-colors">
                  FAQ & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div className="col-span-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3 sm:mb-4">
              Company
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">
                  About iconScrum
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="https://portfolio-nine-inky-66.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3 sm:mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Trust & Legal
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-zinc-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider and sub-footer */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-zinc-500 order-2 sm:order-1">
            &copy; {new Date().getFullYear()} <span className="text-zinc-400 font-medium">iconScrum</span>. Empowering agile teams.
          </p>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400 order-1 sm:order-2">
            <span>Crafted with</span>
           
            <span>by</span>
            <Link
              href="https://portfolio-nine-inky-66.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4 decoration-blue-500/40"
            >
              Pawan Suthar
            </Link>
          </div>

          <div className="flex items-center gap-3 order-3">
            <Link
              href="https://github.com/pawan-suthar1537"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all hover:scale-105"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/pawansuthar1537/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-blue-400 hover:border-zinc-700 transition-all hover:scale-105"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all hover:scale-105"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
