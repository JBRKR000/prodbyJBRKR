"use client";

import { motion } from "motion/react";
import { Filter, Play, Search, ShoppingCart } from "lucide-react";
import { beatCatalog } from "../constants";
import { itemVariants, itemVariantsLeft, SectionReveal } from "./SectionReveal";

export function BeatCatalogSection() {
  return (
    <section
      id="beats"
      className="relative flex min-h-dvh items-center px-4 pb-20 pt-28 sm:px-6 sm:pb-16 sm:pt-32"
    >
      {/*
       * SectionReveal orchestrates the stagger:
       *  1. Header (title + controls) → slide up
       *  2. Table header row         → slide from left
       *  3. Beat rows                → each row slides up, one by one
       */}
      <SectionReveal className="mx-auto w-full max-w-6xl">
        {/* ── Header ── */}
        <motion.div
          variants={itemVariants}
          className="mb-6 flex flex-col gap-4 sm:mb-10 sm:gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 className="mb-2 font-headings text-3xl font-bold sm:mb-4 sm:text-4xl">
              Beat Catalog
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Minimal, spreadsheet-style tracklist. No clutter.
            </p>
          </div>

          <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 sm:px-4">
              <Search aria-hidden="true" className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Search...</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 sm:px-4">
              <Filter aria-hidden="true" className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter</span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-3 md:hidden">
          {beatCatalog.map((beat) => (
            <motion.article
              key={`mobile-${beat.title}`}
              variants={itemVariants}
              className="rounded-lg border border-border bg-surface p-3 backdrop-blur-xl sm:p-4"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold">{beat.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {beat.bpm} BPM • {beat.musicalKey}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Play ${beat.title}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-strong text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Play aria-hidden="true" className="ml-0.5 size-3.5" />
                </button>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {beat.tags.map((tag) => (
                  <span
                    key={`mobile-${beat.title}-${tag}`}
                    className="rounded bg-surface-strong px-2 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                aria-label={`Buy ${beat.title} for $${beat.price}`}
                className="flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-red-500"
              >
                <ShoppingCart aria-hidden="true" className="size-3.5" />
                Buy for ${beat.price}
              </button>
            </motion.article>
          ))}
        </div>

        {/* ── Table ── */}
        <div className="hidden overflow-hidden rounded-lg border border-border bg-surface backdrop-blur-xl md:block">
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              {/* Column headers */}
              <motion.div
                variants={itemVariantsLeft}
                className="grid grid-cols-[48px_minmax(180px,1fr)_80px_90px_180px_110px] gap-6 border-b border-border px-8 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                <div>#</div>
                <div>Title</div>
                <div>BPM</div>
                <div>Key</div>
                <div>Tags</div>
                <div className="text-right">Action</div>
              </motion.div>

              {/* Beat rows — each is a separate motion child → stagger */}
              <div className="flex flex-col">
                {beatCatalog.map((beat) => (
                  <motion.div
                    key={beat.title}
                    variants={itemVariants}
                    className="group grid grid-cols-[48px_minmax(180px,1fr)_80px_90px_180px_110px] items-center gap-6 border-b border-white/5 bg-transparent px-8 py-4 last:border-0 even:bg-white/[0.02]"
                  >
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        aria-label={`Play ${beat.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-strong text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <Play aria-hidden="true" className="ml-0.5 size-3.5" />
                      </button>
                    </div>
                    <div className="text-base font-bold">{beat.title}</div>
                    <div className="font-mono text-sm text-muted-foreground">
                      {beat.bpm}
                    </div>
                    <div className="font-mono text-sm text-muted-foreground">
                      {beat.musicalKey}
                    </div>
                    <div className="flex gap-2">
                      {beat.tags.map((tag) => (
                        <span
                          key={`${beat.title}-${tag}`}
                          className="rounded bg-surface-strong px-2 py-1 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        aria-label={`Buy ${beat.title} for $${beat.price}`}
                        className="flex items-center gap-2 rounded bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-red-500"
                      >
                        <ShoppingCart aria-hidden="true" className="size-3.5" />
                        ${beat.price}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
