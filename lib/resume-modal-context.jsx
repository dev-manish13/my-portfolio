"use client";

import { createContext, useContext, useMemo, useState } from "react";

const ResumeModalContext = createContext({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function ResumeModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return <ResumeModalContext.Provider value={value}>{children}</ResumeModalContext.Provider>;
}

export function useResumeModal() {
  return useContext(ResumeModalContext);
}
