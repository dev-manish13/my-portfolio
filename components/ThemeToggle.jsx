"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-surface-border bg-surface text-foreground transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan ${className}`}
    >
      <Sun
        size={17}
        className={`absolute transition-all duration-300 ${isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`}
      />
      <Moon
        size={17}
        className={`absolute transition-all duration-300 ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"}`}
      />
    </button>
  );
}
