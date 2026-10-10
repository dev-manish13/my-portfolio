"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Copy, Check, FileText, Loader2, Send, X, Phone } from "lucide-react";
import GithubMark from "@/components/icons/GithubMark";
import LinkedinMark from "@/components/icons/LinkedinMark";
import { profile, gmailComposeUrl } from "@/data/profile";

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white p-3 text-sm text-foreground placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900/50 dark:placeholder:text-zinc-500";

const actionClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-transparent dark:hover:bg-zinc-800/60";

const cardClass =
  "flex items-center gap-3 rounded-lg border border-zinc-200 px-3.5 py-3 text-sm transition-colors duration-150 dark:border-zinc-800";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [toast, setToast] = useState(null);

  const notify = (ok, text) => setToast({ ok, text, id: Date.now() });

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      notify(true, "Email copied to clipboard");
    } catch {
      notify(false, `Couldn't copy — my email is ${profile.email}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // never let the browser navigate away
    const form = e.currentTarget;
    const formData = new FormData(form);
    // Web3Forms access keys are public by design (they only route mail to the owner).
    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "2dae1177-e10a-45dc-a97d-b6f701d49b36"
    );
    formData.append("replyto", String(formData.get("email") ?? ""));
    formData.append("subject", "New Contact Message from manish.dev");

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.message || "Request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 md:p-12"
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-100 leading-tight">
                Let&apos;s build something together
              </h1>
              <p className="mt-4 leading-relaxed text-text-muted">
                Open to freelance work and full-time engineering roles. Send a message or reach
                out directly.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer" className={actionClass}>
                <Mail size={16} />
                Open in Gmail
              </a>
              <button type="button" onClick={copyEmail} className={actionClass}>
                <Copy size={16} />
                Copy Email
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} hover:bg-zinc-50 dark:hover:bg-zinc-800/60`}
              >
                <GithubMark size={16} className="shrink-0" />
                <span className="truncate">{profile.githubUsername}</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} hover:bg-zinc-50 dark:hover:bg-zinc-800/60`}
              >
                <LinkedinMark size={16} className="shrink-0" />
                LinkedIn
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} hover:bg-zinc-50 dark:hover:bg-zinc-800/60`}
              >
                <FileText size={16} className="shrink-0" />
                Resume
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className={`${cardClass} hover:bg-zinc-50 dark:hover:bg-zinc-800/60`}
              >
                <Phone size={16} className="shrink-0" />
                <span className="truncate font-mono text-xs">{profile.phone}</span>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="jane@example.com"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="Tell me about your project or opportunity…"
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Web3Forms honeypot: hidden from people, bots fill it. */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>

            <div aria-live="polite">
              {status === "success" && (
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  ✓ Message sent! I&apos;ll get back to you shortly.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-text-muted">
                  Could not connect. Please click &lsquo;Open in Gmail&rsquo; or email{" "}
                  {profile.email} directly.
                </p>
              )}
            </div>
          </form>
        </div>
      </motion.div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 right-6 z-[90] flex max-w-sm items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 shadow-lg"
          >
            {toast.ok ? (
              <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />
            ) : (
              <X size={16} className="mt-0.5 shrink-0 text-red-400" />
            )}
            <span>{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
