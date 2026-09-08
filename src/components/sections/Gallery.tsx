"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Gallery() {
  return (
    <section id="gallery" className="py-32 px-8 bg-white border-t border-border-subtle">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-brand-blue mb-4">
            # THE LAB IN ACTION
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-foreground max-w-2xl mx-auto">
            Glimpses of our craft, infrastructure, and the people behind the code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 lg:col-span-2 aspect-video bg-surface-100 border border-border-subtle rounded flex items-center justify-center relative overflow-hidden group"
          >
            <Image src="/GAL_1.jpg" alt="Gallery Image 1" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-brand-blue-dark/10 group-hover:bg-transparent transition-colors duration-500" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="aspect-square md:aspect-auto lg:aspect-square bg-surface-100 border border-border-subtle rounded flex items-center justify-center relative overflow-hidden group"
          >
            <Image src="/GAL_2.jpg" alt="Gallery Image 2" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-brand-blue-dark/10 group-hover:bg-transparent transition-colors duration-500" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="aspect-square bg-surface-100 border border-border-subtle rounded flex items-center justify-center relative overflow-hidden group"
          >
            <Image src="/GAL_3.jpg" alt="Gallery Image 3" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-brand-blue-dark/10 group-hover:bg-transparent transition-colors duration-500" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 lg:col-span-2 aspect-[21/9] bg-surface-100 border border-border-subtle rounded flex items-center justify-center relative overflow-hidden group"
          >
            <Image src="/GAL_4.jpg" alt="Gallery Image 4" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-brand-blue-dark/10 group-hover:bg-transparent transition-colors duration-500" />
          </motion.div>
        </div>

        <div className="mt-16 flex justify-center">
          <Link 
            href="/gallery" 
            className="inline-flex items-center gap-4 bg-brand-blue text-white px-8 py-4 font-mono text-sm tracking-widest uppercase hover:bg-brand-blue-dark transition-colors"
          >
            View More
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
