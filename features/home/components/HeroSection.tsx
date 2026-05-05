export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[760px] items-center justify-center overflow-hidden px-4 pt-24 sm:px-6"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(96_165_250_/_0.14),transparent_34%,rgb(147_51_234_/_0.1)_68%,transparent)]" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2 backdrop-blur-xl">
          <span className="h-2 w-2 rounded-full bg-accent-green" />
          <span className="text-sm font-medium text-muted-foreground">
            Available for exclusive placements
          </span>
        </div>

        <h1 className="mb-6 font-headings text-5xl font-bold leading-tight tracking-normal md:text-7xl">
          Next-Gen
          <br />
          <span className="bg-gradient-to-r from-accent-blue to-accent-violet bg-clip-text text-transparent">
            Production &amp; Beats
          </span>
        </h1>

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
