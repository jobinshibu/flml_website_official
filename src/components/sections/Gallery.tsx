"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-36 px-6 md:px-12 bg-black text-white relative border-b border-white/10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <h2 className="text-xs font-mono tracking-[0.3em] uppercase text-white/50">
              05 // THE LAB IN ACTION
            </h2>
          </div>
          <Link 
            href="/gallery" 
            className="hidden sm:inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white/70 hover:text-white uppercase transition-colors"
          >
            <span>View Full Archive</span>
            <span>→</span>
          </Link>
        </div>

        {/* Editorial Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 lg:col-span-2 aspect-video bg-neutral-950 border border-white/15 rounded-2xl flex items-center justify-center relative overflow-hidden group shadow-2xl"
          >
            <Image src="/GAL_1.jpg" alt="Gallery Image 1" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 font-mono text-xs text-white/70 tracking-widest uppercase">
              RESEARCH & INFRASTRUCTURE // PERINTHALMANNA
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="aspect-square bg-neutral-950 border border-white/15 rounded-2xl flex items-center justify-center relative overflow-hidden group shadow-2xl"
          >
            <Image src="/GAL_2.jpg" alt="Gallery Image 2" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 font-mono text-xs text-white/70 tracking-widest uppercase">
              SYSTEM ARCHITECTS
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="aspect-square bg-neutral-950 border border-white/15 rounded-2xl flex items-center justify-center relative overflow-hidden group shadow-2xl"
          >
            <Image src="/GAL_3.jpg" alt="Gallery Image 3" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 font-mono text-xs text-white/70 tracking-widest uppercase">
              DEEP CORE SESSIONS
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 lg:col-span-2 aspect-[21/9] bg-neutral-950 border border-white/15 rounded-2xl flex items-center justify-center relative overflow-hidden group shadow-2xl"
          >
            <Image src="/GAL_4.jpg" alt="Gallery Image 4" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 font-mono text-xs text-white/70 tracking-widest uppercase">
              GLOBAL TEAM COLLABORATION
            </div>
          </motion.div>
        </div>

        {/* Mobile View Archive Button */}
        <div className="mt-12 flex justify-center sm:hidden">
          <Link 
            href="/gallery" 
            className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-sans font-bold text-xs tracking-widest uppercase hover:bg-neutral-200 transition-colors"
          >
            <span>View Full Archive</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

