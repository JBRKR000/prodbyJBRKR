"use client";

import { motion, MotionConfig, useReducedMotion } from "motion/react";

const driftStars = [
  { left: 4, top: 24, size: 2, opacity: 0.56, delay: 0.2, duration: 9.5 },
  { left: 12, top: 64, size: 1.5, opacity: 0.42, delay: 1.8, duration: 10.8 },
  { left: 18, top: 38, size: 2.5, opacity: 0.64, delay: 3.1, duration: 12.4 },
  { left: 24, top: 76, size: 1.5, opacity: 0.48, delay: 0.9, duration: 8.7 },
  { left: 31, top: 18, size: 2, opacity: 0.6, delay: 2.5, duration: 11.6 },
  { left: 38, top: 52, size: 1.5, opacity: 0.45, delay: 4.2, duration: 9.2 },
  { left: 44, top: 31, size: 2, opacity: 0.58, delay: 1.1, duration: 10.4 },
  { left: 51, top: 82, size: 2.5, opacity: 0.52, delay: 3.7, duration: 12.1 },
  { left: 58, top: 12, size: 1.5, opacity: 0.44, delay: 0.5, duration: 9.8 },
  { left: 64, top: 46, size: 2, opacity: 0.66, delay: 2.9, duration: 11.2 },
  { left: 70, top: 69, size: 1.5, opacity: 0.5, delay: 4.8, duration: 10.1 },
  { left: 76, top: 28, size: 2.5, opacity: 0.62, delay: 1.6, duration: 12.8 },
  { left: 83, top: 56, size: 1.5, opacity: 0.46, delay: 3.4, duration: 8.9 },
  { left: 91, top: 21, size: 2, opacity: 0.54, delay: 0.1, duration: 10.9 },
  { left: 96, top: 73, size: 2.5, opacity: 0.6, delay: 2.2, duration: 11.8 },
  { left: 8, top: 88, size: 2, opacity: 0.5, delay: 5.1, duration: 13.2 },
  { left: 34, top: 92, size: 1.5, opacity: 0.4, delay: 6.2, duration: 10.6 },
  { left: 68, top: 7, size: 2, opacity: 0.55, delay: 5.8, duration: 12.7 },
];

const shimmerStars = [
  { left: 9, top: 34, delay: 0.7, duration: 7.8, scale: 0.8 },
  { left: 27, top: 58, delay: 2.6, duration: 8.6, scale: 1 },
  { left: 45, top: 22, delay: 4.1, duration: 7.2, scale: 0.75 },
  { left: 62, top: 74, delay: 1.4, duration: 9.1, scale: 0.95 },
  { left: 81, top: 42, delay: 3.3, duration: 8.2, scale: 0.85 },
];

export function GlobalStarsAnimation() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={
            prefersReducedMotion
              ? undefined
              : { x: ["-2%", "2%", "-2%"], y: ["1%", "-1%", "1%"] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 24, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {driftStars.map((star, index) => (
            <motion.span
              key={`global-drift-star-${index}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: star.size,
                height: star.size,
                boxShadow: `0 0 ${star.size * 5}px rgb(255 255 255 / ${star.opacity})`,
              }}
              initial={{ opacity: 0, x: "-14vw", y: "14vh", scale: 0.65 }}
              animate={{
                opacity: [0, star.opacity * 0.75, star.opacity * 0.4, 0],
                x: ["-14vw", "4vw", "22vw"],
                y: ["14vh", "-4vh", "-22vh"],
                scale: [0.65, 1.15, 0.8],
              }}
              transition={{
                delay: star.delay,
                duration: star.duration,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        <motion.div
          className="absolute inset-0"
          animate={
            prefersReducedMotion
              ? undefined
              : { x: ["1%", "-2%", "1%"], y: ["-1%", "1%", "-1%"] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 28, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {shimmerStars.map((star, index) => (
            <motion.span
              key={`global-shimmer-star-${index}`}
              className="absolute flex h-7 w-7 items-center justify-center"
              style={{ left: `${star.left}%`, top: `${star.top}%` }}
              initial={{
                opacity: 0,
                x: "-18vw",
                y: "16vh",
                rotate: -24,
                scale: star.scale * 0.78,
              }}
              animate={{
                opacity: [0, 0.66, 0.28, 0],
                x: ["-18vw", "3vw", "26vw"],
                y: ["16vh", "-4vh", "-24vh"],
                rotate: [-24, -18, -24],
                scale: [star.scale * 0.78, star.scale, star.scale * 0.72],
              }}
              transition={{
                delay: star.delay,
                duration: star.duration,
                repeat: Infinity,
                repeatDelay: 2.4,
                ease: "easeInOut",
              }}
            >
              <span className="absolute h-px w-7 bg-gradient-to-r from-transparent via-red-400/80 to-transparent" />
              <span className="absolute h-7 w-px bg-gradient-to-b from-transparent via-red-400/80 to-transparent" />
              <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_18px_rgb(220_38_38_/_0.6)]" />
            </motion.span>
          ))}
        </motion.div>
      </div>
    </MotionConfig>
  );
}
