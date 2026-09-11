"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const layers = [
  {
    id: "experience",
    name: "EXPERIENCE LAYER",
    desc: "WEB / MOBILE / INTERFACES",
    tech: ["Micro-frontends", "Omnichannel Mesh", "Native iOS & Android", "Web3 Embedded Wallets"],
    status: "OPTIMIZED",
    latency: "< 24ms",
  },
  {
    id: "application",
    name: "APPLICATION LAYER",
    desc: "SERVICES / WORKFLOW ENGINES",
    tech: ["Microservices Orchestrations", "Event-Driven Bus", "Serverless Edge Workers", "Smart Contracts"],
    status: "ACTIVE",
    latency: "< 12ms",
  },
  {
    id: "api",
    name: "API LAYER",
    desc: "INTEGRATION / COMMUNICATION PROTOCOLS",
    tech: ["GraphQL Gateway", "RESTful Core API", "gRPC Binary Streams", "WebSocket Feeds", "tRPC Routes"],
    status: "ONLINE",
    latency: "< 8ms",
  },
  {
    id: "data",
    name: "DATA LAYER",
    desc: "DATABASE / ANALYTICS / VECTOR NEURAL",
    tech: ["Relational (PostgreSQL)", "NoSQL / Document Store", "Graph Databases", "Vector Embeddings (AI)", "Blockchain Ledgers"],
    status: "SYNCHRONIZED",
    latency: "< 18ms",
  },
  {
    id: "integration",
    name: "INTEGRATION LAYER",
    desc: "PAYMENTS / EXTERNAL GATEWAYS",
    tech: ["Enterprise Service Bus", "IoT Gateways", "Decentralized Oracles", "Multi-Currency Gateways"],
    status: "ENCRYPTED",
    latency: "< 35ms",
  },
  {
    id: "infrastructure",
    name: "INFRASTRUCTURE LAYER",
    desc: "CLOUD / DEPLOYMENT / ZERO-TRUST SECURITY",
    tech: ["Multi-Cloud (AWS/GCP)", "Kubernetes Clusters", "Zero-Trust Security Mesh", "CI/CD Deployment Pipelines"],
    status: "UNBREAKABLE",
    latency: "99.999% UPTIME",
  },
];

export default function Engineering() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<string>(layers[0].id);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveLayer((current) => {
        const currentIndex = layers.findIndex((l) => l.id === current);
        const nextIndex = (currentIndex + 1) % layers.length;
        return layers[nextIndex].id;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovering]);

  const currentLayerObj = layers.find((l) => l.id === activeLayer) || layers[0];

  return (
    <section id="technology" ref={containerRef} className="py-24 md:py-36 px-6 md:px-12 bg-black relative border-b border-white/10 text-white">
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <h2 className="text-xs font-mono tracking-[0.3em] uppercase text-white/50">
            04 // BUILT FROM THE INSIDE OUT
          </h2>
        </div>
        
        <p className="text-2xl md:text-4xl font-extrabold text-white max-w-3xl mb-16 tracking-tight leading-tight">
          True engineering depth. We construct scalable systems layer by layer for maximum resilience.
        </p>

        {/* Diagnostic Terminal Playground Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Stack Layers List */}
          <div className="lg:col-span-6 space-y-3">
            {layers.map((layer, idx) => {
              const isActive = activeLayer === layer.id;
              
              return (
                <div
                  key={layer.id}
                  onMouseEnter={() => {
                    setActiveLayer(layer.id);
                    setIsHovering(true);
                  }}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isActive 
                      ? "border-blue-500 bg-white/5 scale-[1.01]" 
                      : "border-white/10 bg-neutral-950/60 hover:border-white/20 hover:bg-neutral-900/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-xs ${isActive ? "text-blue-500" : "text-white/30"}`}>
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className={`text-base md:text-lg font-bold tracking-tight transition-colors ${
                        isActive ? "text-white" : "text-white/70"
                      }`}>
                        {layer.name}
                      </h3>
                      <p className="text-[10px] font-mono tracking-widest text-white/40 uppercase mt-0.5">
                        {layer.desc}
                      </p>
                    </div>
                  </div>

                  <span className={`font-mono text-[10px] tracking-widest px-2.5 py-1 rounded border ${
                    isActive ? "border-blue-500/50 text-blue-400 bg-blue-500/10" : "border-white/10 text-white/30"
                  }`}>
                    {layer.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Diagnostic HUD Terminal Inspector */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="h-full border border-white/15 bg-neutral-950 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLayerObj.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 my-auto"
                >
                  {/* Top Status Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-white/40 uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                      TERMINAL // {currentLayerObj.id.toUpperCase()}
                    </span>
                    <span className="text-white/70">{currentLayerObj.latency}</span>
                  </div>
                  
                  {/* Tech Stack Modules */}
                  <div className="space-y-3 py-2">
                    <div className="font-mono text-[10px] tracking-widest text-white/40 uppercase mb-4">
                      REGISTERED MICROSERVICES & PROTOCOLS
                    </div>
                    {currentLayerObj.tech.map((t, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white/[0.02] border border-white/10 p-3 rounded-lg">
                        <div className="w-8 h-px bg-blue-500/50 relative">
                          <motion.div 
                            className="absolute top-1/2 -translate-y-1/2 left-0 w-1.5 h-1.5 bg-blue-400 rounded-full"
                            animate={{ left: ["0%", "100%", "0%"] }}
                            transition={{ duration: 1.5 + (i * 0.2), repeat: Infinity, ease: "linear" }}
                          />
                        </div>
                        <span className="text-sm font-mono tracking-wide text-white/90">
                          {t}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Bottom Metrics Bar */}
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <div className="font-mono text-[10px] text-white/40">
                      TELEMETRY: ALL NODES OPERATIONAL
                    </div>
                    <div className="flex gap-1.5 items-end">
                      <div className="w-1.5 h-6 bg-blue-500/40" />
                      <div className="w-1.5 h-4 bg-blue-500/60" />
                      <div className="w-1.5 h-8 bg-blue-500" />
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

