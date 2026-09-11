"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * CLIENTS SECTION - FIRSTLOGIC META LAB
 * 
 * Palette & Design:
 * - Background: Light Standard Gray (#F3F4F6 / gray-100) — clean, modern, non-white canvas.
 * - Architectural Grid: Subtle laboratory grid with stroke="#061A45" at 3% opacity.
 * - Client Logo Cards: Crisp elevated white cards (bg-white) that pop cleanly against the light gray base.
 * - Hero Typography System:
 *   - Playfair Display uppercase headline (font-[family-name:var(--font-playfair)])
 *     in deep sovereign navy (#061A45) with brand blue accents (#0A369D).
 *   - Monospace tracking eyebrow with pulsating indicator.
 *   - Institutional metadata pill and stat counter.
 *   - Enterprise-grade rectangular CTA buttons (rounded-[4px]).
 * - Left-Side 3D Gallery:
 *   - Opposing vertical marquees (44s up / 49s down) with 3D perspective tilt (~6°).
 *   - Vertical fade masks (12% top & bottom).
 * - Controls:
 *   - Pause / Resume toggle.
 *   - "Explore all 23 ↗" / "Back to motion ↗" full responsive grid view.
 */

interface ClientItem {
  name: string;
  src: string;
}

// Exactly 23 client logos with original filenames, spaces, and extensions preserved
const clientLogos: ClientItem[] = [
  { name: "3ms", src: "/client/3ms.png" },
  { name: "Edhwi", src: "/client/Edhwi.svg" },
  { name: "Karikku", src: "/client/Karikku.svg" },
  { name: "American Board", src: "/client/american board.png" },
  { name: "Foodzer", src: "/client/foodzer.png" },
  { name: "Healine", src: "/client/healine.png" },
  { name: "MyVaahan", src: "/client/myvaahan.png" },
  { name: "Qaro", src: "/client/qaro.png" },
  { name: "Thara Cart", src: "/client/thara_cart.png" },
  { name: "Vivlino", src: "/client/vivlino.svg" },
  { name: "Cabco", src: "/client/cabco.jpeg" },
  { name: "ClubQ", src: "/client/clubq.jpeg" },
  { name: "Cool Talk", src: "/client/cool talk.jpeg" },
  { name: "DCost", src: "/client/dcost.jpeg" },
  { name: "Flexifold", src: "/client/flexifold.jpeg" },
  { name: "Relax Call", src: "/client/relax call.jpeg" },
  { name: "Vestido Nation", src: "/client/vestido nation.jpeg" },
  { name: "Kootukari", src: "/client/kootukari.jpeg" },
  { name: "Live to smile", src: "/client/live_to_smile.jpeg" },
  { name: "First Tap", src: "/client/first_tap.jpeg" },
  { name: "Ebotto", src: "/client/ebotto.jpeg" },
  { name: "Schosys", src: "/client/schosys.jpeg" },
  { name: "FinalFX", src: "/client/finalfx.png" },
];

// Split the 23 items across two vertical columns
const col1 = clientLogos.slice(0, 12);
const col2 = clientLogos.slice(12);

/**
 * Client logo tile component:
 * - Crisp white card against the light standard gray background
 * - Soft elevation shadow with subtle border
 * - Hover: 3px lift, brand blue border (#0A369D), logo scale (1.05), white sheen sweep
 */
function ClientCard({ client }: { client: ClientItem }) {
  return (
    <div className="group/tile relative w-full h-[124px] sm:h-[126px] rounded-[16px] bg-white border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_26px_rgba(10,54,157,0.12)] hover:border-[#0A369D] hover:-translate-y-[3px] transition-all duration-350 ease-out overflow-hidden flex items-center justify-center p-3 sm:p-4 cursor-pointer">
      {/* Soft light sheen pass across the tile on hover */}
      <div
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover/tile:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/80 to-transparent"
        aria-hidden="true"
      />
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={client.src}
          alt={`${client.name} logo`}
          fill
          className="object-contain p-2 sm:p-3 transition-transform duration-350 ease-out group-hover/tile:scale-105"
          sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 180px"
        />
      </div>
    </div>
  );
}

export default function Clients() {
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const clientCount = clientLogos.length;
  const countPadded = String(clientCount).padStart(3, "0");

  return (
    <section
      id="clients"
      className="relative w-full bg-[#F3F4F6] text-[#061A45] pt-0 pb-16 sm:pb-24 border-t border-gray-200/80 overflow-hidden"
    >
      {/* Clean subtle architectural blueprint grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="clients-hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#061A45" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#clients-hero-grid)" />
        </svg>
      </div>

      {/* Scoped CSS for hardware-accelerated marquees and perspective */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(0); }
        }
        .animate-column-up {
          animation: scrollUp 44s linear infinite;
        }
        .animate-column-down {
          animation: scrollDown 49s linear infinite;
        }
        .gallery-viewport {
          mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
        }
        .gallery-viewport:hover .animate-column-up,
        .gallery-viewport:hover .animate-column-down {
          animation-play-state: paused;
        }
        .gallery-perspective {
          perspective: 900px;
          transform: perspective(900px) rotateY(6deg) rotateZ(5deg);
          transform-style: preserve-3d;
        }
        @media (min-width: 1024px) {
          .gallery-perspective {
            transform: perspective(900px) rotateY(8deg) rotateZ(6deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-column-up,
          .animate-column-down {
            animation: none !important;
          }
        }
      `}} />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 z-10">
        
        {/* TOP HEADER STRIP */}
        <div className="pt-6 sm:pt-8 pb-3.5 mb-10 sm:mb-14 border-b border-gray-300/60">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.28em] uppercase text-[#061A45]/80">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#0A369D] animate-pulse" aria-hidden="true" />
              <span className="font-semibold tracking-[0.28em]">FIRST LOGIC META LAB</span>
              <span className="text-[#061A45]/30 hidden sm:inline">&nbsp;/&nbsp;</span>
              <span className="text-[#0A369D] hidden sm:inline font-medium">STRATEGIC ALLIANCES</span>
            </div>
            <div className="text-[#061A45]/70 font-medium">
              THE COMPANY WE KEEP &nbsp;/&nbsp; {countPadded}
            </div>
          </div>
        </div>

        {/* MAIN BODY: EXPANDED FULL GRID MODE */}
        {isExpanded ? (
          <div className="w-full">
            {/* Full-width content introduction above the grid */}
            <div className="max-w-3xl mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#0A369D] animate-pulse" />
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-[#061A45]/80 uppercase font-semibold">
                  First Logic Meta Lab &nbsp;/&nbsp; Client Roster
                </span>
              </div>

              <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-6xl md:text-7xl font-medium uppercase text-[#061A45] leading-[0.92] tracking-[-0.02em] mb-5">
                Trusted by<br />
                serious <span className="text-[#0A369D]">organisations.</span>
              </h2>

              <p className="text-[#061A45]/75 text-sm sm:text-base md:text-lg leading-relaxed font-sans max-w-md mb-6">
                Engineered for multi-generational reliability at global institutional scale.
              </p>

              <div className="inline-flex items-center gap-4 font-mono text-[10px] tracking-[0.24em] text-[#061A45]/70 uppercase font-semibold">
                <span>{clientCount} Institutional Partners</span>
                <span>•</span>
                <span>Zero Architectural Failure</span>
              </div>
            </div>

            {/* Responsive Grid showing all 23 client logo cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {clientLogos.map((client, idx) => (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.02, ease: "easeOut" }}
                >
                  <ClientCard client={client} />
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* MAIN BODY: TWO-COLUMN MOTION LAYOUT (Logos LEFT, Content RIGHT on desktop; Stacked on mobile) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
            
            {/* LEFT-SIDE: ANIMATED GALLERY (Desktop: Left Col 1-6; Mobile: Order 2 below heading) */}
            <div className="order-2 lg:order-1 lg:col-span-6 w-full flex justify-center">
              <div className="gallery-viewport relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] h-[285px] lg:h-[445px] overflow-hidden py-2">
                <div className="gallery-perspective w-full h-full flex justify-center items-center gap-3 sm:gap-[13px]">
                  
                  {/* Column 1: Moves Upward (44s linear infinite) */}
                  <div className="w-[136px] sm:w-[165px] lg:w-[178px] shrink-0 flex flex-col">
                    {/* Primary group */}
                    <div
                      className="flex flex-col gap-[13px] pb-[13px] animate-column-up shrink-0"
                      style={{ animationPlayState: isPaused ? "paused" : "running" }}
                    >
                      {col1.map((client, idx) => (
                        <ClientCard key={`col1-primary-${client.name}-${idx}`} client={client} />
                      ))}
                    </div>
                    {/* Seamless duplicate loop group */}
                    <div
                      className="flex flex-col gap-[13px] pb-[13px] animate-column-up shrink-0"
                      style={{ animationPlayState: isPaused ? "paused" : "running" }}
                      aria-hidden="true"
                    >
                      {col1.map((client, idx) => (
                        <ClientCard key={`col1-duplicate-${client.name}-${idx}`} client={client} />
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Moves Downward (49s linear infinite) */}
                  <div className="w-[136px] sm:w-[165px] lg:w-[178px] shrink-0 flex flex-col">
                    {/* Primary group */}
                    <div
                      className="flex flex-col gap-[13px] pb-[13px] animate-column-down shrink-0"
                      style={{ animationPlayState: isPaused ? "paused" : "running" }}
                    >
                      {col2.map((client, idx) => (
                        <ClientCard key={`col2-primary-${client.name}-${idx}`} client={client} />
                      ))}
                    </div>
                    {/* Seamless duplicate loop group */}
                    <div
                      className="flex flex-col gap-[13px] pb-[13px] animate-column-down shrink-0"
                      style={{ animationPlayState: isPaused ? "paused" : "running" }}
                      aria-hidden="true"
                    >
                      {col2.map((client, idx) => (
                        <ClientCard key={`col2-duplicate-${client.name}-${idx}`} client={client} />
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* RIGHT-SIDE: CONTENT (Hero Playfair Display Typography) */}
            <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col justify-center lg:pl-4 xl:pl-8">
              
              {/* Eyebrow Label (Hero Style) */}
              <div className="inline-flex items-center gap-3 mb-5 sm:mb-6">
                <span className="w-2 h-2 rounded-full bg-[#0A369D] animate-pulse" />
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-[#061A45]/80 uppercase font-semibold">
                  First Logic Meta Lab &nbsp;/&nbsp; Cognitive Trust
                </span>
              </div>

              {/* Strong Editorial Headline in Hero Playfair Display Font */}
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-6xl md:text-7xl lg:text-[62px] xl:text-[70px] font-medium uppercase text-[#061A45] leading-[0.92] tracking-[-0.02em] mb-5 sm:mb-6">
                Trusted by<br />
                serious<br />
                <span className="text-[#0A369D]">organisations.</span>
              </h2>

              {/* Supporting Statement (Hero Sans Typography) */}
              <p className="text-sm sm:text-base md:text-lg text-[#061A45]/75 leading-relaxed font-sans max-w-md mb-7 sm:mb-8">
                Ambitious brands. Complex challenges.<br className="hidden sm:inline" />
                One engineering partner.
              </p>

              {/* Hero Institutional Metadata & Metric Pill */}
              <div className="flex items-center gap-5 p-4 sm:p-5 rounded-[4px] border border-gray-300/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] w-fit">
                <div className="flex items-baseline gap-1">
                  <span className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-medium text-[#061A45]">
                    {clientCount}
                  </span>
                  <span className="text-[#0A369D] font-bold text-xl">+</span>
                </div>

                <div className="w-px h-10 bg-[#061A45]/20" aria-hidden="true" />

                <div className="flex flex-col justify-center font-mono text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-[#061A45]/80 font-semibold leading-tight">
                  <span>Brands with</span>
                  <span className="text-[#0A369D]">shared ambition</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* BOTTOM STRIP - Clean institutional styling */}
        <div className="pt-6 mt-12 sm:mt-16 lg:mt-20 border-t border-gray-300/60">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Left text */}
            <div className="flex items-center gap-2.5 font-mono text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-[#061A45]/70 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A369D]" aria-hidden="true" />
              <span>Different industries &nbsp;•&nbsp; Shared conviction</span>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-3">
              {/* 1. Pause / Resume Toggle */}
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                aria-pressed={isPaused}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] border border-gray-300 bg-white hover:bg-gray-50 text-[#061A45] font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold transition-all duration-200 active:scale-95 shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer"
              >
                {isPaused ? "Resume" : "Pause"}
              </button>

              {/* 2. Explore all 23 ↗ / Back to motion ↗ Toggle */}
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-[4px] bg-[#061A45] hover:bg-[#0A369D] text-white font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold shadow-[0_4px_16px_rgba(6,26,69,0.18)] hover:shadow-[0_6px_22px_rgba(10,54,157,0.28)] transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>{isExpanded ? "Back to motion" : `Explore all ${clientCount}`}</span>
                <span className="font-mono text-sm transition-transform duration-200 group-hover:translate-x-1">
                  ↗
                </span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
