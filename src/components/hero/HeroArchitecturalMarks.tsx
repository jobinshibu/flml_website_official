"use client";

import React, { useState, useEffect } from "react";
import { MotionValue } from "framer-motion";

interface HeroArchitecturalMarksProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroArchitecturalMarks({
  scrollYProgress,
}: HeroArchitecturalMarksProps) {
  const [phaseLabel, setPhaseLabel] = useState("PHASE 01 // ARRIVAL");

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.08) {
        setPhaseLabel("PHASE 01 // ARRIVAL");
      } else if (latest < 0.22) {
        setPhaseLabel("PHASE 02 // IDENTITY");
      } else if (latest < 0.72) {
        setPhaseLabel("PHASE 03 // IMMERSION");
      } else if (latest < 0.88) {
        setPhaseLabel("PHASE 04 // METASYSTEM");
      } else {
        setPhaseLabel("PHASE 05 // DOCTRINE");
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div className="absolute inset-0 pointer-events-none z-[4] select-none">
      {/* --- Corner Architectural Hairlines --- */}
      {/* Top Left Corner */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 w-6 h-6 border-t border-l border-white/20" />
      {/* Top Right Corner */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 w-6 h-6 border-t border-r border-white/20" />
      {/* Bottom Left Corner */}
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-6 h-6 border-b border-l border-white/20" />
      {/* Bottom Right Corner */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-6 h-6 border-b border-r border-white/20" />

      {/* --- Architectural Metadata Stamps (Low-Contrast / Editorial) --- */}
      {/* Top Left Title Stamp */}
      <div className="hidden sm:flex items-center gap-2 absolute top-7 left-16 md:top-11 md:left-20 font-mono text-[9px] tracking-[0.32em] text-white/35 uppercase">
        <span className="w-1 h-1 rounded-full bg-white/40" />
        <span>FLML // COGNITIVE LABS</span>
      </div>

      {/* Top Right Coordinate Stamp */}
      <div className="hidden sm:flex items-center gap-2 absolute top-7 right-16 md:top-11 md:right-20 font-mono text-[9px] tracking-[0.32em] text-white/35 uppercase">
        <span>37°46&apos;N • 122°25&apos;W</span>
      </div>

      {/* Bottom Left Dynamic Phase Stamp */}
      <div className="hidden md:flex items-center gap-2.5 absolute bottom-8 left-16 md:bottom-11 md:left-20 font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase">
        <span className="inline-block w-1.5 h-1.5 border border-white/30 rounded-[1px]" />
        <span>{phaseLabel}</span>
      </div>

      {/* Bottom Right Frame Sequence Counter (Zero-rerender DOM update) */}
      <div className="hidden md:flex items-center gap-2 absolute bottom-8 right-16 md:bottom-11 md:right-20 font-mono text-[9px] tracking-[0.32em] text-white/40 uppercase">
        <span id="hero-frame-counter">FRAME 001 / 120</span>
      </div>

      {/* Mid-screen subtle tick lines */}
      <div className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-white/20" />
      <div className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-white/20" />
    </div>
  );
}
