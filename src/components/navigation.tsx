"use client";

import Image from "next/image";

interface NavigationProps {
  activeTab?: "flml" | "architecture" | "life";
  onSelectTab?: (tab: "flml" | "architecture" | "life") => void;
}

export default function Navigation({ activeTab = "flml", onSelectTab }: NavigationProps) {
  const handleTabClick = (tab: "flml" | "architecture" | "life", path?: string) => {
    // Fire instantaneous scatter transition on click
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("flml:tab_transition", { detail: tab }));
    }
    if (onSelectTab) {
      onSelectTab(tab);
    }
    if (path && path.startsWith("/#")) {
      const elem = document.querySelector(path.substring(1));
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Top Header Mask / Blur Gradient (Content fades smoothly under navbar without visible navbar box) */}
      {activeTab !== "flml" && (
        <div 
          className="fixed top-0 left-0 right-0 h-28 md:h-36 z-[50] pointer-events-none select-none backdrop-blur-md"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0) 100%)",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 100%)"
          }}
        />
      )}

      {/* Top Left: Cinematic Sentence Header ("flml architecture speaks life") */}
      <div className="fixed top-6 left-6 md:top-8 md:left-12 z-[60] flex items-center pointer-events-auto select-none">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-400 tracking-normal leading-none font-normal flex items-baseline gap-3 sm:gap-4">
          {/* Word 1: FLML (High-tech bold uppercase) */}
          <button
            onClick={() => handleTabClick("flml")}
            className={`transition-all duration-300 cursor-pointer font-sans font-black tracking-[0.16em] uppercase ${
              activeTab === "flml"
                ? "text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.9)] scale-105"
                : "text-white/60 hover:text-white"
            }`}
          >
            FLML
          </button>

          {/* Word 2: Architecture (Serif italic) */}
          <button
            onClick={() => handleTabClick("architecture")}
            className={`transition-all duration-300 cursor-pointer font-serif italic tracking-wide ${
              activeTab === "architecture"
                ? "text-cyan-400 font-medium drop-shadow-[0_0_16px_rgba(56,189,248,0.85)] scale-105"
                : "text-neutral-400 hover:text-stone-200"
            }`}
          >
            Architecture
          </button>

          {/* Word 3: Life (Exact same font style as Architecture) */}
          <button
            onClick={() => handleTabClick("life")}
            className={`transition-all duration-300 cursor-pointer font-serif italic tracking-wide ${
              activeTab === "life"
                ? "text-cyan-400 font-medium drop-shadow-[0_0_16px_rgba(56,189,248,0.85)] scale-105"
                : "text-neutral-400 hover:text-stone-200"
            }`}
          >
            Life
          </button>
        </h1>
      </div>

      {/* Bottom Right: Clean Brand Logo & Name */}
      <button
        onClick={() => handleTabClick("flml")}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-12 z-[60] flex items-center gap-3 group pointer-events-auto cursor-pointer select-none"
      >
        <div className="relative w-8 h-8 md:w-9 md:h-9 filter brightness-0 invert transition-transform group-hover:scale-105">
          <Image
            src="/FLML-01.png"
            alt="First Logic Meta Lab Logo"
            fill
            sizes="(max-width: 768px) 32px, 36px"
            className="object-contain"
            priority
          />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans font-bold text-xs md:text-sm tracking-widest text-white leading-none group-hover:text-cyan-400 transition-colors">
            FIRST LOGIC
          </span>
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-white/50 leading-tight">
            META LAB
          </span>
        </div>
      </button>
    </>
  );
}
