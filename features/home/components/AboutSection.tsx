import Image from "next/image";
import { brand, producerStats } from "../constants";

export function AboutSection() {

  return (
    <section id="about" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 lg:gap-16">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-linear-to-b from-surface/80 to-surface/40 p-4 shadow-lg">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgb(96_165_250/0.12),transparent_46%,rgb(147_51_234/0.1))]" />
          <div className="relative h-[clamp(352px,62vw,480px)] w-full overflow-hidden rounded-xl">
            <iframe
              data-testid="embed-iframe"
              className="absolute inset-0 h-full w-full border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
              src="https://open.spotify.com/embed/artist/1N35yWC7vZiVlS21xN3fts?utm_source=generator&theme=0"
              tabIndex={-1}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex flex-col items-start text-left">
          <h2 className="mb-6 font-headings text-3xl font-bold">
            The Architect of Sound
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            JBRKR is a producer focused on dark, hard-hitting, and futuristic
            instrumentals. Combining analog warmth with digital precision, every
            beat is crafted to elevate the artist&apos;s vocal performance.
          </p>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            No filler, no generic loops. Just straight-to-the-point production
            designed for the modern era of music.
          </p>

          <div className="flex gap-12">
            {producerStats.map((stat) => (
              <div key={stat.label}>
                <div className="mb-1 text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
