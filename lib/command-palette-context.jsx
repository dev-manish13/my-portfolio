"use client";

import { createContext, useContext, useMemo, useState } from "react";

const CommandPaletteContext = createContext({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export function CommandPaletteProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((v) => !v),
    }),
    [isOpen]
  );

  return (
    <CommandPaletteContext.Provider value={value}>{children}</CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  return useContext(CommandPaletteContext);
}
