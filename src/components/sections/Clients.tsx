"use client";

import Image from "next/image";

const clientLogos = [
  { name: "3ms", src: "/client/3ms.png" },
  { name: "Edhwi", src: "/client/Edhwi.svg" },
  { name: "Karikku", src: "/client/Karikku.svg" },
  { name: "American Board", src: "/client/american board.png" },
  { name: "Foodzer", src: "/client/foodzer.png" },
  { name: "Healine", src: "/client/healine.png" },
  { name: "MyVaahan", src: "/client/myvaahan.png" },
  { name: "Qaro", src: "/client/qaro.png" },
  { name: "Thara Cart", src: "/client/thara_cart.png" },
  { name: "Vivlino", src: "/client/vivlino.svg" },
  { name: "Cabco", src: "/client/cabco.jpeg" },
  { name: "ClubQ", src: "/client/clubq.jpeg" },
  { name: "Cool Talk", src: "/client/cool talk.jpeg" },
  { name: "DCost", src: "/client/dcost.jpeg" },
  { name: "Flexifold", src: "/client/flexifold.jpeg" },
  { name: "Relax Call", src: "/client/relax call.jpeg" },
  { name: "Vestido Nation", src: "/client/vestido nation.jpeg" },
  { name: "Kootukari", src: "/client/kootukari.jpeg" },
  { name: "Live to smile", src: "/client/live_to_smile.jpeg" },
  { name: "First Tap", src: "/client/first_tap.jpeg" },
  { name: "Ebotto", src: "/client/ebotto.jpeg" },
  { name: "Schosys", src: "/client/schosys.jpeg" },
  { name: "FinalFX", src: "/client/finalfx.png" }
];

export default function Clients() {
  return (
    <section id="clients" className="py-8 bg-black border-b border-white/10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <h2 className="text-xs font-mono tracking-[0.3em] uppercase text-white/50">
            02 // ENTERPRISE DEPLOYMENTS & PARTNERSHIPS
          </h2>
        </div>
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest hidden sm:block">
          200+ ACTIVE BACKBONES
        </span>
      </div>

      {/* Infinite Original Color Marquee */}
      <div className="relative w-full flex overflow-hidden group py-5 border-y border-white/10 bg-neutral-950/60">
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
            <div key={idx} className="relative w-36 h-14 mx-6 shrink-0 flex items-center justify-center bg-white/10 border border-white/15 p-2 rounded-xl opacity-90 hover:opacity-100 transition-all hover:scale-105 shadow-lg">
              <Image src={client.src} alt={client.name} fill className="object-contain p-1.5" sizes="144px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

