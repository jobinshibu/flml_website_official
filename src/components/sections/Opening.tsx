"use client";

import { motion } from "framer-motion";
import GalaxyCanvas from "@/components/GalaxyCanvas";

export default function Opening() {
  return (
    <section className="relative h-screen min-h-[750px] bg-black text-white overflow-hidden pt-20 pb-16 border-b border-white/10 flex flex-col justify-between items-center">
      
      {/* Interactive FLML Logo 3D Particle Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <GalaxyCanvas />
      </div>

      {/* Subtle Hero Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.65)_85%,_#000000_100%)] pointer-events-none z-[1]" />

      {/* Top Badge Identifier */}
      <div className="relative z-10 pt-8 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-white/80 uppercase pointer-events-auto shadow-2xl"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>SYSTEM ARCHITECTURE LAB</span>
        </motion.div>
      </div>

      {/* Split Headlines Flanking Center Canvas (Zero Overlap Edge Anchored Layout) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-between px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-left"
        >
          <h1 className="font-sans font-light tracking-[0.15em] text-xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-white/90 whitespace-nowrap select-none drop-shadow-2xl">
            WE ENGINEER
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-right"
        >
          <h1 className="font-sans font-light tracking-[0.15em] text-xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-white/90 whitespace-nowrap select-none drop-shadow-2xl">
            OUTCOMES.
          </h1>
        </motion.div>
      </div>



      {/* Action Buttons */}
      <div className="relative z-10 pb-8 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/#consultation"
            className="inline-flex items-center gap-3 bg-white text-black font-semibold text-xs md:text-sm px-8 py-4 rounded-full hover:bg-neutral-200 transition-all transform hover:scale-105 shadow-2xl"
          >
            <span>Initiate Technical Brief</span>
            <span className="text-base">→</span>
          </a>
          <a
            href="/#technology"
            className="inline-flex items-center gap-3 bg-white/5 border border-white/20 text-white font-semibold text-xs md:text-sm px-8 py-4 rounded-full hover:bg-white/10 transition-all backdrop-blur-md"
          >
            <span>Explore Architecture</span>
          </a>
        </motion.div>
      </div>

    </section>
  );
}




