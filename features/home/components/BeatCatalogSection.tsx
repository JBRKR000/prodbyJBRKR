import { Filter, Play, Search, ShoppingCart } from "lucide-react";
import { beatCatalog } from "../constants";

export function BeatCatalogSection() {
  return (
    <section id="beats" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-4 font-headings text-4xl font-bold">
              Beat Catalog
            </h2>
            <p className="text-muted-foreground">
              Minimal, spreadsheet-style tracklist. No clutter.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2">
              <Search aria-hidden="true" className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Search...</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2">
              <Filter aria-hidden="true" className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-surface backdrop-blur-xl">
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-[48px_minmax(180px,1fr)_80px_90px_180px_110px] gap-6 border-b border-border px-8 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <div>#</div>
                <div>Title</div>
                <div>BPM</div>
                <div>Key</div>
                <div>Tags</div>
                <div className="text-right">Action</div>
              </div>

              <div className="flex flex-col">
                {beatCatalog.map((beat) => (
                  <div
                    key={beat.title}
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
                        className="flex items-center gap-2 rounded bg-white px-4 py-1.5 text-sm font-bold text-black"
                      >
                        <ShoppingCart aria-hidden="true" className="size-3.5" />
                        ${beat.price}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
