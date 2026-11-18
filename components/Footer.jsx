import Link from "next/link";
import { Mail } from "lucide-react";
import GithubMark from "@/components/icons/GithubMark";
import LinkedinMark from "@/components/icons/LinkedinMark";
import { profile } from "@/data/profile";

// min-h-11: 44px tap targets on phones; normal line height from md up.
const linkClass =
  "inline-flex min-h-11 items-center gap-1.5 transition-colors duration-150 hover:text-ink md:min-h-0";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-100 px-6 py-8 text-label font-normal text-ink-muted">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p>© 2026 {profile.name}. All rights reserved.</p>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 md:gap-y-2">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <GithubMark size={16} />
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <LinkedinMark size={16} />
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className={linkClass}>
            <Mail size={16} aria-hidden="true" />
            Email
          </a>
          <Link href="/blog" className={linkClass}>
            Blog
          </Link>
          <Link href="/projects" className={linkClass}>
            Projects
          </Link>
          <Link href="/contact" className={linkClass}>
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
