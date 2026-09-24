"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Copy, Check, FileText } from "lucide-react";
import GithubMark from "@/components/icons/GithubMark";
import LinkedinMark from "@/components/icons/LinkedinMark";
import { profile } from "@/data/profile";
import { useResumeModal } from "@/lib/resume-modal-context";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { open } = useResumeModal();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the email is still visible to copy manually.
    }
  };

  return (
    <section id="contact" className="px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="card-surface glow-cyan mx-auto flex w-full max-w-4xl flex-col items-center gap-6 rounded-3xl px-6 py-14 text-center"
      >
        <p className="lowercase font-mono text-sm text-accent-cyan">04. Contact</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Let&apos;s build something together
        </h2>
        <p className="max-w-lg text-text-muted">
          Open to freelance work and full-time opportunities. The fastest way to reach me is
          email.
        </p>

        <div className="flex w-full max-w-xl flex-col items-center gap-3 pt-2">
          <div className="lowercase grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="flex w-full items-center overflow-hidden rounded-lg bg-gradient-to-r from-accent-cyan to-accent-emerald text-sm font-semibold text-slate-950">
              <button
                type="button"
                onClick={copyEmail}
                title="Copy email address"
                className="lowercase flex flex-1 items-center justify-center gap-2 px-3 py-2.5 transition-opacity hover:opacity-90"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span className="truncate">{copied ? "Copied!" : "Email"}</span>
              </button>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Send an email"
                title="Send an email"
                className="flex h-full shrink-0 items-center border-l border-slate-950/15 px-3.5 py-2.5 transition-opacity hover:opacity-90"
              >
                <Mail size={16} />
              </a>
            </div>

            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-surface-border px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
            >
              <Phone size={16} />
              Phone
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-surface-border px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
            >
              <GithubMark size={16} />
              GitHub
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-surface-border px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
            >
              <LinkedinMark size={16} />
              LinkedIn
            </a>
          </div>

          <button
            type="button"
            onClick={open}
            className="lowercase inline-flex items-center gap-2 rounded-lg border border-surface-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
          >
            <FileText size={16} />
            Resume
          </button>
        </div>
      </motion.div>
    </section>
  );
}
