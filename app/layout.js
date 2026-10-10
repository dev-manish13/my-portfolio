import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/lib/theme-provider";
import { CommandPaletteProvider } from "@/lib/command-palette-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollRestoration from "@/components/ScrollRestoration";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://kandelmanish.com.np";
const SITE_TITLE = "Manish Kandel — Full-Stack Developer & Python Automation Specialist";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Manish Kandel",
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
  authors: [{ name: "Manish Kandel", url: SITE_URL }],
  creator: "Manish Kandel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_TITLE,
    description:
      "Full-stack developer building React web applications, Node.js REST APIs, and automated Python data pipelines.",
    siteName: "Manish Kandel Portfolio",
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
      className={`${inter.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before hydration to prevent a light/dark flash on load */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans" suppressHydrationWarning>
        <ThemeProvider>
            <CommandPaletteProvider>
              <ScrollRestoration />
              <ScrollProgress />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CommandPalette />
            </CommandPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
