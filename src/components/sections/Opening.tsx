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
    <section className="relative z-10 h-screen min-h-[750px] bg-transparent text-white overflow-hidden pt-20 pb-16 flex flex-col justify-between items-center">

      {/* Subtle Hero Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.3)_85%,_rgba(0,0,0,0.6)_100%)] pointer-events-none z-[1]" />

      {/* Top Badge Identifier */}
      <div className="relative z-10 pt-8 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-white/80 uppercase pointer-events-auto shadow-2xl"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>SYSTEM ARCHITECTURE LAB</span>
        </motion.div>
      </div>

      {/* Split Headlines Flanking Center Canvas - Pushed Outward to Extreme Corners */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Left Headline: WE ENGINEER (Pushed to Left Corner) */}
        <div className="text-left w-[200px] sm:w-[280px] md:w-[340px] lg:w-[400px]">
          <h1 className="font-sans font-light tracking-[0.18em] text-xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-white/95 whitespace-nowrap select-none drop-shadow-2xl flex items-center">
            <span>{typedPart1}</span>
            {activeCursor === "left" && (
              <span className="inline-block w-[2px] h-[0.95em] bg-white/90 ml-1.5 animate-pulse" />
            )}
          </h1>
        </div>

        {/* Right Headline: OUTCOMES. (Pushed to Right Corner) */}
        <div className="text-left w-[180px] sm:w-[240px] md:w-[280px] lg:w-[320px]">
          <h1 className="font-sans font-light tracking-[0.18em] text-xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-white/90 whitespace-nowrap select-none drop-shadow-2xl flex items-center justify-start">
            <span>{typedPart2}</span>
            {activeCursor === "right" && (
              <span className="inline-block w-[2px] h-[0.95em] bg-white/90 ml-1.5 animate-pulse" />
            )}
          </h1>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 pb-8 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/#consultation"
            className="inline-flex items-center gap-3 bg-white text-black font-semibold text-xs md:text-sm px-8 py-4 rounded-full hover:bg-neutral-200 transition-all transform hover:scale-105 shadow-2xl"
          >
            <span>Initiate Technical Brief</span>
            <span className="text-base">→</span>
          </a>
          <a
            href="/#technology"
            className="inline-flex items-center gap-3 bg-white/5 border border-white/20 text-white font-semibold text-xs md:text-sm px-8 py-4 rounded-full hover:bg-white/10 transition-all backdrop-blur-md"
          >
            <span>Explore Architecture</span>
          </a>
        </motion.div>
      </div>

    </section>
  );
}




