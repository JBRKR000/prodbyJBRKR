import Image from "next/image";
import { brand, navItems } from "../constants";

export function SiteNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border bg-background/70 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-6">
        <a href="#home" className="flex items-center gap-3" aria-label="JBRKR home">
          <Image
            src={brand.imageUrl}
            alt="JBRKR Logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
            priority
          />
          <span className="font-headings text-lg font-bold tracking-widest">
            {brand.name}
          </span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#beats"
          className="rounded-full bg-primary px-4 py-2 text-sm font-bold tracking-wide text-primary-foreground transition-opacity hover:opacity-90 sm:px-5"
        >
          Buy Beats
        </a>
      </div>
    </nav>
  );
}
