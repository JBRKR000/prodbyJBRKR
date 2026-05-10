import Image from "next/image";
import { brand, socialLinks } from "../constants";

export function Footer() {
  const getYear = () => new Date().getFullYear();

  return (
    // snap-start → footer is a valid snap point so users can always reach it
    <footer className="snap-start relative z-10 border-t border-border bg-background/60 px-4 py-12 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <Image
            src={brand.imageUrl}
            alt="JBRKR Logo"
            width={24}
            height={24}
            className="h-6 w-6 rounded-full object-cover opacity-50 grayscale"
          />
          <span className="font-headings text-sm font-bold tracking-widest text-muted-foreground">
            {brand.name}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          &copy; {getYear()} JBRKR Production. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-social-icon">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="transition-colors text-muted-foreground hover:text-(--primary)"
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
