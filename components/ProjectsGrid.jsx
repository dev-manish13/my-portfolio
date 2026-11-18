"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import GithubMark from "@/components/icons/GithubMark";
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
            className={`min-h-11 rounded-pill border px-3.5 py-1.5 text-label md:min-h-0 transition-colors duration-150 ${
              filter === f.id
                ? // White-on-orange needs 16px semibold (3.5:1); a 14px chip uses brand-ink on the ground instead.
                  "border-brand text-brand-ink"
                : "border-border text-ink-muted hover:border-border-strong hover:text-ink"
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
              className="card flex flex-col gap-4 p-6"
            >
              <h2 className="text-card-title text-ink">{project.title}</h2>
              <p className="line-clamp-2 text-label font-normal text-ink-muted">
                {project.summary}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center gap-5 border-t border-border pt-4 text-label">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Live demo
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  <GithubMark size={16} />
                  Source code
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
