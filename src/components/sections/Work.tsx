"use client";

import { motion } from "framer-motion";

const projects = [
  {
    client: "MARYSADAN",
    industry: "CONSTRUCTION / ERP",
    desc: "A comprehensive multi-site operations system handling procurement, labor, and real-time cost tracking.",
    stats: ["13 MODULES", "~80 REPORTS", "MULTI-SITE"],
  },
  {
    client: "RETAIL CORP",
    industry: "RETAIL / DISTRIBUTION",
    desc: "Centralized inventory and POS synchronization across 40+ branch locations.",
    stats: ["40+ BRANCHES", "REAL-TIME SYNC", "CENTRALIZED DATA"],
  }
];

export default function Work() {
  return (
    <section id="work" className="py-32 px-8 bg-white border-t border-border-subtle">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-brand-blue mb-4">
          # SELECTED WORK
        </h2>
        <p className="text-2xl font-medium text-foreground max-w-2xl mb-24 text-balance">
          Systems we've engineered across different environments.
        </p>

        <div className="space-y-32">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start"
            >
              <div className="lg:w-2/3 w-full aspect-video bg-surface-100 border border-border-subtle rounded-xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-blue/5 group-hover:bg-brand-blue/10 transition-colors duration-500" />
                <span className="font-mono text-sm tracking-widest text-foreground/40">[ PROJECT VISUAL ]</span>
              </div>
              
              <div className="lg:w-1/3 flex flex-col pt-4">
                <div className="text-xs font-mono font-bold tracking-widest text-brand-blue mb-2">
                  {project.client}
                </div>
                <div className="text-sm font-mono tracking-wider text-foreground/60 mb-8 pb-8 border-b border-border-subtle">
                  {project.industry}
                </div>
                
                <p className="text-xl leading-relaxed mb-8">
                  {project.desc}
                </p>
                
                <ul className="space-y-4">
                  {project.stats.map((stat, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-bold tracking-widest text-brand-blue-dark">
                      <span className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
                      {stat}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
