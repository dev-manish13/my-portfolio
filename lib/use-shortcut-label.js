"use client";

import { useSyncExternalStore } from "react";

const isApple = () => {
  const platform = navigator.userAgentData?.platform || navigator.platform || "";
  return /mac|iphone|ipad|ipod/i.test(platform);
};

// "⌘K" on Apple devices, "Ctrl K" elsewhere. The server renders "⌘K"; the client
// corrects it after hydration without a mismatch warning.
export function useShortcutLabel() {
  return useSyncExternalStore(
    () => () => {},
    () => (isApple() ? "⌘K" : "Ctrl K"),
    () => "⌘K"
  );
}
