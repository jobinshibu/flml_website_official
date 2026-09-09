"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroSystemRevealProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroSystemReveal({ scrollYProgress }: HeroSystemRevealProps) {
  // ---------------------------------------------------------------------------
  // ACT 3: "AUTONOMOUS OPERATING BACKBONE" (0.68 – 0.94)
  // Seamless editorial layout aligned with the left-zone architecture.
  // Never obscures the robot in the right/center zone.
  // ---------------------------------------------------------------------------
  const containerOpacity = useTransform(
    scrollYProgress,
    [0.67, 0.74, 0.90, 0.97],
    [0, 1, 1, 0],
    { clamp: true }
  );

  const containerY = useTransform(
    scrollYProgress,
    [0.67, 0.75, 0.92, 0.98],
    [35, 0, 0, -30],
    { clamp: true }
  );

  const containerVisibility = useTransform(scrollYProgress, (v) =>
    v < 0.66 || v > 0.98 ? "hidden" : "visible"
  );

  const pointerEvents = useTransform(containerOpacity, (v) =>
    v > 0.25 ? "auto" : "none"
  );

  const handleDoctrineClick = () => {
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSpecsClick = () => {
    const el = document.getElementById("what-we-build");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      style={{
        opacity: containerOpacity,
        y: containerY,
        visibility: containerVisibility,
        pointerEvents,
      }}
      className="absolute inset-0 z-20 flex items-center pointer-events-none select-none px-6 sm:px-10 md:px-14 lg:px-20 pt-16 sm:pt-20"
    >
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT ZONE: Monumental Editorial System Architecture (7% - 44% width) */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left">
          
          {/* Eyebrow Stamp */}
          <div className="inline-flex items-center gap-3 mb-5 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[#0A369D] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-[#0A369D] uppercase font-semibold">
              System Reveal &nbsp;/&nbsp; Architecture 01
            </span>
          </div>

          {/* High-Contrast Editorial Headline */}
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[72px] font-medium uppercase text-[#061A45] leading-[0.94] tracking-[-0.015em]">
            Autonomous<br />
            <span className="text-[#0A369D]">Operating</span><br />
            Backbone
          </h2>

          {/* Supporting Copy */}
          <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-[#061A45]/75 leading-relaxed font-sans max-w-md">
            Multi-layered cognitive fabric engineered to govern mission-critical enterprise workflows with mathematical precision.
          </p>

          {/* Architectural Telemetry Matrix (Integrated Hairline Grid) */}
          <div className="w-full max-w-md mt-6 pt-5 border-t border-[#061A45]/15 grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] tracking-[0.22em] text-[#061A45]/45 uppercase mb-1">
                Throughput
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#061A45] tracking-tight">
                1.2M OPS/S
              </span>
            </div>
            <div className="flex flex-col border-l border-[#061A45]/12 pl-4">
              <span className="font-mono text-[9px] tracking-[0.22em] text-[#061A45]/45 uppercase mb-1">
                Latency
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#0A369D] tracking-tight">
                &lt; 1.2 MS
              </span>
            </div>
            <div className="flex flex-col border-l border-[#061A45]/12 pl-4">
              <span className="font-mono text-[9px] tracking-[0.22em] text-[#061A45]/45 uppercase mb-1">
                Consensus
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#061A45] tracking-tight">
                99.999%
              </span>
            </div>
          </div>

          {/* Dual Enterprise CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-7 sm:mt-8 pointer-events-auto">
            <button
              type="button"
              onClick={handleDoctrineClick}
              className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-[4px] bg-[#061A45] hover:bg-[#0A369D] text-white shadow-[0_4px_16px_rgba(6,26,69,0.18)] hover:shadow-[0_6px_22px_rgba(10,54,157,0.28)] transition-all duration-200 active:scale-95"
            >
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] uppercase font-semibold">
                Initialize Doctrine
              </span>
              <span className="font-mono text-sm transition-transform duration-200 group-hover:translate-y-0.5">
                ↓
              </span>
            </button>

            <button
              type="button"
              onClick={handleSpecsClick}
              className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-[4px] border border-[#061A45]/25 hover:border-[#061A45] bg-white/40 hover:bg-white/80 text-[#061A45] backdrop-blur-sm transition-all duration-200 active:scale-95 shadow-[0_2px_8px_rgba(6,26,69,0.04)]"
            >
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] uppercase font-semibold">
                View Specifications
              </span>
            </button>
          </div>

        </div>

        {/* RIGHT/CENTER ZONE (Unobstructed Negative Space for the Standing Character) */}
        <div className="hidden lg:block lg:col-span-6 xl:col-span-7 pointer-events-none" />

      </div>
    </motion.div>
  );
}
