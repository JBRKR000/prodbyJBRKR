"use client";

import { useCallback, useState } from "react";
import { HeroSectionAnimation } from "./animations/HeroSectionAnimation";
import { HeroSectionTitleAnimation } from "./animations/HeroSectionTitleAnimation";

export function HeroSection() {
  const [isTitleAnimationDone, setIsTitleAnimationDone] = useState(false);
  const handleTitleAnimationComplete = useCallback(() => {
    setIsTitleAnimationDone(true);
  }, []);

  return (
    // snap-start  → this is a scroll snap point
    // min-h-screen → at least full viewport height
    // The rest is unchanged from the original
    <section
      id="home"
      className="snap-start relative flex min-h-dvh items-center justify-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 md:min-h-screen"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_82%_at_50%_6%,rgb(220_38_38/0.16),transparent_58%)] md:bg-[linear-gradient(140deg,rgb(255_255_255/0.12),transparent_34%,rgb(220_38_38/0.18)_70%,transparent)]" />
      <HeroSectionAnimation />
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <HeroSectionTitleAnimation onComplete={handleTitleAnimationComplete} />
        <div
          className={`transition-all duration-700 ease-out ${
            isTitleAnimationDone
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mb-10 sm:text-lg">
            Industry-ready instrumentals for artists pushing boundaries. Minimal
            boilerplate, maximum impact. Secure your sound today.
          </p>

          <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-4 sm:w-auto sm:max-w-none sm:flex-row">
            <a
              href="#beats"
              className="w-full rounded-full bg-primary px-8 py-4 text-center text-base font-bold text-primary-foreground transition-colors hover:bg-red-500 sm:w-auto"
            >
              Explore Catalog
            </a>
            <a
              href="#contact"
              className="w-full rounded-full border border-white/40 bg-black/20 px-8 py-4 text-center text-base font-bold text-white backdrop-blur-md transition-colors hover:border-primary/70 hover:bg-red-950/30 sm:w-auto"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
