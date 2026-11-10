"use client";

import { useState, useEffect } from "react";

interface SideMenuItem {
  id: string;
  label: string;
}

interface SideMenuProps {
  activeTab?: "flml" | "architecture" | "life";
}

export default function SideMenu({ activeTab = "flml" }: SideMenuProps) {
  const architectureItems: SideMenuItem[] = [
    { id: "story", label: "Doctrine" },
    { id: "pillars", label: "Pillars" },
    { id: "history", label: "History" },
    { id: "capabilities", label: "Capabilities" },
    { id: "technology", label: "Anatomy" },
  ];

  const lifeItems: SideMenuItem[] = [
    { id: "clients", label: "Deployments" },
    { id: "gallery", label: "Life" },
    { id: "consultation", label: "Brief" },
  ];

  const currentItems = activeTab === "architecture" ? architectureItems : activeTab === "life" ? lifeItems : [];
  const [activeSection, setActiveSection] = useState<string>(currentItems[0]?.id || "");

  useEffect(() => {
    if (currentItems.length === 0) return;

    setActiveSection(currentItems[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-10% 0px -50% 0px",
        threshold: 0.1,
      }
    );

    currentItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [activeTab, currentItems]);

  if (activeTab === "flml" || currentItems.length === 0) return null;

  const handleScrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-6 sm:left-10 md:left-12 z-[50] hidden lg:flex flex-col gap-2.5 font-sans text-xs select-none pointer-events-auto">
      {currentItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleScrollTo(item.id)}
            className={`text-left transition-colors duration-300 py-0.5 cursor-pointer ${
              isActive
                ? "text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
