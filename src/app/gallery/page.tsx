import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/navigation";
import Footer from "@/components/Footer";

export default function GalleryPage() {
  const images = [
    { src: "/GAL_1.jpg", title: "RESEARCH & INFRASTRUCTURE // PERINTHALMANNA" },
    { src: "/GAL_2.jpg", title: "SYSTEM ARCHITECTS" },
    { src: "/GAL_3.jpg", title: "DEEP CORE SESSIONS" },
    { src: "/GAL_4.jpg", title: "GLOBAL TEAM COLLABORATION" },
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white">
      <Navigation />
      
      {/* Inner Page Header */}
      <div className="pt-28 pb-12 px-6 md:px-12 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <Link 
            href="/#gallery" 
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white/50 hover:text-white transition-colors mb-8 uppercase"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            BACK TO MAIN SITE
          </Link>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <h1 className="text-xs font-mono tracking-[0.3em] uppercase text-white/50">
                LIFE @FLML
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="py-16 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {images.map((item, idx) => (
            <div
              key={idx}
              className={`relative bg-neutral-950 border border-white/15 rounded-2xl flex items-center justify-center overflow-hidden group shadow-2xl ${
                idx === 0 || idx === 3 ? "md:col-span-2 lg:col-span-2 aspect-video lg:aspect-[21/9]" : "aspect-square lg:aspect-video"
              }`}
            >
              <Image 
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 font-mono text-xs text-white/70 tracking-widest uppercase">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}

