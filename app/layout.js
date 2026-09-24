import { Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/lib/theme-provider";
import { ResumeModalProvider } from "@/lib/resume-modal-context";
import { CommandPaletteProvider } from "@/lib/command-palette-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import ResumeModal from "@/components/ResumeModal";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollRestoration from "@/components/ScrollRestoration";
import { profile } from "@/data/profile";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.name} — ${profile.role}`;

export const metadata = {
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description: profile.bio,
  keywords: [
    "Manish Kandel",
    "Full-Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Python Automation",
    "Web Scraping",
    "Kathmandu Nepal Developer",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  metadataBase: new URL("https://example.com"), // TODO: replace with your production domain
  openGraph: {
    title,
    description: profile.bio,
    url: "/",
    siteName: `${profile.name} — Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.bio,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${firaCode.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before hydration to prevent a light/dark flash on load */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans" suppressHydrationWarning>
        <ThemeProvider>
          <ResumeModalProvider>
            <CommandPaletteProvider>
              <ScrollRestoration />
              <ScrollProgress />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CommandPalette />
              <ResumeModal />
            </CommandPaletteProvider>
          </ResumeModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
