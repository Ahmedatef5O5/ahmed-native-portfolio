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
  metadataBase: new URL("https://www.ahmedatef.tech"),
  title: {
    default: "Ahmed Atef — Mobile Engineer & Flutter Developer",
    template: "%s | Ahmed Atef",
  },
  description:
    "Production-grade digital products built with Feature-First Clean Architecture, Flutter, and modern web technologies.",
  keywords: [
    "Ahmed Atef",
    "Flutter Developer",
    "Mobile Engineer",
    "Software Engineer",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Ahmed Atef" }],
  creator: "Ahmed Atef",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ahmedatef.tech",
    title: "Ahmed Atef — Mobile Engineer & Flutter Developer",
    description:
      "Production-grade digital products built with Feature-First Clean Architecture, Flutter, and modern web technologies.",
    siteName: "Ahmed Atef Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ahmed Atef — Mobile Engineer & Flutter Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Atef — Mobile Engineer & Flutter Developer",
    description:
      "Production-grade digital products built with Feature-First Clean Architecture.",
    images: ["/opengraph-image"],
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

