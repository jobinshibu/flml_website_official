import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/navigation";
import { ArrowLeft, MapPin, Camera } from "lucide-react";

interface GalleryRecord {
  src: string;
  title: string;
  category: string;
  location: string;
  meta: string;
  caption: string;
}

const records: GalleryRecord[] = [
  {
    src: "/GAL_1.jpg",
    title: "Core Engineering Suite",
    category: "INFRASTRUCTURE",
    location: "HQ • Main Lab Floor",
    meta: "GRID: 09°58'N 76°17'E // REC_01",
    caption: "High-density engineering stations and continuous build monitoring terminals.",
  },
  {
    src: "/GAL_2.jpg",
    title: "Architecture Synthesis",
    category: "COLLABORATION",
    location: "Studio • Node B",
    meta: "SPRINT: ALPHA-CYCLE // REC_02",
    caption: "Cross-disciplinary architectural reviews and real-time algorithmic dissection.",
  },
  {
    src: "/GAL_3.jpg",
    title: "Runtime Testing Matrix",
    category: "RESEARCH & DEV",
    location: "Prototyping Bay",
    meta: "LATENCY TESTBED // REC_03",
    caption: "Hardware acceleration testing benches and edge device simulation suites.",
  },
  {
    src: "/GAL_4.jpg",
    title: "The Collective Craft",
    category: "PEOPLE & CULTURE",
    location: "FirstLogic Open Commons",
    meta: "CRAFT & COMMUNITY // REC_04",
    caption: "The engineers, system architects, and researchers shaping our sovereign technology.",
  },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans">
      <Navigation />

      {/* Classy Page Header */}
      <div className="pt-32 pb-14 px-6 md:px-8 bg-white border-b border-slate-200/90 relative">
        <div className="max-w-[1360px] mx-auto relative z-10">
          <Link
            href="/#gallery"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#0A369D] hover:text-[#061A45] transition-colors mb-6 uppercase font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO OVERVIEW
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A369D]/10 border border-[#0A369D]/20 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#0A369D]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A369D]">
                  # THE LAB IN ACTION &bull; ARCHIVES
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#061A45] tracking-tight uppercase leading-tight">
                Visual Archival Records.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed mt-2">
                A curated visual archive of our development environments, physical infrastructure, and team operations.
              </p>
            </div>

            <div className="font-mono text-xs text-slate-400 text-right uppercase tracking-wider hidden md:block">
              <div>PHYSICAL LOCATIONS: KOCHI &bull; BANGALORE</div>
              <div className="text-[#0A369D] font-bold mt-0.5">4 AUDITED ARTIFACTS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Bento Grid */}
      <div className="py-16 px-6 md:px-8 max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {records.map((item, idx) => (
            <div
              key={idx}
              className={`relative bg-slate-100 border border-slate-200/90 rounded-2xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 ${
                idx === 0 || idx === 3
                  ? "md:col-span-2 aspect-[16/9] lg:aspect-[21/9]"
                  : "aspect-[4/3] lg:aspect-[16/10]"
              }`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority={idx === 0}
              />

              {/* Category Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 font-mono text-[10px] font-semibold tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  {item.category}
                </span>
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 z-10">
                <div className="flex items-center gap-2 text-sky-300 font-mono text-xs tracking-widest uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-light">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-wider text-slate-400">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#0A369D]" />
            <span>ORIGINAL FIRSTLOGIC META LAB ARCHIVE RECORDS</span>
          </div>
          <div>ESTABLISHED 2020 &bull; ALL RIGHTS RESERVED</div>
        </div>
      </div>
    </main>
  );
}
