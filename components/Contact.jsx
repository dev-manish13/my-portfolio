"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Copy, Check, FileText, Loader2, Send, X, Phone } from "lucide-react";
import GithubMark from "@/components/icons/GithubMark";
import LinkedinMark from "@/components/icons/LinkedinMark";
import { profile, gmailComposeUrl, BRAND } from "@/data/profile";

const inputClass = "field";

const actionClass = "btn-secondary";

// Clickable wells: Ember cards swap to the `border` colour on hover.
const cardClass =
  "card card-link flex min-w-0 items-center gap-2 rounded-sm px-3 py-3 text-label text-ink sm:gap-3 sm:px-4";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [toast, setToast] = useState(null);
  // Decoded only on request so the number is absent from the served HTML.
  const [phone, setPhone] = useState(null);

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
    formData.append("subject", `New Contact Message from ${BRAND}`);

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
    <section className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      <div className="card p-6 sm:p-8 md:p-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-display-lg text-ink">
                Let&apos;s build something together
              </h1>
              <p className="mt-4 text-body text-ink-muted">
                Open to freelance work and full-time engineering roles. Send a message or reach
                out directly.
              </p>
            </div>

            {/* Side by side on every width; shorter labels on phones so both fit. */}
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actionClass} whitespace-nowrap max-sm:px-3`}
              >
                <Mail size={16} aria-hidden="true" />
                <span className="sm:hidden">Gmail</span>
                <span className="hidden sm:inline">Open in Gmail</span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className={`${actionClass} whitespace-nowrap max-sm:px-3`}
              >
                <Copy size={16} aria-hidden="true" />
                Copy email
              </button>
            </div>

            {/* Two per row on every width so all four options fit on one phone screen. */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass}`}
              >
                <GithubMark size={16} className="shrink-0" />
                <span className="truncate sm:hidden">GitHub</span>
                <span className="hidden truncate sm:inline">{profile.githubUsername}</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass}`}
              >
                <LinkedinMark size={16} className="shrink-0" />
                <span className="truncate">LinkedIn</span>
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                // Once the number is shown it needs a full row on phones; Resume takes one too
                // so neither sits alone in half a row.
                className={`${cardClass} ${phone ? "max-sm:col-span-2" : ""}`}
              >
                <FileText size={16} className="shrink-0" />
                Resume
              </a>
              {phone ? (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className={`${cardClass} max-sm:col-span-2`}
                >
                  <Phone size={16} className="shrink-0" />
                  <span className="truncate tabular-nums">{phone}</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setPhone(atob(profile.phoneEncoded))}
                  className={`${cardClass} text-left`}
                >
                  <Phone size={16} className="shrink-0" />
                  <span className="sm:hidden">Phone</span>
                  <span className="hidden sm:inline">Show phone number</span>
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-label text-ink">
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

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-label text-ink">
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

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-label text-ink">
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
              className="btn-primary"
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
                <p className="inline-flex items-center gap-2 text-label text-ink">
                  <Check size={16} aria-hidden="true" />
                  Message sent! I&apos;ll get back to you shortly.
                </p>
              )}
              {status === "error" && (
                <p className="text-label font-normal text-ink-muted">
                  Could not connect. Please click &lsquo;Open in Gmail&rsquo; or email{" "}
                  {profile.email} directly.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 right-6 z-[90] flex max-w-sm items-start gap-3 rounded-sm bg-ink px-4 py-3 text-label font-normal text-surface-0"
          >
            {toast.ok ? (
              <Check size={16} className="mt-0.5 shrink-0 text-brand" />
            ) : (
              <X size={16} className="mt-0.5 shrink-0" />
            )}
            <span>{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
