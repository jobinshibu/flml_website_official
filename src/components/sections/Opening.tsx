"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Opening() {
  const [typedPart1, setTypedPart1] = useState("");
  const [typedPart2, setTypedPart2] = useState("");
  const [activeCursor, setActiveCursor] = useState<"none" | "left" | "right">("none");
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    const part1 = "WE ENGINEER";
    const part2 = "OUTCOMES.";

    // 1. Wait for 3D logo particle assembly (1.4s delay)
    const startDelayTimer = setTimeout(() => {
      setActiveCursor("left");
      let idx1 = 0;

      // 2. Type left side "WE ENGINEER" left-to-right at smooth 115ms pace
      const typeTimer1 = setInterval(() => {
        if (idx1 < part1.length) {
          setTypedPart1(part1.slice(0, idx1 + 1));
          idx1++;
        } else {
          clearInterval(typeTimer1);

          // 3. Seamlessly move cursor to right block and type "OUTCOMES." left-to-right at smooth 115ms pace
          setActiveCursor("right");
          let idx2 = 0;
          const typeTimer2 = setInterval(() => {
            if (idx2 < part2.length) {
              setTypedPart2(part2.slice(0, idx2 + 1));
              idx2++;
            } else {
              clearInterval(typeTimer2);
              setTypingComplete(true);
              // Hide cursor after completion
              setTimeout(() => setActiveCursor("none"), 1200);
            }
          }, 115);
        }
      }, 115);

    }, 1400);

    return () => clearTimeout(startDelayTimer);
  }, []);

  return (
    <section className="relative z-10 h-screen max-h-screen w-full bg-transparent text-white overflow-hidden flex flex-col justify-between items-center pointer-events-none">

      {/* Subtle Hero Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.3)_85%,_rgba(0,0,0,0.6)_100%)] pointer-events-none z-[1]" />

      {/* Split Headlines Flanking Center Canvas - Responsive positioning and scaling across all viewports */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-20 sm:py-0">
        {/* Left Headline: WE ENGINEER */}
        <div className="text-center sm:text-left w-full sm:w-[260px] md:w-[320px] lg:w-[380px] xl:w-[420px]">
          <h1 className="font-sans font-light tracking-[0.14em] sm:tracking-[0.18em] text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-white/95 whitespace-nowrap select-none drop-shadow-2xl flex items-center justify-center sm:justify-start">
            <span>{typedPart1}</span>
            {activeCursor === "left" && (
              <span className="inline-block w-[2px] h-[0.95em] bg-white/90 ml-1.5 animate-pulse" />
            )}
          </h1>
        </div>

        {/* Right Headline: OUTCOMES. */}
        <div className="text-center sm:text-right w-full sm:w-[220px] md:w-[280px] lg:w-[320px] xl:w-[360px]">
          <h1 className="font-sans font-light tracking-[0.14em] sm:tracking-[0.18em] text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-white/90 whitespace-nowrap select-none drop-shadow-2xl flex items-center justify-center sm:justify-end">
            <span>{typedPart2}</span>
            {activeCursor === "right" && (
              <span className="inline-block w-[2px] h-[0.95em] bg-white/90 ml-1.5 animate-pulse" />
            )}
          </h1>
        </div>
      </div>

    </section>
  );
}
