"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Command } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useCommandPalette } from "@/lib/command-palette-context";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const linkClass =
  "text-sm text-zinc-600 transition-colors duration-150 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100";
const activeClass = "!text-zinc-900 dark:!text-zinc-100";
const buttonBorder =
  "border border-zinc-200 text-zinc-600 transition-colors duration-150 hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { open: openPalette } = useCommandPalette();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 text-zinc-900 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-100">
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-mono text-sm font-bold lowercase">
          manish.dev
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.href === pathname ? "page" : undefined}
              className={`${linkClass} ${link.href === pathname ? activeClass : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            className={`hidden h-8 items-center gap-1 rounded-md px-2 text-xs sm:inline-flex ${buttonBorder}`}
          >
            <Command size={12} />K
          </button>
          <ThemeToggle />
          <Link
            href="/resume"
            aria-current={pathname === "/resume" ? "page" : undefined}
            className={`hidden h-8 items-center rounded-md px-3 text-sm md:inline-flex ${buttonBorder}`}
          >
            Resume ↗
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-md md:hidden ${buttonBorder}`}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-zinc-200 px-6 py-3 dark:border-zinc-800 md:hidden">
          {[...NAV_LINKS, { label: "Resume ↗", href: "/resume" }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`${linkClass} py-2`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
