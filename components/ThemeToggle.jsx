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
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 transition-colors duration-150 hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
