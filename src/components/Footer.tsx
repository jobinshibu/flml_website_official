"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface WorldClock {
  city: string;
  tz: string;
}

const CLOCKS: WorldClock[] = [
  { city: "India", tz: "Asia/Kolkata" },
  { city: "Dubai", tz: "Asia/Dubai" },
  { city: "London", tz: "Europe/London" },
  { city: "New York", tz: "America/New_York" },
];

export default function Footer() {
  const [times, setTimes] = useState<Record<string, string>>({});
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const updated: Record<string, string> = {};

      CLOCKS.forEach((c) => {
        try {
          const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: c.tz,
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          updated[c.city] = formatter.format(now);
        } catch {
          updated[c.city] = "--:--";
        }
      });

      try {
        const istDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
        const day = istDate.getDay();
        const hour = istDate.getHours();
        const isOpen = day >= 1 && day <= 6 && hour >= 9 && hour < 18;
        setIsOfficeOpen(isOpen);
      } catch {
        setIsOfficeOpen(true);
      }

      setTimes(updated);
    };

    updateClocks();
    const timer = setInterval(updateClocks, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer id="footer" className="relative z-20 bg-black text-white pt-8 pb-6 px-6 sm:px-12 lg:px-20 border-t border-white/15 w-full">
      <div className="max-w-[1500px] mx-auto w-full">
        
        {/* Main Sleek Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-white/10">
          
          {/* Col 1: Brand & Office (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-2.5 mb-3 group">
                <div className="relative w-7 h-7 filter brightness-0 invert transition-transform group-hover:scale-105">
                  <Image src="/FLML-01.png" alt="FLML Logo" fill sizes="28px" className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-xs tracking-widest text-white leading-none">
                    FIRST LOGIC
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.22em] text-cyan-400 leading-tight">
                    META LAB
                  </span>
                </div>
              </Link>

              <p className="text-xs font-light text-slate-400 leading-relaxed max-w-sm mb-3">
                Complex software engineering, enterprise solution architecture, and high-scale production systems.
              </p>

              <address className="not-italic font-mono text-[11px] text-slate-500 leading-relaxed">
                Puthanveettil Tower, Bypass Road, Perinthalmanna, Kerala 679322, India
              </address>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 font-mono text-xs flex flex-wrap gap-x-6 gap-y-1">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider mr-2">Direct:</span>
                <a href="tel:+919745437355" className="text-white hover:text-cyan-400 transition-colors font-semibold">
                  +91 9745 437 355
                </a>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider mr-2">Email:</span>
                <a href="mailto:info@firstlogicmetalab.com" className="text-slate-300 hover:text-cyan-400 transition-colors">
                  info@firstlogicmetalab.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Engineering Services (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="font-mono text-[11px] text-cyan-400 tracking-[0.2em] uppercase mb-3 font-semibold">
              ENGINEERING SERVICES
            </h4>
            <ul className="space-y-1.5 font-mono text-xs text-slate-300">
              <li><Link href="/cross-platform-app-development/" className="hover:text-cyan-400 transition-colors">Cross-Platform Apps (iOS / Android)</Link></li>
              <li><Link href="/solution-architecture/" className="hover:text-cyan-400 transition-colors">Solution Architecture &amp; System RFCs</Link></li>
              <li><Link href="/ai-solutions/" className="hover:text-cyan-400 transition-colors">Enterprise AI &amp; LLM Orchestration</Link></li>
              <li><Link href="/cloud-backend-engineering/" className="hover:text-cyan-400 transition-colors">Cloud Backend &amp; High-RPS Scale</Link></li>
              <li><Link href="/blockchain-development/" className="hover:text-cyan-400 transition-colors">Blockchain &amp; Smart Contracts</Link></li>
              <li><Link href="/fintech-payments/" className="hover:text-cyan-400 transition-colors">Payments &amp; Fintech Idempotency</Link></li>
              <li><Link href="/bots-automation/" className="hover:text-cyan-400 transition-colors">Quant Bots &amp; Trading Infrastructure</Link></li>
            </ul>
          </div>

          {/* Col 3: Elsewhere & Status (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-[11px] text-cyan-400 tracking-[0.2em] uppercase mb-3 font-semibold">
                ELSEWHERE
              </h4>
              <ul className="space-y-1.5 font-mono text-xs text-slate-300">
                <li>
                  <a href="https://in.linkedin.com/company/firstlogicinfolab" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center justify-between">
                    <span>LinkedIn</span>
                    <span className="text-slate-500">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/firstlogicmetalab/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center justify-between">
                    <span>Instagram</span>
                    <span className="text-slate-500">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/firstlogicmetalab/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center justify-between">
                    <span>Facebook</span>
                    <span className="text-slate-500">↗</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Action Contact Pills */}
            <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-2">
              <a
                href="https://wa.me/919745437355"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <span>💬 WhatsApp Business</span>
              </a>
              <a
                href="mailto:info@firstlogicmetalab.com"
                className="px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-mono text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <span>✉ Book Architecture Review</span>
              </a>
            </div>
          </div>

        </div>

        {/* Compact Integrated Bottom Row: Status + Live Mini Clocks + Rights */}
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] font-mono tracking-wider text-slate-500 uppercase">
          
          {/* Operations Live Dot */}
          <div className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOfficeOpen ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span className={isOfficeOpen ? "text-emerald-400" : "text-amber-400"}>
              {isOfficeOpen ? "Operations Live" : "After-Hours"}
            </span>
            <span>•</span>
            <span>Mon–Sat 9:00–18:00 IST</span>
          </div>

          {/* Inline Micro Clocks */}
          <div className="flex items-center gap-4 text-slate-400">
            {CLOCKS.map((c) => (
              <span key={c.city} className="flex items-center gap-1.5">
                <span className="text-slate-500">{c.city}:</span>
                <span className="text-cyan-400 font-semibold">{times[c.city] || "--:--"}</span>
              </span>
            ))}
          </div>

          {/* Copyright */}
          <div>
            © {new Date().getFullYear()} FIRST LOGIC META LAB PVT LTD.
          </div>
        </div>

      </div>
    </footer>
  );
}
