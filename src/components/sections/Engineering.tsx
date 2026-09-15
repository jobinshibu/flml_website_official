"use client";

import React from "react";
import {
  Globe,
  Cpu,
  Network,
  Database,
  Cable,
  ShieldCheck,
  Zap,
} from "lucide-react";

const layers = [
  {
    number: "01",
    title: "EXPERIENCE",
    subtitle: "Web / Mobile / Spatial Interfaces",
    description: "Ultra-responsive frontends engineered for instant paint, fluid 120 FPS interactions, and native hardware optimization.",
    icon: Globe,
    tech: ["Micro-Frontends", "Omnichannel Sync", "Native iOS & Android", "Web3 Wallets"],
  },
  {
    number: "02",
    title: "APPLICATION",
    subtitle: "Services / Workflows / Logic",
    description: "High-concurrency microservice meshes and deterministic smart contract engines operating with zero single point of failure.",
    icon: Cpu,
    tech: ["Microservices", "Event-Driven Fabric", "Serverless Compute", "Smart Contracts"],
  },
  {
    number: "03",
    title: "API & MESH",
    subtitle: "Routing / Gateways / Protocols",
    description: "Universal communication fabric with strict schema enforcement, rate-limiting shields, and binary streaming.",
    icon: Network,
    tech: ["GraphQL Subgraphs", "gRPC Streaming", "WebSockets / SSE", "Type-Safe tRPC"],
  },
  {
    number: "04",
    title: "DATA & AI",
    subtitle: "Databases / Analytics / Vectors",
    description: "Polyglot storage architecture combining ACID transactional guarantees with high-dimensional vector similarity for AI.",
    icon: Database,
    tech: ["PostgreSQL / SQL", "Redis In-Memory", "Vector Embeddings", "Immutable Ledgers"],
  },
  {
    number: "05",
    title: "INTEGRATION",
    subtitle: "Middleware / Oracles / Payments",
    description: "Resilient interoperability layer connecting legacy enterprise cores, real-world IoT telemetry, and payment rails.",
    icon: Cable,
    tech: ["Enterprise Service Bus", "IoT Gateways", "Decentralized Oracles", "Banking & ISO 20022"],
  },
  {
    number: "06",
    title: "INFRASTRUCTURE",
    subtitle: "Cloud / Kubernetes / Zero-Trust",
    description: "Hyperscale multi-cloud foundation managed as code with automated self-healing and zero-trust security perimeters.",
    icon: ShieldCheck,
    tech: ["Multi-Cloud (AWS/GCP)", "Kubernetes (K8s)", "Zero-Trust Perimeter", "GitOps & CI/CD"],
  },
];

export default function Engineering() {
  return (
    <section
      id="technology"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-[#F8FAFC] via-[#F0F6FF] to-[#EBF3FC] text-[#061A45] relative overflow-hidden border-t border-slate-200/90"
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

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0A369D] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A369D]">
                # BUILT FROM THE INSIDE OUT
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-['Space_Grotesk'] font-bold text-[#061A45] tracking-tight uppercase leading-tight">
              True Engineering <span className="text-[#0A369D]">Depth.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mt-3">
              We build scalable systems layer by layer, ensuring unbreakable security, lightning performance, and multi-generational adaptability.
            </p>
          </div>

          {/* Architecture Pipeline Telemetry Badge */}
          <div className="hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-sm font-mono text-xs text-[#0A369D]">
            <Zap className="w-4 h-4 text-[#0A369D]" />
            <span className="font-semibold">6/6 CORE ARCHITECTURAL LAYERS ACTIVE</span>
          </div>
        </div>

        {/* 6-Card Deep-Tech Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {layers.map((layer) => {
            const Icon = layer.icon;

            return (
              <div
                key={layer.number}
                className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-[#0A369D]/50 p-6 sm:p-7 shadow-[0_4px_16px_rgba(10,54,157,0.04)] hover:shadow-[0_12px_32px_rgba(10,54,157,0.12)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
              >
                <div>
                  {/* Card Header with Number and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-[#0A369D] bg-blue-50 border border-blue-100 px-3 py-1 rounded-lg">
                      LAYER {layer.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-[#0A369D]/40 flex items-center justify-center text-[#0A369D] group-hover:scale-110 transition-all duration-300 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-['Space_Grotesk'] font-bold text-[#061A45] tracking-tight mb-1 group-hover:text-[#0A369D] transition-colors">
                    {layer.title}
                  </h3>
                  <p className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-4">
                    // {layer.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {layer.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {layer.tech.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono text-slate-700 bg-slate-100/80 border border-slate-200/60 px-2.5 py-1 rounded-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
