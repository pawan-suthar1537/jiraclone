import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { Toaster } from "sonner";

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
      navigate={(to) => {
        // Modify the redirect logic to point to your live web app URL
        if (to.url.startsWith("/sign-in/[[...index]]")) {
          window.location.href = "https://jiraclone-mocha.vercel.app";
        } else {
          navigateToPath(to.url);
        }
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
                <p>made by pawan</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
