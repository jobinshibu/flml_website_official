import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-20 bg-black text-white pt-20 pb-12 px-6 md:px-12 border-t border-white/15">
      <div className="max-w-[1400px] mx-auto">
        
        {/* OpenAI Multi-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/15">
          
          {/* Column 1: Brand Identifier */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="relative w-8 h-8 filter brightness-0 invert transition-transform group-hover:scale-105">
                  <Image src="/FLML-01.png" alt="FLML Logo" fill sizes="32px" className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-sm tracking-widest text-white leading-none">
                    FIRST LOGIC
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-400 leading-tight">
                    META LAB
                  </span>
                </div>
              </Link>

              <p className="text-sm font-light text-slate-300 leading-relaxed max-w-sm mb-6">
                Engineering high-scale technology backbones and unbreakable software architectures for serious global enterprises.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                SYSTEMS NOMINAL // ALL REGIONS
              </span>
            </div>
          </div>

          {/* Column 2: Capabilities */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs text-cyan-400 tracking-[0.2em] uppercase mb-6 font-semibold">
              CAPABILITIES
            </h4>
            <ul className="space-y-3 font-mono text-xs text-slate-300">
              <li><Link href="/#capabilities" className="hover:text-cyan-400 transition-colors">Bespoke Applications</Link></li>
              <li><Link href="/#capabilities" className="hover:text-cyan-400 transition-colors">Enterprise Systems & ERP</Link></li>
              <li><Link href="/#capabilities" className="hover:text-cyan-400 transition-colors">SaaS & B2B Marketplaces</Link></li>
              <li><Link href="/#capabilities" className="hover:text-cyan-400 transition-colors">Robotic Process Automation</Link></li>
              <li><Link href="/#capabilities" className="hover:text-cyan-400 transition-colors">Neural Analytics & ML</Link></li>
              <li><Link href="/#capabilities" className="hover:text-cyan-400 transition-colors">Cloud Infrastructure & DevOps</Link></li>
              <li><Link href="/#capabilities" className="hover:text-cyan-400 transition-colors">Decentralized Protocols</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Social Media */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs text-cyan-400 tracking-[0.2em] uppercase mb-6 font-semibold">
              CONTACT & CONNECT
            </h4>
            <div className="space-y-6 font-mono text-xs text-slate-300">
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1">DIRECT CONTACT</span>
                <a href="tel:+919745437355" className="block text-white hover:text-cyan-400 transition-colors font-semibold">+91 9745 437 355</a>
                <a href="mailto:info@firstlogicmetalab.com" className="block text-slate-200 hover:text-cyan-400 transition-colors mt-0.5">info@firstlogicmetalab.com</a>
              </div>

              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-widest mb-2">SOCIAL CHANNELS</span>
                <div className="flex flex-col space-y-2">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <span>LinkedIn</span>
                    <span className="text-[10px] text-slate-400">↗</span>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <span>Instagram</span>
                    <span className="text-[10px] text-slate-400">↗</span>
                  </a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <span>X / Twitter</span>
                    <span className="text-[10px] text-slate-400">↗</span>
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <span>GitHub</span>
                    <span className="text-[10px] text-slate-400">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Directory */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs text-cyan-400 tracking-[0.2em] uppercase mb-6 font-semibold">
              DIRECTORY
            </h4>
            <ul className="space-y-3 font-mono text-xs text-slate-300">
              <li><Link href="/#about" className="hover:text-cyan-400 transition-colors">The Doctrine</Link></li>
              <li><Link href="/gallery" className="hover:text-cyan-400 transition-colors">Life @ FLML</Link></li>
              <li><Link href="/career" className="hover:text-cyan-400 transition-colors">Recruitment</Link></li>
              <li><Link href="/#consultation" className="hover:text-cyan-400 transition-colors">Initiate Brief</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono tracking-widest text-slate-400 uppercase font-medium">
          <p>© {new Date().getFullYear()} First Logic Meta Lab Pvt Ltd. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span>Perinthalmanna, Kerala</span>
            <div className="bg-white/10 px-3 py-1 rounded-full text-slate-200 border border-white/15">
              • GLOBAL // INDIA
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

