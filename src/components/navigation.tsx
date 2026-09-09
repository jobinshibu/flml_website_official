"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hero section track is 350vh. Only adapt when scrolled past the hero into dark sections
      const heroThreshold = window.innerHeight * 2.8;
      setIsPastHero(window.scrollY > heroThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "RESEARCH", href: "/#about" },
    { label: "PRODUCTS", href: "/#what-we-build" },
    { label: "SOLUTIONS", href: "/#clients" },
    { label: "ABOUT", href: "/#about" },
    { label: "CAREERS", href: "/career" },
  ];

  const drawerItems = [
    { name: "THE LAB", path: "/", number: "00" },
    { name: "DOCTRINE", path: "/#about", number: "01" },
    { name: "DEPLOYMENTS", path: "/#clients", number: "02" },
    { name: "WHAT WE BUILD", path: "/#what-we-build", number: "03" },
    { name: "LIFE @FLML", path: "/gallery", number: "04" },
    { name: "RECRUITMENT", path: "/career", number: "05" },
  ];

  const handleBuildClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("consultation");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#consultation";
    }
  };

  return (
    <>
      {/* Top Navigation Bar - Completely transparent and seamless with hero page even when scrolling */}
      <header
        className={`fixed top-0 left-0 w-full h-20 sm:h-24 px-6 sm:px-10 md:px-14 z-[60] flex items-center justify-between transition-colors duration-300 pointer-events-none bg-transparent border-b border-transparent shadow-none ${
          isPastHero ? "text-white" : "text-[#061A45]"
        }`}
      >
        {/* Top-Left: Institutional Brand Identifier */}
        <Link
          href="/"
          className="pointer-events-auto flex flex-col items-start select-none group"
        >
          <span className={`font-sans font-bold text-xs sm:text-sm tracking-[0.24em] uppercase leading-tight transition-colors ${
            isPastHero ? "text-white group-hover:text-brand-blue-light" : "text-[#061A45] group-hover:text-brand-blue"
          }`}>
            First Logic Meta Lab
          </span>
          <span className={`font-mono text-[9px] sm:text-[10px] tracking-[0.28em] uppercase font-semibold mt-0.5 ${
            isPastHero ? "text-brand-blue-light/80" : "text-[#0A369D]"
          }`}>
            Cognitive Systems
          </span>
        </Link>

        {/* Top Navigation: Center Editorial Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 pointer-events-auto select-none">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative font-mono text-[11px] tracking-[0.22em] uppercase transition-colors py-1 group ${
                isPastHero ? "text-white/75 hover:text-white" : "text-[#061A45]/75 hover:text-[#061A45]"
              }`}
            >
              <span>{link.label}</span>
              <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                isPastHero ? "bg-brand-blue-light" : "bg-[#0A369D]"
              }`} />
            </Link>
          ))}
        </nav>

        {/* Top-Right: Enterprise Action + Minimal Circular Menu Button */}
        <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto select-none">
          {/* "LET'S BUILD →" Primary Link */}
          <button
            type="button"
            onClick={handleBuildClick}
            className={`hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-[4px] font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold transition-all duration-200 active:scale-95 ${
              isPastHero
                ? "bg-white text-[#061A45] hover:bg-brand-blue-light shadow-sm"
                : "bg-[#061A45] text-white hover:bg-[#0A369D] shadow-[0_2px_12px_rgba(6,26,69,0.18)]"
            }`}
          >
            <span>Let&apos;s Build</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>

          {/* Minimal Circular Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open Navigation Menu"
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 border ${
              isPastHero
                ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border-[#061A45]/20 bg-[#061A45]/5 text-[#061A45] hover:bg-[#061A45]/10 hover:border-[#061A45]/40"
            }`}
          >
            <div className="w-4 flex flex-col gap-1.5 items-center justify-center">
              <span className={`block w-4 h-[1.5px] ${isPastHero ? "bg-white" : "bg-[#061A45]"}`} />
              <span className={`block w-4 h-[1.5px] ${isPastHero ? "bg-white" : "bg-[#061A45]"}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 z-[70] bg-[#061A45] text-white flex flex-col justify-center px-8 md:px-24"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Menu"
              className="absolute top-7 right-7 sm:top-10 sm:right-10 w-11 h-11 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-[#061A45] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu Content */}
            <div className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row justify-between gap-12 sm:gap-16">
              <div className="flex flex-col gap-6 sm:gap-8">
                <div className="font-mono text-brand-blue-light text-xs tracking-[0.3em] uppercase">
                  Index // Institutional Architecture
                </div>
                <nav className="flex flex-col gap-5 sm:gap-6">
                  {drawerItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-4 sm:gap-6 hover:translate-x-3 transition-transform"
                    >
                      <span className="font-mono text-xs sm:text-sm text-white/30">{item.number}</span>
                      <span className="font-sans font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white group-hover:text-brand-blue-light transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col justify-end gap-6 sm:gap-8 pb-4">
                <div className="font-mono text-brand-blue-light text-xs tracking-[0.3em] uppercase">
                  Initiate Contact
                </div>
                <div>
                  <a
                    href="mailto:info@firstlogicmetalab.com"
                    className="text-xl sm:text-2xl font-bold hover:text-brand-blue-light transition-colors block mb-3"
                  >
                    info@firstlogicmetalab.com
                  </a>
                  <div className="flex flex-col gap-1.5 font-mono text-white/60 text-sm">
                    <a
                      href="https://wa.me/919745437355"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      +91 9745 43 73 55
                    </a>
                    <span className="text-white/40 text-xs mt-2">
                      Sovereign AI Architecture • Multi-Generational Engineering
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
