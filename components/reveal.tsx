"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Entrance / scroll-reveal wrapper. Fades + lifts its children into view the
 * first time they enter the viewport. Collapses to a plain <div> (no transform,
 * fully visible) when the user prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  duration = 0.7,
  amount = 0.25,
  style,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  amount?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
