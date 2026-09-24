"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, MapPin } from "lucide-react";
import Avatar from "@/components/Avatar";
import Terminal from "@/components/Terminal";
import LiveClock from "@/components/LiveClock";
import { profile } from "@/data/profile";
import { useResumeModal } from "@/lib/resume-modal-context";

export default function Hero() {
  const { open } = useResumeModal();
  const glowRef = useRef(null);

  // Subtle radial glow that follows the pointer — purely decorative, so it's
  // driven by a CSS custom property instead of React state/re-renders.
  const handleMouseMove = (event) => {
    const el = glowRef.current;
    if (!el) return;
    const rect = event.currentTarget.getBoundingClientRect();
    el.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="bg-grid relative overflow-hidden border-b border-surface-border px-6 pb-20 pt-28 sm:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-accent-cyan/5 via-transparent to-transparent" />
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden sm:block"
        style={{
          background:
            "radial-gradient(480px circle at var(--mx, 50%) var(--my, 15%), rgb(56 189 248 / 0.08), transparent 70%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start gap-6"
        >
          <div className="flex items-center gap-4">
            <Avatar size={72} />
            <div className="flex flex-col items-start gap-1.5">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-muted">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {profile.location}
                </span>
                <LiveClock className="text-xs text-text-muted" />
              </p>
              <span className="lowercase inline-flex w-fit items-center gap-1.5 rounded-full border border-accent-emerald/30 bg-accent-emerald/10 px-2.5 py-0.5 text-xs font-medium text-accent-emerald">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-emerald" />
                Available for work
              </span>
              <span className="lowercase inline-flex w-fit items-center gap-1.5 rounded-md border border-surface-border bg-surface-muted px-2 py-1 font-mono text-[11px] text-text-muted">
                <span className="text-accent-emerald">&gt;</span> status: building web scrapers
                <span className="caret-blink text-accent-emerald">▍</span>
              </span>
            </div>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
          </h1>

          <p className="max-w-xl text-lg text-text-muted">{profile.bio}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="lowercase inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-emerald px-5 py-2.5 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
            >
              View Projects
              <ArrowUpRight size={16} />
            </a>
            <button
              type="button"
              onClick={open}
              className="lowercase inline-flex items-center gap-2 rounded-lg border border-surface-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
            >
              <FileText size={16} />
              Resume
            </button>
          </div>
        </motion.header>

        <Terminal />
      </div>
    </section>
  );
}
