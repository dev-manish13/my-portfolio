"use client";

import { motion } from "framer-motion";
import projects from "@/data/projects.json";
import ProjectCard from "@/components/ProjectCard";

export default function Projects({ activeSkill, setActiveSkill }) {
  return (
    <section id="projects" className="border-b border-surface-border px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="lowercase font-mono text-sm text-accent-cyan">03. Projects</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Featured work</h2>
          <p className="mt-2 max-w-xl text-text-muted">
            A couple of things I&apos;ve built recently — full-stack systems and automation
            scripts that solve a real, specific problem.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              activeSkill={activeSkill}
              setActiveSkill={setActiveSkill}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
