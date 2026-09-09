import { useRef } from "react";
import { MotionValue, useScroll } from "framer-motion";

/**
 * Returns a MotionValue that represents the scroll progress (0 → 1) of the
 * element referenced by `targetRef`. It uses Framer Motion's `useScroll`
 * with the specific offset required for the hero's 200vh scroll range.
 */
export function useScrollProgress(targetRef: React.RefObject<HTMLElement>): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  return scrollYProgress;
}
