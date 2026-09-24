"use client";

import { useEffect } from "react";

/**
 * The browser's native scroll restoration, plus its native "scroll to the
 * element matching the URL fragment" behavior (from a prior in-page nav
 * click, e.g. #contact), can land a refresh mid-page instead of at the top.
 * Chromium in particular re-applies the fragment scroll after fonts/images
 * finish loading and shift layout, which can happen after a naive one-shot
 * `scrollTo` already ran — so this strips the fragment entirely and
 * reasserts scroll-to-top for a short window after mount.
 */
export default function ScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    const resetScroll = () => window.scrollTo(0, 0);
    resetScroll();

    window.addEventListener("load", resetScroll);
    const timeouts = [0, 50, 150, 300, 600].map((ms) => setTimeout(resetScroll, ms));

    return () => {
      window.removeEventListener("load", resetScroll);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return null;
}
