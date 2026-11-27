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

  const handleSelectTab = (tab: "flml" | "architecture" | "life") => {
    if (tab === activeTab) return;
    
    // Broadcast transition event directly so GalaxyCanvas scatters synchronously on click
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("flml:tab_transition", { detail: tab }));
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    setActiveTab(tab);
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

    // Listen to tab transition requests from Logi Copilot or other global components
    const handleCopilotTabChange = (e: any) => {
      if (e.detail && (e.detail === "flml" || e.detail === "architecture" || e.detail === "life")) {
        handleSelectTab(e.detail);
      }
    };
    window.addEventListener("flml:tab_transition", handleCopilotTabChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("flml:tab_transition", handleCopilotTabChange);
    };
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
          key={`arch-${activeTab === "architecture" ? "active" : "inactive"}`}
          className={`${
            activeTab === "architecture" ? "block" : "hidden"
          } w-full flex flex-col pt-16`}
        >
          {/* Architecture Suite: Story, Pillars, Chronology, Capabilities, Exact FirstLogic Instrument Bays */}
          <div id="about" className="anim-stagger-1">
            <About />
          </div>
          <div id="capabilities" className="anim-stagger-2">
            <WhatWeBuild />
          </div>
          <div id="instrument-suite" className="anim-stagger-3">
            <FirstLogicInstrumentSuite />
          </div>
          {/* Footer at end of Architecture suite */}
          <div className="anim-stagger-4">
            <Footer />
          </div>
        </div>

        <div
          key={`life-${activeTab === "life" ? "active" : "inactive"}`}
          className={`${
            activeTab === "life" ? "block" : "hidden"
          } w-full flex flex-col pt-16`}
        >
          {/* Life & Deployments Suite: Projects, Gallery, Brief */}
          <div id="clients" className="anim-stagger-1">
            <Clients />
          </div>
          <div id="gallery" className="anim-stagger-2">
            <Gallery />
          </div>
          <div id="consultation" className="anim-stagger-3">
            <ConsultationForm />
          </div>
          {/* Footer at end of Life suite */}
          <div className="anim-stagger-4">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
