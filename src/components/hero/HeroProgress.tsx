"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroProgressProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroProgress({ scrollYProgress }: HeroProgressProps) {
  // Bottom initial scroll cue fades out by 0.12
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.10], [1, 0], { clamp: true });
  const scrollCueVisibility = useTransform(scrollYProgress, (v) => (v > 0.12 ? "hidden" : "visible"));

  // Slender hairline progress bar fills across the hero scroll
  const progressScaleY = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });
  const progressTrackOpacity = useTransform(scrollYProgress, [0.88, 0.98], [1, 0], { clamp: true });

  return (
    <>
      {/* 1. Initial Scroll Exploration Cue (Only at top 0-10%) */}
      <motion.div
        style={{ opacity: scrollCueOpacity, visibility: scrollCueVisibility }}
        className="absolute bottom-7 inset-x-0 flex flex-col items-center pointer-events-none z-20 select-none"
      >
        <span className="text-[9px] font-mono tracking-[0.32em] uppercase text-[#061A45]/60 mb-2">
          Scroll To Explore
        </span>
        <div className="w-4 h-7 rounded-full border border-[#061A45]/30 flex items-start justify-center p-1 bg-white/60 backdrop-blur-sm shadow-sm">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-[#0A369D]"
          />
        </div>
      </motion.div>

      {/* 2. Slender Architectural Progress Track (Right Edge) */}
      <motion.div
        style={{ opacity: progressTrackOpacity }}
        className="hidden lg:flex flex-col items-center gap-2 absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 pointer-events-none z-20 select-none"
      >
        <span className="font-mono text-[8px] tracking-[0.2em] text-[#061A45]/40 uppercase [writing-mode:vertical-lr]">
          01
        </span>
        <div className="w-[1.5px] h-20 bg-[#061A45]/15 relative overflow-hidden rounded-full">
          <motion.div
            style={{
              scaleY: progressScaleY,
              transformOrigin: "top",
            }}
            className="w-full h-full bg-[#0A369D]"
          />
        </div>
        <span className="font-mono text-[8px] tracking-[0.2em] text-[#061A45]/40 uppercase [writing-mode:vertical-lr]">
          05
        </span>
      </motion.div>
    </>
  );
}
