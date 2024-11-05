import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import Usermenu from "./User-menu";

const Header = () => {
  return (
    <header className="container mx-auto ">
      <nav className="py-6 px-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={150}
            height={100}
            className="h-10 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/project/create">
            <Button variant="destructive" className="flex items-center gap-2">
              <PenBox size={18} />
              <span>create project</span>
            </Button>
          </Link>
          <SignedOut>
            <SignInButton forceRedirectUrl="/onboarding">
              <Button variant="outline" className="">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Usermenu />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
