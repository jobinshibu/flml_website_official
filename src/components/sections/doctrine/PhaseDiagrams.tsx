"use client";

import React from "react";
import { motion } from "framer-motion";

// Phase 01 Diagram - Deconstructing Core Processes into Modular Services
export function BranchingNodesDiagram() {
  const branches = [
    { id: "node-1", label: "Authentication", y: 35, delay: 0 },
    { id: "node-2", label: "State Engine", y: 80, delay: 0.4 },
    { id: "node-3", label: "Data Ledger", y: 130, delay: 0.8 },
    { id: "node-4", label: "Event Pipeline", y: 180, delay: 1.2 },
    { id: "node-5", label: "Edge Gateway", y: 225, delay: 1.6 },
  ];

  return (
    <div className="relative w-full h-[260px] bg-[#0A0D15]/95 rounded-xl border border-white/[0.08] p-4 overflow-hidden flex items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]" />

      <svg className="w-full h-full" viewBox="0 0 460 260" fill="none">
        {/* Central Origin Node */}
        <g transform="translate(45, 130)">
          <circle r="22" fill="#111624" stroke="#2563eb" strokeWidth="1.5" />
          <circle r="14" fill="#0A369D" fillOpacity="0.5" />
          <circle r="6" fill="#3B82F6" className="animate-ping" style={{ transformOrigin: "0 0" }} />
          <circle r="5" fill="#FFFFFF" />
          <text x="-22" y="38" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="600">
            Core Process
          </text>
        </g>

        {/* Branching Connecting Curves with Signal Pulses */}
        {branches.map((b) => {
          const pathD = `M 67 130 C 180 130, 200 ${b.y}, 320 ${b.y}`;
          return (
            <g key={b.id}>
              {/* Base static path */}
              <path
                d={pathD}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Animated pulse highlight line */}
              <path
                d={pathD}
                stroke="#3B82F6"
                strokeWidth="2"
                strokeDasharray="20 180"
                className="opacity-90"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="200; 0"
                  dur="2.8s"
                  begin={`${b.delay}s`}
                  repeatCount="indefinite"
                />
              </path>

              {/* Endpoint Atomic Node */}
              <g transform={`translate(320, ${b.y})`}>
                <circle r="12" fill="#111624" stroke="#2563eb" strokeWidth="1.2" />
                <circle r="4" fill="#3B82F6" />
                <circle r="2" fill="#FFFFFF" />

                {/* Tag pill */}
                <rect
                  x="20"
                  y="-11"
                  width="105"
                  height="22"
                  rx="4"
                  fill="#111624"
                  stroke="rgba(37, 99, 235, 0.3)"
                  strokeWidth="1"
                />
                <text
                  x="28"
                  y="4"
                  fill="#F0F6FF"
                  fontSize="9.5"
                  fontFamily="sans-serif"
                  fontWeight="500"
                >
                  {b.label}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Phase 02 Diagram - Multiple Flows Converging at a Bottleneck
export function BottleneckConvergenceDiagram() {
  return (
    <div className="relative w-full h-[260px] bg-[#0A0D15]/95 rounded-xl border border-white/[0.08] p-4 overflow-hidden flex items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]" />

      <svg className="w-full h-full" viewBox="0 0 460 260" fill="none">
        {/* Guide flow contours funneling into bottleneck */}
        <path
          d="M 20 40 C 140 40, 180 115, 230 115 C 280 115, 320 40, 440 40"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
        />
        <path
          d="M 20 80 C 130 80, 180 122, 230 122 C 280 122, 330 80, 440 80"
          stroke="rgba(37, 99, 235, 0.25)"
          strokeWidth="1.5"
        />
        <path
          d="M 20 180 C 130 180, 180 138, 230 138 C 280 138, 330 180, 440 180"
          stroke="rgba(37, 99, 235, 0.25)"
          strokeWidth="1.5"
        />
        <path
          d="M 20 220 C 140 220, 180 145, 230 145 C 280 145, 320 220, 440 220"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
        />

        {/* Central Bottleneck Choke Ring with amber pulse */}
        <g transform="translate(230, 130)">
          <rect
            x="-20"
            y="-40"
            width="40"
            height="80"
            rx="8"
            fill="#16120D"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <line x1="0" y1="-35" x2="0" y2="35" stroke="#f59e0b" strokeWidth="1" opacity="0.4" />
          <circle r="6" fill="#f59e0b" opacity="0.8" className="animate-ping" />
          <circle r="4" fill="#f59e0b" />
          <text
            x="0"
            y="54"
            textAnchor="middle"
            fill="#f59e0b"
            fontSize="9"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            Bottleneck Zone
          </text>
        </g>

        {/* Dynamic incoming particle streams squeezing through */}
        {[50, 90, 170, 210].map((yStart, idx) => (
          <path
            key={idx}
            d={`M 20 ${yStart} Q 160 ${125 + (idx - 1.5) * 8}, 230 130 Q 300 ${125 + (idx - 1.5) * 8}, 440 ${yStart}`}
            stroke={idx % 2 === 0 ? "#3B82F6" : "#60a5fa"}
            strokeWidth="2"
            strokeDasharray="14 160"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="180; 0"
              dur={`${2.2 + idx * 0.3}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}

        {/* Procedural Flow Labels */}
        <text x="30" y="28" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="500">
          Incoming Traffic &amp; Workflows
        </text>
        <text x="300" y="242" fill="#3B82F6" fontSize="9" fontFamily="sans-serif" fontWeight="500">
          Optimized &amp; Regulated Flow
        </text>
      </svg>
    </div>
  );
}

// Phase 03 Diagram - Aligned Architecture Layers Forming a Complete System
export function AlignedArchitectureDiagram() {
  const layers = [
    { title: "Application & Interface Layer", desc: "Decoupled Web, Mobile & Realtime WebSockets", y: 40, color: "#60a5fa" },
    { title: "Services & Logic Layer", desc: "Stateless Micro-Services & Event Bus", y: 105, color: "#3B82F6" },
    { title: "Data & Storage Layer", desc: "High-Throughput Partitioned Storage Mesh", y: 170, color: "#0A369D" },
  ];

  return (
    <div className="relative w-full h-[260px] bg-[#0A0D15]/95 rounded-xl border border-white/[0.08] p-4 overflow-hidden flex items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]" />

      <svg className="w-full h-full" viewBox="0 0 460 260" fill="none">
        {/* Vertical Synchronization Laser Bus Channels */}
        <line x1="80" y1="25" x2="80" y2="235" stroke="#2563eb" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="3 3" />
        <line x1="380" y1="25" x2="380" y2="235" stroke="#2563eb" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="3 3" />

        {/* Traveling Vertical Synch Energy Packets */}
        <circle r="4" fill="#3B82F6">
          <animateMotion path="M 80 25 L 80 235" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle r="4" fill="#60a5fa">
          <animateMotion path="M 380 235 L 380 25" dur="2.4s" repeatCount="indefinite" />
        </circle>

        {/* 3 Aligned Architectural Slices */}
        {layers.map((layer) => (
          <g key={layer.title} transform={`translate(60, ${layer.y})`}>
            {/* Shelf backdrop */}
            <rect
              x="0"
              y="0"
              width="340"
              height="50"
              rx="6"
              fill="#111624"
              stroke={layer.color}
              strokeWidth="1.2"
              strokeOpacity="0.7"
            />
            {/* Left Accent Indicator */}
            <rect x="0" y="0" width="4" height="50" rx="2" fill={layer.color} />

            {/* Content text */}
            <text x="18" y="21" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
              {layer.title}
            </text>
            <text x="18" y="38" fill="#93c5fd" fontSize="9" fontFamily="sans-serif">
              {layer.desc}
            </text>

            {/* Status indicator */}
            <g transform="translate(305, 25)">
              <circle r="8" fill="#0A369D" fillOpacity="0.4" stroke="#2563eb" strokeWidth="1" />
              <circle r="3" fill="#93c5fd" />
            </g>
          </g>
        ))}

        <text x="140" y="244" fill="#3B82F6" fontSize="9" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.08em">
          UNIFIED SYSTEM ARCHITECTURE
        </text>
      </svg>
    </div>
  );
}
