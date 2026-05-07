"use client";
import { useCallback, useEffect, useState } from "react";

type TypeWriterProps = {
  text: string;
  speed?: number;
  start?: boolean;
  onComplete?: () => void;
};

export function Typewriter({
  text,
  speed = 100,
  start = true,
  onComplete,
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const isComplete = displayedText.length >= text.length;

  useEffect(() => {
    let index = 0;

    if (!start || text.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, start, onComplete]);

  return (
    <span>
      {displayedText}
      {start && !isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}

export const HeroSectionTitleAnimation = () => {
  const typingSpeed = 75;
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const lines = ["Next-gen", "Production & Beats"];
  const handleLineComplete = useCallback(() => {
    setActiveLineIndex((currentIndex) => currentIndex + 1);
  }, []);

  return (
    <h1 className="mb-6 font-headings text-5xl font-bold leading-tight tracking-normal md:text-7xl">
      <Typewriter
        text={lines[0]}
        speed={typingSpeed}
        start={activeLineIndex === 0}
        onComplete={handleLineComplete}
      />
      <br />
      <span className="bg-gradient-to-r from-accent-blue to-accent-violet bg-clip-text text-transparent">
        <Typewriter
          text={lines[1]}
          speed={typingSpeed}
          start={activeLineIndex === 1}
          onComplete={handleLineComplete}
        />
      </span>
    </h1>
  );
};


