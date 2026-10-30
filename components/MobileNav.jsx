"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, PenBox, ChevronRight, Home, Workflow, Target, HelpCircle, Info, Mail } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/#features", label: "Features", icon: Target },
    { href: "/#preview", label: "Interactive Board", icon: Workflow },
    { href: "/#workflow", label: "Agile Workflow", icon: Sparkles },
    { href: "/#faq", label: "FAQs", icon: HelpCircle },
    { href: "/about", label: "About iconScrum", icon: Info },
    { href: "/contact", label: "Contact & Support", icon: Mail },
  ];

  return (
    <div className="md:hidden">
      {/* Hamburger Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors focus:outline-none"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-x-0 top-16 bottom-0 z-50 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-zinc-950/95 border-b border-zinc-800/80 p-5 shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Links List */}
            <div className="space-y-1 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 px-3 mb-2">
                Navigation
              </p>
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/80 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-blue-400 transition-colors">
                        <Icon size={16} />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Actions */}
            <div className="pt-4 mt-4 border-t border-zinc-800/80 space-y-3">
              <SignedIn>
                <Link href="/project/create" onClick={() => setIsOpen(false)}>
                  <Button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md shadow-blue-500/20">
                    <PenBox size={16} />
                    <span>Create New Project</span>
                  </Button>
                </Link>
              </SignedIn>

              <SignedOut>
                <div className="grid grid-cols-2 gap-3">
                  <SignInButton forceRedirectUrl="/onboarding">
                    <Button
                      variant="outline"
                      className="w-full border-zinc-800 text-zinc-300 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                  <Link href="/onboarding" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
