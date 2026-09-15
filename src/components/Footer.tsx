import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#02050E] text-white py-16 px-6 sm:px-10 lg:px-16 border-t border-white/[0.08] relative overflow-hidden">
      {/* Precision grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2563EB" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-12 border-b border-white/10">
          
          {/* Brand & Mission */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                <span className="font-bold text-lg tracking-[0.25em] uppercase text-white">
                  First Logic <span className="text-[#3B82F6]">Meta Lab</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 font-light max-w-md leading-relaxed">
                Architecting next-generation enterprise systems, distributed protocols, and bespoke software infrastructures with uncompromising precision.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 font-mono text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ALL SYSTEMS NOMINAL &bull; 99.98% GLOBAL RUNTIME UPTIME</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 flex flex-col gap-3 font-mono text-xs tracking-wider uppercase">
            <div className="text-[#3B82F6] font-bold mb-1">// NAVIGATION</div>
            <Link href="/#about" className="text-slate-400 hover:text-white transition-colors">
              01 // Philosophy
            </Link>
            <Link href="/#clients" className="text-slate-400 hover:text-white transition-colors">
              02 // Deployments
            </Link>
            <Link href="/#what-we-build" className="text-slate-400 hover:text-white transition-colors">
              03 // What We Build
            </Link>
            <Link href="/#technology" className="text-slate-400 hover:text-white transition-colors">
              04 // Core Technology
            </Link>
            <Link href="/gallery" className="text-slate-400 hover:text-white transition-colors">
              05 // Archival Gallery
            </Link>
            <Link href="/career" className="text-slate-400 hover:text-white transition-colors">
              06 // Careers
            </Link>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-3 flex flex-col gap-3 font-mono text-xs tracking-wider uppercase">
            <div className="text-[#3B82F6] font-bold mb-1">// DIRECT COMMS</div>
            <a
              href="mailto:info@firstlogicmetalab.com"
              className="text-slate-300 hover:text-[#3B82F6] transition-colors normal-case font-mono text-sm"
            >
              info@firstlogicmetalab.com
            </a>
            <a
              href="https://wa.me/919745437355"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-[#3B82F6] transition-colors"
            >
              WhatsApp: +91 9745 43 73 55
            </a>
            <div className="text-[11px] text-slate-500 normal-case mt-2">
              Puthanveettil Tower, Bypass Road, Perinthalmanna, Kerala &bull; Global Operations
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          <p>© {new Date().getFullYear()} First Logic Meta Lab Pvt Ltd. All rights reserved.</p>
          <p>SOVEREIGN COMPUTING ARCHITECTURE // ISO COMPLIANT</p>
        </div>
      </div>
    </footer>
  );
}
