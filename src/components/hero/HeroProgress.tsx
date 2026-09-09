"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroProgressProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroProgress({ scrollYProgress }: HeroProgressProps) {
  // Bottom initial scroll cue fades out by 0.07
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0], { clamp: true });
  const scrollCueVisibility = useTransform(scrollYProgress, (v) => (v > 0.07 ? "hidden" : "visible"));

  // Slender hairline progress bar fills across the hero scroll
  const progressScaleY = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  return (
    <>
      {/* 1. Initial Scroll Exploration Cue (Only at top 0-7%) */}
      <motion.div
        style={{ opacity: scrollCueOpacity, visibility: scrollCueVisibility }}
        className="absolute bottom-7 inset-x-0 flex flex-col items-center pointer-events-none z-20 select-none"
      >
        <span className="text-[9px] font-mono tracking-[0.32em] uppercase text-white/60 mb-2 drop-shadow-sm">
          Scroll To Explore
        </span>
        <div className="w-4 h-7 rounded-full border border-white/25 flex items-start justify-center p-1 bg-black/20 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-brand-blue-light"
          />
        </div>
      </motion.div>

      {/* 2. Slender Architectural Progress Track (Right Edge) */}
      <div className="hidden lg:flex flex-col items-center gap-2 absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none z-20 select-none">
        <span className="font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase writing-mode-vertical">
          01
        </span>
        <div className="w-[1px] h-20 bg-white/15 relative overflow-hidden">
          <motion.div
            style={{
              scaleY: progressScaleY,
              transformOrigin: "top",
            }}
            className="w-full h-full bg-brand-blue-light/70"
          />
        </div>
        <span className="font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase writing-mode-vertical">
          05
        </span>
      </div>
    </>
  );
}
