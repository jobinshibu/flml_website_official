"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Zap } from "lucide-react";

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
  { name: "American Board", src: "/client/american board.png", link: "/#clients" },
  { name: "Foodzer", src: "/client/foodzer.png", link: "/foodzer" },
  { name: "MyVaahan", src: "/client/myvaahan.png", link: "/myvaahan" },
  { name: "Vivlino", src: "/client/vivlino.svg", link: "/vivlino" },
  { name: "Cabco", src: "/client/cabco.jpeg", link: "/cabco" },
  { name: "ClubQ", src: "/client/clubq.jpeg", link: "/clubq" },
  { name: "Cool Talk", src: "/client/cool talk.jpeg", link: "/cool-talk" },
  { name: "DCost", src: "/client/dcost.jpeg", link: "/dcost" },
  { name: "Flexifold", src: "/client/flexifold.jpeg", link: "/flexifold" },
  { name: "Relax Call", src: "/client/relax call.jpeg", link: "/relax-call" },
  { name: "Vestido Nation", src: "/client/vestido nation.jpeg", link: "/vestido-nation" },
  { name: "Kootukari", src: "/client/kootukari.jpeg", link: "/kootukari" },
  { name: "Live to smile", src: "/client/live_to_smile.jpeg", link: "/live-to-smile" },
  { name: "First Tap", src: "/client/first_tap.jpeg", link: "/first-tap" },
  { name: "Ebotto", src: "/client/ebotto.jpeg", link: "/ebotto" },
  { name: "Schosys", src: "/client/schosys.jpeg", link: "/schosys" },
  { name: "FinalFX", src: "/client/finalfx.png", link: "/finalfx" }
];

export default function Clients() {
  const router = useRouter();
  const [openingClient, setOpeningClient] = useState<ClientLogo | null>(null);

  useEffect(() => {
    setOpeningClient(null);
  }, []);

  const handleLogoClick = (client: ClientLogo, e: React.MouseEvent) => {
    if (client.link === "/#clients") return; // Skip pending items
    e.preventDefault();
    setOpeningClient(client);
    router.push(client.link);
  };

  const handlePrefetch = (link: string) => {
    if (link !== "/#clients") {
      router.prefetch(link);
    }
  };

  return (
    <section id="clients" className="pt-8 pb-4 bg-transparent relative z-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-xs font-mono tracking-[0.3em] uppercase text-white/50">
            ENTERPRISE PARTNERS & DEPLOYMENTS
          </h2>
        </div>
      </div>

      {/* Infinite Scrolling Logo Marquee */}
      <div className="relative w-full flex overflow-hidden group py-6 bg-neutral-950/60 backdrop-blur-sm">
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
              prefetch={true}
              onMouseEnter={() => handlePrefetch(client.link)}
              onClick={(e) => handleLogoClick(client, e)}
              className="relative w-36 h-16 mx-4 shrink-0 flex items-center justify-center bg-white/5 border border-white/10 p-2.5 rounded-2xl opacity-80 hover:opacity-100 transition-all hover:scale-105 hover:border-cyan-400 hover:bg-slate-900 shadow-xl group/logo cursor-pointer"
              title={client.name}
            >
              <Image 
                src={client.src} 
                alt={client.name} 
                fill 
                className="object-contain p-2" 
                sizes="144px" 
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Futuristic Expansion Page Opening Animation Overlay */}
      <AnimatePresence>
        {openingClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#030712]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-white"
          >
            {/* Ambient Radial Flare */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/30 blur-[120px] pointer-events-none"
            />

            {/* Expanding Card Container */}
            <motion.div
              initial={{ scale: 0.7, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-md w-full bg-slate-950 border border-cyan-500/40 p-8 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.3)] flex flex-col items-center text-center space-y-6 z-10"
            >
              {/* Pulsing Logo Icon Container */}
              <div className="relative w-24 h-24 bg-slate-900 border border-cyan-500/30 rounded-2xl p-3 shadow-inner flex items-center justify-center">
                <Image
                  src={openingClient.src}
                  alt={openingClient.name}
                  fill
                  className="object-contain p-2"
                  sizes="96px"
                  priority
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 rounded-2xl border border-cyan-400/60 pointer-events-none"
                />
              </div>

              {/* Status Header & Project Title */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest">
                  <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
                  <span>INITIALIZING CASE STUDY</span>
                </div>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight text-white">
                  {openingClient.name}
                </h3>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full space-y-2">
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 rounded-full"
                  />
                </div>
                <p className="font-mono text-[10px] text-cyan-400/80 uppercase tracking-widest">
                  LOADING DEPLOYMENT ARCHITECTURE...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
