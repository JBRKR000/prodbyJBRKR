"use client";

import { motion } from "motion/react";
import {
  itemVariants,
  itemVariantsScale,
  SectionReveal,
} from "./SectionReveal";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex min-h-dvh items-center px-4 pb-20 pt-28 sm:px-6 sm:pb-16 sm:pt-32"
    >
      {/*
       * The card itself scales + fades in (itemVariantsScale).
       * Inside, each field group staggered via a nested SectionReveal.
       */}
      <SectionReveal className="mx-auto w-full max-w-4xl">
        <motion.div
          variants={itemVariantsScale}
          className="rounded-lg border border-border bg-surface p-4 text-center backdrop-blur-xl sm:p-6 md:p-12 lg:p-16"
        >
          {/* ── Title + subtitle ── */}
          <motion.h2
            variants={itemVariants}
            className="mb-3 font-headings text-3xl font-bold sm:mb-4 sm:text-4xl"
          >
            Ready to work?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-6 max-w-xl text-base text-muted-foreground sm:mb-8 sm:text-lg"
          >
            For exclusive rights, custom production, or general inquiries, reach
            out below. I usually respond within 24 hours.
          </motion.p>

          {/* ── Form fields — each field group is its own motion child ── */}
          <form className="mb-6 grid grid-cols-1 gap-4 text-left sm:mb-8 sm:gap-5 md:grid-cols-2 md:gap-6">
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label
                htmlFor="contact-name"
                className="ml-1 text-sm font-bold text-muted-foreground"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                placeholder="Your name"
                className="rounded-lg border border-border bg-surface px-3 py-2.5 text-foreground outline-none placeholder:text-muted-foreground sm:px-4 sm:py-3"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label
                htmlFor="contact-email"
                className="ml-1 text-sm font-bold text-muted-foreground"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                className="rounded-lg border border-border bg-surface px-3 py-2.5 text-foreground outline-none placeholder:text-muted-foreground sm:px-4 sm:py-3"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-2 md:col-span-2"
            >
              <label
                htmlFor="contact-message"
                className="ml-1 text-sm font-bold text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your project..."
                className="min-h-24 resize-y rounded-lg border border-border bg-surface px-3 py-2.5 text-foreground outline-none placeholder:text-muted-foreground sm:min-h-32 sm:px-4 sm:py-3"
              />
            </motion.div>
          </form>

          <motion.div variants={itemVariants}>
            <button
              type="button"
              className="w-full rounded-full bg-primary px-10 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-red-500 sm:text-lg md:w-auto md:px-12 md:py-4"
            >
              Send Message
            </button>
          </motion.div>
        </motion.div>
      </SectionReveal>
    </section>
  );
}
