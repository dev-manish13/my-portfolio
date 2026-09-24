"use client";

import { SkillIcon } from "@/components/icon-map";

export default function SkillBadge({ name, icon, activeSkill, setActiveSkill }) {
  const isActive = activeSkill === name;
  const isDimmed = activeSkill !== null && !isActive;

  return (
    <button
      type="button"
      onMouseEnter={() => setActiveSkill(name)}
      onMouseLeave={() => setActiveSkill(null)}
      onFocus={() => setActiveSkill(name)}
      onBlur={() => setActiveSkill(null)}
      onClick={() => setActiveSkill(isActive ? null : name)}
      aria-pressed={isActive}
      className={`lowercase inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan glow-cyan"
          : "border-surface-border bg-surface text-foreground hover:border-accent-cyan/40 hover:text-accent-cyan"
      } ${isDimmed ? "opacity-40" : "opacity-100"}`}
    >
      <SkillIcon name={icon} size={15} />
      {name}
    </button>
  );
}
