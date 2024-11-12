import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { Toaster } from "sonner";
import Link from "next/link";
import { Github, GithubIcon, Linkedin, TwitterIcon } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jira Clone",
  description: "Jira Clone",
};

export default function RootLayout({ children, pageProps }) {
  return (
    <ClerkProvider
      {...pageProps}
      appearance={{
        baseTheme: shadesOfPurple,
      }}
      elements={{
        card: "bg-gray-00",
        footer: "hidden",
      }}
    >
      <html lang="en">
        <body className={`${inter.className} dotted-background`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <footer className="bg-gray-900 py-12">
              <div className="container mx-auto text-center text-gray-200 px-4">
                <p className="mb-4">
                  © {new Date().getFullYear()} iconScrum | Empowering your
                  project management experience
                </p>
                <p>
                  Made with ❤️ by
                  <Link
                    href="https://portfolio-nine-inky-66.vercel.app/"
                    className="text-blue-500 hover:text-blue-400 ml-1"
                  >
                    Pawan Suthar
                  </Link>
                </p>
                <div className="flex justify-center gap-6 mt-6">
                  <Link
                    href="https://github.com/pawan-suthar1537"
                    className="text-gray-400 hover:text-gray-200"
                  >
                    <Github className="h-6 w-6" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/pawansuthar1537/"
                    className="text-gray-400 hover:text-gray-200"
                  >
                    <Linkedin className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
