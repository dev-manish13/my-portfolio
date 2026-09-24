"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, FolderGit2, Atom, Copy, Check, FileText, User, Mail, Command } from "lucide-react";
import { useCommandPalette } from "@/lib/command-palette-context";
import { useResumeModal } from "@/lib/resume-modal-context";
import { profile } from "@/data/profile";

export default function CommandPalette() {
  const { isOpen, close, toggle } = useCommandPalette();
  const { open: openResume } = useResumeModal();
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const scrollTo = (id) => () => {
    close();
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const commands = useMemo(
    () => [
      { id: "about", label: "Go to About", icon: User, action: scrollTo("about") },
      { id: "skills", label: "Go to Skills", icon: Atom, action: scrollTo("skills") },
      { id: "projects", label: "Go to Projects", icon: FolderGit2, action: scrollTo("projects") },
      { id: "contact", label: "Go to Contact", icon: Mail, action: scrollTo("contact") },
      {
        id: "copy-email",
        label: copied ? "Email copied!" : `Copy Email (${profile.email})`,
        icon: copied ? Check : Copy,
        action: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {
            // Clipboard API unavailable in this context.
          }
        },
        keepOpen: true,
      },
      {
        id: "resume",
        label: "Download Resume",
        icon: FileText,
        action: () => {
          close();
          openResume();
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [copied]
  );

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKeyDown = (e) => {
      const isK = e.key === "k" || e.key === "K";
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        toggle();
        return;
      }
      if (!isOpen) return;

      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        filtered[activeIndex]?.action();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, filtered, activeIndex]);

  // Reset the query/selection during render (comparing against the previous
  // isOpen) rather than via a setState call inside an effect.
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
    }
  }

  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setActiveIndex(0);
  }

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 10);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="card-surface relative z-10 w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-center gap-3 border-b border-surface-border px-4 py-3">
              <Search size={17} className="text-text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command…"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-text-muted"
              />
              <kbd className="hidden items-center gap-1 rounded border border-surface-border px-1.5 py-0.5 text-[10px] text-text-muted sm:flex">
                <Command size={10} />K
              </kbd>
            </div>

            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-text-muted">No matching commands.</p>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => {
                    cmd.action();
                    if (!cmd.keepOpen) close();
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    i === activeIndex
                      ? "bg-accent-cyan/10 text-accent-cyan"
                      : "text-foreground hover:bg-surface-muted"
                  }`}
                >
                  <cmd.icon size={16} />
                  {cmd.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
