"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import projects from "@/data/projects.json";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full-Stack / React" },
  { id: "python", label: "Python & Automation" },
];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState("all");
  const visible = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <>
      <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors duration-150 ${
              filter === f.id
                ? "border-foreground bg-foreground text-background"
                : "border-border text-text-muted hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-colors duration-150 hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              <h2 className="text-lg font-semibold leading-snug tracking-tight">{project.title}</h2>
              <p className="line-clamp-2 text-sm leading-relaxed text-text-muted">
                {project.summary}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-border bg-surface-muted px-2 py-0.5 font-mono text-xs text-zinc-500 dark:text-zinc-400"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center gap-5 border-t border-border pt-4 text-sm font-medium">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-150 hover:text-text-muted"
                  >
                    Live Demo ↗
                  </a>
                ) : (
                  <span className="cursor-not-allowed text-text-muted/60" title="Not deployed yet">
                    Live Demo ↗
                  </span>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-150 hover:text-text-muted"
                >
                  Source Code ↗
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
