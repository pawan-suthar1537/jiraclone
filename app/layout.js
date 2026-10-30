import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "iconScrum — Next-Gen Agile Project & Sprint Management",
  description:
    "Plan sprints, track issues, and ship quality work faster without the bloat. Engineered for modern high-velocity software teams.",
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
        <body className={`${inter.className} dotted-background antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

