"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Maximize2,
  X,
  Camera,
  MapPin,
  Pause,
  Play,
} from "lucide-react";

interface GalleryItem {
  id: string;
  index: string;
  src: string;
  title: string;
  category: string;
  location: string;
  aspectRatio: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-1",
    index: "01",
    src: "/GAL_1.jpg",
    title: "Core Engineering Suite",
    category: "INFRASTRUCTURE",
    location: "HQ • Main Lab Floor",
    aspectRatio: "w-[420px] sm:w-[540px] aspect-[16/10]",
    description:
      "High-density engineering stations and continuous build monitoring terminals configured for low-latency kernel and microservice development.",
  },
  {
    id: "g-2",
    index: "02",
    src: "/GAL_2.jpg",
    title: "Architecture Synthesis",
    category: "COLLABORATION",
    location: "Studio • Node B",
    aspectRatio: "w-[360px] sm:w-[460px] aspect-[4/3]",
    description:
      "Cross-disciplinary architectural reviews, consensus protocol dissection, and client state synchronization sprints.",
  },
  {
    id: "g-3",
    index: "03",
    src: "/GAL_3.jpg",
    title: "Runtime Prototyping Bay",
    category: "RESEARCH & DEV",
    location: "Hardware Bay • Lab 02",
    aspectRatio: "w-[380px] sm:w-[480px] aspect-[4/3]",
    description:
      "Hardware acceleration testbeds, edge telemetry gateways, and cold-start benchmark simulations.",
  },
  {
    id: "g-4",
    index: "04",
    src: "/GAL_4.jpg",
    title: "The Collective Craft",
    category: "PEOPLE & CULTURE",
    location: "FirstLogic Open Commons",
    aspectRatio: "w-[480px] sm:w-[600px] aspect-[16/9]",
    description:
      "The multidisciplinary engineers, researchers, and system designers driving FirstLogic Meta Lab's sovereign computing thesis.",
  },
];

export default function Gallery() {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const marqueeItems = [...GALLERY_ITEMS, ...GALLERY_ITEMS, ...GALLERY_ITEMS];

  return (
    <section
      id="gallery"
      className="py-24 sm:py-32 bg-white text-[#061A45] border-t border-slate-200/90 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* EDITORIAL HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0A369D] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A369D]">
                # THE LAB IN ACTION
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#061A45] tracking-tight uppercase leading-tight mb-3">
              Glimpses of <span className="text-[#0A369D]">Our Craft.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Authentic visual records of our engineering infrastructure, physical nodes, and collaborative sprints.
            </p>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <button
              suppressHydrationWarning
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-mono font-medium text-slate-700 transition-colors shadow-xs cursor-pointer"
              title={isPaused ? "Resume Stream" : "Pause Stream"}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#0A369D]" />
                  <span>RESUME STREAM</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-slate-400" />
                  <span>PAUSE STREAM</span>
                </>
              )}
            </button>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A369D] hover:bg-[#08297A] text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
            >
              <span>ALL ARCHIVES</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* INFINITE SEAMLESS MARQUEE STREAM */}
      <div
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Soft Fade Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        {/* Continuous Marquee Ticker */}
        <div
          className={`flex gap-6 w-max select-none ${
            isPaused ? "[animation-play-state:paused]" : ""
          } animate-[galleryMarquee_50s_linear_infinite]`}
        >
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => setSelectedItem(item)}
              className={`${item.aspectRatio} relative shrink-0 rounded-2xl overflow-hidden cursor-pointer border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-400 transition-all duration-300 group bg-slate-50`}
            >
              {/* Photo Image */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 80vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* High-Tech Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300" />

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#061A45] border border-slate-200 font-mono text-[10px] font-bold tracking-wider uppercase shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A369D]" />
                  {item.category}
                </span>
              </div>

              {/* Top Right Expand Icon */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                <div className="w-8 h-8 rounded-lg bg-white/95 text-[#061A45] flex items-center justify-center shadow-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bottom Standard Caption */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 text-white">
                <div className="flex items-center gap-1.5 text-slate-300 font-mono text-xs font-medium tracking-wider uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-white uppercase mb-1 font-['Space_Grotesk']">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-200 line-clamp-1 font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono uppercase tracking-wider text-slate-400">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#0A369D]" />
          <span>AUTHENTIC PHYSICAL LAB CAPTURES &bull; KOCHI &bull; BANGALORE</span>
        </div>
        <div>
          <Link href="/gallery" className="text-[#0A369D] hover:underline font-bold flex items-center gap-1">
            <span>VIEW FULL CURATED ARCHIVE</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* INTERACTIVE MODAL LIGHTBOX */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <button
              suppressHydrationWarning
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="p-6 sm:p-8 bg-white border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[#061A45]">
                <div>
                  <div className="flex items-center gap-2 text-[#0A369D] font-mono text-xs uppercase tracking-wider mb-1 font-semibold">
                    <span>{selectedItem.category}</span>
                    <span>&bull;</span>
                    <span>{selectedItem.location}</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#061A45] tracking-tight uppercase font-['Space_Grotesk']">
                    {selectedItem.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-normal">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="shrink-0 font-mono text-xs text-slate-400">
                  <div className="text-[#0A369D] font-bold">FRAME {selectedItem.index} OF 04</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
