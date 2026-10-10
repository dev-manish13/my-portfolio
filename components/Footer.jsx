import Link from "next/link";
import { profile } from "@/data/profile";

const linkClass = "transition-colors duration-150 hover:text-zinc-900 dark:hover:text-zinc-100";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 px-6 py-8 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p>© 2026 {profile.name}. All rights reserved.</p>
        <nav aria-label="Footer" className="flex items-center gap-6">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub
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
