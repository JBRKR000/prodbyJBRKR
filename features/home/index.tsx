import { AboutSection } from "./components/AboutSection";
import { BeatCatalogSection } from "./components/BeatCatalogSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { SiteNav } from "./components/SiteNav";

export function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground font-body">
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
