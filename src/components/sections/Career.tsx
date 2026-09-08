"use client";

import { motion } from "framer-motion";

export default function Career() {
  return (
    <section id="career" className="py-32 px-8 bg-brand-blue-dark text-white border-y border-brand-blue/30">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-brand-blue-light mb-4">
            # JOIN THE META LAB
          </h2>
          <p className="text-3xl md:text-5xl font-bold mb-8 text-balance">
            Build systems that actually matter.
          </p>
          <p className="text-xl text-white/70 mb-12 max-w-2xl leading-relaxed">
            We are always looking for serious engineers, architects, and product specialists who want to solve complex problems without the corporate bureaucracy.
          </p>
          <a
            href="mailto:info@firstlogicmetalab.com"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue-dark bg-white px-8 py-4 hover:bg-brand-blue-light transition-colors rounded-sm shadow-xl"
          >
            <span>VIEW OPEN POSITIONS</span>
            <span>→</span>
          </a>
        </div>

        <div className="flex-1 w-full relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full aspect-video bg-black/40 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-transparent" />
            <span className="font-mono text-sm tracking-widest text-white/50 relative z-10">[ TEAM / OFFICE VISUAL ]</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
