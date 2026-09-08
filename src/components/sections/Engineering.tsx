"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const layers = [
  {
    id: "experience",
    name: "EXPERIENCE",
    desc: "WEB / MOBILE / INTERFACES",
    tech: ["Micro-frontends", "Omnichannel", "Native iOS/Android", "Web3 Wallets"],
    color: "from-brand-blue/20 to-transparent",
    borderColor: "border-brand-blue/50",
  },
  {
    id: "application",
    name: "APPLICATION",
    desc: "SERVICES / WORKFLOWS",
    tech: ["Microservices", "Event-Driven", "Serverless", "Smart Contracts"],
    color: "from-brand-blue/10 to-transparent",
    borderColor: "border-brand-blue/40",
  },
  {
    id: "api",
    name: "API",
    desc: "INTEGRATION / COMMUNICATION",
    tech: ["GraphQL", "RESTful", "gRPC", "WebSockets", "tRPC"],
    color: "from-white/5 to-transparent",
    borderColor: "border-white/20",
  },
  {
    id: "data",
    name: "DATA",
    desc: "DATABASE / ANALYTICS / AI",
    tech: ["Relational (SQL)", "NoSQL / Document", "Graph Databases", "Blockchain Ledgers", "Vector (AI)"],
    color: "from-black/20 to-transparent",
    borderColor: "border-white/10",
  },
  {
    id: "integration",
    name: "INTEGRATION",
    desc: "PAYMENTS / EXTERNAL SYSTEMS",
    tech: ["Enterprise Service Bus", "IoT Gateways", "Decentralized Oracles", "Payment Gateways"],
    color: "from-black/40 to-transparent",
    borderColor: "border-white/5",
  },
  {
    id: "infrastructure",
    name: "INFRASTRUCTURE",
    desc: "CLOUD / DEPLOYMENT / SECURITY",
    tech: ["Multi-Cloud", "Kubernetes", "Zero-Trust Security", "CI/CD Pipelines"],
    color: "from-black/60 to-transparent",
    borderColor: "border-black/50",
  },
];

export default function Engineering() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<string | null>(layers[0].id);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveLayer((current) => {
        if (!current) return layers[0].id;
        const currentIndex = layers.findIndex((l) => l.id === current);
        const nextIndex = (currentIndex + 1) % layers.length;
        return layers[nextIndex].id;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovering]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="technology" ref={containerRef} className="py-20 px-8 bg-[#020817] relative overflow-hidden text-white">
      
      {/* Deep technical background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue-dark/50 via-[#020817] to-[#020817]" />
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-brand-blue mb-4">
          # BUILT FROM THE INSIDE OUT.
        </h2>
        
        <p className="text-xl md:text-2xl font-bold text-white/90 max-w-3xl mb-12 text-balance leading-tight">
          True engineering depth. We build scalable systems layer by layer, ensuring security, performance, and operational adaptability.
        </p>

        {/* High-End Interactive Architecture Visual */}
        <div className="flex flex-col xl:flex-row gap-8 relative">
          
          {/* Left: The Stack */}
          <div className="flex-1 space-y-3">
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
                  className={`relative overflow-hidden group cursor-pointer rounded border transition-all duration-300 ${
                    isActive ? "border-brand-blue bg-brand-blue/10 scale-[1.01]" : `${layer.borderColor} bg-white/[0.02] hover:bg-white/[0.04]`
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${layer.color} opacity-50`} />
                  
                  <div className="relative p-4 md:p-5 flex items-center justify-between z-10">
                    <div>
                      <h3 className={`text-lg md:text-xl font-black tracking-tight transition-colors ${isActive ? "text-white" : "text-white/70"}`}>
                        {layer.name}
                      </h3>
                      <p className="text-[10px] font-mono tracking-widest uppercase mt-1 text-brand-blue-light/70">
                        {layer.desc}
                      </p>
                    </div>
                    
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${isActive ? "border-brand-blue bg-brand-blue/20" : "border-white/10"}`}>
                      <span className={`text-[10px] font-mono transition-opacity ${isActive ? "opacity-100 text-brand-blue-light" : "opacity-30"}`}>
                        0{idx + 1}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: The Dynamic Tech HUD */}
          <div className="flex-1 hidden xl:block relative">
             <div className="h-[460px] w-full border border-white/5 rounded-xl bg-black/40 backdrop-blur-md p-8 flex flex-col justify-center">
                
                <AnimatePresence mode="wait">
                  {activeLayer ? (
                    <motion.div
                      key={activeLayer}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full flex flex-col justify-center"
                    >
                      <div className="text-brand-blue font-mono text-[10px] tracking-[0.2em] uppercase mb-4 animate-pulse">
                        Analyzing Layer: {activeLayer}
                      </div>
                      
                      <div className="space-y-4">
                        {layers.find(l => l.id === activeLayer)?.tech.map((t, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="w-12 h-px bg-brand-blue/30 relative">
                              <motion.div 
                                className="absolute top-1/2 -translate-y-1/2 left-0 w-1.5 h-1.5 bg-brand-blue rounded-full shadow-[0_0_10px_rgba(10,54,157,0.8)]"
                                animate={{ left: ["0%", "100%", "0%"] }}
                                transition={{ duration: 1.5 + (i * 0.2), repeat: Infinity, ease: "linear" }}
                              />
                            </div>
                            <span className="text-base md:text-lg font-light tracking-wide text-white/90">
                              {t}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-end">
                         <div className="font-mono text-[10px] text-white/30">STATUS: OPTIMIZED</div>
                         <div className="flex gap-1.5">
                            <div className="w-1.5 h-6 bg-brand-blue/40" />
                            <div className="w-1.5 h-4 bg-brand-blue/60" />
                            <div className="w-1.5 h-8 bg-brand-blue" />
                         </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full flex items-center justify-center flex-col text-center"
                    >
                      <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center mb-6 relative">
                        <motion.div 
                          className="absolute inset-0 border border-brand-blue rounded-full border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="font-mono text-[9px] tracking-widest text-white/30">STANDBY</span>
                      </div>
                      <p className="text-white/40 font-mono text-[10px] tracking-widest">INTERACT WITH ARCHITECTURE LAYERS</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
