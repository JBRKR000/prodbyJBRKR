import { Instagram, Soundcloud, Youtube } from "./components/Icons";
import type { BeatPreview, NavItem, SocialLink, StatItem } from "./types";

export const brand = {
  name: "prod.JBRKR",
  imageUrl:
    "https://firebasestorage.googleapis.com/v0/b/banani-prod.appspot.com/o/reference-images%2F54132a76-3322-467a-959a-18a73e7d5b17?alt=media&token=4dcf0b19-8805-419a-86f6-ede47eeb37ad",
} as const;

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Beats", href: "#beats" },
  { label: "Contact", href: "#contact" },
] satisfies readonly NavItem[];

export const producerStats = [
  { value: "100+", label: "Beats Produced"},
  { value: "5k+", label: "Streams" },
] satisfies readonly StatItem[];

export const beatCatalog = [
  {
    title: "NEON TEARS",
    bpm: 140,
    musicalKey: "C# Min",
    tags: ["Dark", "Trap"],
    price: 30,
  },
  {
    title: "OBSIDIAN",
    bpm: 128,
    musicalKey: "F Min",
    tags: ["Hard", "Drill"],
    price: 30,
  },
  {
    title: "GLASS HEART",
    bpm: 155,
    musicalKey: "A Min",
    tags: ["Emotional", "RnB"],
    price: 50,
  },
  {
    title: "CYBERPUNK",
    bpm: 135,
    musicalKey: "D Min",
    tags: ["Synth", "Rap"],
    price: 30,
  },
  {
    title: "VOID",
    bpm: 144,
    musicalKey: "E Min",
    tags: ["Aggressive", "Trap"],
    price: 30,
  },
] satisfies readonly BeatPreview[];

export const socialLinks = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "YouTube", href: "#", Icon: Youtube },
  { label: "SoundCloud", href: "#", Icon: Soundcloud },
] satisfies readonly SocialLink[];
