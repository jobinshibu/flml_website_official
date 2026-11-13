"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import GalaxyCanvas from "@/components/GalaxyCanvas";
import Navigation from "@/components/navigation";
import SideMenu from "@/components/SideMenu";
import Footer from "@/components/Footer";
import Opening from "@/components/sections/Opening";
import About from "@/components/sections/About";
import WhatWeBuild from "@/components/sections/WhatWeBuild";
import Clients from "@/components/sections/Clients";
import Gallery from "@/components/sections/Gallery";
import ConsultationForm from "@/components/sections/ConsultationForm";

// Defer the heavy Instrument Suite (which has 8 interactive bays, canvas & SVG charts)
// so that clicking 'Architecture' immediately transitions and plays the particle scatter smoothly at 60 FPS
const FirstLogicInstrumentSuite = dynamic(
  () => import("@/components/sections/FirstLogicInstrumentSuite"),
  { ssr: false }
);

export default function Home() {
  const [activeTab, setActiveTab] = useState<"flml" | "architecture" | "life">("flml");
  const [contentVisible, setContentVisible] = useState(false);

  const handleSelectTab = (tab: "flml" | "architecture" | "life") => {
    if (tab === activeTab) return;
    
    // Broadcast instant transition event directly so GalaxyCanvas scatters synchronously on click
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("flml:tab_transition", { detail: tab }));
    }

    if (tab === "flml") {
      // Returning to hero: fade out page content immediately so particles assemble into logo
      setContentVisible(false);
      setActiveTab(tab);
      if (typeof window !== "undefined") window.scrollTo(0, 0);
    } else {
      // Transitioning to Architecture or Life:
      // Keep content hidden initially, set tab state
      setContentVisible(false);
      setActiveTab(tab);
      if (typeof window !== "undefined") window.scrollTo(0, 0);
      
      // Reveal page content smoothly mid-scatter once particles have burst outward
      setTimeout(() => {
        setContentVisible(true);
      }, 420);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("about") || hash.includes("capabilities") || hash.includes("technology")) {
        handleSelectTab("architecture");
      } else if (hash.includes("clients") || hash.includes("gallery") || hash.includes("consultation")) {
        handleSelectTab("life");
      } else if (hash === "" || hash === "#" || hash.includes("flml")) {
        handleSelectTab("flml");
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
      <Navigation activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* Left-Side Sticky Scroll-Tracking Section Index */}
      <SideMenu activeTab={activeTab} />

      {/* Interactive 3D Logo & Space Particle Canvas */}
      <GalaxyCanvas activeTab={activeTab} />

      {/* Main View Container with Keep-Alive to eliminate DOM construction stutter on tab switch */}
      <div className={`relative z-10 w-full ${activeTab === "flml" ? "h-screen max-h-screen overflow-hidden" : "min-h-screen"}`}>
        <div className={activeTab === "flml" ? "block w-full h-screen max-h-screen overflow-hidden" : "hidden"}>
          <Opening />
        </div>

        <div
          className={`${
            activeTab === "architecture" ? "block" : "hidden"
          } w-full flex flex-col pt-16 transition-opacity duration-500 ease-out ${
            contentVisible && activeTab === "architecture" ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Architecture Suite: Story, Pillars, Chronology, Capabilities, Exact FirstLogic Instrument Bays */}
          <div id="about">
            <About />
          </div>
          <div id="capabilities">
            <WhatWeBuild />
          </div>
          <div id="instrument-suite">
            <FirstLogicInstrumentSuite />
          </div>
          {/* Footer at end of Architecture suite */}
          <Footer />
        </div>

        <div
          className={`${
            activeTab === "life" ? "block" : "hidden"
          } w-full flex flex-col pt-16 transition-opacity duration-500 ease-out ${
            contentVisible && activeTab === "life" ? "opacity-100" : "opacity-0"
          }`}
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
        </div>
      </div>
    </div>
  );
}
