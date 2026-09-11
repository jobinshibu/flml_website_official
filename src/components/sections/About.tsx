"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowDown, CheckCircle2, ChevronRight, Activity, Cpu } from "lucide-react";
import ParticleMorphCanvas from "./doctrine/ParticleMorphCanvas";
import {
  BranchingNodesDiagram,
  BottleneckConvergenceDiagram,
  AlignedArchitectureDiagram,
} from "./doctrine/PhaseDiagrams";

// ============================================================================
// THE DOCTRINE SECTION — HARMONIZED WITH HERO SECTION NAVY/BLUE IDENTITY
// - Background: Deep Sovereign Navy (#061A45 -> #030c24 -> #020718)
// - Palette: Brand Blue #0A369D, Cyan #38BDF8, Ice Blue #E6F0FF, Luminous White
// - Typography: Space Grotesk / Cinzel Headings, Cormorant Garamond Italics
// - Seamless continuity with Hero's bottom transition bridge
// - Excludes top navbar and bottom footer/wordmark
// ============================================================================

// ----------------------------------------------------------------------------
// Progressive Scroll-Illuminated Quote Component
// Illuminates words from muted slate-blue to radiant white; highlights
// "surgically dissect the anatomy" in luminous sky-cyan.
// ----------------------------------------------------------------------------
interface WordToken {
  text: string;
  isHighlight: boolean;
}

const QUOTE_WORDS: WordToken[] = [
  { text: "“Before", isHighlight: false },
  { text: "a", isHighlight: false },
  { text: "single", isHighlight: false },
  { text: "line", isHighlight: false },
  { text: "of", isHighlight: false },
  { text: "code", isHighlight: false },
  { text: "is", isHighlight: false },
  { text: "written,", isHighlight: false },
  { text: "our", isHighlight: false },
  { text: "architects", isHighlight: false },
  { text: "surgically", isHighlight: true },
  { text: "dissect", isHighlight: true },
  { text: "the", isHighlight: true },
  { text: "anatomy", isHighlight: true },
  { text: "of", isHighlight: false },
  { text: "your", isHighlight: false },
  { text: "operations", isHighlight: false },
  { text: "to", isHighlight: false },
  { text: "eliminate", isHighlight: false },
  { text: "friction", isHighlight: false },
  { text: "and", isHighlight: false },
  { text: "leakage.”", isHighlight: false },
];

function ScrollIlluminatedWord({
  token,
  index,
  total,
  scrollYProgress,
}: {
  token: WordToken;
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  const start = index / total;
  const end = Math.min(1, (index + 1.2) / total);

  // Opacity transitions from muted slate (0.28) to illuminated (1.0)
  const opacity = useTransform(scrollYProgress, [start, end], [0.28, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.28em] transition-colors duration-200 ${
        token.isHighlight
          ? "text-[#38BDF8] font-medium drop-shadow-[0_0_14px_rgba(56,189,248,0.55)]"
          : "text-[#F0F6FF]"
      }`}
    >
      {token.text}
    </motion.span>
  );
}

// ----------------------------------------------------------------------------
// Animated Numeric Counter for Statistics
// ----------------------------------------------------------------------------
function AnimatedStatCounter({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const duration = 1800; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = ease * target;

      setDisplayValue(current.toFixed(decimals));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(target.toFixed(decimals));
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target, decimals]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

// ----------------------------------------------------------------------------
// MAIN ABOUT / THE DOCTRINE COMPONENT
// ----------------------------------------------------------------------------
export default function About() {
  const [activePhase, setActivePhase] = useState<number>(1);

  const quoteContainerRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: quoteScrollProgress } = useScroll({
    target: quoteContainerRef,
    offset: ["start 80%", "end 40%"],
  });

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "phase-01") setActivePhase(1);
          if (entry.target.id === "phase-02") setActivePhase(2);
          if (entry.target.id === "phase-03") setActivePhase(3);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "-25% 0px -40% 0px",
      threshold: 0.2,
    });

    const p1 = phase1Ref.current;
    const p2 = phase2Ref.current;
    const p3 = phase3Ref.current;

    if (p1) observer.observe(p1);
    if (p2) observer.observe(p2);
    if (p3) observer.observe(p3);

    return () => observer.disconnect();
  }, []);

  const scrollToPhase = (phaseId: string) => {
    const el = document.getElementById(phaseId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const scrollToFirstPrinciple = () => {
    const el = document.getElementById("first-principle");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="relative w-full bg-gradient-to-b from-[#061A45] via-[#030c24] to-[#020718] text-white selection:bg-[#0A369D] selection:text-white font-['DM_Sans',sans-serif] overflow-hidden"
    >
      {/* Background Architectural Blueprint Grid Matching Hero Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="doctrine-architectural-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#38BDF8" strokeWidth="0.75" />
              <circle cx="24" cy="24" r="0.75" fill="#38BDF8" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doctrine-architectural-grid)" />
        </svg>
      </div>

      {/* Atmospheric Luminous Lighting (Matching Hero Palette) */}
      <div className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-[#0A369D]/25 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#0284c7]/15 rounded-full blur-[190px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[550px] h-[550px] bg-[#0A369D]/20 rounded-full blur-[200px] pointer-events-none" />

      {/* ==================================================================== */}
      {/* 1. DOCTRINE HERO                                                     */}
      {/* ==================================================================== */}
      <div className="relative min-h-[92vh] max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-24 lg:pt-32 pb-16 flex flex-col justify-between">
        
        {/* Top Header Pill & Latin Label */}
        <div className="flex items-center gap-3.5 mb-8 z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/30 bg-[#0A369D]/25 text-sky-300 text-[11px] font-mono tracking-[0.25em] uppercase backdrop-blur-md shadow-[0_2px_12px_rgba(10,54,157,0.25)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
            </span>
            THE DOCTRINE — 001
          </div>
          <span className="w-px h-3.5 bg-white/20" />
          <span className="font-[family-name:var(--font-serif-classic)] italic text-sm text-sky-200/70 tracking-wider">
            Prima Lex Systemica
          </span>
        </div>

        {/* Main Hero Body: Headline + 3D Particle Visualizer */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-20 my-auto">
          
          {/* Left Column: Oversized Staggered Headline */}
          <div className="lg:col-span-8 z-20">
            <h1 className="font-['Space_Grotesk',sans-serif] font-bold text-5xl sm:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.96] text-[#F0F6FF]">
              <span className="block">OPERATIONAL</span>
              <span className="block mt-1 sm:mt-2">ANATOMY</span>
              <span className="block mt-2 sm:mt-3">
                <span className="text-[#38BDF8] drop-shadow-[0_0_24px_rgba(56,189,248,0.4)]">
                  FIRST.
                </span>{" "}
                <span className="text-3xl sm:text-5xl lg:text-6xl font-normal text-white/90">
                  Code{" "}
                  <span className="font-[family-name:var(--font-serif-classic)] italic text-sky-200">
                    Second.
                  </span>
                </span>
              </span>
            </h1>

            {/* Original Introductory Paragraph */}
            <p className="mt-8 sm:mt-10 max-w-xl text-base sm:text-lg text-sky-100/75 leading-relaxed font-light">
              We do not sell off-the-shelf software. Generic technology forces a business to compromise its unique workflows to fit rigid limitations. We reverse that equation.
            </p>

            {/* Circular Scroll Down Button */}
            <div className="mt-10 flex items-center gap-6">
              <button
                onClick={scrollToFirstPrinciple}
                className="group relative w-14 h-14 rounded-full border border-sky-400/30 hover:border-sky-300 bg-[#0A369D]/30 hover:bg-[#0A369D]/60 flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(6,26,69,0.5)] backdrop-blur-md active:scale-95"
                aria-label="Scroll down to First Principle"
              >
                <ArrowDown className="w-5 h-5 text-sky-200 group-hover:text-white transition-transform duration-300 group-hover:translate-y-0.5" />
                <span className="sr-only">Scroll down</span>
              </button>
              <div className="text-xs font-mono tracking-widest text-sky-200/50 uppercase">
                SCROLL TO DECONSTRUCT
              </div>
            </div>
          </div>

          {/* Right Area: Animated Blue Particle System (Torus -> Sphere -> Cube) */}
          <div className="lg:col-span-4 relative h-[380px] sm:h-[480px] lg:h-[540px] flex items-center justify-center pointer-events-auto">
            {/* Ambient luminous halo behind particles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full bg-[#0A369D]/35 blur-[100px]" />
            </div>

            {/* 3D Hardware Accelerated Canvas */}
            <ParticleMorphCanvas className="z-10" />

            {/* Overlay Particle Geometry Mode Readout */}
            <div className="absolute bottom-2 right-2 sm:right-6 px-3 py-1 rounded-full border border-sky-400/20 bg-[#061A45]/80 backdrop-blur-md text-[10px] font-mono text-sky-300/60 uppercase tracking-widest">
              MORPHIC TOPOLOGY ENGINE
            </div>
          </div>

        </div>

        {/* Compact FLML Core Status Strip */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-sky-200/60 z-20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-white font-semibold tracking-wider">FLML CORE</span>
            <span className="text-white/20">|</span>
            <span className="tracking-widest">SOVEREIGN ARCHITECTURE</span>
          </div>

          <div className="flex items-center gap-4 tracking-wider">
            <span className="text-sky-300">SYS_STATUS: OPTIMAL</span>
            <span>•</span>
            <span>HIGH-SCALE PROTOCOL</span>
          </div>
        </div>

      </div>

      {/* ==================================================================== */}
      {/* 2. MOVING TEXT RIBBON                                                */}
      {/* Sovereign Royal Blue Banner (#0A369D) with infinite horizontal loop  */}
      {/* ==================================================================== */}
      <div className="relative w-full py-4 sm:py-5 my-10 overflow-hidden bg-gradient-to-r from-[#061A45] via-[#0A369D] to-[#061A45] border-y border-sky-400/30 -rotate-1 scale-[1.02] shadow-[0_10px_35px_rgba(10,54,157,0.35)] z-20">
        <div className="flex w-max select-none animate-[marqueeLoop_26s_linear_infinite]">
          {[0, 1, 2, 3].map((rep) => (
            <div key={rep} className="flex items-center text-white font-['Space_Grotesk',sans-serif] font-bold text-sm sm:text-base tracking-[0.24em] uppercase shrink-0">
              <span className="mx-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                SOVEREIGN ARCHITECTURE
              </span>
              <span className="text-sky-400">✳</span>
              <span className="mx-6 text-sky-200">BESPOKE CODE</span>
              <span className="text-sky-400">✳</span>
              <span className="mx-6 text-white">OPERATIONAL ANATOMY FIRST</span>
              <span className="text-sky-400">✳</span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Keyframe for continuous zero-gap ticker */}
      <style jsx global>{`
        @keyframes marqueeLoop {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      {/* ==================================================================== */}
      {/* 3. FIRST PRINCIPLE                                                   */}
      {/* Large quotation with progressive scroll illumination                 */}
      {/* ==================================================================== */}
      <div
        id="first-principle"
        ref={quoteContainerRef}
        className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-28 lg:py-36 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left: Small Section Label */}
          <div className="lg:col-span-3">
            <div className="sticky top-28 flex items-center gap-3">
              <span className="w-2 h-2 bg-sky-400 rounded-full" />
              <span className="font-mono text-xs tracking-[0.25em] text-sky-300 uppercase font-semibold">
                01 / FIRST PRINCIPLE
              </span>
            </div>
          </div>

          {/* Right: The Quotation & Supporting Paragraph */}
          <div className="lg:col-span-9 max-w-4xl">
            {/* Scroll-Illuminated Large Typography */}
            <blockquote className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-5xl lg:text-[3.25rem] font-semibold leading-[1.2] tracking-tight">
              {QUOTE_WORDS.map((token, i) => (
                <ScrollIlluminatedWord
                  key={i}
                  token={token}
                  index={i}
                  total={QUOTE_WORDS.length}
                  scrollYProgress={quoteScrollProgress}
                />
              ))}
            </blockquote>

            {/* Original Supporting Paragraph */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-base sm:text-xl text-sky-100/70 leading-relaxed font-light max-w-2xl">
                Only after achieving absolute comprehension do we engineer a bespoke technological backbone tailored exclusively to execute your vision.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ==================================================================== */}
      {/* 4. METHODOLOGY                                                       */}
      {/* 2-Column desktop layout with sticky tracker & 3 distinct diagrams    */}
      {/* ==================================================================== */}
      <div id="methodology" className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-32 relative z-10 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Sticky Left Column: Progress line + Phase links + Large active number */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-sky-300 uppercase font-semibold mb-3">
                METHODOLOGY
              </p>
              <h2 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-bold text-[#F0F6FF] leading-tight mb-8">
                Understand. Uncover. Engineer.
              </h2>

              {/* Large Active Phase Number with Electric Glow */}
              <div className="my-6">
                <span className="font-['Space_Grotesk',sans-serif] text-7xl sm:text-8xl font-black text-[#38BDF8] tracking-tighter drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
                  0{activePhase}
                </span>
                <span className="block text-xs font-mono text-sky-200/50 tracking-[0.3em] uppercase mt-1">
                  CURRENT OPERATIONAL PHASE
                </span>
              </div>

              {/* Phase Quick Links & Vertical Progress Line */}
              <div className="relative pl-6 mt-8 space-y-6">
                {/* Vertical Background Line */}
                <div className="absolute left-1 top-2 bottom-2 w-0.5 bg-white/10 rounded-full" />
                {/* Active Dynamic Progress Track */}
                <motion.div
                  className="absolute left-1 top-2 w-0.5 bg-[#38BDF8] rounded-full shadow-[0_0_8px_#38BDF8]"
                  animate={{
                    height: activePhase === 1 ? "24%" : activePhase === 2 ? "62%" : "96%",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {[
                  { num: 1, id: "phase-01", title: "Surgical Decomposition" },
                  { num: 2, id: "phase-02", title: "Pathology of Friction" },
                  { num: 3, id: "phase-03", title: "Bespoke Synthesis" },
                ].map((phase) => {
                  const isActive = activePhase === phase.num;
                  return (
                    <button
                      key={phase.id}
                      onClick={() => scrollToPhase(phase.id)}
                      className="group flex items-center gap-3 text-left w-full transition-colors"
                    >
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-[#38BDF8] ring-4 ring-[#38BDF8]/25"
                            : "bg-white/20 group-hover:bg-white/50"
                        }`}
                      />
                      <div className="flex flex-col">
                        <span
                          className={`font-mono text-[11px] tracking-widest uppercase transition-colors ${
                            isActive ? "text-[#38BDF8]" : "text-sky-200/40 group-hover:text-sky-200/70"
                          }`}
                        >
                          PHASE 0{phase.num}
                        </span>
                        <span
                          className={`font-['Space_Grotesk',sans-serif] text-sm sm:text-base font-medium transition-colors ${
                            isActive ? "text-white" : "text-sky-100/60 group-hover:text-white"
                          }`}
                        >
                          {phase.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:block mt-12 pt-6 border-t border-white/10 text-xs font-mono text-sky-200/40">
              OPERATIONAL EXCELLENCE GUARANTEED
            </div>
          </div>

          {/* Right Column: 3 Vertically Stacked Phases with Distinct Animated Diagrams */}
          <div className="lg:col-span-8 space-y-16 lg:space-y-24">

            {/* PHASE 01: Surgical Decomposition */}
            <div
              id="phase-01"
              ref={phase1Ref}
              className="p-6 sm:p-10 rounded-2xl border border-white/10 bg-[#061A45]/40 hover:bg-[#061A45]/60 backdrop-blur-md transition-all duration-300 hover:border-sky-400/40 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-sky-400 tracking-[0.2em] font-semibold uppercase">
                  PHASE 01
                </span>
                <span className="text-xs font-mono text-sky-200/40 uppercase tracking-wider">
                  FOUNDATION MAPPING
                </span>
              </div>

              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-bold text-white mb-2">
                Surgical Decomposition
              </h3>

              <p className="font-[family-name:var(--font-serif-classic)] italic text-sm sm:text-base text-sky-300 mb-4">
                Dissecting flows into foundational atomic elements.
              </p>

              <p className="text-sm sm:text-base text-sky-100/70 font-light leading-relaxed mb-6">
                Before a line of code is written, our architects map the living nervous system of your business — isolating every node, touchpoint, and transaction synapse.
              </p>

              <BranchingNodesDiagram />
            </div>

            {/* PHASE 02: Pathology of Friction */}
            <div
              id="phase-02"
              ref={phase2Ref}
              className="p-6 sm:p-10 rounded-2xl border border-white/10 bg-[#061A45]/40 hover:bg-[#061A45]/60 backdrop-blur-md transition-all duration-300 hover:border-amber-500/40 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-amber-400 tracking-[0.2em] font-semibold uppercase">
                  PHASE 02
                </span>
                <span className="text-xs font-mono text-amber-200/40 uppercase tracking-wider">
                  BOTTLENECK ISOLATION
                </span>
              </div>

              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-bold text-white mb-2">
                Pathology of Friction
              </h3>

              <p className="font-[family-name:var(--font-serif-classic)] italic text-sm sm:text-base text-amber-300/90 mb-4">
                Identifying bottlenecks and procedural drag.
              </p>

              <p className="text-sm sm:text-base text-sky-100/70 font-light leading-relaxed mb-6">
                Generic software forces unnatural compromises. We locate points of friction: latency traps, data hemorrhaging, and manual duct-taping.
              </p>

              <BottleneckConvergenceDiagram />
            </div>

            {/* PHASE 03: Bespoke Synthesis */}
            <div
              id="phase-03"
              ref={phase3Ref}
              className="p-6 sm:p-10 rounded-2xl border border-white/10 bg-[#061A45]/40 hover:bg-[#061A45]/60 backdrop-blur-md transition-all duration-300 hover:border-sky-400/40 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-sky-400 tracking-[0.2em] font-semibold uppercase">
                  PHASE 03
                </span>
                <span className="text-xs font-mono text-sky-200/40 uppercase tracking-wider">
                  ENTERPRISE DEPLOYMENT
                </span>
              </div>

              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-bold text-white mb-2">
                Bespoke Synthesis
              </h3>

              <p className="font-[family-name:var(--font-serif-classic)] italic text-sm sm:text-base text-sky-300 mb-4">
                Engineering tailor-made solutions for scale.
              </p>

              <p className="text-sm sm:text-base text-sky-100/70 font-light leading-relaxed mb-6">
                Only upon achieving absolute operational clarity do we engineer the code: a custom, unbreakable technological backbone built to dominate.
              </p>

              <AlignedArchitectureDiagram />
            </div>

          </div>

        </div>
      </div>

      {/* ==================================================================== */}
      {/* 5. SYSTEM ANATOMY AND STATISTICS                                     */}
      {/* ==================================================================== */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-32 relative z-10 border-t border-white/10">
        
        {/* Header Block with Segmented Sky-Blue Bar Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-sky-400 uppercase tracking-[0.25em] font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              SYSTEM ANATOMY — PHASE ACTIVE
            </div>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-5xl font-bold text-[#F0F6FF] tracking-tight max-w-2xl leading-[1.1]">
              Built on experience. <br />
              <span className="text-sky-200/60">Engineered for what’s next.</span>
            </h2>
          </div>

          {/* Segmented Integrity Bar Indicator */}
          <div className="p-4 rounded-xl border border-sky-400/20 bg-[#061A45]/60 backdrop-blur-md shrink-0 shadow-[0_4px_20px_rgba(6,26,69,0.3)]">
            <div className="flex items-center justify-between gap-6 mb-2">
              <span className="font-mono text-[10px] tracking-widest text-[#F0F6FF] font-semibold uppercase">
                ANATOMICAL INTEGRITY: 100%
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                VERIFIED
              </span>
            </div>
            {/* 12 Sky-Blue Segmented Bars */}
            <div className="flex items-center gap-1.5">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-3.5 sm:w-4 h-2 rounded-[2px] bg-[#38BDF8] shadow-[0_0_8px_rgba(56,189,248,0.7)]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* 4 Animated Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              valueNum: 11,
              suffix: "+",
              decimals: 0,
              label: "Years of Evolution",
              sub: "Est. 2016",
            },
            {
              valueNum: 50,
              suffix: "+",
              decimals: 0,
              label: "Elite Architects",
              sub: "Senior Tier",
            },
            {
              valueNum: 200,
              suffix: "+",
              decimals: 0,
              label: "Global Deployments",
              sub: "Enterprise Grade",
            },
            {
              valueNum: 99.98,
              suffix: "%",
              decimals: 2,
              label: "Precision Index",
              sub: "Verified Uptime",
            },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#061A45]/30 hover:bg-[#061A45]/60 hover:border-sky-400/40 transition-all duration-300 backdrop-blur-sm group"
            >
              <div className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl font-bold text-white group-hover:text-sky-300 transition-colors tracking-tight">
                <AnimatedStatCounter
                  target={stat.valueNum}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>

              <div className="font-['Space_Grotesk',sans-serif] text-sm font-semibold text-sky-100/90 mt-3">
                {stat.label}
              </div>

              <div className="font-mono text-[10px] text-sky-200/50 uppercase tracking-widest mt-1">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Heritage & FLML Core Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-sky-200/60">
          <p className="font-[family-name:var(--font-serif-classic)] italic text-sm sm:text-base text-sky-100/70 text-center md:text-left max-w-2xl">
            Established 2016. Evolved into First Logic Meta Lab in 2018. Operating globally with a relentless pursuit of architectural perfection.
          </p>

          <div className="flex items-center gap-3 shrink-0 px-4 py-2 rounded-full border border-sky-400/20 bg-[#061A45]/60 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-white font-semibold tracking-wider">FLML CORE</span>
            <span className="text-white/20">/</span>
            <span className="text-sky-300 tracking-wider font-semibold">
              HIGH-SCALE PROTOCOL
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}

