import Navigation from "@/components/navigation";
import Link from "next/link";
import Image from "next/image";

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-brand-blue-dark text-white relative overflow-hidden">
      <Navigation />
      
      {/* Background blueprint grid for consistency */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blueprint-grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid-light)" />
        </svg>
      </div>

      {/* Header */}
      <div className="pt-24 md:pt-28 pb-6 px-8 relative z-10 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <Link href="/#career" className="inline-flex items-center gap-2 text-sm font-mono tracking-widest text-brand-blue-light hover:text-white transition-colors mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            BACK
          </Link>
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-brand-blue-light/50 mb-2">
            # RECRUITMENT PROTOCOL
          </h2>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 uppercase leading-tight">
            BUILD SYSTEMS THAT ACTUALLY MATTER.
          </h1>
          <p className="text-lg text-white/70 max-w-2xl font-medium leading-relaxed">
            We are always looking for serious engineers, architects, and product specialists who want to solve complex problems without the corporate bureaucracy.
          </p>
        </div>
      </div>

      {/* Roles & Info */}
      <div className="pt-8 pb-24 px-8 relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
           <div>
              <h3 className="text-2xl font-bold mb-8">CURRENT INITIATIVES</h3>
              <div className="space-y-6">
                <a href="mailto:info@firstlogicmetalab.com" className="block border border-white/10 p-8 hover:bg-white/5 transition-colors cursor-pointer group">
                   <div className="flex justify-between items-center mb-4">
                     <h4 className="text-xl font-bold group-hover:text-brand-blue-light transition-colors">SYSTEMS ARCHITECT</h4>
                     <span className="font-mono text-xs tracking-widest text-white/40">KERALA / REMOTE</span>
                   </div>
                   <p className="text-white/60 mb-6">Lead the design and implementation of highly scalable enterprise infrastructures.</p>
                   <span className="text-sm font-mono tracking-widest text-brand-blue-light">APPLY NOW →</span>
                </a>
                <a href="mailto:info@firstlogicmetalab.com" className="block border border-white/10 p-8 hover:bg-white/5 transition-colors cursor-pointer group">
                   <div className="flex justify-between items-center mb-4">
                     <h4 className="text-xl font-bold group-hover:text-brand-blue-light transition-colors">FULL-STACK ENGINEER</h4>
                     <span className="font-mono text-xs tracking-widest text-white/40">KERALA / REMOTE</span>
                   </div>
                   <p className="text-white/60 mb-6">Develop robust applications focusing on deep operational workflows.</p>
                   <span className="text-sm font-mono tracking-widest text-brand-blue-light">APPLY NOW →</span>
                </a>
              </div>
           </div>

           <div className="relative aspect-square md:aspect-auto min-h-[400px] border border-white/10 flex items-center justify-center overflow-hidden">
             <Image
               src="/GAL_1.jpg"
               alt="Team and Culture"
               fill
               className="object-cover opacity-80"
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-dark/80 to-transparent mix-blend-multiply" />
           </div>
        </div>
      </div>
    </main>
  );
}
