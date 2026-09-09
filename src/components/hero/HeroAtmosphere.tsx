"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroAtmosphereProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroAtmosphere({ scrollYProgress }: HeroAtmosphereProps) {
  // Deep bottom bridge to #about section (bg-[#061A45]) activates smoothly in transition phase (0.85 -> 1.00)
  const bottomGradientOpacity = useTransform(
    scrollYProgress,
    [0, 0.82, 0.95, 1],
    [0, 0, 0.85, 1],
    { clamp: true }
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-[2]">
      {/* 1. Subtle Architectural Grid (Laboratory Precision) */}
      <div className="absolute inset-0 opacity-[0.035]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-architectural-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#061A45" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-architectural-grid)" />
        </svg>
      </div>

      {/* 2. Soft Architectural Lighting (Subtle Vignette at extreme perimeter) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(6,26,69,0.04)_100%)]" />

      {/* 3. Refined Section Bridge: Softly ramps to #061A45 only as user reaches transition (0.85 - 1.00) */}
      <motion.div
        style={{ opacity: bottomGradientOpacity }}
        className="absolute bottom-0 left-0 w-full h-56 sm:h-72 md:h-96 bg-gradient-to-t from-[#061A45] via-[#061A45]/85 to-transparent"
      />

      {/* 4. Film Grain / Subtle Micro-texture Layer */}
      <div
        className="absolute inset-0 opacity-[0.022] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
