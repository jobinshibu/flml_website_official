"use client";

import { useEffect, useRef } from "react";
import originalData from "../original_instruments.json";

export default function AppStudioInstrument() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Extract only the app-studio section markup from originalData
    // Run studio.js to bind robot, design system tokens, and interactive preview
    const script = document.createElement("script");
    script.src = `/assets/js/studio.js?v=${Date.now()}`;
    script.async = false;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full text-left font-sans"
      dangerouslySetInnerHTML={{
        __html: originalData.bays.slice(
          originalData.bays.indexOf('<section class="g" id="app-studio">'),
          originalData.bays.indexOf('</section>', originalData.bays.indexOf('id="design-system"')) + 10
        ),
      }}
    />
  );
}

