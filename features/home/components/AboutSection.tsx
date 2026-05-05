import Image from "next/image";
import { brand, producerStats } from "../constants";

export function AboutSection() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 lg:gap-16">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-surface p-8">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(96_165_250_/_0.12),transparent_46%,rgb(147_51_234_/_0.1))]" />
          <Image
            src={brand.imageUrl}
            alt="JBRKR"
            width={720}
            height={720}
            className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_30px_rgb(255_255_255_/_0.2)] mix-blend-screen"
          />
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
