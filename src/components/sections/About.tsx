"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Activity,
  Layers,
  Search,
  ShieldCheck,
  Zap,
  CheckCircle2,
  XCircle,
  Sparkles,
  GitBranch,
  Workflow,
  Cpu,
  TrendingUp,
} from "lucide-react";

// ============================================================================
// ANIMATED STAT COUNTER
// ============================================================================
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

// ============================================================================
// MAIN OPERATIONAL ANATOMY (ABOUT) COMPONENT
// ============================================================================
export default function About() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const phases = [
    {
      num: "01",
      title: "Anatomical Mapping",
      tagline: "Dissecting Operational Workflows",
      desc: "Before writing any code, we map your business's entire nervous system — analyzing data pipelines, user touchpoints, and transaction synapses to identify exact needs.",
      icon: Search,
      badge: "Discovery & Audit",
      points: [
        "End-to-end process & data flow mapping",
        "Stakeholder & operational telemetry review",
        "Zero assumptions architectural blueprint",
      ],
      metric: "100% Workflow Clarity",
    },
    {
      num: "02",
      title: "Friction Pathology",
      tagline: "Isolating Bottlenecks & Drag",
      desc: "Generic off-the-shelf software forces businesses into unnatural compromises. We pinpoint structural latency, data leakage, and manual redundancies before engineering begins.",
      icon: Activity,
      badge: "Diagnosis & Isolation",
      points: [
        "Systemic bottleneck & latency identification",
        "Manual overhead & data leakage prevention",
        "Optimization roadmap for high throughput",
      ],
      metric: "90%+ Friction Reduction",
    },
    {
      num: "03",
      title: "Bespoke Synthesis",
      tagline: "Engineering Custom Technology",
      desc: "With absolute operational clarity, we engineer high-performance, tailor-made software architectures built to dominate your market and scale effortlessly.",
      icon: Cpu,
      badge: "Custom Architecture",
      points: [
        "Deterministic, enterprise microservice stack",
        "Zero-trust security & hyperscale cloud fabric",
        "Long-term multi-generational scalability",
      ],
      metric: "10x Long-Term Scale",
    },
  ];

  const comparisonPoints = [
    {
      label: "Initial Approach",
      traditional: "Starts immediately with coding templates & generic frameworks",
      flml: "Deep operational dissection & custom workflow mapping first",
    },
    {
      label: "System Fit",
      traditional: "Forces your business logic into rigid third-party software limits",
      flml: "Tailor-engineered software built exactly around your unique edge",
    },
    {
      label: "Friction & Waste",
      traditional: "Hidden bottlenecks discovered late in production, causing high rework",
      flml: "Eliminates systemic drag and latency before writing the first line of code",
    },
    {
      label: "Long-Term Scalability",
      traditional: "Fragile dependencies, high technical debt, expensive maintenance",
      flml: "Modular, high-concurrency architecture built for decades of growth",
    },
  ];

  const stats = [
    {
      valueNum: 11,
      suffix: "+",
      decimals: 0,
      label: "Years of Evolution",
      sub: "Founded 2016",
    },
    {
      valueNum: 50,
      suffix: "+",
      decimals: 0,
      label: "Senior Architects",
      sub: "Top 1% Engineering Tier",
    },
    {
      valueNum: 200,
      suffix: "+",
      decimals: 0,
      label: "Global Deployments",
      sub: "Enterprise & High-Growth",
    },
    {
      valueNum: 99.98,
      suffix: "%",
      decimals: 2,
      label: "Precision & Uptime",
      sub: "Mission-Critical Systems",
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="relative w-full bg-[#050811] text-white selection:bg-[#0A369D] selection:text-white font-['DM_Sans',sans-serif] overflow-hidden py-20 sm:py-28"
    >
      {/* Precision Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="modern-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#modern-grid)" />
        </svg>
      </div>

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#0A369D]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#2563EB]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 z-10">
        
        {/* ==================================================================== */}
        {/* 1. HEADER SECTION                                                    */}
        {/* ==================================================================== */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-400/25 bg-blue-950/40 text-blue-300 text-xs font-mono tracking-[0.2em] uppercase backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(37,99,235,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>OUR CORE PHILOSOPHY</span>
          </div>

          {/* Headline */}
          <h2 className="font-['Space_Grotesk',sans-serif] font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1] mb-6">
            Operational Anatomy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-300">
              First.
            </span>
            <br />
            <span className="text-slate-300 font-medium">Code Second.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-slate-300/90 text-base sm:text-lg leading-relaxed font-light">
            We don’t just write code — we dissect how your enterprise actually operates. 
            By mapping workflows, removing bottlenecks, and diagnosing friction first, we engineer tailored 
            digital systems that scale without compromise.
          </p>

        </div>

        {/* ==================================================================== */}
        {/* 2. THE 3-PHASE METHODOLOGY (MODERN 3-COLUMN CARDS)                  */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {phases.map((phase, idx) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={phase.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0A0E1A]/80 hover:bg-[#0E1528]/90 hover:border-blue-500/40 p-6 sm:p-8 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(10,54,157,0.25)] hover:-translate-y-1.5 backdrop-blur-sm"
              >
                {/* Top Subtle Gradient Accent */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-blue-500/0 group-hover:via-blue-500/60 to-transparent transition-all duration-500" />

                <div>
                  {/* Top Bar: Number & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 group-hover:border-blue-500/50 group-hover:bg-blue-600/20 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-blue-300 tracking-wider">
                      PHASE {phase.num}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-['Space_Grotesk',sans-serif] text-xl sm:text-2xl font-bold text-white group-hover:text-blue-100 transition-colors mb-1">
                    {phase.title}
                  </h3>
                  <p className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-4">
                    {phase.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    {phase.desc}
                  </p>

                  {/* Key Highlights */}
                  <ul className="space-y-2.5 mb-6 pt-4 border-t border-white/[0.06]">
                    {phase.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-300/90">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Metric Pill */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">Outcome</span>
                  <span className="font-mono font-medium text-blue-300 bg-blue-950/60 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
                    {phase.metric}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ==================================================================== */}
        {/* 3. MODERN APPROACH COMPARISON MATRIX                                 */}
        {/* ==================================================================== */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#080C17]/90 p-6 sm:p-10 mb-20 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-blue-400 uppercase tracking-[0.2em] font-semibold mb-2">
                <Workflow className="w-3.5 h-3.5" />
                THE ARCHITECTURAL DIFFERENCE
              </div>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Why Anatomy-First Changes Everything
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md font-light">
              See how our diagnostic engineering process solves core inefficiencies that traditional development models overlook.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Box: Traditional Software Agencies */}
            <div className="rounded-xl border border-rose-500/20 bg-rose-950/[0.12] p-5 sm:p-6">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-rose-500/20">
                <XCircle className="w-5 h-5 text-rose-400" />
                <h4 className="font-['Space_Grotesk',sans-serif] text-base font-bold text-rose-200">
                  Standard Generic Development
                </h4>
              </div>
              <div className="space-y-4">
                {comparisonPoints.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose-300/70">
                      {item.label}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                      {item.traditional}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Box: FLML Operational Anatomy */}
            <div className="rounded-xl border border-blue-500/30 bg-blue-950/[0.2] p-5 sm:p-6 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-blue-500/20">
                <CheckCircle2 className="w-5 h-5 text-blue-400" />
                <h4 className="font-['Space_Grotesk',sans-serif] text-base font-bold text-blue-200">
                  First Logic Anatomy-First Engineering
                </h4>
              </div>
              <div className="space-y-4">
                {comparisonPoints.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-blue-300">
                      {item.label}
                    </span>
                    <p className="text-xs sm:text-sm text-white font-normal leading-relaxed">
                      {item.flml}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ==================================================================== */}
        {/* 4. KEY STATS & PROVEN SCALE                                          */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0E1A]/60 hover:bg-[#0E1528]/80 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-sm group"
            >
              <div className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                <AnimatedStatCounter
                  target={stat.valueNum}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>
              <div className="font-['Space_Grotesk',sans-serif] text-sm sm:text-base font-semibold text-slate-200 mt-2">
                {stat.label}
              </div>
              <div className="font-mono text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider mt-1">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ==================================================================== */}
        {/* 5. PHILOSOPHY QUOTE CALLOUT                                          */}
        {/* ==================================================================== */}
        <div className="relative rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/30 via-[#0C1222]/80 to-blue-950/30 p-8 sm:p-10 text-center overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <blockquote className="font-['Space_Grotesk',sans-serif] text-lg sm:text-2xl lg:text-2xl font-medium text-slate-100 leading-relaxed mb-4">
              “Before a single line of code is written, our architects surgically dissect the anatomy of your operations to eliminate friction, prevent technical debt, and ensure lasting impact.”
            </blockquote>
            <div className="flex items-center justify-center gap-3 text-xs font-mono text-blue-300">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>FIRST LOGIC META LAB · ENGINEERING DOCTRINE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
