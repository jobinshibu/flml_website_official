"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  Cpu,
  Server,
  Activity
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ProjectDetail, PROJECTS_DATA } from "@/lib/productsData";

interface Props {
  project: ProjectDetail;
}

export default function ProjectDetailView({ project }: Props) {
  const router = useRouter();
  const projectKeys = Object.keys(PROJECTS_DATA);
  const currentIndex = projectKeys.indexOf(project.id);
  const nextKey = projectKeys[(currentIndex + 1) % projectKeys.length];
  const prevKey = projectKeys[(currentIndex - 1 + projectKeys.length) % projectKeys.length];
  const nextProject = PROJECTS_DATA[nextKey];
  const prevProject = PROJECTS_DATA[prevKey];

  const handleBackToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    router.push("/");
  };

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#030712] text-white pt-24 pb-20 px-6 md:px-12 relative overflow-hidden"
    >
      
      {/* Background Radial Glow */}
      <div 
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-25 pointer-events-none blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(59,130,246,0.2) 60%, transparent 80%)"
        }}
      />

      <div className="max-w-[1300px] mx-auto relative z-10 space-y-16">
        
        {/* Top Breadcrumb Navigation */}
        <div className="flex items-center justify-between border-b border-blue-900/30 pb-6">
          <Link
            href="/"
            prefetch={true}
            scroll={true}
            onMouseEnter={() => router.prefetch("/")}
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
              CASE STUDY // {project.id.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Hero Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Metadata & Titles */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 font-mono text-xs text-cyan-300 font-bold uppercase tracking-wider">
                {project.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase text-white tracking-tight leading-[1.08]">
              {project.name}
            </h1>

            <p className="text-lg md:text-xl text-cyan-400 font-mono font-medium leading-snug">
              {project.headline}
            </p>

            <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-2xl">
              {project.overview}
            </p>

            {/* Client Pill */}
            <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl max-w-md">
              <div className="relative w-12 h-12 bg-slate-800 border border-slate-700 rounded-xl p-1.5 shrink-0">
                <Image
                  src={project.clientLogo}
                  alt={project.client}
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">ENTERPRISE CLIENT</p>
                <p className="text-sm font-bold text-white">{project.client}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="/#consultation"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(37,99,235,0.4)] uppercase tracking-wider"
              >
                <span>Initiate Similar Architecture</span>
                <span className="text-base">→</span>
              </a>
            </div>

          </div>

          {/* Right: Phone Device Mockup Frame */}
          <div className="lg:col-span-5 flex justify-center">
            
            {/* Realistic iPhone Device Frame */}
            <div className="relative w-[290px] sm:w-[330px] aspect-[9/19] rounded-[48px] p-3.5 bg-slate-900 border-[5px] border-slate-800 shadow-[0_30px_80px_rgba(0,0,0,0.9)] relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
              
              {/* Dynamic Island / Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-black z-30 flex items-center justify-end px-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
              </div>

              {/* Screen Screenshot */}
              <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-black">
                <Image
                  src={project.screenshot}
                  alt={project.name}
                  fill
                  className="object-cover object-top"
                  sizes="350px"
                  priority
                />

                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-20" />
              </div>

              {/* Home Bar */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-white/40 z-30" />
            </div>

          </div>

        </div>

        {/* Benchmark Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
          {project.stats.map((stat, i) => (
            <div
              key={i}
              className="bg-slate-950/80 border border-blue-500/25 p-5 rounded-2xl backdrop-blur-md shadow-xl"
            >
              <div className="text-2xl md:text-3xl font-extrabold text-cyan-300 font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Narrative Section: Challenge & Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-blue-900/30 pt-12">
          
          <div className="lg:col-span-6 bg-slate-950/60 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">
              <Zap className="w-4 h-4" />
              <span>THE OPERATIONAL CHALLENGE</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              High-Scale Infrastructure Bottlenecks
            </h3>
            <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="lg:col-span-6 bg-slate-950/60 border border-blue-500/30 rounded-3xl p-8 backdrop-blur-xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>THE FLML ENGINEERING SOLUTION</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Custom Architecture & Micro-Routing
            </h3>
            <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
              {project.solution}
            </p>
          </div>

        </div>

        {/* Core Architecture Features */}
        <div className="space-y-6 border-t border-blue-900/30 pt-12">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-[0.25em] font-bold block mb-1">
                SYSTEM CAPABILITIES
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold uppercase text-white tracking-tight">
                KEY ARCHITECTURAL HIGHLIGHTS
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-slate-950/60 border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-cyan-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Full Tech Stack Matrix */}
        <div className="space-y-6 border-t border-blue-900/30 pt-12">
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-[0.25em] font-bold block">
            TECHNICAL DEPLOYMENT MATRIX
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.techStack.map((stack, i) => (
              <div key={i} className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold block border-b border-slate-800 pb-2">
                  {stack.category}
                </span>
                <div className="space-y-2">
                  {stack.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated Project Consultation CTA */}
        <div className="bg-slate-950/90 border border-blue-500/30 p-8 md:p-12 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden border-t">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-[0.25em]">
              CUSTOM ARCHITECTURE ENGAGEMENT
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
              Need a Similar System Built for Your Enterprise?
            </h3>
            <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
              Initiate a confidential technical brief with First Logic Meta Lab system architects to engineer a high-scale platform tailored to your operational requirements.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#consultation"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(37,99,235,0.4)] uppercase tracking-wider"
            >
              <span>Initiate Technical Brief</span>
              <span className="text-base">→</span>
            </a>
          </div>
        </div>

      </div>

    </motion.article>
  );
}
