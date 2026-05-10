"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { brand, navItems } from "../constants";

type SiteNavProps = {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
};

export function SiteNav({ activeSection, onNavigate }: SiteNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!onNavigate) {
      return;
    }

    event.preventDefault();
    onNavigate(href.replace("#", ""));
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-6 sm:py-4">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-white/18 bg-black/35 shadow-2xl shadow-black/30 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/24 md:rounded-full">
        <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-6">
          <a
            href="#home"
            className="flex min-w-0 items-center gap-2 sm:gap-3"
            aria-label="JBRKR home"
            onClick={(event) => handleNavigate(event, "#home")}
          >
            <Image
              src={brand.imageUrl}
              alt="JBRKR Logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
              priority
            />
            <span className="truncate font-headings text-base font-bold tracking-widest sm:text-lg">
              {brand.name}
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavigate(event, item.href)}
                className={`transition-colors hover:text-primary ${
                  activeSection === item.href.replace("#", "")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#beats"
              onClick={(event) => handleNavigate(event, "#beats")}
              className="hidden shrink-0 rounded-full bg-primary px-3 py-2 text-sm font-bold tracking-wide text-primary-foreground transition-colors hover:bg-red-500 min-[380px]:inline-flex sm:px-5"
            >
              Buy Beats
            </a>
            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/15 md:hidden"
            >
              {isMenuOpen ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`grid overflow-hidden border-white/10 transition-[grid-template-rows,border-color] duration-300 md:hidden ${
            isMenuOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0">
            <div className="flex flex-col gap-1 px-3 pb-3 pt-1">
              {navItems.map((item) => (
                <a
                  key={`mobile-${item.href}`}
                  href={item.href}
                  onClick={(event) => handleNavigate(event, item.href)}
                  className={`rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
                    activeSection === item.href.replace("#", "")
                      ? "bg-white/12 text-white"
                      : "text-muted-foreground hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
