"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { MotionValue } from "framer-motion";

const TOTAL_FRAMES = 120;
const FRAME_BASE_PATH = "/hero-frames/frame-";

function getFrameUrl(index: number): string {
  const paddedIndex = String(index + 1).padStart(4, "0");
  return `${FRAME_BASE_PATH}${paddedIndex}.webp?v=2`;
}

interface HeroCanvasProps {
  scrollYProgress: MotionValue<number>;
  onInitialReady?: () => void;
  onLoadProgress?: (progress: number) => void;
  onFrameUpdate?: (frame: number) => void;
}

export default function HeroCanvas({
  scrollYProgress,
  onInitialReady,
  onLoadProgress,
  onFrameUpdate,
}: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // In-memory decoded image cache
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const imagesLoadingRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const imagesDecodedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

  // High-precision motion refs
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastRenderedFloatRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const isReducedMotionRef = useRef<boolean>(false);
  const hasInitializedRef = useRef<boolean>(false);
  const sampledColorRef = useRef<string | null>(null);

  // Fallback anchor frame (maintains monotonic visual stability)
  const lastSuccessfulIdxRef = useRef<number>(0);

  // ---------------------------------------------------------------------------
  // SUB-FRAME DUAL-LAYER OPTICAL BLENDING
  // Renders the floor frame, then seamlessly blends the ceil frame on top
  // with fractional alpha for liquid 60fps continuity.
  // ---------------------------------------------------------------------------
  const drawFrameSubpixel = useCallback((frameFloat: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    if (canvasWidth === 0 || canvasHeight === 0) return;

    const clamped = Math.min(TOTAL_FRAMES - 1, Math.max(0, frameFloat));
    const floorIdx = Math.floor(clamped);
    const ceilIdx = Math.min(TOTAL_FRAMES - 1, floorIdx + 1);
    const blendAlpha = clamped - floorIdx;

    // Resolve primary image (monotonic fallback if not yet decoded)
    let primaryImg = imagesRef.current[floorIdx];
    if (!primaryImg || !imagesDecodedRef.current[floorIdx]) {
      // Use last known successfully rendered image to avoid cutting/jumping
      primaryImg = imagesRef.current[lastSuccessfulIdxRef.current];
    } else {
      lastSuccessfulIdxRef.current = floorIdx;
    }

    if (!primaryImg || !primaryImg.complete || primaryImg.naturalWidth === 0) {
      return;
    }

    const imgWidth = primaryImg.naturalWidth;
    const imgHeight = primaryImg.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let renderWidth: number;
    let renderHeight: number;
    let offsetX = 0;
    let offsetY = 0;

    // Seamless edge color sampling
    if (!sampledColorRef.current && primaryImg.complete && primaryImg.naturalWidth > 0) {
      try {
        const offCanvas = document.createElement("canvas");
        offCanvas.width = 1;
        offCanvas.height = 1;
        const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
        if (offCtx) {
          offCtx.drawImage(primaryImg, 4, 4, 1, 1, 0, 0, 1, 1);
          const p = offCtx.getImageData(0, 0, 1, 1).data;
          sampledColorRef.current = `rgb(${p[0]}, ${p[1]}, ${p[2]})`;
        }
      } catch {
        sampledColorRef.current = "#FFFFFF";
      }
    }
    const edgeColor = sampledColorRef.current || "#FFFFFF";

    if (canvasRatio > imgRatio) {
      // Widescreen desktop: fit full viewport height seamlessly
      renderHeight = canvasHeight;
      renderWidth = Math.round(canvasHeight * imgRatio);
      offsetX = Math.round((canvasWidth - renderWidth) / 2);
      offsetY = 0;
    } else {
      // Mobile / Portrait: fit full height
      renderHeight = canvasHeight;
      renderWidth = Math.round(canvasHeight * imgRatio);
      offsetX = Math.round((canvasWidth - renderWidth) / 2);
      offsetY = 0;
    }

    // 1. Fill entire canvas with matching sampled edge background color
    ctx.fillStyle = edgeColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 2. Direct draw primary frame (100% razor-sharp, zero ghosting)
    ctx.globalAlpha = 1.0;
    ctx.drawImage(primaryImg, offsetX, offsetY, renderWidth, renderHeight);

    // 3. Seamlessly feather the left and right boundaries so no box or seam is visible
    if (canvasRatio > imgRatio && offsetX > 0) {
      const featherW = Math.min(110, Math.round(renderWidth * 0.14));

      // Left edge feather
      const leftGrad = ctx.createLinearGradient(offsetX - 2, 0, offsetX + featherW, 0);
      leftGrad.addColorStop(0, edgeColor);
      leftGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = leftGrad;
      ctx.fillRect(offsetX - 2, offsetY, featherW + 2, renderHeight);

      // Right edge feather
      const rightGrad = ctx.createLinearGradient(offsetX + renderWidth - featherW, 0, offsetX + renderWidth + 2, 0);
      rightGrad.addColorStop(0, "rgba(255,255,255,0)");
      rightGrad.addColorStop(1, edgeColor);
      ctx.fillStyle = rightGrad;
      ctx.fillRect(offsetX + renderWidth - featherW, offsetY, featherW + 2, renderHeight);
    }

    lastRenderedFloatRef.current = clamped;
    const roundedIdx = Math.round(clamped);
    const counterEl = document.getElementById("hero-frame-counter");
    if (counterEl) {
      counterEl.textContent = `FRAME ${String(Math.min(TOTAL_FRAMES, Math.max(1, roundedIdx + 1))).padStart(3, "0")} / 120`;
    }
    if (onFrameUpdate) {
      onFrameUpdate(roundedIdx);
    }
  }, [onFrameUpdate]);

  // ---------------------------------------------------------------------------
  // CANVAS SIZING WITH DPR NORMALIZATION
  // ---------------------------------------------------------------------------
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
      // Re-render immediately on resize
      drawFrameSubpixel(currentFrameRef.current);
    }
  }, [drawFrameSubpixel]);

  // ---------------------------------------------------------------------------
  // GPU-DECODED IMAGE LOADER HELPER
  // ---------------------------------------------------------------------------
  const loadAndDecodeFrame = useCallback(
    async (index: number): Promise<HTMLImageElement | null> => {
      if (imagesDecodedRef.current[index] && imagesRef.current[index]) {
        return imagesRef.current[index];
      }
      if (imagesLoadingRef.current[index]) {
        return null;
      }

      imagesLoadingRef.current[index] = true;

      return new Promise<HTMLImageElement | null>((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(index);

        img.onload = async () => {
          try {
            // Offload decode to GPU
            if ("decode" in img) {
              await img.decode();
            }
          } catch {
            // decode error gracefully fallbacks to standard paint
          }
          imagesRef.current[index] = img;
          imagesDecodedRef.current[index] = true;
          imagesLoadingRef.current[index] = false;

          // If this frame is currently needed, trigger an instant paint
          const curFloor = Math.floor(currentFrameRef.current);
          if (curFloor === index || lastRenderedFloatRef.current === -1) {
            drawFrameSubpixel(currentFrameRef.current);
          }

          resolve(img);
        };

        img.onerror = () => {
          imagesLoadingRef.current[index] = false;
          resolve(null);
        };
      });
    },
    [drawFrameSubpixel]
  );

  // ---------------------------------------------------------------------------
  // HIGH-PRIORITY NEIGHBORHOOD PRELOADER
  // ---------------------------------------------------------------------------
  const preloadNeighborhood = useCallback(
    (centerFrame: number, radius = 16) => {
      const start = Math.max(0, centerFrame - radius);
      const end = Math.min(TOTAL_FRAMES - 1, centerFrame + radius);

      // Prioritize forward frames in scroll direction
      for (let i = centerFrame; i <= end; i++) {
        if (!imagesDecodedRef.current[i]) loadAndDecodeFrame(i);
      }
      for (let i = centerFrame - 1; i >= start; i--) {
        if (!imagesDecodedRef.current[i]) loadAndDecodeFrame(i);
      }
    },
    [loadAndDecodeFrame]
  );

  // ---------------------------------------------------------------------------
  // HIGH-CONCURRENCY PROGRESSIVE PRELOADER SYSTEM
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window !== "undefined") {
      isReducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    let loadedCount = 0;
    let isCancelled = false;

    const handleLoadedOne = () => {
      if (isCancelled) return;
      loadedCount++;
      const pct = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
      if (onLoadProgress) onLoadProgress(pct);
    };

    // 1. Critical Phase: Preload Frame 0 immediately with highest priority
    loadAndDecodeFrame(0).then((img) => {
      if (isCancelled) return;
      if (img) {
        hasInitializedRef.current = true;
        updateCanvasSize();
        drawFrameSubpixel(0);
        if (onInitialReady) onInitialReady();
      }
    });

    // 2. Critical Opening Window: Preload frames 1-15 concurrently
    const initialBatch = Array.from({ length: 15 }, (_, i) => i + 1);
    initialBatch.forEach((idx) => {
      loadAndDecodeFrame(idx).then(handleLoadedOne);
    });

    // 3. Full Background Streamer: 10 concurrent streams fetching all frames
    const pendingIndices: number[] = [];
    for (let i = 16; i < TOTAL_FRAMES; i++) {
      pendingIndices.push(i);
    }

    const CONCURRENCY = 10;
    let activeWorkers = 0;

    const pumpQueue = () => {
      if (isCancelled || pendingIndices.length === 0) return;
      while (activeWorkers < CONCURRENCY && pendingIndices.length > 0) {
        const nextIdx = pendingIndices.shift();
        if (nextIdx !== undefined) {
          activeWorkers++;
          loadAndDecodeFrame(nextIdx).then(() => {
            handleLoadedOne();
            activeWorkers--;
            pumpQueue();
          });
        }
      }
    };

    const idleTimer = setTimeout(() => {
      pumpQueue();
    }, 100);

    return () => {
      isCancelled = true;
      clearTimeout(idleTimer);
    };
  }, [loadAndDecodeFrame, updateCanvasSize, drawFrameSubpixel, onInitialReady, onLoadProgress]);

  // ---------------------------------------------------------------------------
  // SCROLL PROGRESS SUBSCRIBER
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (isReducedMotionRef.current) {
        targetFrameRef.current = 0;
        return;
      }

      const clamped = Math.min(Math.max(latest, 0), 1);
      const targetFloat = clamped * (TOTAL_FRAMES - 1);
      targetFrameRef.current = targetFloat;

      preloadNeighborhood(Math.round(targetFloat), 18);
    });

    return () => unsubscribe();
  }, [scrollYProgress, preloadNeighborhood]);

  // ---------------------------------------------------------------------------
  // SILKY KINETIC LERP RENDER LOOP
  // Exponential smoothing (0.11) eliminates mouse-wheel notches and jerky drag
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const loop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0005) {
        // Tuned damping factor for filmic momentum
        currentFrameRef.current += diff * 0.11;
      } else {
        currentFrameRef.current = target;
      }

      const deltaRender = Math.abs(currentFrameRef.current - lastRenderedFloatRef.current);
      // Redraw whenever the fractional frame moves significantly (sub-pixel precision)
      if (deltaRender > 0.02 || lastRenderedFloatRef.current === -1) {
        drawFrameSubpixel(currentFrameRef.current);
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrameSubpixel]);

  // ---------------------------------------------------------------------------
  // WINDOW RESIZE LISTENER
  // ---------------------------------------------------------------------------
  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize, { passive: true });
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [updateCanvasSize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
    />
  );
}
