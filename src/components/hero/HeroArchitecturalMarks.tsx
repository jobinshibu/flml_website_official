"use client";

import React, { useState, useEffect } from "react";
import { MotionValue, motion, useTransform } from "framer-motion";

interface HeroArchitecturalMarksProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroArchitecturalMarks({
  scrollYProgress,
}: HeroArchitecturalMarksProps) {
  const [phaseLabel, setPhaseLabel] = useState("PHASE 01 // ARRIVAL");

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.12) {
        setPhaseLabel("PHASE 01 // ARRIVAL");
      } else if (latest < 0.32) {
        setPhaseLabel("PHASE 02 // ARCHITECTURE");
      } else if (latest < 0.68) {
        setPhaseLabel("PHASE 03 // COGNITIVE CORE");
      } else if (latest < 0.90) {
        setPhaseLabel("PHASE 04 // METASYSTEM");
      } else {
        setPhaseLabel("PHASE 05 // DOCTRINE");
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Fade marks as transitioning into #about at 0.90 - 1.00
  const marksOpacity = useTransform(scrollYProgress, [0.88, 0.98], [1, 0], { clamp: true });

  return (
    <motion.div
      style={{ opacity: marksOpacity }}
      className="absolute inset-0 pointer-events-none z-[15] select-none"
    >
      {/* --- Corner Architectural Hairlines --- */}
      {/* Top Left Corner */}
      <div className="absolute top-24 left-6 sm:left-10 md:left-12 w-5 h-5 border-t border-l border-[#061A45]/20" />
      {/* Top Right Corner */}
      <div className="absolute top-24 right-6 sm:right-10 md:right-12 w-5 h-5 border-t border-r border-[#061A45]/20" />
      {/* Bottom Left Corner */}
      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 md:left-12 w-5 h-5 border-b border-l border-[#061A45]/20" />
      {/* Bottom Right Corner */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 md:right-12 w-5 h-5 border-b border-r border-[#061A45]/20" />

      {/* --- Architectural Metadata Stamps (Editorial Institutional Scale) --- */}
      {/* Top Left Title Stamp */}
      <div className="hidden sm:flex items-center gap-2 absolute top-28 left-14 sm:left-18 md:left-20 font-mono text-[9px] tracking-[0.3em] text-[#061A45]/50 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0A369D]" />
        <span>FLML // SPEC 01</span>
      </div>

      {/* Top Right Coordinate Stamp */}
      <div className="hidden sm:flex items-center gap-2 absolute top-28 right-14 sm:right-18 md:right-20 font-mono text-[9px] tracking-[0.3em] text-[#061A45]/50 uppercase">
        <span>37°46&apos;N • 122°25&apos;W</span>
      </div>

      {/* Bottom Left Dynamic Phase Stamp */}
      <div className="hidden md:flex items-center gap-2.5 absolute bottom-8 left-14 sm:bottom-12 sm:left-20 font-mono text-[9px] tracking-[0.28em] text-[#061A45]/50 uppercase">
        <span className="inline-block w-1.5 h-1.5 border border-[#061A45]/30 rounded-[1px]" />
        <span>{phaseLabel}</span>
      </div>

      {/* Bottom Right Frame Sequence Counter */}
      <div className="hidden md:flex items-center gap-2 absolute bottom-8 right-14 sm:bottom-12 sm:right-20 font-mono text-[9px] tracking-[0.3em] text-[#061A45]/50 uppercase">
        <span id="hero-frame-counter">FRAME 001 / 120</span>
      </div>

      {/* Mid-screen subtle tick lines */}
      <div className="hidden lg:block absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-[#061A45]/20" />
      <div className="hidden lg:block absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-[#061A45]/20" />
    </motion.div>
  );
}
