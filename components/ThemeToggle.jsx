"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-11 w-11 items-center md:h-9 md:w-9 justify-center rounded-md border border-border text-ink-muted transition-colors duration-150 hover:border-border-strong hover:text-ink"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
