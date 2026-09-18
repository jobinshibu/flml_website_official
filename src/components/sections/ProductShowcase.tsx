"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Smartphone, 
  Monitor, 
  ExternalLink, 
  Zap, 
  ShieldCheck, 
  Database, 
  Layers, 
  ArrowRight,
  Filter,
  Sparkles
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: "mobile" | "erp" | "b2b" | "ai";
  categoryLabel: string;
  client: string;
  logo: string;
  screenshot: string;
  deviceType: "phone" | "laptop";
  headline: string;
  description: string;
  stats: string;
  techStack: string[];
  features: string[];
}

const PRODUCTS: Product[] = [
  {
    id: "karikku",
    name: "Karikku OTT Video Mesh",
    category: "mobile",
    categoryLabel: "HIGH-TRAFFIC MEDIA APP",
    client: "KARIKKU MEDIA PLATFORM",
    logo: "/client/Karikku.svg",
    screenshot: "/screenshots/karikku.jpg",
    deviceType: "phone",
    headline: "High-Concurrency Video Streaming Infrastructure",
    description: "Bespoke mobile media routing app engineered to sustain over 2.4 Million concurrent user spikes during blockbuster episode launches with zero video buffering or edge server downtime.",
    stats: "2.4M+ Concurrent Spike | < 18ms Latency",
    techStack: ["React Native", "Go Edge Routing", "HLS Video Mesh", "AWS CloudFront", "Redis L2"],
    features: ["Sub-18ms Segment Delivery", "Adaptive Bitrate Engine", "Real-Time 100k+ View Counter"]
  },
  {
    id: "healine",
    name: "Healine Healthcare ERP",
    category: "erp",
    categoryLabel: "ENTERPRISE HEALTHCARE APP",
    client: "HEALINE HEALTHCARE SYSTEM",
    logo: "/client/healine.png",
    screenshot: "/screenshots/healine.jpg",
    deviceType: "phone",
    headline: "HIPAA-Compliant Encrypted Clinical Backbone",
    description: "Mission-critical mobile medical management system connecting 50+ hospital branches, real-time patient heart rate telemetry, and encrypted electronic health records with instant doctor dispatch.",
    stats: "50+ Clinics Synchronized | HIPAA Compliant",
    techStack: ["React Native", "TypeScript", "AES-256 EMR Vault", "PostgreSQL Shards", "GraphQL"],
    features: ["Real-time Vitals Telemetry", "End-to-End Encrypted EMR", "Instant Doctor Scheduling"]
  },
  {
    id: "thara_cart",
    name: "Thara Cart B2B Ecosystem",
    category: "b2b",
    categoryLabel: "B2B WHOLESALE MARKETPLACE",
    client: "THARA CART B2B ECOSYSTEM",
    logo: "/client/thara_cart.png",
    screenshot: "/screenshots/thara_cart.jpg",
    deviceType: "phone",
    headline: "High-Scale Wholesale E-Commerce Engine",
    description: "Multi-tenant wholesale marketplace app managing 100,000+ active SKUs, sub-10ms fast vector product search, automated bulk pricing calculators, and multi-vendor invoice orchestration.",
    stats: "100,000+ Active SKUs | Sub-10ms DB Search",
    techStack: ["Next.js App Router", "React Native", "ElasticSearch", "Node.js", "Docker Pods"],
    features: ["Sub-10ms Catalog Search", "Bulk Tiered Price Engine", "Automated Invoice Generation"]
  },
  {
    id: "3ms",
    name: "3MS Analytics & QARO AI",
    category: "ai",
    categoryLabel: "PREDICTIVE AI & VECTOR CLOUD",
    client: "3MS ANALYTICS & QARO CLOUD",
    logo: "/client/3ms.png",
    screenshot: "/screenshots/healine.jpg", // Fallback high quality UI frame
    deviceType: "phone",
    headline: "Intelligent Organizational Decision Engines",
    description: "Advanced predictive vector neural engine platform that transforms raw enterprise database logs into accurate operational demand forecasts weeks ahead of market shifts.",
    stats: "99.999% Availability | Real-Time Vector ML",
    techStack: ["Python PyTorch", "Vector DB", "Go Microservices", "Kubernetes Mesh", "ClickHouse"],
    features: ["Predictive Forecasting", "Vector Semantic Search", "Real-Time Anomaly Alerting"]
  }
];

export default function ProductShowcase() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProducts = activeFilter === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-[#030712] text-white relative border-b border-blue-900/30 overflow-hidden">
      
      {/* Ambient Radial Backdrop Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20 pointer-events-none blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(6,182,212,0.3) 50%, transparent 80%)"
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-blue-900/40 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-[0.25em] uppercase mb-3 font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>ENGINEERED PRODUCTS & APPLICATIONS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-white tracking-tight leading-tight">
              PRODUCTIONS IN THE WILD.
            </h2>
            <p className="mt-3 text-slate-400 text-sm md:text-base max-w-2xl font-light">
              Explore custom mobile applications, enterprise ERP backbones, and high-scale cloud platforms engineered by First Logic Meta Lab.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-full border border-slate-800 backdrop-blur-md">
            {[
              { id: "all", label: "ALL PRODUCTS" },
              { id: "mobile", label: "MOBILE APPS" },
              { id: "erp", label: "ENTERPRISE ERP" },
              { id: "b2b", label: "B2B COMMERCE" },
              { id: "ai", label: "AI & CLOUD" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full font-mono text-[11px] tracking-wider uppercase transition-all duration-300 ${
                  activeFilter === tab.id
                    ? "bg-blue-600 text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="space-y-24">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-950/60 border border-slate-800/80 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl relative group hover:border-blue-500/40 transition-colors`}
                >
                  
                  {/* Left or Right Column: Product Phone Frame Mockup */}
                  <div className={`lg:col-span-5 flex justify-center ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    
                    {/* Realistic iPhone Device Frame */}
                    <div className="relative w-[280px] sm:w-[310px] aspect-[9/19] rounded-[48px] p-3 bg-slate-900 border-[5px] border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                      
                      {/* Dynamic Island / iPhone Notch */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-black z-30 flex items-center justify-end px-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
                      </div>

                      {/* Screen Content Image */}
                      <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-black">
                        <Image
                          src={product.screenshot}
                          alt={product.name}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 320px"
                          priority={idx === 0}
                        />

                        {/* Glass Reflection Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-20" />
                      </div>

                      {/* Home Indicator Bar */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-white/40 z-30" />
                    </div>

                  </div>

                  {/* Right or Left Column: Product Details & Metrics */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    
                    {/* Category Badge & Client Info */}
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                        {product.categoryLabel}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
                        CLIENT: {product.client}
                      </span>
                    </div>

                    {/* Product Name & Headline */}
                    <div>
                      <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
                        {product.name}
                      </h3>
                      <p className="text-sm md:text-base text-cyan-400 font-mono mt-1 font-semibold">
                        {product.headline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                      {product.description}
                    </p>

                    {/* High-Performance Stats Pill */}
                    <div className="bg-slate-900/90 border border-blue-500/30 p-4 rounded-2xl font-mono text-xs text-cyan-300 flex items-center gap-3 shadow-inner">
                      <Zap className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
                      <span className="font-semibold">{product.stats}</span>
                    </div>

                    {/* Key Architecture Features */}
                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block">
                        KEY ARCHITECTURAL HIGHLIGHTS
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="pt-2">
                      <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block mb-2">
                        ENGINEERING TECH STACK
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {product.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Link
                        href={`/${product.id === 'thara_cart' ? 'thara-cart' : product.id}`}
                        prefetch={true}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm px-6 py-3.5 rounded-full transition-all uppercase tracking-wider shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                      >
                        <span>Explore Dedicated Page & Case Study</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <a
                        href="/#consultation"
                        className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-mono text-xs md:text-sm px-6 py-3.5 rounded-full transition-all uppercase tracking-wider"
                      >
                        <span>Initiate Brief</span>
                      </a>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
