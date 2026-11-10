"use client";

import { useState, useEffect } from "react";
import GalaxyCanvas from "@/components/GalaxyCanvas";
import Navigation from "@/components/navigation";
import SideMenu from "@/components/SideMenu";
import Footer from "@/components/Footer";
import Opening from "@/components/sections/Opening";
import About from "@/components/sections/About";
import Engineering from "@/components/sections/Engineering";
import WhatWeBuild from "@/components/sections/WhatWeBuild";
import Clients from "@/components/sections/Clients";
import Gallery from "@/components/sections/Gallery";
import ConsultationForm from "@/components/sections/ConsultationForm";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"flml" | "architecture" | "life">("flml");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("about") || hash.includes("capabilities") || hash.includes("technology")) {
        setActiveTab("architecture");
      } else if (hash.includes("clients") || hash.includes("gallery") || hash.includes("consultation")) {
        setActiveTab("life");
      } else if (hash === "" || hash === "#" || hash.includes("flml")) {
        setActiveTab("flml");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Lock body overflow when in Hero (flml) mode so there's ZERO scrollbar on any PC resolution
  useEffect(() => {
    if (activeTab === "flml") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeTab]);

  return (
    <div
      className={`relative flex flex-col w-full bg-black text-white select-none ${
        activeTab === "flml" ? "h-screen max-h-screen overflow-hidden" : "min-h-screen overflow-x-hidden"
      }`}
    >
      {/* Top Sentence Navbar & Bottom Right Branding */}
      <Navigation activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Left-Side Sticky Scroll-Tracking Section Index */}
      <SideMenu activeTab={activeTab} />

      {/* Interactive 3D Logo & Space Particle Canvas */}
      <GalaxyCanvas activeTab={activeTab} />

      {/* Main View Container */}
      <div className={`relative z-10 w-full ${activeTab === "flml" ? "h-screen max-h-screen overflow-hidden" : "min-h-screen"}`}>
        <AnimatePresence mode="wait">
          {activeTab === "flml" && (
            <motion.div
              key="flml-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-screen max-h-screen overflow-hidden"
            >
              {/* Hero Section with Center Assembled Particles */}
              <Opening />
            </motion.div>
          )}

          {activeTab === "architecture" && (
            <motion.div
              key="architecture-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="w-full flex flex-col pt-16"
            >
              {/* Architecture Suite: Story, Pillars, Chronology, Capabilities, System Anatomy */}
              <div id="about">
                <About />
              </div>
              <div id="capabilities">
                <WhatWeBuild />
              </div>
              <div id="technology">
                <Engineering />
              </div>
              {/* Footer at end of Architecture suite */}
              <Footer />
            </motion.div>
          )}

          {activeTab === "life" && (
            <motion.div
              key="life-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="w-full flex flex-col pt-16"
            >
              {/* Life & Deployments Suite: Projects, Gallery, Brief */}
              <div id="clients">
                <Clients />
              </div>
              <div id="gallery">
                <Gallery />
              </div>
              <div id="consultation">
                <ConsultationForm />
              </div>
              {/* Footer at end of Life suite */}
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
