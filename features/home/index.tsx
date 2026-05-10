"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type TouchEvent,
  type WheelEvent,
} from "react";
import { AboutSection } from "./components/AboutSection";
import { BeatCatalogSection } from "./components/BeatCatalogSection";
import { ContactSection } from "./components/ContactSection";
import { HeroSection } from "./components/HeroSection";
import { SiteNav } from "./components/SiteNav";
import { GlobalStarsAnimation } from "./components/animations/GlobalStarsAnimation";

export function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const touchStartYRef = useRef<number | null>(null);
  const transitionLockRef = useRef(false);
  const unlockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileScrollRef = useRef<HTMLElement | null>(null);
  const pendingInitialHashRef = useRef<string | null>(null);

  const scenes = useMemo(
    () => [
      { id: "home", content: <HeroSection /> },
      { id: "about", content: <AboutSection /> },
      { id: "beats", content: <BeatCatalogSection /> },
      { id: "contact", content: <ContactSection /> },
    ],
    [],
  );

  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const sceneBackgrounds = useMemo(
    () => [
      "bg-[radial-gradient(120%_140%_at_12%_18%,rgb(153_27_27/0.36),transparent_48%),radial-gradient(95%_130%_at_88%_78%,rgb(245_158_11/0.18),transparent_56%),radial-gradient(100%_120%_at_50%_100%,rgb(14_116_144/0.20),transparent_60%),linear-gradient(145deg,#090c16_0%,#120a0d_46%,#170f13_100%)]",
      "bg-[radial-gradient(130%_150%_at_16%_84%,rgb(6_182_212/0.24),transparent_55%),radial-gradient(90%_120%_at_84%_20%,rgb(220_38_38/0.30),transparent_50%),radial-gradient(100%_130%_at_52%_50%,rgb(249_115_22/0.18),transparent_62%),linear-gradient(160deg,#060b16_0%,#120d1f_50%,#190b0f_100%)]",
      "bg-[radial-gradient(130%_140%_at_18%_18%,rgb(124_58_237/0.20),transparent_56%),radial-gradient(120%_140%_at_84%_82%,rgb(14_165_233/0.24),transparent_60%),radial-gradient(90%_120%_at_54%_34%,rgb(220_38_38/0.25),transparent_54%),linear-gradient(142deg,#060c1a_0%,#0f1322_52%,#1a1013_100%)]",
      "bg-[radial-gradient(130%_135%_at_14%_76%,rgb(239_68_68/0.28),transparent_52%),radial-gradient(100%_125%_at_86%_14%,rgb(251_191_36/0.24),transparent_54%),radial-gradient(110%_130%_at_52%_58%,rgb(16_185_129/0.20),transparent_62%),linear-gradient(148deg,#080f1a_0%,#15111f_48%,#1b0e13_100%)]",
    ],
    [],
  );

  const setSceneIndex = useCallback(
    (nextIndex: number) => {
      setActiveSceneIndex((currentIndex) => {
        const boundedIndex = Math.max(0, Math.min(scenes.length - 1, nextIndex));

        if (boundedIndex === currentIndex || transitionLockRef.current) {
          return currentIndex;
        }

        setDirection(boundedIndex > currentIndex ? 1 : -1);
        transitionLockRef.current = true;

        if (unlockTimeoutRef.current) {
          clearTimeout(unlockTimeoutRef.current);
        }

        unlockTimeoutRef.current = setTimeout(() => {
          transitionLockRef.current = false;
        }, prefersReducedMotion ? 120 : 720);

        return boundedIndex;
      });
    },
    [prefersReducedMotion, scenes.length],
  );

  const stepScene = useCallback(
    (step: 1 | -1) => {
      setActiveSceneIndex((currentIndex) => {
        const boundedIndex = Math.max(
          0,
          Math.min(scenes.length - 1, currentIndex + step),
        );

        if (boundedIndex === currentIndex || transitionLockRef.current) {
          return currentIndex;
        }

        setDirection(step);
        transitionLockRef.current = true;

        if (unlockTimeoutRef.current) {
          clearTimeout(unlockTimeoutRef.current);
        }

        unlockTimeoutRef.current = setTimeout(() => {
          transitionLockRef.current = false;
        }, prefersReducedMotion ? 120 : 720);

        return boundedIndex;
      });
    },
    [prefersReducedMotion, scenes.length],
  );

  const setSceneById = useCallback(
    (sectionId: string) => {
      const sceneIndex = scenes.findIndex((scene) => scene.id === sectionId);

      if (sceneIndex === -1) {
        return;
      }

      if (!isDesktop) {
        const target = document.getElementById(sectionId);

        setActiveSceneIndex((currentIndex) => {
          setDirection(sceneIndex > currentIndex ? 1 : -1);
          return sceneIndex;
        });
        target?.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        return;
      }

      setSceneIndex(sceneIndex);
    },
    [isDesktop, prefersReducedMotion, scenes, setSceneIndex],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const syncBreakpoint = () => {
      setIsDesktop(mediaQuery.matches);
    };

    syncBreakpoint();
    mediaQuery.addEventListener("change", syncBreakpoint);

    return () => {
      mediaQuery.removeEventListener("change", syncBreakpoint);
    };
  }, []);

  useEffect(() => {
    if (isDesktop) {
      return;
    }

    const scrollRoot = mobileScrollRef.current;

    if (!scrollRoot) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        const nextIndex = scenes.findIndex(
          (scene) => scene.id === visibleEntry.target.id,
        );

        if (nextIndex === -1) {
          return;
        }

        setActiveSceneIndex((currentIndex) => {
          if (currentIndex !== nextIndex) {
            setDirection(nextIndex > currentIndex ? 1 : -1);
          }

          return nextIndex;
        });
      },
      {
        root: scrollRoot,
        threshold: [0.35, 0.55, 0.75],
      },
    );

    scenes.forEach((scene) => {
      const section = document.getElementById(scene.id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [isDesktop, scenes]);

  useEffect(() => {
    const initialHash = window.location.hash.replace("#", "");
    let initialHashFrame: number | null = null;

    if (initialHash) {
      pendingInitialHashRef.current = initialHash;
      initialHashFrame = window.requestAnimationFrame(() => {
        setSceneById(initialHash);
        pendingInitialHashRef.current = null;
      });
    }

    const handleHashChange = () => {
      const nextHash = window.location.hash.replace("#", "");

      if (!nextHash) {
        return;
      }

      setSceneById(nextHash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);

      if (initialHashFrame) {
        window.cancelAnimationFrame(initialHashFrame);
      }

      pendingInitialHashRef.current = null;

      if (unlockTimeoutRef.current) {
        clearTimeout(unlockTimeoutRef.current);
      }
    };
  }, [setSceneById]);

  useEffect(() => {
    const activeSceneId = scenes[activeSceneIndex]?.id;

    if (
      !activeSceneId ||
      pendingInitialHashRef.current ||
      window.location.hash === `#${activeSceneId}`
    ) {
      return;
    }

    window.history.replaceState(null, "", `#${activeSceneId}`);
  }, [activeSceneIndex, scenes]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        stepScene(1);
      }

      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        stepScene(-1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        setSceneIndex(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        setSceneIndex(scenes.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [scenes.length, setSceneIndex, stepScene]);

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLElement>) => {
      if (Math.abs(event.deltaY) < 24) {
        return;
      }

      event.preventDefault();
      stepScene(event.deltaY > 0 ? 1 : -1);
    },
    [stepScene],
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent<HTMLElement>) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    },
    [],
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLElement>) => {
      const startY = touchStartYRef.current;
      const endY = event.changedTouches[0]?.clientY;

      if (startY == null || endY == null) {
        return;
      }

      const deltaY = startY - endY;

      if (Math.abs(deltaY) < 40) {
        return;
      }

      stepScene(deltaY > 0 ? 1 : -1);
    },
    [stepScene],
  );

  return (
    <div className="relative h-dvh overflow-hidden text-foreground font-body">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_18%_8%,rgb(153_27_27/0.38),transparent_44%),radial-gradient(115%_105%_at_88%_34%,rgb(220_38_38/0.20),transparent_52%),radial-gradient(130%_115%_at_22%_88%,rgb(14_116_144/0.18),transparent_62%),linear-gradient(165deg,#080c15_0%,#12101a_46%,#1a0d12_100%)] md:hidden" />
        {sceneBackgrounds.map((backgroundClassName, index) => (
          <motion.div
            key={`bg-${scenes[index].id}`}
            initial={false}
            animate={{ opacity: index === activeSceneIndex ? 1 : 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 1.35,
              ease: [0.4, 0, 0.2, 1],
            }}
            className={`absolute inset-0 hidden will-change-opacity md:block ${backgroundClassName}`}
          />
        ))}

        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.03, 1], rotate: [0, 1.4, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
          }
          className="absolute inset-[-12%] bg-[radial-gradient(circle_at_50%_50%,rgb(255_255_255/0.035),transparent_60%)] mix-blend-screen md:bg-[radial-gradient(circle_at_50%_50%,rgb(255_255_255/0.06),transparent_60%)]"
        />

        <GlobalStarsAnimation />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.18),transparent_28%,transparent_72%,rgb(0_0_0/0.30))]" />
      </div>

      <SiteNav
        activeSection={scenes[activeSceneIndex].id}
        onNavigate={setSceneById}
      />

      {isDesktop ? (
        <main
          className="relative h-full overflow-hidden"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={scenes[activeSceneIndex].id}
              custom={direction}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction > 0 ? "32%" : "-32%", scale: 0.92 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, x: 0, scale: 1 }
              }
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      x: direction > 0 ? "-28%" : "28%",
                      scale: 0.95,
                      filter: "blur(8px)",
                    }
              }
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {scenes[activeSceneIndex].content}
            </motion.div>
          </AnimatePresence>
        </main>
      ) : (
        <main
          ref={mobileScrollRef}
          className="relative h-full overflow-y-auto overscroll-contain snap-y snap-proximity [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {scenes.map((scene) => (
            <div key={scene.id} className="snap-start">
              {scene.content}
            </div>
          ))}
        </main>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-40 flex items-center justify-center gap-2 md:bottom-5">
        {scenes.map((scene, index) => (
          <button
            key={scene.id}
            type="button"
            aria-label={`Go to ${scene.id} section`}
            onClick={() => setSceneIndex(index)}
            className={`pointer-events-auto h-1.5 rounded-full transition-all duration-500 ${
              index === activeSceneIndex
                ? "w-10 bg-primary"
                : "w-2.5 bg-white/35 hover:bg-white/55"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
