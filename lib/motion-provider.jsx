"use client";

import { MotionConfig } from "framer-motion";

// Framer Motion skips transform and layout animations for visitors whose OS
// asks for reduced motion; opacity fades remain so state changes stay visible.
export function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
