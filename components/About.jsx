"use client";

import { motion } from "framer-motion";
import { Code2, Server, Bot } from "lucide-react";
import { profile } from "@/data/profile";

const focusAreas = [
  {
    icon: Code2,
    title: "React Frontends",
    description: "Building fast, accessible interfaces with React and Tailwind CSS.",
  },
  {
    icon: Server,
    title: "Node.js APIs",
    description: "Designing REST APIs with Node.js, Express, and MySQL.",
  },
  {
    icon: Bot,
    title: "Python Automation",
    description: "Scripting scrapers and bots that remove repetitive manual work.",
  },
];

export default function About() {
  return (
    <section id="about" className="border-b border-surface-border px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="lowercase font-mono text-sm text-accent-cyan">01. About</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight">
            {profile.bio}
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {focusAreas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-surface rounded-2xl p-6"
            >
              <div className="mb-4 inline-flex rounded-xl bg-accent-cyan/10 p-2.5 text-accent-cyan">
                <area.icon size={20} />
              </div>
              <h3 className="font-semibold text-foreground">{area.title}</h3>
              <p className="mt-1.5 text-sm text-text-muted">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
