"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ScrollMascotSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(false);

  // Track scroll progress within this section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const mascotScale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.4, 1.1, 1, 0.95]);
  const mascotY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -40]);
  const mascotOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Sync scroll progress with video currentTime (Forward on scroll down, Rewind on scroll up)
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleLoadedMetadata = () => {
      setHasVideo(true);
    };

    videoEl.addEventListener("loadedmetadata", handleLoadedMetadata);

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (videoEl && videoEl.duration) {
        videoEl.currentTime = progress * videoEl.duration;
      }
    });

    return () => {
      videoEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[220vh] bg-black text-white z-20">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-radial from-cyan-950/30 via-black to-black pointer-events-none" />

        {/* Mascot Container */}
        <motion.div
          style={{
            scale: mascotScale,
            y: mascotY,
            opacity: mascotOpacity,
          }}
          className="relative z-20 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] flex items-center justify-center"
        >
          {/* Video Scrubbing (Plays forward on scroll down, rewinds on scroll up) */}
          <video
            ref={videoRef}
            src="/mascot-entry.mp4"
            playsInline
            muted
            preload="auto"
            className={`w-full h-full object-contain ${hasVideo ? "block" : "hidden"}`}
          />

          {/* Fallback Mascot Image */}
          {!hasVideo && (
            <div className="relative w-full h-full">
              <Image
                src="/mascot.png"
                alt="First Logic Meta Lab Mascot"
                fill
                priority
                sizes="(max-width: 768px) 350px, 550px"
                className="object-contain filter drop-shadow-[0_10px_40px_rgba(34,211,238,0.35)]"
              />
            </div>
          )}
        </motion.div>

        {/* Text Overlay */}
        <div className="absolute bottom-16 z-30 pointer-events-none flex flex-col items-center justify-center px-6 text-center">
          <span className="font-mono text-xs md:text-sm tracking-[0.4em] uppercase text-cyan-400 font-bold mb-2">
            INTELLIGENT AGENT DEPLOYMENT
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white">
            TRANSITIONING TO <span className="text-cyan-400">PRODUCT ECOSYSTEM ↓</span>
          </h2>
        </div>

      </div>
    </div>
  );
}
