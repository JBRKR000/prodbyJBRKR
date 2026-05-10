"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type GlitchTextProps = {
  text: string;
  duration?: number;
  frameRate?: number;
  start?: boolean;
  onComplete?: () => void;
};

type HeroSectionTitleAnimationProps = {
  onComplete?: () => void;
};

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}<>?";

function getRandomGlitchChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

export function GlitchText({
  text,
  duration = 1200,
  frameRate = 120,
  start = true,
  onComplete,
}: GlitchTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const isAnimating = start && displayedText !== text;

  useEffect(() => {
    if (!start) {
      return;
    }

    if (text.length === 0) {
      onComplete?.();
      return;
    }

    let frame = 0;
    const totalFrames = Math.max(1, Math.ceil(duration / frameRate));

    const interval = setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const fixedChars = Math.floor(progress * text.length);

      const nextText = text
        .split("")
        .map((char, index) => {
          if (char === " ") {
            return " ";
          }

          return index < fixedChars ? char : getRandomGlitchChar();
        })
        .join("");

      setDisplayedText(nextText);

      if (progress >= 1) {
        clearInterval(interval);
        setDisplayedText(text);
        onComplete?.();
      }
    }, frameRate);

    return () => clearInterval(interval);
  }, [duration, frameRate, onComplete, start, text]);

  return (
    <span
      className={
        isAnimating
          ? "inline-block animate-pulse tracking-[0.02em] sm:tracking-[0.04em]"
          : "inline-block"
      }
    >
      {displayedText}
    </span>
  );
}

export const HeroSectionTitleAnimation = ({
  onComplete,
}: HeroSectionTitleAnimationProps) => {
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const hasCompletedRef = useRef(false);
  const lines = ["Next-gen", "Production & Beats"];

  const handleLineComplete = useCallback(() => {
    setActiveLineIndex((currentIndex) =>
      Math.min(currentIndex + 1, lines.length),
    );
  }, [lines.length]);

  useEffect(() => {
    if (activeLineIndex < lines.length || hasCompletedRef.current) {
      return;
    }

    hasCompletedRef.current = true;
    onComplete?.();
  }, [activeLineIndex, lines.length, onComplete]);

  return (
    <h1 className="mb-5 max-w-full break-words font-headings text-[2.65rem] font-bold leading-[1.08] tracking-normal sm:mb-6 sm:text-5xl sm:leading-tight md:text-7xl">
      <GlitchText
        text={lines[0]}
        duration={1000}
        frameRate={75}
        start={activeLineIndex === 0}
        onComplete={handleLineComplete}
      />
      <br />
      <span className="bg-gradient-to-r from-white via-red-300 to-red-700 bg-clip-text text-transparent">
        <GlitchText
          text={lines[1]}
          duration={1000}
          frameRate={75}
          start={activeLineIndex === 1}
          onComplete={handleLineComplete}
        />
      </span>
    </h1>
  );
};
