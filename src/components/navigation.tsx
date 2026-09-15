"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      const heroThreshold = window.innerHeight * 2.8;
      const aboutEl = document.getElementById("about");
      const clientsEl = document.getElementById("clients");
      const consultationEl = document.getElementById("consultation");

      if (scrollY < heroThreshold) {
        setIsDarkSection(false);
      } else if (consultationEl && scrollY >= consultationEl.offsetTop - 120) {
        setIsDarkSection(true);
      } else if (clientsEl && scrollY >= clientsEl.offsetTop - 80) {
        setIsDarkSection(false);
      } else if (aboutEl && scrollY >= aboutEl.offsetTop - 80) {
        setIsDarkSection(true);
      } else {
        setIsDarkSection(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "RESEARCH", href: "/#about" },
    { label: "PRODUCTS", href: "/#what-we-build" },
    { label: "SOLUTIONS", href: "/#clients" },
    { label: "TECHNOLOGY", href: "/#technology" },
    { label: "ARCHIVE", href: "/gallery" },
    { label: "CAREERS", href: "/career" },
  ];

  const drawerItems = [
    { name: "THE LAB", path: "/", number: "00", desc: "Main Command Terminal" },
    { name: "PHILOSOPHY", path: "/#about", number: "01", desc: "Operational Anatomy First" },
    { name: "DEPLOYMENTS", path: "/#clients", number: "02", desc: "Enterprise Client Matrix" },
    { name: "WHAT WE BUILD", path: "/#what-we-build", number: "03", desc: "Architectural Disciplines" },
    { name: "CORE TECH", path: "/#technology", number: "04", desc: "6-Layer Scalable Engine" },
    { name: "ARCHIVAL GALLERY", path: "/gallery", number: "05", desc: "Visual Lab Operations" },
    { name: "CAREERS", path: "/career", number: "06", desc: "Join The Engineering Core" },
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
      {/* Top Navigation Bar with Dynamic Section Contrast */}
      <header
        suppressHydrationWarning
        className={`fixed top-0 left-0 w-full h-20 sm:h-24 px-6 sm:px-10 md:px-14 z-[60] flex items-center justify-between transition-all duration-300 pointer-events-none ${
          scrolled
            ? isDarkSection
              ? "bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
              : "bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_24px_rgba(10,54,157,0.06)]"
            : "bg-transparent border-b border-transparent shadow-none"
        } ${isDarkSection ? "text-white" : "text-[#061A45]"}`}
      >
        {/* Top-Left: Institutional Brand Identifier */}
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-3 select-none group"
        >
          <div className="relative flex items-center justify-center">
            <span
              className={`w-2 h-2 rounded-full ${
                isDarkSection
                  ? "bg-[#3B82F6]"
                  : "bg-[#0A369D]"
              }`}
            />
            <span
              className={`absolute w-4 h-4 rounded-full animate-ping opacity-60 ${
                isDarkSection ? "bg-[#3B82F6]" : "bg-[#0A369D]"
              }`}
            />
          </div>
          <span
            className={`font-sans font-bold text-xs sm:text-sm tracking-[0.22em] uppercase leading-tight transition-colors ${
              isDarkSection
                ? "text-white group-hover:text-blue-300"
                : "text-[#061A45] group-hover:text-[#0A369D]"
            }`}
          >
            First Logic Meta Lab
          </span>
        </Link>

        {/* Top Navigation: Center Editorial Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 pointer-events-auto select-none">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative font-mono text-[10.5px] tracking-[0.22em] uppercase transition-all py-1 px-1.5 group ${
                isDarkSection
                  ? "text-slate-300 hover:text-white"
                  : "text-[#061A45]/80 hover:text-[#061A45] font-semibold"
              }`}
            >
              <span>{link.label}</span>
              <span
                className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                  isDarkSection
                    ? "bg-[#3B82F6]"
                    : "bg-[#0A369D]"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Top-Right: Enterprise Action + Minimal Circular Menu Button */}
        <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto select-none">
          {/* "LET'S BUILD →" Primary Link */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={handleBuildClick}
            className={`hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold transition-all duration-200 active:scale-95 group ${
              isDarkSection
                ? "bg-[#0A369D] text-white hover:bg-[#1D4ED8] shadow-[0_0_15px_rgba(10,54,157,0.4)]"
                : "bg-[#061A45] text-white hover:bg-[#0A369D] shadow-[0_2px_12px_rgba(6,26,69,0.18)]"
            }`}
          >
            <span>Let&apos;s Build</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>

          {/* Minimal Circular Menu Button */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setIsOpen(true)}
            aria-label="Open Navigation Menu"
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 border ${
              isDarkSection
                ? "border-white/15 bg-white/5 text-white hover:bg-white/15 hover:border-blue-400/50"
                : "border-[#061A45]/20 bg-[#061A45]/5 text-[#061A45] hover:bg-[#061A45]/10 hover:border-[#061A45]/40"
            }`}
          >
            <div className="w-4 flex flex-col gap-1.5 items-center justify-center">
              <span
                className={`block w-4 h-[1.5px] ${
                  isDarkSection ? "bg-white" : "bg-[#061A45]"
                }`}
              />
              <span
                className={`block w-4 h-[1.5px] ${
                  isDarkSection ? "bg-[#3B82F6]" : "bg-[#0A369D]"
                }`}
              />
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
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[70] bg-[#030712]/95 backdrop-blur-2xl text-white flex flex-col justify-center px-6 sm:px-12 md:px-24"
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0A369D]/20 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setIsOpen(false)}
              aria-label="Close Menu"
              className="absolute top-7 right-7 sm:top-10 sm:right-10 w-11 h-11 border border-white/20 rounded-full flex items-center justify-center text-white hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-all active:scale-90 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu Content */}
            <div className="max-w-[1400px] w-full mx-auto flex flex-col lg:flex-row justify-between gap-10 sm:gap-14 relative z-10">
              <div className="flex flex-col gap-5 sm:gap-6">
                <div className="flex items-center gap-3 font-mono text-[#3B82F6] text-xs tracking-[0.3em] uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                  <span>Index // Navigation Console</span>
                </div>
                <nav className="flex flex-col gap-3 sm:gap-4">
                  {drawerItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 hover:translate-x-3 transition-all duration-200 py-1"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs sm:text-sm text-[#3B82F6]/60 group-hover:text-[#3B82F6] transition-colors">
                          {item.number}
                        </span>
                        <span className="font-sans font-bold text-2xl sm:text-4xl md:text-5xl tracking-tight text-white group-hover:text-[#3B82F6] transition-colors">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] sm:text-xs text-slate-400 group-hover:text-slate-200 transition-colors uppercase tracking-widest pl-6 sm:pl-0">
                        // {item.desc}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col justify-end gap-5 sm:gap-6 pb-2 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-12 pt-6 lg:pt-0">
                <div className="font-mono text-[#3B82F6] text-xs tracking-[0.3em] uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  Direct Comms Channel
                </div>
                <div>
                  <a
                    href="mailto:info@firstlogicmetalab.com"
                    className="text-lg sm:text-2xl font-bold hover:text-[#3B82F6] transition-colors block mb-2 font-['Space_Grotesk']"
                  >
                    info@firstlogicmetalab.com
                  </a>
                  <div className="flex flex-col gap-1.5 font-mono text-slate-400 text-xs sm:text-sm">
                    <a
                      href="https://wa.me/919745437355"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span>Direct WhatsApp Line:</span>
                      <span className="text-[#3B82F6] font-bold">+91 9745 43 73 55</span>
                    </a>
                    <span className="text-slate-500 text-[11px] mt-2">
                      Enterprise AI &amp; Software Systems Architecture • Global Operations
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
