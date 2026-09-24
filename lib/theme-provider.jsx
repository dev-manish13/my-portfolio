"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

/**
 * Inline, pre-hydration script that reads the persisted theme (or system
 * preference) and applies the `dark` class before React mounts, so there is
 * no light/dark flash on first paint.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  } catch (e) {}
})();
`;

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Must run post-hydration: the pre-hydration inline script (themeInitScript)
    // already set the class on <html> from localStorage/system preference, and
    // reading it any earlier would mismatch the server-rendered markup.
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("theme", next);
      } catch {
        // ignore write failures (private mode, disabled storage, etc.)
      }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
