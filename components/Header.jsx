import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { PenBox, Sparkles } from "lucide-react";
import Usermenu from "./User-menu";
import { CheckUser } from "@/lib/checkuser";
import Userloading from "./user-loading";
import MobileNav from "./MobileNav";

const Header = async () => {
  await CheckUser();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-[1.02] shrink-0">
            <div className="rounded-lg bg-zinc-900/80 p-1 border border-zinc-800">
              <Image
                src="/logo.png"
                alt="iconScrum logo"
                width={120}
                height={32}
                className="h-7 sm:h-8 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation Links for desktop */}
          <div className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-zinc-400">
            <Link
              href="/#features"
              className="hover:text-white transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              href="/#preview"
              className="hover:text-white transition-colors duration-200"
            >
              Preview
            </Link>
            <Link
              href="/#workflow"
              className="hover:text-white transition-colors duration-200"
            >
              Workflow
            </Link>
            <Link
              href="/#faq"
              className="hover:text-white transition-colors duration-200"
            >
              FAQ
            </Link>
            <Link
              href="/about"
              className="hover:text-white transition-colors duration-200"
            >
              About
            </Link>
          </div>

          {/* Right actions: Desktop & Mobile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <SignedIn>
              <Link href="/project/create" className="hidden sm:inline-flex">
                <Button
                  size="sm"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-md shadow-blue-500/20 border-0"
                >
                  <PenBox size={15} />
                  <span>Create Project</span>
                </Button>
              </Link>
              <Usermenu />
            </SignedIn>

            <SignedOut>
              <SignInButton forceRedirectUrl="/onboarding">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 text-xs sm:text-sm font-medium px-2.5 sm:px-3"
                >
                  Sign in
                </Button>
              </SignInButton>
              <Link href="/onboarding" className="hidden sm:inline-flex">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-md shadow-blue-500/20 text-xs sm:text-sm border-0"
                >
                  <Sparkles size={13} className="mr-1.5" />
                  Get started
                </Button>
              </Link>
            </SignedOut>

            {/* Mobile Navigation Drawer Toggle */}
            <MobileNav />
          </div>
        </nav>
      </div>
      <Userloading />
    </header>
  );
};

export default Header;
