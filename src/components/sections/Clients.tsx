"use client";

import Image from "next/image";
import Link from "next/link";

interface ClientLogo {
  name: string;
  src: string;
  link: string;
}

const clientLogos: ClientLogo[] = [
  { name: "Karikku Media", src: "/client/Karikku.svg", link: "/karikku" },
  { name: "Healine Healthcare", src: "/client/healine.png", link: "/healine" },
  { name: "Thara Cart B2B", src: "/client/thara_cart.png", link: "/thara-cart" },
  { name: "3MS Analytics", src: "/client/3ms.png", link: "/3ms" },
  { name: "Qaro Automotive", src: "/client/qaro.png", link: "/qaro" },
  { name: "Edhwi", src: "/client/Edhwi.svg", link: "/edhwi" },
  { name: "American Board", src: "/client/american board.png", link: "/products" },
  { name: "Foodzer", src: "/client/foodzer.png", link: "/foodzer" },
  { name: "MyVaahan", src: "/client/myvaahan.png", link: "/myvaahan" },
  { name: "Vivlino", src: "/client/vivlino.svg", link: "/vivlino" },
  { name: "Cabco", src: "/client/cabco.jpeg", link: "/cabco" },
  { name: "ClubQ", src: "/client/clubq.jpeg", link: "/clubq" },
  { name: "Cool Talk", src: "/client/cool talk.jpeg", link: "/cool-talk" },
  { name: "DCost", src: "/client/dcost.jpeg", link: "/products" },
  { name: "Flexifold", src: "/client/flexifold.jpeg", link: "/products" },
  { name: "Relax Call", src: "/client/relax call.jpeg", link: "/products" },
  { name: "Vestido Nation", src: "/client/vestido nation.jpeg", link: "/products" },
  { name: "Kootukari", src: "/client/kootukari.jpeg", link: "/products" },
  { name: "Live to smile", src: "/client/live_to_smile.jpeg", link: "/products" },
  { name: "First Tap", src: "/client/first_tap.jpeg", link: "/products" },
  { name: "Ebotto", src: "/client/ebotto.jpeg", link: "/products" },
  { name: "Schosys", src: "/client/schosys.jpeg", link: "/products" },
  { name: "FinalFX", src: "/client/finalfx.png", link: "/products" }
];

export default function Clients() {
  return (
    <section id="clients" className="py-12 bg-[#030712] border-b border-white/10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-xs font-mono tracking-[0.3em] uppercase text-white/50">
            02 // ENTERPRISE PARTNERS & DEPLOYMENTS
          </h2>
        </div>
        <span className="font-mono text-[10px] text-cyan-400/80 uppercase tracking-widest hidden sm:block">
          CLICK LOGO TO EXPLORE PROJECT PAGE
        </span>
      </div>

      {/* Infinite Scrolling Logo Marquee */}
      <div className="relative w-full flex overflow-hidden group py-6 border-y border-white/10 bg-neutral-950/80">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-slow {
            animation: marquee 35s linear infinite;
          }
          .group:hover .animate-marquee-slow {
            animation-play-state: paused;
          }
        `}} />

        <div className="flex w-max animate-marquee-slow shrink-0 items-center">
          {clientLogos.concat(clientLogos).map((client, idx) => (
            <Link
              key={idx}
              href={client.link}
              className="relative w-36 h-16 mx-4 shrink-0 flex items-center justify-center bg-white/5 border border-white/10 p-2.5 rounded-2xl opacity-80 hover:opacity-100 transition-all hover:scale-105 hover:border-cyan-400 hover:bg-slate-900 shadow-xl group/logo"
              title={`View ${client.name} dedicated project page`}
            >
              <Image 
                src={client.src} 
                alt={client.name} 
                fill 
                className="object-contain p-2" 
                sizes="144px" 
              />
              <div className="absolute -bottom-7 bg-cyan-950 border border-cyan-500/40 px-2 py-0.5 rounded text-[9px] font-mono text-cyan-300 opacity-0 group-hover/logo:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                View Page →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
