"use client";

import { motion } from "framer-motion";
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
    <section id="clients" className="pt-12 pb-4 bg-white border-t border-border-subtle overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-blue mb-4 text-center">
          # TRUSTED BY SERIOUS ORGANISATIONS
        </h2>
      </div>

      <div className="relative w-full flex overflow-hidden group py-4 bg-surface-100">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .group:hover .animate-marquee {
            animation-play-state: paused;
          }
        `}} />

        <div className="flex w-fit">
          <div className="flex animate-marquee shrink-0 items-center">
            {clientLogos.map((client, idx) => (
              <div key={idx} className="relative w-32 h-16 mx-8 shrink-0 flex items-center justify-center">
                <Image src={client.src} alt={client.name} fill className="object-contain" sizes="128px" />
              </div>
            ))}
          </div>
          <div className="flex animate-marquee shrink-0 items-center" aria-hidden="true">
            {clientLogos.map((client, idx) => (
              <div key={idx} className="relative w-32 h-16 mx-8 shrink-0 flex items-center justify-center">
                <Image src={client.src} alt={client.name} fill className="object-contain" sizes="128px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
