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
    { id: "app-studio", label: "App Studio" },
    { id: "design-system", label: "Design System" },
    { id: "planner", label: "Planner" },
    { id: "blueprint", label: "AI Blueprint" },
    { id: "platform-demo", label: "Platforms" },
    { id: "chain-demo", label: "Blockchain" },
    { id: "bot-demo", label: "Trading Bot" },
    { id: "scale-demo", label: "Realtime Scale" },
    { id: "pay-demo", label: "Payments" },
  ];

  if (activeTab !== "architecture") return null;

  return <SideMenuInner items={architectureItems} />;
}

function SideMenuInner({ items }: { items: SideMenuItem[] }) {
  const [activeSection, setActiveSection] = useState<string>(items[0]?.id || "");
  const [hideMenu, setHideMenu] = useState(false);

  useEffect(() => {
    const determineActive = () => {
      const footerEl = document.getElementById("footer");
      if (footerEl) {
        const footerRect = footerEl.getBoundingClientRect();
        if (footerRect.top <= window.innerHeight * 0.6) {
          setHideMenu(true);
        } else {
          setHideMenu(false);
        }
      } else {
        setHideMenu(false);
      }

      const offset = 220;
      let currentActive = items[0]?.id || "";

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            currentActive = item.id;
          }
        }
      }

      setActiveSection(currentActive);
    };

    determineActive();
    window.addEventListener("scroll", determineActive, { passive: true });
    window.addEventListener("resize", determineActive, { passive: true });

    return () => {
      window.removeEventListener("scroll", determineActive);
      window.removeEventListener("resize", determineActive);
    };
  }, [items]);

  const handleScrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      let topOffset = 70;
      if (
        id === "design-system" ||
        id === "planner" ||
        id === "blueprint" ||
        id === "platform-demo" ||
        id === "chain-demo" ||
        id === "bot-demo" ||
        id === "scale-demo" ||
        id === "pay-demo"
      ) {
        topOffset = 100;
      } else if (id === "app-studio") {
        topOffset = 25;
      }
      const targetY = elem.getBoundingClientRect().top + window.scrollY - topOffset;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 left-6 xl:left-10 2xl:left-12 z-[50] hidden xl:flex flex-col gap-2.5 font-sans text-xs select-none pointer-events-auto transition-opacity duration-300 ${
        hideMenu ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {items.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleScrollTo(item.id)}
            className={`text-left transition-all duration-300 py-0.5 cursor-pointer ${
              isActive
                ? "text-cyan-400 font-medium drop-shadow-[0_0_12px_rgba(34,211,238,0.85)] scale-105"
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
