"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Cpu,
  Network,
  Database,
  Cable,
  ShieldCheck,
  Zap,
  Activity,
  ArrowRight,
  Layers,
  Sparkles,
  Server,
  CheckCircle2,
  Terminal,
  Share2,
} from "lucide-react";

interface LayerData {
  number: string;
  tier: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  telemetry: {
    metric: string;
    value: string;
    status: string;
  };
  tech: string[];
  highlights: string[];
  schematic: string;
}

const layers: LayerData[] = [
  {
    number: "01",
    tier: "RUNTIME TIER",
    title: "EXPERIENCE",
    subtitle: "Web / Mobile / Spatial Interfaces",
    description:
      "Ultra-responsive frontends engineered for instant paint, fluid 120 FPS interactions, and native hardware optimization across web and mobile ecosystems.",
    icon: Globe,
    telemetry: {
      metric: "Frame Target",
      value: "120 FPS / <10ms FCP",
      status: "NOMINAL",
    },
    tech: ["Micro-Frontends", "Omnichannel Sync", "Native iOS & Android", "Web3 Wallets", "WASM Runtime"],
    highlights: [
      "Sub-second First Contentful Paint with zero layout shift",
      "Native device telemetry and biometric auth integration",
      "Optimistic UI updates with offline synchronization",
    ],
    schematic: "DOM · Virtual Tree · Hardware Canvas · Native Bridges",
  },
  {
    number: "02",
    tier: "COMPUTE MESH",
    title: "APPLICATION",
    subtitle: "Services / Workflows / Logic",
    description:
      "High-concurrency microservice meshes and deterministic smart contract engines operating with zero single point of failure and idempotent execution.",
    icon: Cpu,
    telemetry: {
      metric: "Concurrency",
      value: "100K+ TPS Capacity",
      status: "OPTIMIZED",
    },
    tech: ["Microservices", "Event-Driven Fabric", "Serverless Compute", "Smart Contracts", "Actor Model"],
    highlights: [
      "Deterministic state transitions with ACID & base consistency",
      "Event-driven CQRS architectures for high write throughput",
      "Stateless auto-scaling worker nodes with self-healing restarts",
    ],
    schematic: "Event Bus · Actor Runtime · Workflow Engine · State Machines",
  },
  {
    number: "03",
    tier: "PROTOCOL SYNAPSE",
    title: "API & MESH",
    subtitle: "Routing / Gateways / Protocols",
    description:
      "Universal communication fabric with strict schema enforcement, automated rate-limiting shields, and binary streaming over distributed edge gateways.",
    icon: Network,
    telemetry: {
      metric: "Mesh Latency",
      value: "< 4.2ms P99 Routing",
      status: "ACTIVE",
    },
    tech: ["GraphQL Subgraphs", "gRPC Streaming", "WebSockets / SSE", "Type-Safe tRPC", "Envoy Proxy"],
    highlights: [
      "Strict end-to-end type safety and schema governance",
      "Bi-directional binary streaming for real-time telemetry",
      "Intelligent edge routing with global caching policies",
    ],
    schematic: "Edge Gateway · Envoy Mesh · Schema Registry · Binary Pipes",
  },
  {
    number: "04",
    tier: "PERSISTENCE & VECTOR",
    title: "DATA & AI",
    subtitle: "Databases / Analytics / Vectors",
    description:
      "Polyglot storage architecture combining transactional guarantees with high-dimensional vector similarity indexing for real-time AI context.",
    icon: Database,
    telemetry: {
      metric: "Query Throughput",
      value: "99.999% ACID / Vector Sync",
      status: "SYNCHRONIZED",
    },
    tech: ["PostgreSQL / SQL", "Redis In-Memory", "Vector Embeddings", "Immutable Ledgers", "ClickHouse OLAP"],
    highlights: [
      "Hybrid transactional & analytical processing (HTAP)",
      "Millisecond vector similarity search for semantic reasoning",
      "Automated partition sharding and multi-region replication",
    ],
    schematic: "ACID Primary · Vector Embeddings · Cache Clusters · Columnar Lake",
  },
  {
    number: "05",
    tier: "INTEROP GATEWAY",
    title: "INTEGRATION",
    subtitle: "Middleware / Oracles / Payments",
    description:
      "Resilient interoperability layer connecting legacy enterprise cores, real-world IoT telemetry, and global financial rails with zero data loss.",
    icon: Cable,
    telemetry: {
      metric: "Bridge SLA",
      value: "ISO 20022 / 100% Delivery",
      status: "CERTIFIED",
    },
    tech: ["Enterprise Service Bus", "IoT Gateways", "Decentralized Oracles", "Banking & ISO 20022", "Kafka Queues"],
    highlights: [
      "Guaranteed exactly-once delivery guarantees across legacy silos",
      "Institutional payment rail and banking protocol compatibility",
      "Real-time sensor and IoT hardware telemetry ingestion",
    ],
    schematic: "ESB Fabric · Protocol Adapter · Oracle Feeds · Payment Rails",
  },
  {
    number: "06",
    tier: "HYPERSCALE FABRIC",
    title: "INFRASTRUCTURE",
    subtitle: "Cloud / Kubernetes / Zero-Trust",
    description:
      "Hyperscale multi-cloud foundation managed completely as code with automated zero-downtime canary rollouts and zero-trust perimeter security.",
    icon: ShieldCheck,
    telemetry: {
      metric: "System Uptime",
      value: "99.98% Multi-Region",
      status: "SHIELDED",
    },
    tech: ["Multi-Cloud (AWS/GCP)", "Kubernetes (K8s)", "Zero-Trust Perimeter", "GitOps & CI/CD", "Terraform / IaC"],
    highlights: [
      "Declarative GitOps deployments with instant automated rollback",
      "Zero-trust mTLS encryption across all internal microservices",
      "Automated cross-cloud failover with sub-minute disaster recovery",
    ],
    schematic: "K8s Clusters · mTLS Perimeter · Multi-Cloud Nodes · IaC Pipeline",
  },
];

export default function Engineering() {
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);
  const activeLayer = layers[activeLayerIndex];
  const ActiveIcon = activeLayer.icon;

  return (
    <section
      id="technology"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#F1F6FE] text-[#061A45] relative overflow-hidden border-t border-slate-200/90 font-sans"
    >
      {/* Precision Blueprint Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="engineering-light-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#061A45" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#engineering-light-grid)" />
        </svg>
      </div>

      {/* Subtle Soft Sapphire Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-[#0A369D]/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#2563EB]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ==================================================================== */}
        {/* 1. SECTION HEADER WITH SYSTEM HUD TELEMETRY                          */}
        {/* ==================================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 sm:mb-16 pb-10 border-b border-slate-200">
          <div className="max-w-3xl">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0A369D] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A369D]">
                # BUILT FROM THE INSIDE OUT &bull; 6-TIER ARCHITECTURE
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#061A45] tracking-tight uppercase leading-[1.08] mb-4">
              True Engineering{" "}
              <span className="text-[#0A369D]">
                Depth.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
              We engineer scalable systems layer by layer, ensuring unbreakable security, sub-millisecond routing, and multi-generational resilience. 
              Select any tier below to inspect technical capabilities and live benchmarks.
            </p>
          </div>

          {/* Telemetry Status Console HUD */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(10,54,157,0.06)]">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-blue-50/80 border border-blue-100">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-slate-500 uppercase">Stack Status</span>
                <span className="font-mono text-xs font-bold text-emerald-700">6/6 TIERS ONLINE</span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100">
              <Activity className="w-4 h-4 text-[#0A369D]" />
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-slate-500 uppercase">Throughput</span>
                <span className="font-mono text-xs font-bold text-[#061A45]">100K+ TPS</span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-[#0A369D]" />
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-slate-500 uppercase">Security</span>
                <span className="font-mono text-xs font-bold text-[#0A369D]">ZERO-TRUST</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. INTERACTIVE ARCHITECTURAL STACK CONSOLE                           */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-14 items-stretch">
          
          {/* LEFT: INTERACTIVE 6-LAYER STACK CONDUIT (NAVIGATOR) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2.5">
            <div className="flex items-center justify-between px-2 mb-2 font-mono text-xs text-slate-500 uppercase tracking-wider font-semibold">
              <span>Architectural Stack</span>
              <span>Click to Inspect</span>
            </div>

            {layers.map((layer, idx) => {
              const isSelected = activeLayerIndex === idx;
              const Icon = layer.icon;

              return (
                <button
                  key={layer.number}
                  onClick={() => setActiveLayerIndex(idx)}
                  className={`group relative w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-white border-[#0A369D] shadow-[0_8px_30px_rgba(10,54,157,0.12)] -translate-y-0.5 ring-1 ring-[#0A369D]/20"
                      : "bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  {/* Left Active Indicator */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeLayerIndicatorLight"
                      className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full bg-[#0A369D]"
                    />
                  )}

                  <div className="flex items-center gap-3.5 pl-1.5">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-200 ${
                        isSelected
                          ? "bg-blue-50 border-blue-200 text-[#0A369D]"
                          : "bg-slate-50 border-slate-100 text-slate-500 group-hover:text-[#0A369D] group-hover:bg-blue-50/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-xs font-bold ${isSelected ? "text-[#0A369D]" : "text-slate-500"}`}>
                          L{layer.number}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          {layer.tier}
                        </span>
                      </div>
                      <h4
                        className={`text-base font-bold tracking-tight uppercase transition-colors ${
                          isSelected ? "text-[#061A45]" : "text-slate-700 group-hover:text-[#061A45]"
                        }`}
                      >
                        {layer.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pr-2">
                    <span
                      className={`hidden sm:inline-block font-mono text-[11px] px-2.5 py-1 rounded-md border font-medium ${
                        isSelected
                          ? "bg-blue-50 border-blue-200 text-[#0A369D]"
                          : "bg-slate-50 border-slate-100 text-slate-500"
                      }`}
                    >
                      {layer.telemetry.metric}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isSelected ? "text-[#0A369D] translate-x-1" : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: DEEP-TECH TELEMETRY & SCHEMATIC INSPECTOR PANEL */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.number}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="h-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_8px_32px_rgba(10,54,157,0.06)] flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Layer Header, Active Beacon, Live Metric */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0A369D] shadow-xs">
                        <ActiveIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#0A369D] uppercase">
                            LAYER {activeLayer.number} &bull; {activeLayer.tier}
                          </span>
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {activeLayer.telemetry.status}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#061A45] tracking-tight uppercase">
                          {activeLayer.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-end shadow-2xs">
                      <span className="font-mono text-[10px] uppercase text-slate-500 font-semibold">
                        {activeLayer.telemetry.metric}
                      </span>
                      <span className="font-mono text-sm sm:text-base font-bold text-[#0A369D]">
                        {activeLayer.telemetry.value}
                      </span>
                    </div>
                  </div>

                  {/* Layer Subtitle & Narrative */}
                  <div className="py-6">
                    <p className="font-mono text-xs text-[#0A369D] uppercase tracking-wider mb-2 font-bold">
                      // {activeLayer.subtitle}
                    </p>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                      {activeLayer.description}
                    </p>
                  </div>

                  {/* Architectural Blueprint Highlights */}
                  <div className="space-y-3 mb-6">
                    <div className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[#0A369D]" />
                      <span>ARCHITECTURAL CAPABILITIES</span>
                    </div>
                    <div className="space-y-2">
                      {activeLayer.highlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-xs sm:text-sm text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#0A369D] shrink-0 mt-0.5" />
                          <span className="font-normal">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Schematic & Tech Stack Conduit */}
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  {/* Schematic Flow String */}
                  <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 font-mono text-xs text-slate-700 flex items-center justify-between overflow-x-auto">
                    <div className="flex items-center gap-2 shrink-0">
                      <Share2 className="w-3.5 h-3.5 text-[#0A369D]" />
                      <span className="text-[11px] text-slate-500 uppercase font-bold">Topology Pipeline:</span>
                    </div>
                    <span className="font-mono text-xs text-[#0A369D] font-bold pl-4">
                      {activeLayer.schematic}
                    </span>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-slate-500 uppercase shrink-0 font-bold">
                      Stack:
                    </span>
                    {activeLayer.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono font-medium text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-lg hover:border-[#0A369D] hover:text-[#0A369D] transition-colors shadow-2xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 3. ARCHITECTURAL INTEGRITY GUARANTEE BANNER                          */}
        {/* ==================================================================== */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_24px_rgba(10,54,157,0.05)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0A369D] shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#061A45] tracking-tight uppercase">
                Deterministic High-Concurrency Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">
                Every architectural layer is audited against zero single-point-of-failure standards, sub-10ms latency SLAs, and automated chaos recovery.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#0A369D] shrink-0 bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ENTERPRISE GRADE ARCHITECTURE</span>
          </div>
        </div>

      </div>
    </section>
  );
}
