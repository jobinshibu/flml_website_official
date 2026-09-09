"use client";
import React, { useRef, useEffect } from "react";
import { MotionValue } from "framer-motion";

interface ScrollVideoProps {
  /** Motion value representing scroll progress (0 → 1) within the hero section */
  progress: MotionValue<number>;
  /** Optional video source URL */
  src: string;
  /** Alt text for accessibility */
  alt?: string;
}

/**
 * Scroll‑controlled video component with buttery‑smooth scrubbing.
 *
 * Utilizes:
 * 1. Target vs Current LERP (linear interpolation) damping so rapid or jagged scroll
 *    movements smoothly glide into place.
 * 2. `fastSeek` fallback when supported for near-instantaneous hardware-accelerated decoding.
 * 3. A seeking lock guard to prevent browser decoder thrashing / frame drops.
 */
export default function ScrollVideo({ progress, src, alt = "FLML hero video" }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  // Smooth interpolation state
  const targetProgress = useRef<number>(0);
  const currentProgress = useRef<number>(0);
  const isSeeking = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Listen to scroll progress motion value changes
    const unsubscribe = progress.on("change", (latest) => {
      targetProgress.current = Math.min(Math.max(latest, 0), 1);
    });

    const updateVideoFrame = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        // LERP factor: 0.12 provides smooth easing without perceptible lag
        const diff = targetProgress.current - currentProgress.current;
        
        if (Math.abs(diff) > 0.0003) {
          currentProgress.current += diff * 0.12;

          // Only issue seek command if the previous seek has completed or is ready
          if (!isSeeking.current && video.readyState >= 2) {
            const targetTime = currentProgress.current * video.duration;
            const clampedTime = Math.min(Math.max(targetTime, 0), video.duration - 0.01);

            // Guard against redundant micro-seeks
            if (Math.abs(video.currentTime - clampedTime) > 0.02) {
              isSeeking.current = true;
              if ("fastSeek" in video && typeof (video as any).fastSeek === "function") {
                try {
                  (video as any).fastSeek(clampedTime);
                } catch {
                  video.currentTime = clampedTime;
                }
              } else {
                video.currentTime = clampedTime;
              }
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(updateVideoFrame);
    };

    const handleSeeked = () => {
      isSeeking.current = false;
    };

    const onLoadedMetadata = () => {
      // Warm up decoder to frame 0
      video.currentTime = 0.001;
    };

    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("loadedmetadata", onLoadedMetadata);

    rafRef.current = requestAnimationFrame(updateVideoFrame);

    return () => {
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [progress]);

  return (
    <div className="absolute inset-0 w-full h-full bg-brand-blue-dark overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover pointer-events-none will-change-transform"
        aria-label={alt}
      />
      {/* Cinematic subtle vignette / backdrop glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/80 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
}

