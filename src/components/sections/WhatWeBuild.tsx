"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * WHAT WE BUILD - FIRSTLOGIC META LAB (High-End Architectural Kinetic Typography)
 * 
 * Signature Kinetic Typographic Architecture (Modern • Unique • High-Contrast Blue & White)
 */

interface Project {
  title: string;
  description: string;
  image: string;
  tag: string;
  stack?: string;
}

interface BuildItem {
  id: string;
  index: string;
  title: string;
  domain: string;
  shortTag: string;
  description: string;
  details: string[];
  align: "start" | "end" | "center";
  containerClass: string;
  projects: Project[];
}

const buildItems: BuildItem[] = [
  {
    id: "applications",
    index: "01",
    title: "APPLICATIONS",
    domain: "ENTERPRISE & CONSUMER APPLICATIONS",
    shortTag: "APPS",
    description:
      "Bespoke application development focusing on robust architectures and seamless user experiences across web and mobile ecosystems.",
    details: ["Web Architecture", "Mobile (iOS & Android)", "Customer-Facing", "Internal Tools"],
    align: "start",
    containerClass: "items-start pl-0 md:pl-8 lg:pl-16",
    projects: [
      {
        title: "KARIKKU APP",
        description:
          "High-traffic media application built with React Native and Node.js. Designed to handle massive concurrent user spikes during content drops with real-time push notifications.",
        image: "/client/Karikku.svg",
        tag: "Media Streaming",
        stack: "React Native • Node.js • Redis",
      },
      {
        title: "FOODZER",
        description:
          "Cross-platform consumer food delivery application featuring real-time driver tracking, geolocation routing algorithms, and seamless payment gateway integrations.",
        image: "/client/foodzer.png",
        tag: "Geolocation & Logistics",
        stack: "Next.js • WebSockets • GeoHash",
      },
    ],
  },
  {
    id: "systems",
    index: "02",
    title: "SYSTEMS",
    domain: "ENTERPRISE RESOURCE PLANNING & CORE WORKFLOWS",
    shortTag: "SYSTEMS",
    description:
      "Deep, interconnected architectures built to handle immense data loads and complex business logic across multiple physical locations.",
    details: ["Distributed ERP", "POS Systems", "Workflow Orchestration", "Multi-Location Sync", "Automated Auditing"],
    align: "end",
    containerClass: "items-end pr-0 md:pr-10 lg:pr-20",
    projects: [
      {
        title: "HEALINE ERP",
        description:
          "Comprehensive healthcare management system developed in Next.js and PostgreSQL, routing patient data securely across multiple clinic locations with strict HIPAA compliance.",
        image: "/client/healine.png",
        tag: "Healthcare Protocol",
        stack: "Next.js • PostgreSQL • HIPAA",
      },
      {
        title: "MYVAAHAN",
        description:
          "Automotive service management system built to track vehicle lifecycles, service workflows, and inventory using local edge-caching for uninterrupted operations.",
        image: "/client/myvaahan.png",
        tag: "Edge-Cached ERP",
        stack: "TypeScript • SQLite Edge • PWA",
      },
    ],
  },
  {
    id: "platforms",
    index: "03",
    title: "PLATFORMS",
    domain: "MULTI-TENANT PLATFORMS & MARKETPLACES",
    shortTag: "PLATFORMS",
    description:
      "Scalable platform architectures designed for SaaS providers, B2B marketplaces, and complex partner ecosystems.",
    details: ["Multi-Tenant SaaS", "B2B Marketplaces", "Partner Ecosystems", "Global Billing"],
    align: "center",
    containerClass: "items-center md:pl-16",
    projects: [
      {
        title: "THARA CART",
        description:
          "Multi-tenant B2B e-commerce platform orchestrating thousands of vendors and SKUs. Built on a scalable AWS microservices architecture to ensure zero downtime.",
        image: "/client/thara_cart.png",
        tag: "B2B Commerce",
        stack: "AWS Microservices • DynamoDB",
      },
      {
        title: "VIVLINO",
        description:
          "Global learning and community marketplace connecting educators with students, featuring live video streaming infrastructure and automated billing systems.",
        image: "/client/vivlino.svg",
        tag: "EdTech Protocol",
        stack: "WebRTC • Stripe Connect • GraphQL",
      },
    ],
  },
  {
    id: "automation",
    index: "04",
    title: "AUTOMATION",
    domain: "ROBOTIC PROCESS AUTOMATION & EVENT BUSES",
    shortTag: "AUTO",
    description:
      "Intelligent process automation that eliminates manual bottlenecks, integrates disparate tools, and accelerates business velocity.",
    details: ["Process Automation (RPA)", "Event-Driven Pipelines", "Legacy Modernization", "API Integration"],
    align: "start",
    containerClass: "items-start pl-0 md:pl-24 lg:pl-36",
    projects: [
      {
        title: "AMERICAN BOARD",
        description:
          "Event-driven robotic process automation (RPA) integrating legacy educational compliance databases with modern CRM systems, saving thousands of manual entry hours.",
        image: "/client/american board.png",
        tag: "Enterprise RPA",
        stack: "Python • EventBridge • OAuth2",
      },
    ],
  },
  {
    id: "intelligence",
    index: "05",
    title: "INTELLIGENCE",
    domain: "PREDICTIVE INTELLIGENCE & MACHINE LEARNING",
    shortTag: "AI & DATA",
    description:
      "Advanced analytics and machine learning integrations that turn raw organizational data into actionable, predictive insights.",
    details: ["Predictive Analytics", "TensorFlow Pipelines", "BigQuery Warehousing", "Operational Forecasting"],
    align: "start",
    containerClass: "items-start pl-0 md:pl-10 lg:pl-20",
    projects: [
      {
        title: "3MS ANALYTICS",
        description:
          "Predictive intelligence dashboard utilizing TensorFlow and BigQuery to analyze historical business metrics, forecasting operational bottlenecks weeks in advance.",
        image: "/client/3ms.png",
        tag: "Predictive AI",
        stack: "TensorFlow • Google BigQuery",
      },
    ],
  },
  {
    id: "infrastructure",
    index: "06",
    title: "INFRASTRUCTURE",
    domain: "CLOUD-NATIVE ARCHITECTURE & ZERO-DOWNTIME DEVOPS",
    shortTag: "INFRA",
    description:
      "Secure, highly available, and globally distributed infrastructure setups utilizing modern DevOps practices and cloud-native services.",
    details: ["Kubernetes Orchestration", "AWS & Azure Multi-Cloud", "Zero-Downtime CI/CD", "High Availability"],
    align: "end",
    containerClass: "items-end pr-0 md:pr-12 lg:pr-24",
    projects: [
      {
        title: "QARO CLOUD",
        description:
          "Complete zero-downtime migration of monolithic architectures into a highly secure, containerized Kubernetes environment, achieving auto-scaling capabilities.",
        image: "/client/qaro.png",
        tag: "Kubernetes Cloud",
        stack: "EKS • Terraform • Docker",
      },
    ],
  },
  {
    id: "blockchain",
    index: "07",
    title: "DECENTRALIZED",
    domain: "SMART CONTRACTS & IMMUTABLE LEDGERS",
    shortTag: "DECENTRALIZED",
    description:
      "Smart contract development and decentralized application architectures for high-security, immutable business requirements.",
    details: ["Ethereum Mainnet", "Solidity Smart Contracts", "Asset Tokenization", "Immutable Auditing"],
    align: "center",
    containerClass: "items-center",
    projects: [
      {
        title: "EDHWI PROTOCOL",
        description:
          "Custom smart contract infrastructure deployed on Ethereum mainnet. Ensures immutable record-keeping and highly secure tokenized asset transfers.",
        image: "/client/Edhwi.svg",
        tag: "Ethereum Protocol",
        stack: "Solidity • Hardhat • Ethers.js",
      },
    ],
  },
];

export default function WhatWeBuild() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleToggle = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      setTimeout(() => {
        const el = itemRefs.current[id];
        if (el) {
          const yOffset = -100;
          const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 60);
    }
  };

  const handleFilterClick = (id: string) => {
    handleToggle(id);
  };

  return (
    <section
      id="what-we-build"
      className="relative w-full bg-[#FFFFFF] text-[#061A45] pt-20 sm:pt-28 pb-28 sm:pb-36 px-4 sm:px-8 md:px-12 border-t border-slate-200/90 overflow-hidden select-none"
    >
      {/* Subtle Blueprint Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="what-we-build-light-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#061A45" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#what-we-build-light-grid)" />
        </svg>
      </div>

      <div className="relative max-w-[1480px] mx-auto z-10">
        
        {/* SECTION HEADER + DISCIPLINE SELECTOR BAR */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0A369D] font-mono text-[10.5px] tracking-widest uppercase font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0A369D] animate-pulse" />
              <span># WHAT WE BUILD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Space_Grotesk'] font-bold tracking-tight text-[#061A45] uppercase">
              Engineering Disciplines &amp; Systems
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mt-2 font-normal">
              Hover over any discipline to deconstruct technical scope. Click to unlock verified client production dossiers.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {buildItems.map((item) => (
              <button
                key={item.id}
                suppressHydrationWarning
                onClick={() => handleFilterClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider uppercase font-semibold transition-all duration-200 border ${
                  expandedId === item.id
                    ? "bg-[#0A369D] text-white border-[#0A369D] shadow-sm font-bold"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:text-[#061A45] hover:bg-white"
                }`}
              >
                <span className="text-[#0A369D] font-bold mr-1.5">{item.index}</span>
                {item.shortTag}
              </button>
            ))}
          </div>
        </div>

        {/* SCULPTURAL KINETIC TYPOGRAPHY SYSTEM */}
        <div className="relative w-full flex flex-col space-y-10 sm:space-y-12 md:space-y-14">
          {buildItems.map((item, idx) => {
            const isHovered = hoveredId === item.id;
            const isExpanded = expandedId === item.id;
            const hasAnyHover = hoveredId !== null;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                }}
                className={`flex flex-col w-full ${item.containerClass}`}
              >
                {/* Discipline Interactive Row */}
                <div
                  className="relative cursor-pointer group py-4 px-2 sm:px-4 z-10 hover:z-20 max-w-full inline-block"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleToggle(item.id)}
                >
                  {/* Monospace Metadata Eyebrow */}
                  <div className="flex items-center gap-2.5 mb-1.5 transition-opacity duration-300">
                    <span className="font-mono text-[11px] sm:text-xs tracking-widest text-[#0A369D] font-bold">
                      [{item.index}]
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase text-slate-400 font-medium group-hover:text-slate-600 transition-colors">
                      {item.domain}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 ml-2 text-[9.5px] font-mono tracking-widest text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {item.projects.length} {item.projects.length === 1 ? "BUILD" : "BUILDS"}
                    </span>
                  </div>

                  {/* KINETIC MODERN SCULPTURAL HEADLINE */}
                  <div className="relative">
                    <motion.h3
                      className={`text-4xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[98px] font-black uppercase tracking-[-0.04em] transition-all duration-300 leading-[0.9] select-none font-['Space_Grotesk'] ${
                        isExpanded || isHovered
                          ? "text-[#0A369D]"
                          : hasAnyHover
                          ? "text-transparent [-webkit-text-stroke:1.25px_rgba(6,26,69,0.18)] opacity-35 hover:opacity-100"
                          : "text-[#061A45]"
                      }`}
                    >
                      {item.title}
                    </motion.h3>

                    {/* Hairline guide line */}
                    <div
                      className={`h-[1px] mt-2 transition-all duration-500 ${
                        isHovered || isExpanded
                          ? "w-full bg-[#0A369D]/40"
                          : "w-12 bg-slate-200 group-hover:w-24 group-hover:bg-[#0A369D]/20"
                      }`}
                    />
                  </div>

                  {/* FLOATING ARCHITECTURAL HUD LENS (ON HOVER) */}
                  <AnimatePresence>
                    {isHovered && !isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="mt-3.5 z-30"
                      >
                        <div className="inline-flex flex-wrap items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-blue-200/90 shadow-[0_6px_20px_rgba(10,54,157,0.08)]">
                          {item.details.slice(0, 3).map((detail, dIdx) => (
                            <span
                              key={dIdx}
                              className="text-[10px] sm:text-[11px] font-mono tracking-wider text-[#0A369D] uppercase font-semibold flex items-center gap-2.5"
                            >
                              {detail}
                              {dIdx < Math.min(item.details.length, 3) - 1 && (
                                <span className="w-1 h-1 bg-[#0A369D]/30 rounded-full inline-block" />
                              )}
                            </span>
                          ))}
                          <span className="w-1 h-1 bg-slate-300 rounded-full inline-block" />
                          <span className="text-[10px] font-mono font-bold text-slate-500 flex items-center gap-1 group-hover:text-[#0A369D]">
                            OPEN SPEC ↗
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* EXPANDED IN-PLACE ARCHITECTURAL DOSSIER */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: 12 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: 8 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden mt-6 w-full max-w-4xl text-left"
                      >
                        <div className="rounded-2xl bg-white border border-slate-200/95 shadow-[0_12px_40px_rgba(6,26,69,0.08)] p-6 sm:p-8 lg:p-10 relative">
                          
                          {/* Dossier Header Bar */}
                          <div className="pb-4 mb-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                            <div className="flex items-center gap-3">
                              <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[#0A369D] font-bold border border-blue-100">
                                SPEC {item.index}.0
                              </span>
                              <span className="text-slate-400">/</span>
                              <span className="text-slate-700 font-semibold">{item.domain}</span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                PRODUCTION VERIFIED
                              </span>
                              <button
                                suppressHydrationWarning
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedId(null);
                                }}
                                className="ml-2 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold transition-colors cursor-pointer"
                              >
                                CLOSE ✕
                              </button>
                            </div>
                          </div>

                          {/* Architectural Thesis */}
                          <div className="mb-6">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-[#0A369D] font-bold mb-2">
                              ARCHITECTURAL THESIS
                            </h4>
                            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                              {item.description}
                            </p>
                          </div>

                          {/* Engineering Competencies Tags */}
                          <div className="mb-8">
                            <h5 className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold mb-2.5">
                              ENGINEERING COMPETENCIES
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {item.details.map((detail, dIdx) => (
                                <span
                                  key={dIdx}
                                  className="px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[11px] font-medium"
                                >
                                  {detail}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Verified Client Project Bento Grid */}
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="text-[11px] font-mono uppercase tracking-widest text-[#0A369D] font-bold flex items-center gap-2">
                                <span>VERIFIED PRODUCTION BUILDS</span>
                                <span className="px-2 py-0.5 rounded bg-blue-100 text-[#0A369D] text-[10px] font-bold">
                                  {item.projects.length}
                                </span>
                              </h5>
                              <span className="text-[10px] font-mono text-slate-400">
                                ACTIVE CLIENT PLATFORMS
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {item.projects.map((project, pIdx) => (
                                <div
                                  key={pIdx}
                                  className="group/card rounded-xl bg-slate-50/80 border border-slate-200 p-5 hover:bg-white hover:border-[#0A369D]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                                >
                                  <div>
                                    {/* Client Header Tile */}
                                    <div className="flex items-center justify-between gap-3 mb-4">
                                      <div className="relative w-12 h-12 shrink-0 rounded-lg bg-white border border-slate-200 p-1.5 flex items-center justify-center overflow-hidden shadow-2xs">
                                        <Image
                                          src={project.image}
                                          alt={project.title}
                                          fill
                                          className="object-contain p-1 group-hover/card:scale-105 transition-transform"
                                          sizes="48px"
                                        />
                                      </div>

                                      <div className="flex flex-col items-end">
                                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#0A369D] font-bold border border-slate-200">
                                          {project.tag}
                                        </span>
                                        {project.stack && (
                                          <span className="font-mono text-[9px] text-slate-400 mt-1">
                                            {project.stack}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Project Title & Narrative */}
                                    <h6 className="font-bold text-base text-[#061A45] mb-2 group-hover/card:text-[#0A369D] transition-colors flex items-center justify-between">
                                      <span>{project.title}</span>
                                      <span className="text-[#0A369D] text-sm opacity-0 group-hover/card:opacity-100 transition-opacity">
                                        →
                                      </span>
                                    </h6>
                                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                      {project.description}
                                    </p>
                                  </div>

                                  {/* Bottom Status */}
                                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                                    <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                      DEPLOYED IN PRODUCTION
                                    </span>
                                    <span className="text-[#0A369D] font-bold group-hover/card:underline">
                                      AUDITED ↗
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

                {/* Horizontal divider */}
                {idx < buildItems.length - 1 && (
                  <div className="w-full border-b border-slate-100 my-2 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
