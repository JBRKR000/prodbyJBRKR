"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

// ─── Shared easing ───────────────────────────────────────────────────────────
// Expo-out: fast start, buttery finish — very "cinematic"
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

// ─── Container: orchestrates stagger of children ─────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.05,
    },
  },
};

// ─── Item variants — import these in each section ────────────────────────────

/** Default: fade + slide up + un-blur */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EXPO_OUT },
  },
};

/** Slide from the left */
export const itemVariantsLeft: Variants = {
  hidden: { opacity: 0, x: -56, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EXPO_OUT },
  },
};

/** Slide from the right */
export const itemVariantsRight: Variants = {
  hidden: { opacity: 0, x: 56, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EXPO_OUT },
  },
};

/** Scale + fade — great for cards/panels */
export const itemVariantsScale: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EXPO_OUT },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  /** How much of the section must be visible before animation fires (0–1) */
  amount?: number;
}

/**
 * Wrap any section's content with this to get staggered scroll-triggered
 * reveal animations. Children should be `motion.div` elements with one of
 * the itemVariants exported above.
 *
 * Example:
 *   <SectionReveal>
 *     <motion.div variants={itemVariantsLeft}>...</motion.div>
 *     <motion.div variants={itemVariantsRight}>...</motion.div>
 *   </SectionReveal>
 */
export function SectionReveal({
  children,
  className,
  amount = 0.2,
}: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      // `once: false` → re-animates when scrolling back up (more cinematic)
      viewport={{ once: false, amount }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}
