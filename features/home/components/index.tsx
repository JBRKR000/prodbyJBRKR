import { AboutSection } from "./AboutSection";
import { BeatCatalogSection } from "./BeatCatalogSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";
import { HeroSection } from "./HeroSection";
import { SiteNav } from "./SiteNav";

export function HomePage() {
  return (
    /*
     * ┌─ scroll snap container ──────────────────────────────────────────────┐
     * │  h-screen         → fills the viewport exactly                       │
     * │  overflow-y-scroll → internal scroll (not window scroll)             │
     * │  snap-y snap-mandatory → hard snap to each section                   │
     * │  [scrollbar-width:none] → hide ugly scrollbar for cleaner look       │
     * └─────────────────────────────────────────────────────────────────────-┘
     *
     *  SiteNav is position:fixed so it floats above this container normally.
     */
    <div
      className={[
        "relative h-screen overflow-y-scroll",
        "snap-y snap-mandatory",
        "bg-background text-foreground font-body",
        // hide scrollbar cross-browser
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      ].join(" ")}
    >
      <SiteNav />
      <main>
        <HeroSection />
        <AboutSection />
        <BeatCatalogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
