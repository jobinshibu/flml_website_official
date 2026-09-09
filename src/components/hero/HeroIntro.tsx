"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroIntroProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroIntro({ scrollYProgress }: HeroIntroProps) {
  // ---------------------------------------------------------------------------
  // ACT 1: "ARCHITECTURE FOR WHAT COMES NEXT" (0.00 – 0.32)
  // ---------------------------------------------------------------------------
  const act1Opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.32],
    [1, 1, 0],
    { clamp: true }
  );

  const act1Y = useTransform(
    scrollYProgress,
    [0, 0.22, 0.32],
    [0, 0, -30],
    { clamp: true }
  );

  const act1Visibility = useTransform(scrollYProgress, (v) =>
    v > 0.33 ? "hidden" : "visible"
  );

  const act1PointerEvents = useTransform(act1Opacity, (v) =>
    v > 0.25 ? "auto" : "none"
  );

  // ---------------------------------------------------------------------------
  // ACT 2: "ENGINEERING SOVEREIGN INTELLIGENCE" (0.33 – 0.68)
  // Fades in immediately after Act 1 fades out
  // ---------------------------------------------------------------------------
  const act2Opacity = useTransform(
    scrollYProgress,
    [0.32, 0.40, 0.58, 0.68],
    [0, 1, 1, 0],
    { clamp: true }
  );

  const act2Y = useTransform(
    scrollYProgress,
    [0.32, 0.40, 0.58, 0.68],
    [30, 0, 0, -30],
    { clamp: true }
  );

  const act2Visibility = useTransform(scrollYProgress, (v) =>
    v < 0.31 || v > 0.69 ? "hidden" : "visible"
  );

  const act2PointerEvents = useTransform(act2Opacity, (v) =>
    v > 0.25 ? "auto" : "none"
  );

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="absolute inset-0 z-20 flex items-center pointer-events-none select-none px-6 sm:px-10 md:px-14 lg:px-20 pt-16 sm:pt-20">
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT ZONE: Approximately 7% – 42% Viewport Width */}
        <div className="relative lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left min-h-[440px] sm:min-h-[500px] justify-center">
          
          {/* ================================================================= */}
          {/* ACT 1: PRIMARY EDITORIAL HEADLINE (0.00 -> 0.32)                   */}
          {/* ================================================================= */}
          <motion.div
            style={{
              opacity: act1Opacity,
              y: act1Y,
              visibility: act1Visibility,
              pointerEvents: act1PointerEvents,
            }}
            className="w-full flex flex-col items-start"
          >
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-3 mb-5 sm:mb-7">
              <span className="w-2 h-2 rounded-full bg-[#0A369D] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-[#061A45]/80 uppercase font-semibold">
                First Logic Meta Lab &nbsp;/&nbsp; Cognitive Systems
              </span>
            </div>

            {/* Strongest Typographic Element: High-Contrast Editorial Headline */}
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-6xl md:text-7xl lg:text-[68px] xl:text-[80px] font-medium uppercase text-[#061A45] leading-[0.92] tracking-[-0.02em]">
              Architecture<br />
              <span className="text-[#0A369D]">For</span> What<br />
              Comes <span className="text-[#0A369D]">Next</span>
            </h1>

            {/* Supporting Statement */}
            <p className="mt-5 sm:mt-7 text-sm sm:text-base md:text-lg text-[#061A45]/75 leading-relaxed font-sans max-w-md">
              Engineered for multi-generational reliability at global institutional scale.
            </p>

            {/* Dual CTAs: Clean, Premium, Minimal & Enterprise-Grade */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-7 sm:mt-9 pointer-events-auto">
              <button
                type="button"
                onClick={() => handleScrollTo("about")}
                className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-[4px] bg-[#061A45] hover:bg-[#0A369D] text-white shadow-[0_4px_16px_rgba(6,26,69,0.18)] hover:shadow-[0_6px_22px_rgba(10,54,157,0.28)] transition-all duration-200 active:scale-95"
              >
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] uppercase font-semibold">
                  Explore Our Approach
                </span>
                <span className="font-mono text-sm transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleScrollTo("clients")}
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-[4px] border border-[#061A45]/25 hover:border-[#061A45] bg-white/40 hover:bg-white/80 text-[#061A45] backdrop-blur-sm transition-all duration-200 active:scale-95 shadow-[0_2px_8px_rgba(6,26,69,0.04)]"
              >
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] uppercase font-semibold">
                  Watch Our Story
                </span>
              </button>
            </div>

            {/* Institutional Metadata Pill */}
            <div className="hidden sm:flex items-center gap-4 mt-8 sm:mt-10 font-mono text-[9px] tracking-[0.26em] text-[#061A45]/50 uppercase">
              <span>Sovereign Intelligence</span>
              <span>•</span>
              <span>Autonomous Protocol</span>
              <span>•</span>
              <span>Ver. 2.4.0</span>
            </div>
          </motion.div>

          {/* ================================================================= */}
          {/* ACT 2: SECOND EDITORIAL STATEMENT (Fades in when Act 1 fades out) */}
          {/* ================================================================= */}
          <motion.div
            style={{
              opacity: act2Opacity,
              y: act2Y,
              visibility: act2Visibility,
              pointerEvents: act2PointerEvents,
            }}
            className="absolute inset-0 w-full flex flex-col items-start justify-center"
          >
            {/* Act 2 Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-5 sm:mb-7">
              <span className="w-2 h-2 rounded-full bg-[#0A369D]" />
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-[#0A369D] uppercase font-semibold">
                System Doctrine &nbsp;/&nbsp; Cognitive Core
              </span>
            </div>

            {/* Act 2 Headline */}
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-6xl md:text-7xl lg:text-[68px] xl:text-[80px] font-medium uppercase text-[#061A45] leading-[0.92] tracking-[-0.02em]">
              Engineering<br />
              <span className="text-[#0A369D]">Sovereign</span><br />
              Intelligence
            </h2>

            {/* Act 2 Subtitle */}
            <p className="mt-5 sm:mt-7 text-sm sm:text-base md:text-lg text-[#061A45]/75 leading-relaxed font-sans max-w-md">
              Where mathematical rigor converges with self-governing autonomous infrastructure to eradicate institutional fragility.
            </p>

            {/* Act 2 Action & Indicators */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-7 sm:mt-9 pointer-events-auto">
              <button
                type="button"
                onClick={() => handleScrollTo("about")}
                className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-[4px] bg-[#061A45] hover:bg-[#0A369D] text-white shadow-[0_4px_16px_rgba(6,26,69,0.18)] hover:shadow-[0_6px_22px_rgba(10,54,157,0.28)] transition-all duration-200 active:scale-95"
              >
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] uppercase font-semibold">
                  Read The Doctrine
                </span>
                <span className="font-mono text-sm transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleScrollTo("what-we-build")}
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-[4px] border border-[#061A45]/25 hover:border-[#061A45] bg-white/40 hover:bg-white/80 text-[#061A45] backdrop-blur-sm transition-all duration-200 active:scale-95 shadow-[0_2px_8px_rgba(6,26,69,0.04)]"
              >
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] uppercase font-semibold">
                  View Systems
                </span>
              </button>
            </div>

            {/* Act 2 Architectural Specs */}
            <div className="hidden sm:flex items-center gap-4 mt-8 sm:mt-10 font-mono text-[9px] tracking-[0.26em] text-[#061A45]/50 uppercase">
              <span>Mathematical Invariance</span>
              <span>•</span>
              <span>Sub-millisecond Epochs</span>
            </div>
          </motion.div>

        </div>

        {/* RIGHT/CENTER ZONE (Generous Negative Space for Robot Animation) */}
        <div className="hidden lg:block lg:col-span-6 xl:col-span-7 pointer-events-none" />

      </div>
    </div>
  );
}
