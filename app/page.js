"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { profile } from "@/data/profile";

export default function Home() {
  // Lifted here (rather than context) so Skills and Projects — the only two
  // sections that care about it — share one obvious source of truth.
  const [activeSkill, setActiveSkill] = useState(null);

  useEffect(() => {
    console.log(
      "%cHello, fellow developer! \u{1F44B}%c\nLooking for the source? %c" + profile.github,
      "color:#38bdf8;font-size:16px;font-weight:bold;",
      "color:#94a3b8;font-size:12px;",
      "color:#34d399;font-size:12px;font-weight:bold;"
    );
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills activeSkill={activeSkill} setActiveSkill={setActiveSkill} />
      <Projects activeSkill={activeSkill} setActiveSkill={setActiveSkill} />
      <Contact />
    </>
  );
}
