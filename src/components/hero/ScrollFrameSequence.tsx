"use client";

import React, { useRef, useState } from "react";
import { useScroll, AnimatePresence, motion } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import HeroAtmosphere from "./HeroAtmosphere";
import HeroArchitecturalMarks from "./HeroArchitecturalMarks";
import HeroIntro from "./HeroIntro";
import HeroSystemReveal from "./HeroSystemReveal";
import HeroProgress from "./HeroProgress";

/**
 * ScrollFrameSequence – High-end Art-Directed Hero Experience
 *
 * Architecture:
 * - 350vh total scroll track with sticky 100vh pinned viewport
 * - 120 WebP high-DPI canvas frame sequence with sub-frame dual-layer optical blending
 * - 5-phase cinematic journey (Silent Arrival -> Identity Reveal -> Cinematic Immersion ->
 *   Intelligence / System Reveal -> Doctrine Transition)
 * - Zero React re-renders on kinetic scrub
 */
export default function ScrollFrameSequence() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [initialFrameReady, setInitialFrameReady] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);

  // Master scroll mapping across 350vh track
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-[350vh] bg-[#061A45] selection:bg-brand-blue selection:text-white"
    >
      {/* Sticky Pinned 100vh Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        
        {/* 1. Canvas Frame Sequence Engine */}
        <HeroCanvas
          scrollYProgress={scrollYProgress}
          onInitialReady={() => setInitialFrameReady(true)}
          onLoadProgress={(pct) => setLoadPercentage(pct)}
        />

        {/* 2. Cinematic Atmosphere (Vignette, Noise, Section Bridge) */}
        <HeroAtmosphere scrollYProgress={scrollYProgress} />

        {/* 3. Architectural Viewport Marks & Dynamic Coordinates */}
        <HeroArchitecturalMarks scrollYProgress={scrollYProgress} />

        {/* 4. Phase 0 & Phase 1: Silent Arrival & Staggered Identity Reveal */}
        <HeroIntro scrollYProgress={scrollYProgress} />

        {/* 5. Phase 3 & Phase 4: Intelligence / System Reveal & Doctrine Transition */}
        <HeroSystemReveal scrollYProgress={scrollYProgress} />

        {/* 6. Cinematic Progress System & Scroll Cue */}
        <HeroProgress scrollYProgress={scrollYProgress} />

        {/* 7. Initial Frame Calibration HUD */}
        <AnimatePresence>
          {!initialFrameReady && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#061A45] z-50 font-mono text-center p-6 select-none"
            >
              <div className="font-[family-name:var(--font-cinzel)] text-2xl sm:text-3xl md:text-4xl tracking-[0.28em] text-white uppercase mb-3">
                First Logic Meta Lab
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-brand-blue-light/70 uppercase mb-5">
                Calibrating Sovereign Optical Sequence • {loadPercentage}%
              </div>
              <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-blue-light transition-all duration-150"
                  style={{ width: `${Math.max(8, loadPercentage)}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
