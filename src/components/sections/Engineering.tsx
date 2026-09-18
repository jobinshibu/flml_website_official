"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StackLayer {
  id: string;
  num: string;
  level: string;
  name: string;
  desc: string;
  tech: string[];
  status: string;
  latency: string;
  bg: string;
  borderColor: string;
  glowColor: string;
  badgeBg: string;
  icons: Array<{ name: string; icon: string }>;
}

// Stack ordered visually from 06 (Top Apex) down to 01 (Bottom Base)
const stackLayers: StackLayer[] = [
  {
    id: "experience",
    num: "06",
    level: "TOP APEX",
    name: "EXPERIENCE LAYER",
    desc: "WEB / MOBILE / OMNICHANNEL INTERFACES",
    tech: ["Micro-frontends", "Omnichannel Mesh", "Native iOS & Android", "Web3 Embedded Wallets"],
    status: "OPTIMIZED",
    latency: "< 24ms",
    bg: "bg-slate-900/95",
    borderColor: "border-cyan-400",
    glowColor: "rgba(34, 211, 238, 0.35)",
    badgeBg: "bg-cyan-400 text-slate-950",
    icons: [
      { name: "View Matrix", icon: "👁️" },
      { name: "Inspect UI", icon: "🔍" },
      { name: "Touch Engine", icon: "👆" },
      { name: "State Switch", icon: "🎛️" },
    ],
  },
  {
    id: "application",
    num: "05",
    level: "CORE SERVICES",
    name: "APPLICATION LAYER",
    desc: "WORKFLOW ENGINES & EVENT BUS",
    tech: ["Microservices Orchestration", "Event-Driven Bus", "Serverless Edge Workers", "Smart Contracts"],
    status: "ACTIVE",
    latency: "< 12ms",
    bg: "bg-slate-900/95",
    borderColor: "border-cyan-500/50",
    glowColor: "rgba(6, 182, 212, 0.25)",
    badgeBg: "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40",
    icons: [
      { name: "Event Bus", icon: "🔄" },
      { name: "Logic Engine", icon: "🧠" },
      { name: "Task Queue", icon: "📋" },
      { name: "Stream Flow", icon: "🌊" },
    ],
  },
  {
    id: "api",
    num: "04",
    level: "COMMUNICATION",
    name: "API GATEWAY LAYER",
    desc: "INTEGRATION & BINARY STREAMING",
    tech: ["GraphQL Gateway", "RESTful Core API", "gRPC Binary Streams", "WebSocket Feeds"],
    status: "ONLINE",
    latency: "< 8ms",
    bg: "bg-slate-950/95",
    borderColor: "border-blue-500/40",
    glowColor: "rgba(59, 130, 246, 0.2)",
    badgeBg: "bg-blue-500/20 text-blue-300 border border-blue-400/40",
    icons: [
      { name: "gRPC Stream", icon: "📡" },
      { name: "GraphQL Hub", icon: "🕸️" },
      { name: "Auth Token", icon: "🔑" },
      { name: "Rate Limiter", icon: "🛡️" },
    ],
  },
  {
    id: "data",
    num: "03",
    level: "PERSISTENCE",
    name: "DATA & VECTOR LAYER",
    desc: "DATABASES & NEURAL EMBEDDINGS",
    tech: ["Relational (PostgreSQL)", "NoSQL Document Store", "Graph Databases", "Vector Embeddings (AI)"],
    status: "SYNCHRONIZED",
    latency: "< 18ms",
    bg: "bg-slate-950/90",
    borderColor: "border-indigo-500/40",
    glowColor: "rgba(99, 102, 241, 0.2)",
    badgeBg: "bg-indigo-500/20 text-indigo-300 border border-indigo-400/40",
    icons: [
      { name: "Vector Index", icon: "🧬" },
      { name: "Relational DB", icon: "🗄️" },
      { name: "Redis Cache", icon: "⚡" },
      { name: "Encryption", icon: "🔒" },
    ],
  },
  {
    id: "integration",
    num: "02",
    level: "GATEWAYS",
    name: "INTEGRATION LAYER",
    desc: "PAYMENTS & EXTERNAL BUS",
    tech: ["Enterprise Service Bus", "IoT Gateways", "Decentralized Oracles", "Multi-Currency Gateways"],
    status: "ENCRYPTED",
    latency: "< 35ms",
    bg: "bg-neutral-950/90",
    borderColor: "border-teal-500/40",
    glowColor: "rgba(20, 184, 166, 0.2)",
    badgeBg: "bg-teal-500/20 text-teal-300 border border-teal-400/40",
    icons: [
      { name: "Payments", icon: "💳" },
      { name: "IoT Hub", icon: "🌐" },
      { name: "Oracles", icon: "🔮" },
      { name: "Bridge Bus", icon: "🌉" },
    ],
  },
  {
    id: "infrastructure",
    num: "01",
    level: "FOUNDATION BASE",
    name: "INFRASTRUCTURE LAYER",
    desc: "CLOUD / KUBERNETES / ZERO-TRUST SECURITY",
    tech: ["Multi-Cloud (AWS/GCP)", "Kubernetes Clusters", "Zero-Trust Security Mesh", "CI/CD Pipelines"],
    status: "UNBREAKABLE",
    latency: "99.999% UPTIME",
    bg: "bg-black/95",
    borderColor: "border-emerald-500/40",
    glowColor: "rgba(16, 185, 129, 0.2)",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40",
    icons: [
      { name: "Cloud Nodes", icon: "☁️" },
      { name: "K8s Mesh", icon: "☸️" },
      { name: "Zero-Trust", icon: "🛡️" },
      { name: "CI/CD Auto", icon: "🚀" },
    ],
  },
];

// Sequential explanation order: Start from Step 01 (Foundation) up to Step 06 (Apex)
const explanationSequence = ["infrastructure", "integration", "data", "api", "application", "experience"];

export default function Engineering() {
  const [deck, setDeck] = useState(stackLayers);
  const [activeLayerId, setActiveLayerId] = useState<string>("infrastructure");
  const [resetKey, setResetKey] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Active layer object for HUD display
  const activeLayerObj = deck.find((l) => l.id === activeLayerId) || deck[5];

  // Select card
  const changeActiveLayer = (newId: string) => {
    setActiveLayerId(newId);
  };

  // Smooth auto-rotate every 6.5 seconds unless user is interacting
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveLayerId((prevId) => {
        const currentIndex = explanationSequence.indexOf(prevId);
        const nextIndex = (currentIndex + 1) % explanationSequence.length;
        return explanationSequence[nextIndex];
      });
    }, 6500);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Reset stack positions completely
  const resetStack = () => {
    setDeck([...stackLayers]);
    setActiveLayerId("infrastructure");
    setResetKey((prev) => prev + 1);
  };

  return (
    <section 
      id="technology" 
      className="pt-8 md:pt-12 pb-8 md:pb-10 px-4 sm:px-6 md:px-12 bg-transparent relative z-10 text-white flex flex-col justify-center scroll-mt-12"
    >
      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col justify-between">
        
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 md:mb-6 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h2 className="text-[11px] font-mono tracking-[0.25em] uppercase text-cyan-300 font-semibold">
                SYSTEM ANATOMY STACK
              </h2>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none uppercase">
              BUILT FROM THE <span className="text-cyan-400">INSIDE OUT.</span>
            </h2>
          </div>

          {/* Clean Reset Stack Button */}
          <button
            onClick={resetStack}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/15 text-slate-300 font-mono text-[11px] font-semibold px-4 py-2 rounded-full hover:bg-cyan-400 hover:text-slate-950 hover:border-cyan-400 transition-all cursor-pointer shadow-lg"
          >
            <span>RESET STACK</span>
            <span className="text-sm font-sans font-bold">↺</span>
          </button>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Frameless Container Stack */}
          <div 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[420px] p-2"
          >
            
            {/* Frameless Drag Sandbox Area */}
            <div className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center">
              
              {/* Stack items (1-to-1 Smooth Mouse Dragging) */}
              {deck.map((layer, index) => {
                const isSelected = activeLayerId === layer.id;

                // Visual stack offset: 06 at top (index 0), 01 at bottom (index 5)
                const translateY = index * 18;
                const scale = 1 - index * 0.035;
                const opacity = 1 - index * 0.12;

                // Active layer gets highest zIndex
                const zIndex = isSelected ? 120 : (60 - index * 10);

                return (
                  <motion.div
                    key={`${resetKey}-${layer.id}`}
                    drag
                    dragMomentum={false}
                    dragConstraints={{ left: -450, right: 450, top: -300, bottom: 300 }}
                    dragElastic={0.4}
                    whileDrag={{ scale: scale * 1.04, zIndex: 150, cursor: "grabbing" }}
                    onDragStart={() => {
                      setIsPaused(true);
                      changeActiveLayer(layer.id);
                    }}
                    onClick={() => changeActiveLayer(layer.id)}
                    initial={{ y: translateY, scale, opacity }}
                    animate={{
                      y: isSelected ? translateY - 20 : translateY,
                      scale: isSelected ? scale * 1.03 : scale,
                      opacity: isSelected ? 1 : opacity,
                    }}
                    transition={{
                      y: { type: "spring", stiffness: 140, damping: 24 },
                      scale: { type: "spring", stiffness: 150, damping: 24 },
                      opacity: { duration: 0.3 },
                    }}
                    style={{ zIndex, touchAction: "none" }}
                    className={`absolute w-[92%] max-w-lg p-5 sm:p-6 rounded-2xl border backdrop-blur-2xl transition-all duration-300 ease-out select-none cursor-grab ${layer.bg} ${
                      isSelected
                        ? "border-cyan-400 ring-2 ring-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.6)]"
                        : `${layer.borderColor} hover:border-cyan-400/50`
                    }`}
                  >
                    {/* Card Header Bar */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-black transition-colors ${
                          isSelected ? "bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.8)]" : layer.badgeBg
                        }`}>
                          {layer.num}
                        </span>
                        <span className="font-mono text-[10px] tracking-widest text-cyan-300 uppercase font-semibold">
                          {layer.level}
                        </span>
                      </div>

                      {isSelected && (
                        <span className="font-mono text-[9px] tracking-widest text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          STEP {layer.num} ACTIVE
                        </span>
                      )}
                    </div>

                    {/* Layer Content */}
                    <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mb-1">
                      {layer.name}
                    </h3>
                    <p className="font-mono text-[11px] text-slate-300 uppercase tracking-wider mb-4 font-medium">
                      {layer.desc}
                    </p>

                    {/* Embedded Control Icons */}
                    <div className="flex items-center gap-2">
                      {layer.icons.map((item, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg font-mono text-[10px] text-slate-200"
                        >
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}

            </div>

            {/* Quick Pill Selector Bar for all 6 Slabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2 z-20 pb-2">
              {deck.map((l) => (
                <button
                  key={l.id}
                  onClick={() => changeActiveLayer(l.id)}
                  className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider transition-all cursor-pointer ${
                    activeLayerId === l.id
                      ? "bg-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.5)] scale-105"
                      : "bg-white/5 border border-white/15 text-slate-400 hover:text-white hover:border-white/30"
                  }`}
                >
                  STEP {l.num}: {l.name.split(" ")[0]}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Live Telemetry HUD Terminal */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full border border-cyan-400/30 bg-slate-950/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] min-h-[380px] sm:min-h-[420px]">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLayerObj.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4 my-auto"
                >
                  {/* Status Header */}
                  <div className="flex items-center justify-between border-b border-white/15 pb-3 font-mono text-[11px] text-slate-300 uppercase tracking-widest font-semibold">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      DEVELOPMENT STEP {activeLayerObj.num} // {activeLayerObj.level}
                    </span>
                    <span className="text-cyan-300 font-bold">{activeLayerObj.latency}</span>
                  </div>
                  
                  {/* Layer Title Summary */}
                  <div>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{activeLayerObj.name}</h4>
                    <p className="font-mono text-xs text-cyan-300 uppercase tracking-widest mt-0.5 font-medium">{activeLayerObj.desc}</p>
                  </div>

                  {/* Registered Tech Modules */}
                  <div className="space-y-2 py-1">
                    <div className="font-mono text-[9px] tracking-widest text-slate-400 uppercase font-semibold">
                      DEEP PROTOCOLS & INTEGRATED BACKBONE
                    </div>
                    {activeLayerObj.tech.map((t, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 p-2.5 rounded-xl hover:border-cyan-400/40 transition-colors">
                        <div className="w-6 h-px bg-cyan-400/60 relative">
                          <motion.div 
                            className="absolute top-1/2 -translate-y-1/2 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_rgba(34,211,238,1)]"
                            animate={{ left: ["0%", "100%", "0%"] }}
                            transition={{ duration: 1.5 + (i * 0.2), repeat: Infinity, ease: "linear" }}
                          />
                        </div>
                        <span className="text-xs font-mono tracking-wide text-slate-100 font-medium">
                          {t}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Telemetry Status Bar */}
                  <div className="pt-4 border-t border-white/15 flex justify-between items-end">
                    <div className="font-mono text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
                      TELEMETRY: <span className="text-cyan-300">{activeLayerObj.status}</span>
                    </div>
                    <div className="flex gap-1.5 items-end">
                      <div className="w-1.5 h-4 bg-cyan-400/40 rounded-full" />
                      <div className="w-1.5 h-3 bg-cyan-400/60 rounded-full" />
                      <div className="w-1.5 h-6 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
