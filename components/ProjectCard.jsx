"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Braces } from "lucide-react";
import GithubMark from "@/components/icons/GithubMark";
import { highlightPythonLine, tokenClassName } from "@/lib/python-highlight";

export default function ProjectCard({ project, activeSkill, setActiveSkill }) {
  const [flipped, setFlipped] = useState(false);
  const matchesActiveSkill = activeSkill ? project.tags.includes(activeSkill) : true;
  const codeLines = project.code ? project.code.split("\n") : [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      animate={{ opacity: matchesActiveSkill ? 1 : 0.35, scale: matchesActiveSkill ? 1 : 0.98 }}
      className={`card-surface group flex flex-col gap-4 rounded-2xl p-6 transition-shadow duration-300 ${
        activeSkill && matchesActiveSkill ? "glow-emerald" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-snug text-foreground">{project.title}</h3>
        <div className="flex shrink-0 items-center gap-2">
          {project.code && (
            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              aria-label={flipped ? "Show project description" : "Show core code snippet"}
              aria-pressed={flipped}
              title="Under the hood"
              className={`rounded-full border p-2 transition-colors ${
                flipped
                  ? "border-accent-cyan text-accent-cyan"
                  : "border-surface-border text-text-muted hover:border-accent-cyan/50 hover:text-accent-cyan"
              }`}
            >
              <Braces size={16} />
            </button>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} on GitHub`}
            className="rounded-full border border-surface-border p-2 text-text-muted transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
          >
            <GithubMark size={16} />
          </a>
        </div>
      </div>

      <div className="relative min-h-[168px] [perspective:1600px] sm:min-h-[150px]">
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-full w-full"
        >
          <p className="absolute inset-0 text-sm leading-relaxed text-text-muted [backface-visibility:hidden]">
            {project.description}
          </p>

          <div
            className="absolute inset-0 overflow-y-auto rounded-lg bg-slate-950 p-3 font-mono text-[11px] leading-5 text-slate-300 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            {project.codeFilename && (
              <p className="mb-1.5 text-[10px] text-slate-500">{`// ${project.codeFilename}`}</p>
            )}
            {codeLines.map((line, i) => (
              <div key={i} className="whitespace-pre">
                {highlightPythonLine(line).map((tok, j) => (
                  <span key={j} className={tokenClassName[tok.kind]}>
                    {tok.text}
                  </span>
                ))}
                {line.length === 0 ? " " : null}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {project.tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onMouseEnter={() => setActiveSkill(tag)}
            onMouseLeave={() => setActiveSkill(null)}
            onClick={() => setActiveSkill(activeSkill === tag ? null : tag)}
            className={`lowercase rounded-full border px-2.5 py-1 font-mono text-xs transition-colors ${
              activeSkill === tag
                ? "border-accent-cyan text-accent-cyan"
                : "border-surface-border text-text-muted hover:border-accent-cyan/40 hover:text-accent-cyan"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 border-t border-surface-border pt-4 text-sm">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="lowercase inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-accent-cyan"
        >
          Source
          <ArrowUpRight size={14} />
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="lowercase inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-accent-cyan"
          >
            Live demo
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.article>
  );
}
