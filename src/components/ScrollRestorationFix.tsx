"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestorationFix() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.history.scrollRestoration = "manual";
      } catch (e) {
        // Fallback for strict browser permissions
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
