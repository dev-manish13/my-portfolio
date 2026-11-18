import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/lib/theme-provider";
import { MotionProvider } from "@/lib/motion-provider";
import { CommandPaletteProvider } from "@/lib/command-palette-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import ScrollProgress from "@/components/ScrollProgress";
import { profile, SITE_URL } from "@/data/profile";
import { SITE_TITLE, SITE_NAME, rootAlternates } from "@/lib/seo";

// Variable Inter with the optical-size axis: large text gets the tighter display cuts.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${profile.name}`,
  },
  description:
    "Full-stack developer building React web applications, Node.js REST APIs, and automated Python data pipelines in Kathmandu, Nepal.",
  keywords: [
    "Manish Kandel",
    "Full Stack Developer",
    "Python Automation",
    "React Developer Nepal",
    "Node.js",
    "Web Scraping",
    "Kathmandu Developer",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  // Canonicals are set per page; this keeps the RSS link on any page without its own.
  alternates: rootAlternates,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: SITE_TITLE,
    description:
      "Full-stack developer building React web applications, Node.js REST APIs, and automated Python data pipelines.",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "Full-stack developer building React web applications, Node.js REST APIs, and automated Python data pipelines.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before hydration to prevent a light/dark flash on load */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-surface-0 text-ink font-sans" suppressHydrationWarning>
        <ThemeProvider>
          <MotionProvider>
            <CommandPaletteProvider>
              <ScrollProgress />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CommandPalette />
            </CommandPaletteProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
