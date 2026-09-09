"use client";
import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface HeroContentProps {
  /** Scroll progress (0‑1) for the hero section */
  progress: MotionValue<number>;
}

/**
 * HeroContent – animated typographic overlay for the hero.
 * Uses the same scroll progress as the video to drive opacity,
 * scale, and vertical translation according to the five phases
 * described in the specification.
 */
export default function HeroContent({ progress }: HeroContentProps) {
  // ---------- Title transforms ----------
  const titleY = useTransform(progress, [0, 0.15, 0.35, 0.6, 1], [0, -80, -120, -150, -200]);
  const titleScale = useTransform(progress, [0, 0.15, 0.35, 0.6, 1], [1, 0.94, 0.9, 0.85, 0.8]);
  const titleOpacity = useTransform(progress, [0, 0.4, 0.6, 1], [1, 0.75, 0.2, 0]);

  // ---------- Subtitle transforms ----------
  const subtitleY = useTransform(progress, [0, 0.2, 0.4, 1], [0, -30, -50, -80]);
  const subtitleOpacity = useTransform(progress, [0, 0.4, 0.6, 1], [1, 0.5, 0.1, 0]);

  // ---------- CTA button transforms ----------
  const ctaScale = useTransform(progress, [0, 0.35, 0.6, 1], [1, 0.95, 0.9, 0.85]);
  const ctaOpacity = useTransform(progress, [0, 0.4, 0.6, 1], [1, 0.7, 0.2, 0]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      {/* Title */}
      <motion.h1
        style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
        className="text-6xl md:text-8xl xl:text-[100px] font-black tracking-tighter leading-[0.85] text-white"
      >
        FLML
        <br />
        <span className="text-brand-blue-light">FIRST LOGIC META LAB</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        style={{ y: subtitleY, opacity: subtitleOpacity }}
        className="mt-6 text-xl md:text-2xl text-white/80 text-center max-w-2xl"
      >
        Engineering the future of intelligent, cinematic technology.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        style={{ scale: ctaScale, opacity: ctaOpacity }}
        className="mt-8 px-8 py-3 bg-brand-blue-light text-white rounded-full shadow-lg hover:shadow-xl transition-shadow pointer-events-auto"
        onClick={() => {
          const el = document.getElementById("about");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Explore
      </motion.button>
    </div>
  );
}
