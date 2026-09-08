"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-32 px-8 bg-brand-blue-dark text-white relative overflow-hidden">
      {/* Background blueprint grid for consistency */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blueprint-grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid-light)" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-brand-blue-light/50 mb-16">
          # THE DOCTRINE
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left Column: The Philosophy */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight"
            >
              OPERATIONAL ANATOMY FIRST. <br />
              <span className="text-brand-blue-light/50">CODE SECOND.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6 text-base md:text-lg text-white/70 leading-relaxed font-medium"
            >
              <p>
                We do not sell off-the-shelf software. Generic technology forces a business to compromise its unique workflows to fit rigid limitations. We reverse that equation.
              </p>
              <p>
                Before a single line of code is written, our system architects surgically dissect the anatomy of your operations. We map every point, every node, and every feedback loop of your specific business model. We study the friction. We locate the leakage.
              </p>
              <p>
                Only after achieving absolute comprehension do we engineer a bespoke, high-scale technological backbone. The result is a precise digital ecosystem tailored exclusively to execute your vision and dominate your market.
              </p>
            </motion.div>
          </div>

          {/* Right Column: The Metrics / History */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">

              <div className="bg-brand-blue-dark p-8 flex flex-col justify-center items-center text-center">
                <span className="text-4xl md:text-5xl font-black text-white mb-2">11<span className="text-brand-blue-light/50">+</span></span>
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">Years of Evolution</span>
              </div>

              <div className="bg-brand-blue-dark p-8 flex flex-col justify-center items-center text-center">
                <span className="text-4xl md:text-5xl font-black text-white mb-2">50<span className="text-brand-blue-light/50">+</span></span>
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">Elite Architects</span>
              </div>

              <div className="bg-brand-blue-dark p-8 flex flex-col justify-center items-center text-center">
                <span className="text-4xl md:text-5xl font-black text-white mb-2">200<span className="text-brand-blue-light/50">+</span></span>
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">Global Deployments</span>
              </div>

              <div className="bg-brand-blue-dark p-8 flex flex-col justify-center items-center text-center">
                <span className="text-4xl md:text-5xl font-black text-white mb-2">10<span className="text-brand-blue-light/50">+</span></span>
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">Territories Active</span>
              </div>

            </div>

            <div className="mt-8 border-l border-white/20 pl-6">
              <p className="font-mono text-xs tracking-widest text-white/40 leading-relaxed uppercase">
                Established 2016. Evolved into First Logic Meta Lab in 2018. Now operating globally with a relentless commitment to engineering absolute precision.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
