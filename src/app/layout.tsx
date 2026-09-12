import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmedatef.dev"), // TODO: confirm this matches the final production domain before launch
  title: {
    default: "Ahmed Atef — Mobile Engineer & Flutter Developer",
    template: "%s | Ahmed Atef",
  },
  description: "Production-grade digital products built with Feature-First Clean Architecture, Flutter, and modern web technologies.",
  keywords: ["Ahmed Atef", "Flutter Developer", "Mobile Engineer", "Software Engineer", "Next.js", "React"],
  authors: [{ name: "Ahmed Atef" }],
  creator: "Ahmed Atef",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahmedatef.dev", // Replace with real URL later
    title: "Ahmed Atef — Mobile Engineer & Flutter Developer",
    description: "Production-grade digital products built with Feature-First Clean Architecture, Flutter, and modern web technologies.",
    siteName: "Ahmed Atef Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Atef — Mobile Engineer",
    description: "Production-grade digital products built with Feature-First Clean Architecture.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1 pt-24 pb-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

