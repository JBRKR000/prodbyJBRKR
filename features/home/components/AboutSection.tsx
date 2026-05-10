"use client";

import { motion, useReducedMotion } from "motion/react";
import { producerStats } from "../constants";
import {
  itemVariants,
  itemVariantsRight,
  SectionReveal,
} from "./SectionReveal";

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    // snap-start + min-h-screen → full-viewport scroll snap section
    <section
      id="about"
      className="snap-start relative flex min-h-dvh items-center px-3 py-28 sm:px-6 sm:py-32 md:min-h-screen md:py-24"
    >
      {/*
       * SectionReveal triggers when ~20% of the section enters the viewport.
       * Its children are motion.div elements with directional variants:
       *   – Spotify card  → slides in from the LEFT
       *   – Text column   → slides in from the RIGHT
       *   – Each stat     → fades + slides UP (staggered)
       */}
      <SectionReveal className="mx-auto grid w-full max-w-6xl items-center gap-8 sm:gap-10 md:grid-cols-2 lg:gap-16">
        {/* ── Left column: Spotify embed ── */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative overflow-hidden rounded-lg border border-border bg-linear-to-b from-surface/80 to-surface/40 p-2 shadow-lg sm:p-4"
        >
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgb(255_255_255/0.1),transparent_45%,rgb(220_38_38/0.2))]" />
          <div className="relative h-[380px] w-full overflow-hidden rounded-lg sm:h-[440px] md:h-[clamp(380px,62vw,500px)] md:rounded-xl">
            <iframe
              data-testid="embed-iframe"
              className="absolute inset-0 h-full w-full border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
              src="https://open.spotify.com/embed/artist/1N35yWC7vZiVlS21xN3fts?utm_source=generator&theme=0"
              width="100%"
              height="380"
              tabIndex={-1}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* ── Right column: text + stats ── */}
        <div className="flex flex-col items-start text-left">
          {/* Title */}
          <motion.h2
            variants={itemVariantsRight}
            className="mb-4 font-headings text-3xl font-bold sm:mb-6"
          >
            The Architect of Sound
          </motion.h2>

          {/* Body copy — two paragraphs, each a separate reveal item */}
          <motion.p
            variants={itemVariantsRight}
            className="mb-5 text-base leading-relaxed text-muted-foreground sm:mb-6 sm:text-lg"
          >
            JBRKR is a producer focused on dark, hard-hitting, and futuristic
            instrumentals. Combining analog warmth with digital precision, every
            beat is crafted to elevate the artist&apos;s vocal performance.
          </motion.p>

          <motion.p
            variants={itemVariantsRight}
            className="mb-7 text-base leading-relaxed text-muted-foreground sm:mb-8 sm:text-lg"
          >
            No filler, no generic loops. Just straight-to-the-point production
            designed for the modern era of music.
          </motion.p>

          {/* Stats: each counter animates up individually */}
          <div className="flex flex-wrap gap-8 sm:gap-12">
            {producerStats.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants}>
                <div className="mb-1 text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
