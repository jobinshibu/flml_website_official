"use client";

import React from "react";
import { motion } from "framer-motion";

// Phase 01 Diagram - One Operation Branching into Individual Atomic Nodes (Matching Hero Sovereign Navy Theme)
export function BranchingNodesDiagram() {
  const branches = [
    { id: "node-1", label: "AUTH_GATE", y: 35, delay: 0 },
    { id: "node-2", label: "STATE_ENGINE", y: 80, delay: 0.4 },
    { id: "node-3", label: "LEDGER_TX", y: 130, delay: 0.8 },
    { id: "node-4", label: "EVENT_STREAM", y: 180, delay: 1.2 },
    { id: "node-5", label: "EDGE_SYNAPSE", y: 225, delay: 1.6 },
  ];

  return (
    <div className="relative w-full h-[260px] bg-[#040e26]/90 rounded-xl border border-white/10 p-4 overflow-hidden flex items-center justify-center shadow-[inset_0_0_30px_rgba(10,54,157,0.15)]">
      {/* Background blueprint grid matching hero */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

      <svg className="w-full h-full" viewBox="0 0 460 260" fill="none">
        {/* Central Origin Node */}
        <g transform="translate(45, 130)">
          <circle r="22" fill="#061A45" stroke="#38bdf8" strokeWidth="1.5" />
          <circle r="14" fill="#0A369D" fillOpacity="0.4" />
          <circle r="6" fill="#38bdf8" className="animate-ping" style={{ transformOrigin: "0 0" }} />
          <circle r="5" fill="#FFFFFF" />
          <text x="-20" y="38" fill="#93c5fd" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">
            ROOT_OP
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
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Animated pulse highlight line */}
              <path
                d={pathD}
                stroke="#38bdf8"
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
                <circle r="12" fill="#061A45" stroke="#38bdf8" strokeWidth="1.2" />
                <circle r="4" fill="#38bdf8" />
                <circle r="2" fill="#FFFFFF" />

                {/* Tag pill */}
                <rect
                  x="20"
                  y="-11"
                  width="95"
                  height="22"
                  rx="4"
                  fill="#061A45"
                  stroke="rgba(56, 189, 248, 0.4)"
                  strokeWidth="1"
                />
                <text
                  x="28"
                  y="4"
                  fill="#F0F6FF"
                  fontSize="9.5"
                  fontFamily="monospace"
                  letterSpacing="0.08em"
                >
                  {b.label}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      <div className="absolute top-3 right-4 flex items-center gap-1.5 text-[10px] font-mono text-sky-300 uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        Surgical Dissection Map
      </div>
    </div>
  );
}

// Phase 02 Diagram - Multiple Flows Converging at a Bottleneck
export function BottleneckConvergenceDiagram() {
  return (
    <div className="relative w-full h-[260px] bg-[#040e26]/90 rounded-xl border border-white/10 p-4 overflow-hidden flex items-center justify-center shadow-[inset_0_0_30px_rgba(10,54,157,0.15)]">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

      <svg className="w-full h-full" viewBox="0 0 460 260" fill="none">
        {/* Guide flow contours funneling into bottleneck */}
        <path
          d="M 20 40 C 140 40, 180 115, 230 115 C 280 115, 320 40, 440 40"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
        />
        <path
          d="M 20 80 C 130 80, 180 122, 230 122 C 280 122, 330 80, 440 80"
          stroke="rgba(56, 189, 248, 0.3)"
          strokeWidth="1.5"
        />
        <path
          d="M 20 180 C 130 180, 180 138, 230 138 C 280 138, 330 180, 440 180"
          stroke="rgba(56, 189, 248, 0.3)"
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
            fill="#120e0e"
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
            fontFamily="monospace"
            letterSpacing="0.1em"
          >
            FRICTION ZONE
          </text>
        </g>

        {/* Dynamic incoming particle streams squeezing through */}
        {[50, 90, 170, 210].map((yStart, idx) => (
          <path
            key={idx}
            d={`M 20 ${yStart} Q 160 ${125 + (idx - 1.5) * 8}, 230 130 Q 300 ${125 + (idx - 1.5) * 8}, 440 ${yStart}`}
            stroke={idx % 2 === 0 ? "#38bdf8" : "#60a5fa"}
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

        {/* Procedural Drag Labels */}
        <text x="30" y="28" fill="#93c5fd" fontSize="9" fontFamily="monospace">
          INCOMING TRANSACTION BURSTS
        </text>
        <text x="300" y="242" fill="#38bdf8" fontSize="9" fontFamily="monospace">
          REGULATED STABILIZED FLOW
        </text>
      </svg>

      <div className="absolute top-3 right-4 flex items-center gap-1.5 text-[10px] font-mono text-amber-400 uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        Bottleneck Diagnostic
      </div>
    </div>
  );
}

// Phase 03 Diagram - Aligned Architecture Layers Forming a Complete System
export function AlignedArchitectureDiagram() {
  const layers = [
    { title: "L03 / SYNAPSE INTERFACE", desc: "Decoupled Web, Mobile & Realtime WebSockets", y: 40, color: "#60a5fa" },
    { title: "L02 / ORCHESTRATION KERNEL", desc: "Stateless Micro-Services & Event Bus", y: 105, color: "#38bdf8" },
    { title: "L01 / IMMUTABLE DATA LEDGER", desc: "High-Throughput Partitioned Storage Mesh", y: 170, color: "#0A369D" },
  ];

  return (
    <div className="relative w-full h-[260px] bg-[#040e26]/90 rounded-xl border border-white/10 p-4 overflow-hidden flex items-center justify-center shadow-[inset_0_0_30px_rgba(10,54,157,0.15)]">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

      <svg className="w-full h-full" viewBox="0 0 460 260" fill="none">
        {/* Vertical Synchronization Laser Bus Channels */}
        <line x1="80" y1="25" x2="80" y2="235" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="3 3" />
        <line x1="380" y1="25" x2="380" y2="235" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="3 3" />

        {/* Traveling Vertical Synch Energy Packets */}
        <circle r="4" fill="#38bdf8">
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
              fill="#061A45"
              stroke={layer.color}
              strokeWidth="1.2"
              strokeOpacity="0.7"
            />
            {/* Left Accent Indicator */}
            <rect x="0" y="0" width="4" height="50" rx="2" fill={layer.color} />

            {/* Content text */}
            <text x="18" y="21" fill="#FFFFFF" fontSize="10.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.08em">
              {layer.title}
            </text>
            <text x="18" y="38" fill="#93c5fd" fontSize="9" fontFamily="sans-serif">
              {layer.desc}
            </text>

            {/* Lock Status indicator */}
            <g transform="translate(305, 25)">
              <circle r="8" fill="#0A369D" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1" />
              <circle r="3" fill="#67e8f9" />
            </g>
          </g>
        ))}

        <text x="130" y="244" fill="#38bdf8" fontSize="9" fontFamily="monospace" letterSpacing="0.12em">
          UNIFIED ARCHITECTURAL BACKBONE
        </text>
      </svg>

      <div className="absolute top-3 right-4 flex items-center gap-1.5 text-[10px] font-mono text-sky-300 uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        Synthesis Verification: Complete
      </div>
    </div>
  );
}
