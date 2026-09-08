import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/navigation";

export default function GalleryPage() {
  const images = [
    "/GAL_1.jpg",
    "/GAL_2.jpg",
    "/GAL_3.jpg",
    "/GAL_4.jpg",
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Inner Page Header */}
      <div className="pt-24 pb-6 px-8 bg-surface-100 border-b border-border-subtle relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <Link href="/#gallery" className="inline-flex items-center gap-2 text-sm font-mono tracking-widest text-brand-blue hover:text-brand-blue-dark transition-colors mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            BACK
          </Link>
          <div className="mb-16">
            <h1 className="text-sm font-bold tracking-[0.2em] uppercase text-brand-blue mb-4">
              LIFE @FLML
            </h1>
            <p className="text-2xl md:text-4xl font-light text-foreground/80 max-w-3xl leading-relaxed">
              A curated visual archive of our development environments, physical infrastructure, and team operations.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="pt-8 pb-24 px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {images.map((src, idx) => (
            <div
              key={idx}
              className={`relative bg-surface-200 border border-border-subtle rounded flex items-center justify-center overflow-hidden group ${
                idx === 0 || idx === 3 ? "md:col-span-2 lg:col-span-2 aspect-video lg:aspect-[21/9]" : "aspect-square lg:aspect-video"
              }`}
            >
              <Image 
                src={src}
                alt={`Life at FLML Record ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-brand-blue-dark/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
