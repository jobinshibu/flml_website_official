"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "THE LAB", path: "/", number: "00" },
    { name: "DOCTRINE", path: "/#about", number: "01" },
    { name: "DEPLOYMENTS", path: "/#clients", number: "02" },
    { name: "LIFE @FLML", path: "/gallery", number: "03" },
    { name: "RECRUITMENT", path: "/career", number: "04" },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 w-full h-24 md:h-32 flex items-center justify-between px-8 md:px-12 z-[60] pointer-events-none">
        
        {/* Logo */}
        <Link href="/" className="pointer-events-auto relative w-[140px] h-[40px] md:w-[180px] md:h-[50px] transition-transform hover:scale-105">
          <img src="/FLML-01.png" alt="First Logic Meta Lab" className="w-full h-full object-contain object-left drop-shadow-sm brightness-0 invert" />
        </Link>

        {/* The Floating Trigger */}
        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl shadow-brand-blue/30"
          aria-label="Open Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </div>

      {/* The Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-brand-blue-dark text-white flex flex-col justify-center px-8 md:px-24"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-brand-blue-dark transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu Content */}
            <div className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row justify-between gap-16">

              <div className="flex flex-col gap-8">
                <div className="font-mono text-brand-blue-light text-xs tracking-[0.3em]">
                  INDEX
                </div>
                <nav className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-6 hover:translate-x-4 transition-transform"
                    >
                      <span className="font-mono text-sm text-white/30">{item.number}</span>
                      <span className="font-black text-4xl md:text-6xl tracking-tighter text-white group-hover:text-brand-blue-light transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col justify-end gap-8 pb-4">
                <div className="font-mono text-brand-blue-light text-xs tracking-[0.3em]">
                  INITIATE CONTACT
                </div>
                <div>
                  <a href="mailto:info@firstlogicmetalab.com" className="text-2xl font-bold hover:text-brand-blue-light transition-colors block mb-4">
                    info@firstlogicmetalab.com
                  </a>
                  <div className="flex flex-col gap-2 font-mono text-white/60">
                    <a href="https://wa.me/919745437355" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+91 9745 43 73 55</a>
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
