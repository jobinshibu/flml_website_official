"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroSystemRevealProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroSystemReveal({ scrollYProgress }: HeroSystemRevealProps) {
  // ---------------------------------------------------------------------------
  // PHASE 3 & PHASE 4 LIFECYCLE (0.72 -> 1.00)
  // 0.72 -> 0.84: Interface becomes visible (blur-to-focus + upward translation)
  // 0.84 -> 0.94: Prime reading state
  // 0.94 -> 1.00: Soft elevation into #about section
  // ---------------------------------------------------------------------------
  const containerOpacity = useTransform(
    scrollYProgress,
    [0.70, 0.78, 0.94, 1.0],
    [0, 1, 1, 0.85],
    { clamp: true }
  );

  const containerY = useTransform(
    scrollYProgress,
    [0.70, 0.82, 0.95, 1.0],
    [40, 0, 0, -25],
    { clamp: true }
  );

  const containerBlur = useTransform(
    scrollYProgress,
    [0.70, 0.80],
    [8, 0],
    { clamp: true }
  );
  const containerFilter = useTransform(containerBlur, (v) => `blur(${v}px)`);

  const containerVisibility = useTransform(scrollYProgress, (v) =>
    v < 0.68 ? "hidden" : "visible"
  );

  const pointerEvents = useTransform(containerOpacity, (v) =>
    v > 0.15 ? "auto" : "none"
  );

  // Subtle tracking tightening on the system title
  const titleTracking = useTransform(
    scrollYProgress,
    [0.70, 0.82],
    ["0.18em", "0.08em"],
    { clamp: true }
  );

  return (
    <motion.div
      style={{
        opacity: containerOpacity,
        y: containerY,
        filter: containerFilter,
        visibility: containerVisibility,
        pointerEvents,
      }}
      className="absolute bottom-5 sm:bottom-7 md:bottom-9 inset-x-0 flex flex-col items-center text-center px-4 sm:px-6 pointer-events-none z-10 select-none"
    >
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        {/* Technical Subsystem Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-white/20 bg-black/40 backdrop-blur-md mb-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-light/80" />
          <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-brand-blue-light/90">
            SYSTEM // 01 • THE METASYSTEM
          </span>
        </div>

        {/* Interface Headline */}
        <motion.h2
          style={{ letterSpacing: titleTracking }}
          className="font-[family-name:var(--font-cinzel)] text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium uppercase text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
        >
          Architecture For What Comes Next
        </motion.h2>

        {/* Editorial Sub-statement */}
        <p className="font-[family-name:var(--font-cormorant)] italic text-lg sm:text-xl md:text-2xl text-white/90 max-w-xl mt-2.5 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
          “Engineered for multi-generational reliability at global institutional scale.”
        </p>

        {/* Micro System Architecture Specifications */}
        <div className="hidden sm:flex items-center gap-4 mt-3 font-mono text-[10px] tracking-[0.24em] text-white/50 uppercase">
          <span>Autonomous Protocols</span>
          <span>•</span>
          <span>Cognitive Fabric</span>
          <span>•</span>
          <span>Zero-Leakage</span>
        </div>

        {/* Visual Bridge Action Link into #about */}
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("about");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 rounded-full border border-white/30 hover:border-white/90 bg-white/[0.06] hover:bg-white text-white hover:text-[#061A45] backdrop-blur-md text-[11px] font-mono tracking-[0.22em] uppercase transition-all duration-300 pointer-events-auto shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] active:scale-95"
          >
            <span>Initialize Doctrine</span>
            <span className="font-mono transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
