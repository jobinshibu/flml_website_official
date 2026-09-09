"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroIntroProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroIntro({ scrollYProgress }: HeroIntroProps) {
  // ---------------------------------------------------------------------------
  // MASTER CONTAINER TRANSFORMS (PHASE 0 & PHASE 1: 0% -> 22%)
  // 0.00 -> 0.08: Silent Arrival (gentle emergence)
  // 0.08 -> 0.18: Full Identity Presence
  // 0.18 -> 0.24: Cinematic Exit into Phase 2 Immersion
  // ---------------------------------------------------------------------------
  const containerOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.12, 0.17],
    [0.95, 1, 0.5, 0],
    { clamp: true }
  );

  const containerY = useTransform(
    scrollYProgress,
    [0, 0.08, 0.17],
    [0, -15, -60],
    { clamp: true }
  );

  const containerScale = useTransform(
    scrollYProgress,
    [0, 0.17],
    [1, 0.94],
    { clamp: true }
  );

  const containerVisibility = useTransform(scrollYProgress, (v) =>
    v > 0.17 ? "hidden" : "visible"
  );

  const pointerEvents = useTransform(containerOpacity, (v) =>
    v > 0.15 ? "auto" : "none"
  );

  // ---------------------------------------------------------------------------
  // STAGGERED LAYER ANIMATIONS (TIED TO SCROLL)
  // ---------------------------------------------------------------------------
  // Layer 1: Metadata Pill
  const l1Opacity = useTransform(scrollYProgress, [0, 0.05], [0.85, 1], { clamp: true });
  const l1Y = useTransform(scrollYProgress, [0, 0.06], [0, -4], { clamp: true });

  // Layer 2: Monumental "FLML" Title with Tracking Tightening
  const l2Opacity = useTransform(scrollYProgress, [0, 0.06], [0.95, 1], { clamp: true });
  const l2LetterSpacing = useTransform(
    scrollYProgress,
    [0, 0.08],
    ["0.14em", "0.07em"],
    { clamp: true }
  );
  const l2Clip = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["inset(0 0 0% 0)", "inset(0 0 0% 0)"],
    { clamp: true }
  );

  // Layer 3: Secondary Architectural Title "FIRST LOGIC META LAB"
  const l3Opacity = useTransform(scrollYProgress, [0, 0.06], [0.9, 1], { clamp: true });
  const l3Y = useTransform(scrollYProgress, [0, 0.07], [0, -4], { clamp: true });

  // Layer 4: Supporting Statement with Blur-to-Sharp Focus
  const l4Opacity = useTransform(scrollYProgress, [0, 0.06], [0.85, 1], { clamp: true });
  const l4BlurVal = useTransform(scrollYProgress, [0, 0.05], [0, 0], { clamp: true });
  const l4Filter = useTransform(l4BlurVal, (v) => `blur(${v}px)`);
  const l4Y = useTransform(scrollYProgress, [0, 0.07], [0, -4], { clamp: true });

  // Layer 5: Luxury Minimal CTA
  const l5Opacity = useTransform(scrollYProgress, [0, 0.06], [0.9, 1], { clamp: true });
  const l5Scale = useTransform(scrollYProgress, [0, 0.06], [1, 1], { clamp: true });
  const l5Y = useTransform(scrollYProgress, [0, 0.07], [0, -4], { clamp: true });

  return (
    <motion.div
      style={{
        opacity: containerOpacity,
        y: containerY,
        scale: containerScale,
        visibility: containerVisibility,
        pointerEvents,
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4 sm:px-6 select-none -translate-y-6 sm:-translate-y-10 md:-translate-y-14"
    >
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* LAYER 1: Tiny Metadata Badge */}
        <motion.div
          style={{ opacity: l1Opacity, y: l1Y }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1 sm:py-1.5 rounded-full border border-[#061A45]/20 bg-white/80 backdrop-blur-md mb-4 sm:mb-6 shadow-[0_4px_16px_rgba(6,26,69,0.08)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0A369D] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] text-[#061A45]/90 uppercase font-semibold">
            EST. MMXXIV • ADVANCED COGNITIVE ARCHITECTURE
          </span>
        </motion.div>

        {/* LAYER 2: Primary Monumental Title (FLML) with Architectural Tracking */}
        <motion.div
          style={{
            opacity: l2Opacity,
            letterSpacing: l2LetterSpacing,
            clipPath: l2Clip,
          }}
          className="overflow-hidden"
        >
          <h1 className="font-[family-name:var(--font-cinzel)] text-6xl sm:text-8xl md:text-9xl lg:text-[112px] font-semibold uppercase text-[#061A45] leading-[0.9] tracking-[0.08em] drop-shadow-[0_4px_18px_rgba(6,26,69,0.15)]">
            FLML
          </h1>
        </motion.div>

        {/* LAYER 3: Architectural Secondary Title */}
        <motion.div style={{ opacity: l3Opacity, y: l3Y }} className="mt-2 sm:mt-3">
          <h2 className="font-[family-name:var(--font-cinzel)] font-medium text-2xl sm:text-4xl md:text-5xl lg:text-[44px] tracking-[0.18em] uppercase text-[#0A369D] drop-shadow-[0_2px_12px_rgba(10,54,157,0.12)]">
            First Logic Meta Lab
          </h2>
        </motion.div>

        {/* LAYER 4: Supporting Statement */}
        <motion.div
          style={{ opacity: l4Opacity, filter: l4Filter, y: l4Y }}
          className="mt-5 sm:mt-7 max-w-2xl px-2"
        >
          <p className="font-[family-name:var(--font-cormorant)] italic text-xl sm:text-2xl md:text-3xl text-[#061A45]/95 leading-relaxed tracking-wide">
            “Where mathematical rigor converges with sovereign digital form.”
          </p>
          <p className="mt-2 text-[11px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.24em] text-[#061A45]/70 max-w-xl mx-auto font-medium">
            Engineering intelligence at the intersection of logic, systems &amp; digital form.
          </p>
        </motion.div>

        {/* LAYER 5: Redesigned Luxury Minimal CTA */}
        <motion.div
          style={{ opacity: l5Opacity, scale: l5Scale, y: l5Y }}
          className="mt-7 sm:mt-9"
        >
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("about");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative inline-flex items-center gap-3.5 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full border border-[#061A45]/30 hover:border-[#061A45] bg-[#061A45] hover:bg-[#0A369D] text-white shadow-[0_6px_24px_rgba(6,26,69,0.22)] hover:shadow-[0_8px_32px_rgba(10,54,157,0.35)] transition-all duration-300 pointer-events-auto active:scale-95"
          >
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.26em] uppercase font-semibold">
              Explore The System
            </span>
            <span className="font-mono text-sm sm:text-base transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
