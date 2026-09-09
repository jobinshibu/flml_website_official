"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TOTAL_FRAMES = 120;
const FRAME_BASE_PATH = "/hero-frames/frame-";

function getFrameUrl(index: number): string {
  const paddedIndex = String(index + 1).padStart(4, "0");
  return `${FRAME_BASE_PATH}${paddedIndex}.webp`;
}

export default function ScrollFrameSequence() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // In-memory frame image cache
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const imagesLoadingRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

  // High-precision sub-frame motion refs
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastRenderedFloatRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const isReducedMotionRef = useRef<boolean>(false);

  // HUD State
  const [initialFrameReady, setInitialFrameReady] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);

  // Scroll mapping across 250vh hero container
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // =========================================================================
  // CLASSIC EDITORIAL SCROLL PHASES
  // 0% - 18%: Opening Classical Title (Act I)
  // 18% - 80%: 100% UNOBSTRUCTED Character Frame Sequence (Zero text overlap)
  // 80% - 98%: Closing Bridge into Doctrine (Act II)
  // =========================================================================

  // Phase 1: Inauguration (0% - 18%)
  const p1Y = useTransform(scrollYProgress, [0, 0.10, 0.18], [0, -25, -70], { clamp: true });
  const p1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 0.7, 0], { clamp: true });
  const p1Scale = useTransform(scrollYProgress, [0, 0.18], [1, 0.95], { clamp: true });
  const p1Visibility = useTransform(scrollYProgress, (v) => (v > 0.18 ? "hidden" : "visible"));
  const p1PointerEvents = useTransform(p1Opacity, (v) => (v > 0.05 ? "auto" : "none"));

  // Phase 2: Lower Bridge into Doctrine (80% - 98%) - ONLY visible in final 20%
  const p2Y = useTransform(scrollYProgress, [0.80, 0.88, 0.98], [40, 0, -20], { clamp: true });
  const p2Opacity = useTransform(scrollYProgress, [0.80, 0.88, 0.94, 0.99], [0, 1, 1, 0], { clamp: true });
  const p2Visibility = useTransform(scrollYProgress, (v) => (v < 0.78 ? "hidden" : "visible"));
  const p2PointerEvents = useTransform(p2Opacity, (v) => (v > 0.05 ? "auto" : "none"));

  // Scroll indicator fade
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0], { clamp: true });



  // =========================================================================
  // CRISP FRAME RENDERING (Zero Blurring, 100% Sharp Transitions)
  // =========================================================================
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    if (canvasWidth === 0 || canvasHeight === 0) return;

    const targetIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(frameIdx)));

    // Retrieve requested image or closest loaded neighbor
    let img = imagesRef.current[targetIdx];
    let actualIdx = targetIdx;

    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const p = targetIdx - offset;
        const n = targetIdx + offset;
        if (p >= 0 && imagesRef.current[p]?.complete && imagesRef.current[p]!.naturalWidth > 0) {
          img = imagesRef.current[p];
          actualIdx = p;
          break;
        }
        if (n < TOTAL_FRAMES && imagesRef.current[n]?.complete && imagesRef.current[n]!.naturalWidth > 0) {
          img = imagesRef.current[n];
          actualIdx = n;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // object-fit: cover dimensions
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let renderWidth: number;
    let renderHeight: number;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderWidth = canvasWidth;
      renderHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - renderHeight) / 2;
    } else {
      renderHeight = canvasHeight;
      renderWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - renderWidth) / 2;
    }

    // Draw single crisp frame without any opacity blending or blur
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

    lastRenderedFloatRef.current = actualIdx;
  }, []);

  // Update canvas size according to devicePixelRatio and trigger redraw
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.max(1, Math.round(rect.width * dpr));
    const targetH = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Load a single frame image helper with auto-redraw trigger
  const loadFrame = useCallback((index: number, onLoaded?: () => void) => {
    if (imagesRef.current[index] || imagesLoadingRef.current[index]) return;
    imagesLoadingRef.current[index] = true;

    const img = new Image();
    img.src = getFrameUrl(index);
    img.onload = () => {
      imagesRef.current[index] = img;
      imagesLoadingRef.current[index] = false;
      if (onLoaded) onLoaded();

      // Redraw immediately if this frame is currently in view
      const curFloor = Math.round(currentFrameRef.current);
      if (curFloor === index || lastRenderedFloatRef.current === -1) {
        drawFrame(currentFrameRef.current);
      }
    };
    img.onerror = () => {
      imagesLoadingRef.current[index] = false;
    };
  }, [drawFrame]);

  // Priority queue loading around current frame
  const preloadNeighborhood = useCallback((centerFrame: number, radius = 12) => {
    const start = Math.max(0, centerFrame - radius);
    const end = Math.min(TOTAL_FRAMES - 1, centerFrame + radius);

    for (let i = start; i <= end; i++) {
      loadFrame(i);
    }
  }, [loadFrame]);

  // Progressive Preloader
  useEffect(() => {
    if (typeof window !== "undefined") {
      isReducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    let loadedCount = 0;
    const updateProgress = () => {
      loadedCount++;
      const pct = Math.min(100, Math.round((loadedCount / 16) * 100));
      setLoadPercentage(pct);
    };

    // Stage 1: Preload first frame immediately
    loadFrame(0, () => {
      updateProgress();
      setInitialFrameReady(true);
      updateCanvasSize();
      drawFrame(0);
    });

    // Stage 1b: Preload initial 12 frames
    for (let i = 1; i < 12; i++) {
      loadFrame(i, updateProgress);
    }

    // Stage 2: Incrementally stream remaining frames in background
    let idleIndex = 12;
    let cancelled = false;

    const loadNextBatch = () => {
      if (cancelled || idleIndex >= TOTAL_FRAMES) return;
      const batchSize = 6;
      const batchEnd = Math.min(TOTAL_FRAMES, idleIndex + batchSize);
      for (let i = idleIndex; i < batchEnd; i++) {
        loadFrame(i);
      }
      idleIndex = batchEnd;
      setTimeout(loadNextBatch, 50);
    };

    const timer = setTimeout(loadNextBatch, 150);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [loadFrame, updateCanvasSize, drawFrame]);

  // Scroll Progress Listener
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (isReducedMotionRef.current) {
        targetFrameRef.current = 0;
        return;
      }

      const clamped = Math.min(Math.max(latest, 0), 1);
      const targetFloat = clamped * (TOTAL_FRAMES - 1);
      targetFrameRef.current = targetFloat;

      preloadNeighborhood(Math.round(targetFloat), 14);
    });

    return () => unsubscribe();
  }, [scrollYProgress, preloadNeighborhood]);

  // Continuous rAF Render Loop with Silky Kinetic LERP
  useEffect(() => {
    const loop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // Silky smooth LERP factor (0.16) for clean, responsive catch-up
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.16;
      } else {
        currentFrameRef.current = target;
      }

      const targetIdx = Math.round(currentFrameRef.current);
      // Redraw whenever rounded frame index changes
      if (targetIdx !== lastRenderedFloatRef.current || lastRenderedFloatRef.current === -1) {
        drawFrame(targetIdx);
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Resize Listener
  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize, { passive: true });
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [updateCanvasSize]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-[350vh] bg-[#061A45] selection:bg-brand-blue selection:text-white"
    >
      {/* Sticky pinned viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#061A45]">
        
        {/* Clean Canvas Frame Sequence */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none ${
            initialFrameReady ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Subtle bottom gradient to blend cleanly into the next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061A45] via-transparent to-black/20 pointer-events-none z-[1]" />

        {/* Classical corner hairline ornaments */}
        <div className="absolute top-10 left-10 w-8 h-8 border-t border-l border-white/20 pointer-events-none z-[5]" />
        <div className="absolute top-10 right-10 w-8 h-8 border-t border-r border-white/20 pointer-events-none z-[5]" />
        <div className="absolute bottom-10 left-10 w-8 h-8 border-b border-l border-white/20 pointer-events-none z-[5]" />
        <div className="absolute bottom-10 right-10 w-8 h-8 border-b border-r border-white/20 pointer-events-none z-[5]" />

        {/* Loading Experience HUD */}
        {!initialFrameReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#061A45] z-30 font-mono text-center p-4">
            <div className="font-[family-name:var(--font-cinzel)] text-3xl md:text-4xl tracking-[0.3em] text-white uppercase mb-3">
              First Logic Meta Lab
            </div>
            <div className="text-[11px] font-mono tracking-[0.25em] text-[#E6F0FF]/60 uppercase mb-4">
              Calibrating High-Fidelity Sequence • {loadPercentage}%
            </div>
            <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E6F0FF] transition-all duration-150"
                style={{ width: `${Math.max(12, loadPercentage)}%` }}
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CLASSIC HERO TYPOGRAPHY OVERLAY SYSTEM */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-6">
          
          {/* ACT 1: INAUGURATION (0% - 18% Scroll) */}
          <motion.div
            style={{
              y: p1Y,
              scale: p1Scale,
              opacity: p1Opacity,
              visibility: p1Visibility,
              pointerEvents: p1PointerEvents,
            }}
            className="flex flex-col items-center text-center max-w-4xl"
          >
            {/* Classical Insignia Micro-Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6F0FF] animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.28em] text-[#E6F0FF]/90 uppercase">
                EST. MMXXIV • ADVANCED COGNITIVE ARCHITECTURE
              </span>
            </div>

            {/* Monumental Roman Classical Title */}
            <h1 className="font-[family-name:var(--font-cinzel)] text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-semibold tracking-[0.08em] uppercase text-white leading-[0.95] drop-shadow-[0_8px_32px_rgba(0,0,0,0.85)]">
              First Logic
              <br />
              <span className="font-light tracking-[0.14em] text-[#E6F0FF] text-3xl sm:text-5xl md:text-6xl lg:text-[68px] block mt-3">
                Meta Lab
              </span>
            </h1>

            {/* Timeless Editorial Serif Italic Subtitle */}
            <p className="font-[family-name:var(--font-cormorant)] italic text-2xl md:text-3xl text-[#E6F0FF]/95 max-w-2xl mt-6 tracking-wide leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              “Where mathematical rigor converges with sovereign digital form.”
            </p>

            <p className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-white/70 mt-3 max-w-xl">
              Architects of unbreakable enterprise backbones, spatial protocols & autonomous engineering.
            </p>

            {/* Classic Luxury CTA Button */}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("about");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative px-8 py-3.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#061A45] border border-white/30 hover:border-white transition-all duration-300 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] active:scale-95"
              >
                <span className="font-[family-name:var(--font-cinzel)] tracking-[0.25em] text-xs font-semibold uppercase">
                  Explore The Doctrine
                </span>
                <span className="inline-block ml-3 transition-transform duration-300 group-hover:translate-x-1 font-mono">
                  →
                </span>
              </button>
            </div>
          </motion.div>

          {/* LOWER BRIDGE: THE METASYSTEM (80% - 98% Scroll) */}
          <motion.div
            style={{
              y: p2Y,
              opacity: p2Opacity,
              visibility: p2Visibility,
              pointerEvents: p2PointerEvents,
            }}
            className="absolute bottom-16 flex flex-col items-center text-center max-w-2xl px-6"
          >
            <div className="px-3.5 py-1 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[10px] font-mono tracking-[0.28em] uppercase text-[#E6F0FF]/80 mb-3">
              Act II • Architectural Longevity
            </div>
            <h2 className="font-[family-name:var(--font-cinzel)] text-3xl sm:text-4xl md:text-5xl font-medium tracking-[0.08em] uppercase text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              The Metasystem
            </h2>
            <p className="font-[family-name:var(--font-cormorant)] italic text-lg md:text-xl text-white/90 max-w-lg mt-2 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Engineered for multi-generational reliability at global institutional scale.
            </p>
            <div className="mt-5">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("about");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-2.5 rounded-full border border-white/40 bg-black/40 text-white hover:bg-white hover:text-[#061A45] transition-all duration-300 backdrop-blur-md text-xs font-[family-name:var(--font-cinzel)] tracking-[0.2em] uppercase"
              >
                Descend Into Doctrine ↓
              </button>
            </div>
          </motion.div>

          {/* Scroll Indicator at bottom */}
          <motion.div
            style={{ opacity: scrollIndicatorOpacity }}
            className="absolute bottom-8 flex flex-col items-center pointer-events-none"
          >
            <span className="text-[10px] font-[family-name:var(--font-cinzel)] tracking-[0.3em] uppercase text-white/60 mb-2 drop-shadow-sm">
              Scroll To Journey
            </span>
            <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1 bg-black/20 backdrop-blur-sm">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-[#E6F0FF]"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
