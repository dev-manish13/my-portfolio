"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, FileText, Download, ExternalLink, AlertCircle } from "lucide-react";
import { useResumeModal } from "@/lib/resume-modal-context";
import { profile } from "@/data/profile";

export default function ResumeModal() {
  const { isOpen, close } = useResumeModal();
  const [status, setStatus] = useState("checking"); // checking | available | missing

  // Reset to "checking" the moment the modal opens. Doing this during render
  // (comparing against the previous isOpen) keeps the reset synchronous with
  // the open itself, instead of a setState call inside the effect below.
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) setStatus("checking");
  }

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    fetch(profile.resume, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setStatus(res.ok ? "available" : "missing");
      })
      .catch(() => {
        if (!cancelled) setStatus("missing");
      });

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelled = true;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
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
            aria-label="Resume preview"
            className="card-surface relative z-10 w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
              <div className="flex items-center gap-2 text-foreground">
                <FileText size={18} className="text-accent-cyan" />
                <h2 className="font-semibold">Resume</h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close resume modal"
                className="rounded-full p-1.5 text-text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5">
              {status === "checking" && (
                <div className="flex flex-col items-center justify-center gap-3 py-10 text-text-muted">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent-cyan border-t-transparent" />
                  <p className="text-sm">Checking for resume.pdf…</p>
                </div>
              )}

              {status === "available" && (
                <div className="flex flex-col gap-4">
                  <div className="overflow-hidden rounded-lg border border-surface-border">
                    <iframe src={profile.resume} title="Resume preview" className="h-80 w-full bg-white" />
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={profile.resume}
                      download
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-emerald px-4 py-2.5 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-90"
                    >
                      <Download size={16} />
                      Download PDF
                    </a>
                    <a
                      href={profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg border border-surface-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
                    >
                      <ExternalLink size={16} />
                      Open
                    </a>
                  </div>
                </div>
              )}

              {status === "missing" && (
                <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-surface-border bg-surface-muted px-6 py-10 text-center">
                  <AlertCircle size={28} className="text-accent-cyan" />
                  <p className="font-medium text-foreground">Resume not available yet</p>
                  <p className="max-w-xs text-sm text-text-muted">
                    Manish hasn&apos;t uploaded a resume file for this site yet. Check back soon,
                    or reach out directly by email.
                  </p>
                  {/* TODO: Add resume.pdf to public folder */}
                  <code className="mt-1 rounded bg-slate-950/40 px-2 py-1 font-mono text-xs text-text-muted">
                    public/resume.pdf
                  </code>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
