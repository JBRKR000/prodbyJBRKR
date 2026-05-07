import { HeroSectionAnimation } from "./animations/HeroSectionAnimation";
import { HeroSectionTitleAnimation } from "./animations/HeroSectionTitleAnimation";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-190 items-center justify-center overflow-hidden px-4 pt-24 sm:px-6"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(96_165_250/0.14),transparent_34%,rgb(147_51_234/0.1)_68%,transparent)]" />
      <HeroSectionAnimation />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <HeroSectionTitleAnimation />
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Industry-ready instrumentals for artists pushing boundaries. Minimal
          boilerplate, maximum impact. Secure your sound today.
        </p>

        <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
          <a
            href="#beats"
            className="rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore Catalog
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border bg-surface px-8 py-4 text-base font-bold backdrop-blur-md transition-colors hover:bg-surface-strong"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
