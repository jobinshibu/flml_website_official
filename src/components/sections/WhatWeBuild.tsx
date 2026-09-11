"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const buildItems = [
  {
    id: "applications",
    title: "BESPOKE APPLICATIONS",
    description: "Bespoke application development focusing on robust architectures and seamless user experiences across web and mobile ecosystems.",
    details: ["React Native", "Next.js", "Node.js", "WebSockets", "Omnichannel"],
    align: "start",
    margin: "mt-0 ml-0",
    projects: [
      { title: "KARIKKU APP", description: "High-traffic media application handling massive concurrent user spikes with real-time push notifications.", image: "/client/Karikku.svg" },
      { title: "FOODZER", description: "Consumer food delivery platform featuring driver tracking & geolocation routing algorithms.", image: "/client/foodzer.png" }
    ]
  },
  {
    id: "systems",
    title: "ENTERPRISE SYSTEMS",
    description: "Deep, interconnected architectures built to handle immense data loads and complex business logic across multiple physical locations.",
    details: ["PostgreSQL", "Edge Caching", "HIPAA Compliance", "Local-first DB"],
    align: "end",
    margin: "mt-16 md:mt-24 mr-0",
    projects: [
      { title: "HEALINE ERP", description: "Healthcare management system routing patient data securely across multi-clinic locations.", image: "/client/healine.png" },
      { title: "MYVAAHAN", description: "Automotive service management system tracking vehicle lifecycles and inventory.", image: "/client/myvaahan.png" }
    ]
  },
  {
    id: "platforms",
    title: "SCALABLE PLATFORMS",
    description: "Scalable platform architectures designed for SaaS providers, B2B marketplaces, and complex partner ecosystems.",
    details: ["Multi-Tenant", "Microservices", "Stripe API", "AWS ECS"],
    align: "start",
    margin: "mt-16 md:mt-24 ml-0",
    projects: [
      { title: "THARA CART", description: "Multi-tenant B2B e-commerce platform orchestrating thousands of vendors and SKUs.", image: "/client/thara_cart.png" },
      { title: "VIVLINO", description: "Global learning marketplace featuring live video streaming and automated billing.", image: "/client/vivlino.svg" }
    ]
  },
  {
    id: "automation",
    title: "PROCESS AUTOMATION",
    description: "Intelligent process automation that eliminates manual bottlenecks, integrates disparate tools, and accelerates business velocity.",
    details: ["Event-Driven", "RPA Pipelines", "Legacy ERP Sync", "Webhook Mesh"],
    align: "center",
    margin: "mt-16 md:mt-24 mx-auto",
    projects: [
      { title: "AMERICAN BOARD", description: "Robotic process automation integrating legacy educational databases with modern CRM systems.", image: "/client/american board.png" }
    ]
  },
  {
    id: "intelligence",
    title: "PREDICTIVE INTELLIGENCE",
    description: "Advanced analytics and machine learning integrations that turn raw organizational data into actionable, predictive insights.",
    details: ["TensorFlow", "BigQuery", "Vector Embeddings", "Predictive ML"],
    align: "end",
    margin: "mt-16 md:mt-24 mr-0",
    projects: [
      { title: "3MS ANALYTICS", description: "Predictive intelligence dashboard forecasting operational bottlenecks weeks in advance.", image: "/client/3ms.png" }
    ]
  },
  {
    id: "infrastructure",
    title: "CLOUD INFRASTRUCTURE",
    description: "Secure, highly available, and globally distributed infrastructure setups utilizing modern DevOps practices and cloud-native services.",
    details: ["Kubernetes", "AWS / GCP", "Terraform", "Zero-Trust Mesh"],
    align: "start",
    margin: "mt-16 md:mt-24 ml-0",
    projects: [
      { title: "QARO CLOUD", description: "Zero-downtime migration of monolithic architectures into auto-scaling Kubernetes clusters.", image: "/client/qaro.png" }
    ]
  },
  {
    id: "blockchain",
    title: "DECENTRALIZED PROTOCOLS",
    description: "Smart contract development and decentralized application architectures for high-security, immutable business requirements.",
    details: ["Solidity", "Ethereum", "Smart Contracts", "Audit Protocols"],
    align: "center",
    margin: "mt-16 md:mt-24 mx-auto",
    projects: [
      { title: "EDHWI PROTOCOL", description: "Smart contract infrastructure deployed on Ethereum mainnet for immutable record keeping.", image: "/client/Edhwi.svg" }
    ]
  },
];

export default function WhatWeBuild() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const titleRefs = useRef<Record<string, HTMLHeadingElement | null>>({});
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const lockTitleToNavbar = (id: string) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const startTime = performance.now();
    const duration = 450; // Match Framer Motion transition duration

    const animateScrollLock = (now: number) => {
      const elapsed = now - startTime;
      const el = titleRefs.current[id];

      if (el) {
        const navbarOffset = 96; // Exact 96px offset (80px navbar + 16px padding)
        const currentRect = el.getBoundingClientRect();
        const absoluteTop = currentRect.top + window.scrollY;
        const targetY = absoluteTop - navbarOffset;

        window.scrollTo(0, Math.max(0, targetY));
      }

      if (elapsed < duration) {
        animFrameRef.current = requestAnimationFrame(animateScrollLock);
      }
    };

    animFrameRef.current = requestAnimationFrame(animateScrollLock);
  };

  const handleClick = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      lockTitleToNavbar(id);
    }
  };

  return (
    <section id="capabilities" className="py-12 md:py-20 px-6 md:px-12 bg-black text-white border-b border-white/10 relative overflow-hidden">
      <div className="max-w-[1700px] mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-16">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <h2 className="text-xs font-mono tracking-[0.3em] uppercase text-white/50">
            03 // CAPABILITIES & ARCHITECTURES
          </h2>
        </div>

        <div className="relative w-full flex flex-col space-y-12 md:space-y-0">
          {buildItems.map((item) => {
            const isHovered = hoveredId === item.id;
            const isExpanded = expandedId === item.id;

            return (
              <div 
                key={item.id} 
                className={`flex flex-col ${
                  item.align === "start" ? "items-start" : item.align === "end" ? "items-end" : "items-center"
                } ${item.margin} w-full`}
              >
                <div 
                  className="relative cursor-pointer group py-6 px-4 -my-3 -mx-4 z-10 hover:z-20 w-full md:w-auto"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleClick(item.id)}
                >
                  {/* Gigantic Asymmetrically Scattered Title (Direct Scroll Ref Target) */}
                  <motion.h3 
                    ref={(el) => { titleRefs.current[item.id] = el; }}
                    className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter transition-all duration-300 ${
                      isExpanded || isHovered 
                        ? "text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.35)]" 
                        : (hoveredId ? "text-white/20" : "text-white/90 group-hover:text-white")
                    }`}
                  >
                    {item.title}
                  </motion.h3>

                  {/* Hover Tag Marquee / Pill */}
                  <AnimatePresence>
                    {isHovered && !isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`absolute top-full mt-3 overflow-hidden ${
                          item.align === "start" ? "left-4" : item.align === "end" ? "right-4" : "left-1/2 -translate-x-1/2"
                        }`}
                      >
                        <div className="flex flex-nowrap gap-3 items-center whitespace-nowrap bg-neutral-900/90 border border-white/15 backdrop-blur-md px-4 py-2 rounded-xl shadow-xl">
                          {item.details.map((detail, idx) => (
                            <span key={idx} className="text-xs font-mono tracking-widest text-blue-400 uppercase flex items-center gap-3 whitespace-nowrap">
                              {detail}
                              {idx < item.details.length - 1 && <span className="w-1 h-1 bg-white/20 rounded-full inline-block" />}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Click Expanded Details & Projects */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: 10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: 10 }}
                        transition={{ duration: 0.35 }}
                        className={`overflow-hidden ${item.align === 'center' ? 'max-w-4xl mx-auto' : 'max-w-2xl'}`}
                      >
                        <div className={`flex flex-col gap-6 pt-8 pb-4 ${
                          item.align === 'center' ? 'items-center text-center' : item.align === 'end' ? 'items-end text-right' : 'items-start text-left'
                        }`}>
                          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                            {item.description}
                          </p>

                          {/* System Parameter Tech Pills */}
                          <div className={`flex flex-wrap gap-2 ${
                            item.align === 'center' ? 'justify-center' : item.align === 'end' ? 'justify-end' : 'justify-start'
                          }`}>
                            {item.details.map((detail, idx) => (
                              <span key={idx} className="bg-white/5 border border-white/15 px-3 py-1 rounded text-xs font-mono text-white/70">
                                {detail}
                              </span>
                            ))}
                          </div>

                          {/* Featured Projects */}
                          <div className={`w-full flex flex-col gap-4 mt-4 ${
                            item.align === 'center' ? 'items-center' : item.align === 'end' ? 'items-end' : 'items-start'
                          }`}>
                            {item.projects.map((project, idx) => (
                              <div 
                                key={idx} 
                                className={`flex items-center gap-4 bg-white/[0.03] border border-white/10 p-4 rounded-xl max-w-xl ${
                                  item.align === 'end' ? 'flex-row-reverse text-right' : 'text-left'
                                }`}
                              >
                                <div className="relative w-14 h-14 shrink-0 bg-white/10 border border-white/15 rounded-xl p-2">
                                  <Image src={project.image} alt={project.title} fill className="object-contain p-1" sizes="56px" />
                                </div>
                                <div>
                                  <h5 className="font-bold text-sm text-white mb-0.5">{project.title}</h5>
                                  <p className="text-xs text-white/60 leading-relaxed font-light">{project.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


