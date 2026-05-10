"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  MotionConfig,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

export function HeroSectionAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorStrength = useMotionValue(0);

  const smoothPointerX = useSpring(pointerX, {
    stiffness: 80,
    damping: 24,
    mass: 0.6,
  });
  const smoothPointerY = useSpring(pointerY, {
    stiffness: 80,
    damping: 24,
    mass: 0.6,
  });
  const smoothCursorX = useSpring(cursorX, {
    stiffness: 120,
    damping: 28,
    mass: 0.5,
  });
  const smoothCursorY = useSpring(cursorY, {
    stiffness: 120,
    damping: 28,
    mass: 0.5,
  });
  const smoothCursorStrength = useSpring(cursorStrength, {
    stiffness: 110,
    damping: 24,
  });

  const ambientX = useTransform(smoothPointerX, [-1, 1], [-18, 18]);
  const ambientY = useTransform(smoothPointerY, [-1, 1], [14, -14]);
  const ambientRotate = useTransform(smoothPointerX, [-1, 1], [-1.2, 1.2]);
  const cursorGlowOpacity = useTransform(
    smoothCursorStrength,
    [0, 1],
    [0, 0.42],
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const pointerMediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const resetPointer = () => {
      pointerX.set(0);
      pointerY.set(0);
      cursorStrength.set(0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!pointerMediaQuery.matches || event.pointerType === "touch") {
        resetPointer();
        return;
      }

      const container = containerRef.current;

      if (!container) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!isInside || rect.width === 0 || rect.height === 0) {
        resetPointer();
        return;
      }

      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;

      cursorX.set(localX);
      cursorY.set(localY);
      pointerX.set((localX / rect.width - 0.5) * 2);
      pointerY.set((localY / rect.height - 0.5) * 2);
      cursorStrength.set(1);
    };

    const syncPointerTracking = () => {
      resetPointer();

      if (pointerMediaQuery.matches) {
        window.addEventListener("pointermove", handlePointerMove);
      } else {
        window.removeEventListener("pointermove", handlePointerMove);
      }
    };

    syncPointerTracking();
    pointerMediaQuery.addEventListener("change", syncPointerTracking);
    window.addEventListener("pointerleave", resetPointer);
    window.addEventListener("blur", resetPointer);

    return () => {
      pointerMediaQuery.removeEventListener("change", syncPointerTracking);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("blur", resetPointer);
    };
  }, [
    cursorStrength,
    cursorX,
    cursorY,
    pointerX,
    pointerY,
    prefersReducedMotion,
  ]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={containerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <motion.div
          className="absolute inset-[-12%]"
          style={{ x: ambientX, y: ambientY, rotate: ambientRotate }}
        >
          <motion.div
            className="absolute inset-0 opacity-60"
            animate={{ x: ["-3%", "3%", "-3%"], y: ["2%", "-2%", "2%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_28%,rgb(255_255_255_/_0.12),transparent_18%),radial-gradient(circle_at_72%_44%,rgb(220_38_38_/_0.16),transparent_24%),linear-gradient(135deg,transparent_28%,rgb(255_255_255_/_0.08)_48%,rgb(220_38_38_/_0.14)_66%,transparent_78%)]" />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute inset-0 hidden md:block"
          style={{ x: smoothCursorX, y: smoothCursorY, opacity: cursorGlowOpacity }}
        >
          <div className="absolute -left-36 -top-36 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(220_38_38_/_0.28),rgb(255_255_255_/_0.12)_34%,transparent_70%)] blur-2xl" />
        </motion.div>

      </div>
    </MotionConfig>
  );
}
