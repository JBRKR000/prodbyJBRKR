
import type { ComponentType, SVGProps } from "react";

export type NavItem = {
  label: string;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type BeatPreview = {
  title: string;
  bpm: number;
  musicalKey: string;
  tags: readonly string[];
  price: number;
};

export type SocialLink = {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};
