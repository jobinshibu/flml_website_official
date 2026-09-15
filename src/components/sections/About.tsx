"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ArrowDown, CheckCircle2, ChevronRight, Activity, Cpu, Layers, Zap } from "lucide-react";
import ParticleMorphCanvas from "./doctrine/ParticleMorphCanvas";
import {
  BranchingNodesDiagram,
  BottleneckConvergenceDiagram,
  AlignedArchitectureDiagram,
} from "./doctrine/PhaseDiagrams";

// ============================================================================
// THE DOCTRINE SECTION — OBSIDIAN COMMAND CONSOLE
// ============================================================================

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
  const opacity = useTransform(scrollYProgress, [start, end], [0.28, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.24em] transition-colors duration-200 ${
        token.isHighlight
          ? "text-[#3B82F6] font-medium"
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
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const duration = 1600;

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
// MAIN ABOUT / OPERATIONAL ANATOMY COMPONENT
// ----------------------------------------------------------------------------
export default function About() {
  const [activePhase, setActivePhase] = useState<number>(1);
  const quoteContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: quoteScrollProgress } = useScroll({
    target: quoteContainerRef,
    offset: ["start 85%", "end 45%"],
  });

  const phases = [
    {
      num: 1,
      id: "phase-01",
      code: "PHASE 01",
      tag: "FOUNDATION MAPPING",
      title: "Surgical Decomposition",
      subtitle: "Dissecting flows into foundational atomic elements.",
      description:
        "Before a line of code is written, our architects map the living nervous system of your business — isolating every node, touchpoint, and transaction synapse.",
      badgeColor: "text-blue-400 border-blue-400/30 bg-blue-400/10",
      accent: "#2563EB",
    },
    {
      num: 2,
      id: "phase-02",
      code: "PHASE 02",
      tag: "BOTTLENECK ISOLATION",
      title: "Pathology of Friction",
      subtitle: "Identifying bottlenecks and procedural drag.",
      description:
        "Generic software forces unnatural compromises. We locate points of friction: latency traps, data hemorrhaging, and manual duct-taping.",
      badgeColor: "text-amber-400 border-amber-400/30 bg-amber-400/10",
      accent: "#f59e0b",
    },
    {
      num: 3,
      id: "phase-03",
      code: "PHASE 03",
      tag: "ENTERPRISE DEPLOYMENT",
      title: "Bespoke Synthesis",
      subtitle: "Engineering tailor-made solutions for scale.",
      description:
        "Only upon achieving absolute operational clarity do we engineer the code: a custom, unbreakable technological backbone built to dominate.",
      badgeColor: "text-blue-400 border-blue-400/30 bg-blue-400/10",
      accent: "#2563EB",
    },
  ];

  const scrollToStudio = () => {
    const el = document.getElementById("operational-studio");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="relative w-full bg-gradient-to-b from-[#050608] via-[#080B12] to-[#040406] text-white selection:bg-[#0A369D] selection:text-white font-['DM_Sans',sans-serif] overflow-hidden"
    >
      {/* Precision Obsidian Architectural Blueprint Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="doctrine-obsidian-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#FFFFFF" strokeWidth="0.75" />
              <circle cx="24" cy="24" r="0.75" fill="#2563EB" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doctrine-obsidian-grid)" />
        </svg>
      </div>

      {/* Subtle Atmospheric Precision Lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0A369D]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#2563EB]/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-[#0A369D]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* ==================================================================== */}
      {/* 1. COMPACT EXECUTIVE HERO BLOCK                                      */}
      {/* ==================================================================== */}
      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-10 flex flex-col justify-between z-10">
        
        {/* Top Header Pill */}
        <div className="flex items-center gap-3.5 mb-6 z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-400/20 bg-[#0B101C]/80 text-blue-300 text-[10.5px] font-mono tracking-[0.2em] uppercase backdrop-blur-md shadow-sm">
            OUR PHILOSOPHY
          </div>
        </div>

        {/* Main Hero Body */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-20 my-auto">
          
          {/* Left Column: Signature Typography */}
          <div className="lg:col-span-7 z-20">
            <h1 className="font-['Space_Grotesk',sans-serif] font-bold text-4xl sm:text-6xl lg:text-[4.5rem] tracking-tight leading-[0.98] text-[#F0F6FF]">
              <span className="block">OPERATIONAL</span>
              <span className="block mt-1">ANATOMY</span>
              <span className="block mt-1 sm:mt-2">
                <span className="text-[#3B82F6]">
                  FIRST.
                </span>{" "}
                <span className="text-2xl sm:text-4xl lg:text-5xl font-normal text-white/90">
                  Code{" "}
                  <span className="font-[family-name:var(--font-serif-classic)] italic text-blue-200">
                    Second.
                  </span>
                </span>
              </span>
            </h1>

            {/* Concise Supporting Thesis */}
            <p className="mt-6 max-w-xl text-sm sm:text-base text-slate-300/80 leading-relaxed font-light">
              We do not sell off-the-shelf software. Generic technology forces a business to compromise its unique workflows to fit rigid limitations. We reverse that equation.
            </p>

            {/* Quick Action Navigation */}
            <div className="mt-8 flex items-center gap-5">
              <button
                suppressHydrationWarning
                onClick={scrollToStudio}
                className="group relative px-5 py-2.5 rounded-full border border-blue-400/30 hover:border-blue-300 bg-[#0C1220]/80 hover:bg-[#0A369D]/40 flex items-center gap-3 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md active:scale-95 text-xs font-mono tracking-widest text-blue-200 uppercase"
              >
                <span>EXPLORE OPERATIONAL PHASES</span>
                <ArrowDown className="w-4 h-4 text-blue-300 group-hover:translate-y-0.5 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Area: Morphic Topology Engine Visualizer */}
          <div className="lg:col-span-5 relative h-[320px] sm:h-[380px] lg:h-[420px] flex items-center justify-center pointer-events-auto">
            {/* Ambient halo behind particles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-[#0A369D]/20 blur-[90px]" />
            </div>

            {/* 3D Hardware Accelerated Canvas */}
            <ParticleMorphCanvas className="z-10" />
          </div>

        </div>

      </div>

      {/* ==================================================================== */}
      {/* 2. STREAMLINED TICKER RIBBON                                         */}
      {/* ==================================================================== */}
      <div className="relative w-full py-2.5 my-4 overflow-hidden bg-[#0A0E18] border-y border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.4)] z-20">
        <div className="flex w-max select-none animate-[marqueeLoop_28s_linear_infinite]">
          {[0, 1, 2, 3].map((rep) => (
            <div key={rep} className="flex items-center text-white font-['Space_Grotesk',sans-serif] font-bold text-xs tracking-[0.24em] uppercase shrink-0">
              <span className="mx-6 text-white">
                ENTERPRISE ARCHITECTURE
              </span>
              <span className="text-blue-400">✳</span>
              <span className="mx-6 text-blue-200">BESPOKE ENGINEERING</span>
              <span className="text-blue-400">✳</span>
              <span className="mx-6 text-white">OPERATIONAL EXCELLENCE</span>
              <span className="text-blue-400">✳</span>
            </div>
          ))}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. INTEGRATED FIRST PRINCIPLE EPIGRAPH                               */}
      {/* ==================================================================== */}
      <div
        id="first-principle"
        ref={quoteContainerRef}
        className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-16 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left: Small Section Label */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="font-mono text-xs tracking-[0.25em] text-blue-300 uppercase font-semibold">
                01 / FIRST PRINCIPLE
              </span>
            </div>
          </div>

          {/* Right: The Quotation with Scroll Illumination */}
          <div className="lg:col-span-9">
            <blockquote className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.25] tracking-tight">
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

            <p className="mt-4 text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-2xl">
              Only after achieving absolute comprehension do we engineer a bespoke technological backbone tailored exclusively to execute your vision.
            </p>
          </div>

        </div>
      </div>

      {/* ==================================================================== */}
      {/* 4. INTERACTIVE OPERATIONAL STUDIO                                    */}
      {/* ==================================================================== */}
      <div
        id="operational-studio"
        className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-16 relative z-10 border-t border-white/[0.08]"
      >
        {/* Studio Top Control Strip */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-blue-400 uppercase tracking-[0.25em] font-semibold mb-2">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              OUR METHODOLOGY
            </div>
            <h2 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Understand. Uncover. Engineer.
            </h2>
          </div>

          {/* Quick Phase Selector Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-white/[0.08] bg-[#07090F]/80 backdrop-blur-md">
            {phases.map((p) => (
              <button
                key={p.id}
                suppressHydrationWarning
                onClick={() => setActivePhase(p.num)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                  activePhase === p.num
                    ? "bg-[#2563EB] text-white font-bold"
                    : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                0{p.num}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Command Studio Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Interactive Phase Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {phases.map((p) => {
              const isActive = activePhase === p.num;
              return (
                <button
                  key={p.id}
                  suppressHydrationWarning
                  onClick={() => setActivePhase(p.num)}
                  className={`text-left p-5 rounded-xl border transition-all duration-300 relative group overflow-hidden cursor-pointer ${
                    isActive
                      ? "border-[#2563EB]/50 bg-[#0C101A]/90 shadow-md"
                      : "border-white/[0.06] bg-[#07090E]/60 hover:bg-[#0A0D16]/80 hover:border-white/[0.12]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePhaseIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#2563EB]"
                      transition={{ duration: 0.25 }}
                    />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                          isActive
                            ? "bg-[#2563EB]/20 text-[#3B82F6]"
                            : "bg-white/[0.05] text-white/40 group-hover:text-white/70"
                        }`}
                      >
                        {p.code}
                      </span>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                        {p.tag}
                      </span>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isActive ? "text-[#3B82F6] translate-x-0.5" : "text-white/20 group-hover:text-white/50"
                      }`}
                    />
                  </div>

                  <h3
                    className={`font-['Space_Grotesk',sans-serif] text-lg sm:text-xl font-bold transition-colors ${
                      isActive ? "text-white" : "text-white/70 group-hover:text-white"
                    }`}
                  >
                    {p.title}
                  </h3>

                  <p className="font-[family-name:var(--font-serif-classic)] italic text-xs sm:text-sm text-blue-200/80 mt-1">
                    {p.subtitle}
                  </p>

                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-xs sm:text-sm text-slate-300/80 font-light leading-relaxed mt-3 pt-3 border-t border-white/[0.08]"
                      >
                        {p.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Schematic Viewport */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#07090F]/90 backdrop-blur-md p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            
            {/* Viewport Clean Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-white font-semibold">Architectural Overview</span>
              </div>
              <span className="text-blue-400 font-mono text-[11px] tracking-wider">
                Phase 0{activePhase}
              </span>
            </div>

            {/* Schematic Display Screen with Cross-Fade */}
            <div className="relative min-h-[260px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full"
                >
                  {activePhase === 1 && <BranchingNodesDiagram />}
                  {activePhase === 2 && <BottleneckConvergenceDiagram />}
                  {activePhase === 3 && <AlignedArchitectureDiagram />}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>

      {/* ==================================================================== */}
      {/* 5. SYSTEM ANATOMY AND STATISTICS                                     */}
      {/* ==================================================================== */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-16 relative z-10 border-t border-white/[0.08]">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-blue-400 uppercase tracking-[0.25em] font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              PROVEN SCALE &amp; EXPERTISE
            </div>
            <h2 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-4xl font-bold text-[#F0F6FF] tracking-tight max-w-xl leading-[1.15]">
              Built on experience. <br />
              <span className="text-blue-200/60">Engineered for what’s next.</span>
            </h2>
          </div>
        </div>

        {/* 4 Animated Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-5 sm:p-6 rounded-xl border border-white/[0.08] bg-[#07090F]/70 hover:bg-[#0C101A]/90 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-sm group"
            >
              <div className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-white group-hover:text-[#3B82F6] transition-colors tracking-tight">
                <AnimatedStatCounter
                  target={stat.valueNum}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>

              <div className="font-['Space_Grotesk',sans-serif] text-sm font-semibold text-slate-200 mt-2">
                {stat.label}
              </div>

              <div className="font-mono text-[9.5px] text-white/40 uppercase tracking-widest mt-1">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Heritage & Foundation */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p className="font-[family-name:var(--font-serif-classic)] italic text-xs sm:text-sm text-slate-400 text-center md:text-left max-w-2xl">
            Established 2016. Evolved into First Logic Meta Lab in 2018. Operating globally with a relentless pursuit of architectural perfection.
          </p>
        </div>

      </div>

    </section>
  );
}
