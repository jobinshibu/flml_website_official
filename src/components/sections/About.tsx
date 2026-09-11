"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-12 md:py-20 px-6 md:px-12 bg-black text-white relative border-b border-white/10">
      
      <div className="max-w-[1400px] mx-auto">

        {/* Section Index Header */}
        <div className="flex items-center gap-3 mb-16">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <h2 className="text-xs font-mono tracking-[0.3em] uppercase text-white/50">
            01 // THE DOCTRINE
          </h2>
        </div>

        {/* 2-Column Hairline Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left Column: The Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-[1.1] tracking-tight text-white"
              >
                OPERATIONAL ANATOMY FIRST. <br />
                <span className="text-white/40">CODE SECOND.</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-6 text-base md:text-xl text-white/70 leading-relaxed font-light"
              >
                <p>
                  We do not sell off-the-shelf software. Generic technology forces a business to compromise its unique operational workflows to fit rigid platform limitations. We reverse that equation.
                </p>
                <p>
                  Before a single line of code is written, our system architects surgically dissect the anatomy of your operations. We map every process node, data dependency, and bottleneck in your organization.
                </p>
                <p>
                  Only after achieving total comprehension do we engineer a bespoke, high-scale technological backbone. The outcome is an unbreakable digital ecosystem designed exclusively to power your expansion.
                </p>
              </motion.div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white/40 uppercase tracking-widest">
              <span>ESTABLISHED 2016</span>
              <span>GLOBAL OPERATIONS</span>
            </div>
          </div>

          {/* Right Column: 1px Hairline Grid Stat Blocks */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="grid grid-cols-2 bg-white/10 gap-px border border-white/10 rounded-2xl overflow-hidden">

              <div className="bg-black p-8 flex flex-col justify-center items-center text-center hover:bg-neutral-950 transition-colors">
                <span className="text-4xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">11<span className="text-blue-500">+</span></span>
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">Years of Evolution</span>
              </div>

              <div className="bg-black p-8 flex flex-col justify-center items-center text-center hover:bg-neutral-950 transition-colors">
                <span className="text-4xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">50<span className="text-blue-500">+</span></span>
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">Elite Architects</span>
              </div>

              <div className="bg-black p-8 flex flex-col justify-center items-center text-center hover:bg-neutral-950 transition-colors">
                <span className="text-4xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">200<span className="text-blue-500">+</span></span>
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">Global Deployments</span>
              </div>

              <div className="bg-black p-8 flex flex-col justify-center items-center text-center hover:bg-neutral-950 transition-colors">
                <span className="text-4xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">10<span className="text-blue-500">+</span></span>
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">Territories Active</span>
              </div>

            </div>

            <div className="mt-8 border-l border-white/20 pl-6">
              <p className="font-mono text-xs tracking-widest text-white/40 leading-relaxed uppercase">
                First Logic Meta Lab builds mission-critical technology backbones for global enterprises, scaling ventures, and complex supply chain networks.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

