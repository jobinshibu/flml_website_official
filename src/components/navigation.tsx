"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "THE LAB", path: "/", number: "00" },
    { name: "DOCTRINE", path: "/#about", number: "01" },
    { name: "CAPABILITIES", path: "/#capabilities", number: "02" },
    { name: "ARCHITECTURE", path: "/#technology", number: "03" },
    { name: "DEPLOYMENTS", path: "/#clients", number: "04" },
    { name: "LIFE @ FLML", path: "/gallery", number: "05" },
    { name: "RECRUITMENT", path: "/career", number: "06" },
  ];

  return (
    <>
      {/* OpenAI Astra Top Header */}
      <header className="fixed top-0 left-0 w-full h-16 md:h-20 bg-black/80 backdrop-blur-md border-b border-white/10 z-[60] px-4 md:px-8 flex items-center justify-between transition-all">

        {/* Brand Logo & Identifier */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 md:w-9 md:h-9 filter brightness-0 invert transition-transform group-hover:scale-105">
            <Image
              src="/FLML-01.png"
              alt="FLML Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-xs md:text-sm tracking-widest text-white leading-none">
              FIRST LOGIC
            </span>
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-white/50 leading-tight">
              META LAB
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-white/70">
          <Link href="/#about" className="hover:text-white transition-colors">
            DOCTRINE
          </Link>
          <Link href="/#capabilities" className="hover:text-white transition-colors">
            CAPABILITIES
          </Link>
          <Link href="/#technology" className="hover:text-white transition-colors">
            ARCHITECTURE
          </Link>
          <Link href="/#clients" className="hover:text-white transition-colors">
            DEPLOYMENTS
          </Link>
        </nav>

        {/* Right Pill Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/#consultation"
            className="hidden sm:inline-flex items-center gap-2 bg-white text-black font-sans font-semibold text-xs px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors shadow-sm"
          >
            <span>Initiate Brief</span>
            <span className="text-sm">→</span>
          </Link>

          {/* Menu Overlay Trigger */}
          <button
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Open Navigation Index"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* OpenAI Full Screen Overlay Index Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-black text-white flex flex-col justify-between p-8 md:p-16 overflow-y-auto"
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 filter brightness-0 invert">
                  <Image src="/FLML-01.png" alt="FLML Logo" fill className="object-contain" />
                </div>
                <span className="font-mono text-xs tracking-widest text-white/50">SYSTEM INDEX</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Close Menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Links Grid */}
            <div className="max-w-[1400px] w-full mx-auto my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="font-mono text-white/40 text-xs tracking-[0.3em] uppercase">
                  DIRECTORIES
                </div>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-6 hover:translate-x-3 transition-transform"
                    >
                      <span className="font-mono text-xs text-white/30">{item.number}</span>
                      <span className="font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-tight text-white group-hover:text-white/70 transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-end gap-8 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
                <div>
                  <div className="font-mono text-white/40 text-xs tracking-[0.3em] uppercase mb-4">
                    INITIATE DIRECT CONTACT
                  </div>
                  <a href="mailto:info@firstlogicmetalab.com" className="text-xl font-bold hover:text-white/70 transition-colors block mb-2">
                    info@firstlogicmetalab.com
                  </a>
                  <div className="flex flex-col gap-1 font-mono text-xs text-white/60">
                    <a href="https://wa.me/919745437355" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      +91 9745 43 73 55
                    </a>
                    <p className="mt-2 text-white/40">Puthanveettil Tower, Bypass Road, Perinthalmanna, Kerala</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <Link
                    href="/#consultation"
                    onClick={() => setIsOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-3 bg-white text-black font-bold text-xs uppercase tracking-widest py-4 rounded-full hover:bg-neutral-200 transition-colors"
                  >
                    Initiate Technical Diagnostic Brief
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer note in overlay */}
            <div className="border-t border-white/10 pt-6 flex justify-between items-center text-[10px] font-mono text-white/40 uppercase">
              <span>© {new Date().getFullYear()} First Logic Meta Lab</span>
              <span>OpenAI Astra Visual Spec</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

