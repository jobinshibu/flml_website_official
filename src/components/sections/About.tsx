"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function CounterNumber({ value, suffix = "+", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Smooth cubic ease-out so all numbers start together and settle softly at destination
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * value);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">
      {count}
      <span className="text-cyan-400">{suffix}</span>
    </span>
  );
}

function HoverWordParagraph({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <p>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-200 ease-out hover:text-cyan-300 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.9)] cursor-default mr-[0.28em]"
        >
          {word}
        </span>
      ))}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="py-12 md:py-20 px-6 md:px-12 bg-transparent text-white relative z-10">
      
      <div className="max-w-[1400px] mx-auto">

        {/* Section Index Header */}
        <div className="flex items-center gap-3 mb-16">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-300 font-semibold">
            THE DOCTRINE
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
                <span className="text-cyan-400">CODE SECOND.</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-6 text-base md:text-xl text-slate-200 leading-relaxed font-light"
              >
                <HoverWordParagraph text="We do not sell off-the-shelf software. Generic technology forces a business to compromise its unique operational workflows to fit rigid platform limitations. We reverse that equation." />
                <HoverWordParagraph text="Before a single line of code is written, our system architects surgically dissect the anatomy of your operations. We map every process node, data dependency, and bottleneck in your organization." />
                <HoverWordParagraph text="Only after achieving total comprehension do we engineer a bespoke, high-scale technological backbone. The outcome is an unbreakable digital ecosystem designed exclusively to power your expansion." />
              </motion.div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/15 flex items-center justify-between font-mono text-xs text-slate-300 uppercase tracking-widest font-medium">
              <span>ESTABLISHED 2016</span>
              <span>GLOBAL OPERATIONS</span>
            </div>
          </div>

          {/* Right Column: 1px Hairline Grid Stat Blocks with Synchronized Counter Animation */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="grid grid-cols-2 bg-white/15 gap-px border border-white/20 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">

              <div className="bg-slate-950/80 p-8 flex flex-col justify-center items-center text-center hover:bg-slate-900/90 transition-colors">
                <CounterNumber value={11} duration={2000} />
                <span className="font-mono text-[11px] tracking-widest text-slate-300 uppercase font-semibold">Years of Evolution</span>
              </div>

              <div className="bg-slate-950/80 p-8 flex flex-col justify-center items-center text-center hover:bg-slate-900/90 transition-colors">
                <CounterNumber value={50} duration={2000} />
                <span className="font-mono text-[11px] tracking-widest text-slate-300 uppercase font-semibold">Elite Architects</span>
              </div>

              <div className="bg-slate-950/80 p-8 flex flex-col justify-center items-center text-center hover:bg-slate-900/90 transition-colors">
                <CounterNumber value={200} duration={2000} />
                <span className="font-mono text-[11px] tracking-widest text-slate-300 uppercase font-semibold">Global Deployments</span>
              </div>

              <div className="bg-slate-950/80 p-8 flex flex-col justify-center items-center text-center hover:bg-slate-900/90 transition-colors">
                <CounterNumber value={10} duration={2000} />
                <span className="font-mono text-[11px] tracking-widest text-slate-300 uppercase font-semibold">Territories Active</span>
              </div>

            </div>

            <div className="mt-8 border-l-2 border-cyan-400/80 pl-6">
              <HoverWordParagraph text="First Logic Meta Lab builds mission-critical technology backbones for global enterprises, scaling ventures, and complex supply chain networks." />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

