import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* OpenAI Multi-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand Identifier */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="relative w-8 h-8 filter brightness-0 invert transition-transform group-hover:scale-105">
                  <Image src="/FLML-01.png" alt="FLML Logo" fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-sm tracking-widest text-white leading-none">
                    FIRST LOGIC
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-white/50 leading-tight">
                    META LAB
                  </span>
                </div>
              </Link>

              <p className="text-sm font-light text-white/60 leading-relaxed max-w-sm mb-6">
                Engineering high-scale technology backbones and unbreakable software architectures for serious global enterprises.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                SYSTEMS NOMINAL // ALL REGIONS
              </span>
            </div>
          </div>

          {/* Column 2: Capabilities */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-6">
              CAPABILITIES
            </h4>
            <ul className="space-y-3 font-mono text-xs text-white/70">
              <li><Link href="/#capabilities" className="hover:text-white transition-colors">Bespoke Applications</Link></li>
              <li><Link href="/#capabilities" className="hover:text-white transition-colors">Enterprise Systems & ERP</Link></li>
              <li><Link href="/#capabilities" className="hover:text-white transition-colors">SaaS & B2B Marketplaces</Link></li>
              <li><Link href="/#capabilities" className="hover:text-white transition-colors">Robotic Process Automation</Link></li>
              <li><Link href="/#capabilities" className="hover:text-white transition-colors">Neural Analytics & ML</Link></li>
              <li><Link href="/#capabilities" className="hover:text-white transition-colors">Cloud Infrastructure & DevOps</Link></li>
              <li><Link href="/#capabilities" className="hover:text-white transition-colors">Decentralized Protocols</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Social Media */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-6">
              CONTACT & CONNECT
            </h4>
            <div className="space-y-6 font-mono text-xs text-white/70">
              <div>
                <span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">DIRECT CONTACT</span>
                <a href="tel:+919745437355" className="block text-white hover:text-blue-400 transition-colors">+91 9745 437 355</a>
                <a href="mailto:info@firstlogicmetalab.com" className="block text-white/80 hover:text-blue-400 transition-colors mt-0.5">info@firstlogicmetalab.com</a>
              </div>

              <div>
                <span className="block text-[10px] text-white/40 uppercase tracking-widest mb-2">SOCIAL CHANNELS</span>
                <div className="flex flex-col space-y-2">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    <span>LinkedIn</span>
                    <span className="text-[10px] text-white/30">↗</span>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    <span>Instagram</span>
                    <span className="text-[10px] text-white/30">↗</span>
                  </a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    <span>X / Twitter</span>
                    <span className="text-[10px] text-white/30">↗</span>
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    <span>GitHub</span>
                    <span className="text-[10px] text-white/30">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Directory */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-6">
              DIRECTORY
            </h4>
            <ul className="space-y-3 font-mono text-xs text-white/70">
              <li><Link href="/#about" className="hover:text-white transition-colors">The Doctrine</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Life @ FLML</Link></li>
              <li><Link href="/career" className="hover:text-white transition-colors">Recruitment</Link></li>
              <li><Link href="/#consultation" className="hover:text-white transition-colors">Initiate Brief</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono tracking-widest text-white/40 uppercase">
          <p>© {new Date().getFullYear()} First Logic Meta Lab Pvt Ltd. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span>Perinthalmanna, Kerala</span>
            <div className="bg-white/10 px-3 py-1 rounded-full text-white/70 border border-white/10">
              • GLOBAL // INDIA
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

