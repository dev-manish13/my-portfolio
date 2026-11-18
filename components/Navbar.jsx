"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useCommandPalette } from "@/lib/command-palette-context";
import { BRAND } from "@/data/profile";
import { useShortcutLabel } from "@/lib/use-shortcut-label";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const linkClass =
  "rounded-item px-3 py-1.5 text-nav text-ink-muted transition-colors duration-150 hover:text-ink";
// Ember AppPanel: the active nav item gets a surface-200 fill and ink text.
const activeClass = "bg-surface-200 !text-ink";
const buttonBorder =
  "border border-border text-ink-muted transition-colors duration-150 hover:border-border-strong hover:text-ink";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { open: openPalette } = useCommandPalette();
  const headerRef = useRef(null);
  const shortcut = useShortcutLabel();

  // Close the mobile menu on Esc, on a tap outside the header, and when the page changes.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const onPointer = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMenuOpen(false);
  }

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-border bg-surface-0/85 text-ink backdrop-blur-md">
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="inline-flex min-h-11 items-center text-lg font-semibold tracking-tight">
          {BRAND}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
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
            className={`hidden h-9 items-center rounded-md px-2.5 text-caption sm:inline-flex ${buttonBorder}`}
          >
            <kbd className="font-sans">{shortcut}</kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-md md:hidden ${buttonBorder}`}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="flex flex-col gap-1 border-t border-border px-6 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              aria-current={link.href === pathname ? "page" : undefined}
              className={`${linkClass} py-2.5 ${link.href === pathname ? activeClass : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
