"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, FileText } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useResumeModal } from "@/lib/resume-modal-context";
import { useCommandPalette } from "@/lib/command-palette-context";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useResumeModal();
  const { open: openPalette } = useCommandPalette();

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5">
        <a href="#home" className="lowercase font-mono text-lg font-bold">
          <span className="text-accent-cyan">&lt;</span>mk
          <span className="text-accent-cyan">/&gt;</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="lowercase text-sm font-medium text-text-muted transition-colors hover:text-accent-cyan"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            className="lowercase hidden items-center gap-2 rounded-lg border border-surface-border px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan sm:flex"
          >
            <Command size={13} />
            <span>Search</span>
            <kbd className="rounded border border-surface-border px-1 text-[10px]">⌘K</kbd>
          </button>

          <button
            type="button"
            onClick={open}
            className="lowercase hidden items-center gap-1.5 rounded-lg border border-surface-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan sm:flex"
          >
            <FileText size={13} />
            Resume
          </button>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-surface-border text-foreground md:hidden"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-surface-border md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="lowercase rounded-lg px-2 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-surface-muted hover:text-accent-cyan"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  open();
                }}
                className="lowercase mt-1 rounded-lg px-2 py-2.5 text-left text-sm font-medium text-text-muted transition-colors hover:bg-surface-muted hover:text-accent-cyan"
              >
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
