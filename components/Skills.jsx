"use client";

import { motion } from "framer-motion";
import skillGroups from "@/data/skills.json";
import SkillBadge from "@/components/SkillBadge";

export default function Skills({ activeSkill, setActiveSkill }) {
  return (
    <section id="skills" className="border-b border-surface-border px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="lowercase font-mono text-sm text-accent-cyan">02. Skills</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">What I work with</h2>
          <p className="mt-2 max-w-xl text-text-muted">
            Hover or tap a skill to see which projects below put it to use.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                    activeSkill={activeSkill}
                    setActiveSkill={setActiveSkill}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
