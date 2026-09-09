"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroAtmosphereProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroAtmosphere({ scrollYProgress }: HeroAtmosphereProps) {
  // Vignette intensity breathes dynamically through the phases
  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.85, 1],
    [0.6, 0.45, 0.35, 0.6, 0.95],
    { clamp: true }
  );

  // Bottom bridge to #about (bg-[#061A45]) deepens in Phase 4
  const bottomGradientOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 0.9, 1],
    [0.7, 0.8, 0.95, 1],
    { clamp: true }
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-[2]">
      {/* 1. Cinematic Radial Vignette */}
      <motion.div
        style={{ opacity: vignetteOpacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(6,26,69,0.35)_70%,rgba(6,26,69,0.85)_100%)]"
      />

      {/* 2. Top Header Shadow (Protects Navigation Contrast) */}
      <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-b from-[#061A45]/80 via-[#061A45]/30 to-transparent" />

      {/* 3. Deep Bottom Bridge to #about Section */}
      <motion.div
        style={{ opacity: bottomGradientOpacity }}
        className="absolute bottom-0 left-0 w-full h-48 sm:h-64 bg-gradient-to-t from-[#061A45] via-[#061A45]/60 to-transparent"
      />

      {/* 4. Film Grain / Subtle Micro-texture Layer */}
      <div
        className="absolute inset-0 opacity-[0.032] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
