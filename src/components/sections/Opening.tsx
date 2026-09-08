"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Opening() {
  return (
    <section className="relative min-h-screen bg-white text-brand-blue-dark overflow-hidden px-8 md:px-16 border-b border-brand-blue/10 pt-8 flex flex-col justify-center">

      {/* Blueprint Visual Language */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0A369D" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        </svg>
      </div>


      {/* Brand Logo - Anchored to Top Left */}
      <div className="absolute top-0 left-0 w-full h-24 md:h-32 flex items-center pl-8 md:pl-12 z-50 pointer-events-none">
        <div className="inline-flex items-center gap-4 md:gap-6 pointer-events-auto hover:opacity-80 transition-opacity">

          {/* Highlighted Logo on the left */}
          <div className="relative w-12 h-12 md:w-16 md:h-16 drop-shadow-[0_4px_12px_rgba(10,54,157,0.15)]">
            <Image
              src="/FLML-01.png"
              alt="Logo Mark"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="w-px h-10 bg-brand-blue/20 hidden sm:block" />

          {/* Text on the right */}
          <div className="flex flex-col">
            <span className="font-sans font-black text-xl md:text-2xl tracking-[0.2em] text-brand-blue">
              FIRST LOGIC
            </span>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-brand-blue/70">
              META LAB
            </span>
          </div>

        </div>
      </div>

      {/* Main Content - Split Screen */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto mt-16 md:mt-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">

        {/* Left Side: Typography */}
        <div className="flex-1 w-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-brand-blue uppercase bg-brand-blue/5 px-4 py-2 border border-brand-blue/20">
              SYSTEM ARCHITECTURE LAB
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl xl:text-[100px] font-black tracking-tighter leading-[0.85] text-brand-blue-dark mb-10"
          >
            WE ENGINEER <br />
            <span className="text-brand-blue">
              OUTCOMES.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-8 max-w-2xl"
          >
            <div className="flex-1">
              <h3 className="font-mono text-xs tracking-widest text-brand-blue mb-4 uppercase">The Mandate</h3>
              <p className="text-sm md:text-base font-medium text-brand-blue-dark/70 leading-relaxed">
                To engineer the definitive technological advantage. Growth is ultimately constrained by fragile systems. The directive is singular: replace complex operational friction with unbreakable, high-performance software architectures that guarantee absolute market dominance.
              </p>
            </div>
            <div className="flex-1 border-l border-brand-blue/10 pl-6">
              <h3 className="font-mono text-xs tracking-widest text-brand-blue mb-4 uppercase">Operational Focus</h3>
              <ul className="space-y-2 font-sans font-bold text-xs md:text-sm tracking-wide text-brand-blue-dark/60 uppercase">
                <li>01. Global Enterprise Operations</li>
                <li>02. Scaling Tech Ventures</li>
                <li>03. B2B & Supply Chain Ecosystems</li>
                <li>04. Consumer Platforms & Digital Retail</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Frameless Video in White Space */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full flex items-center justify-center relative"
        >
          {/* Using a radial mask and brightness/contrast to seamlessly blend the video's off-white background into the pure white page */}
          <div
            className="relative w-full max-w-lg flex items-center justify-center"
            style={{
              WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
              maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)'
            }}
          >
            <video
              src="/intro.mp4"
              autoPlay
              muted
              playsInline
              className="w-full max-h-[500px] object-contain mix-blend-multiply"
              style={{
                pointerEvents: 'none',
                filter: 'brightness(1.08) contrast(1.1)'
              }}
            />
          </div>
        </motion.div>

      </div>

    </section>
  );
}
