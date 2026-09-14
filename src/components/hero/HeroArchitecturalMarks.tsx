"use client";

import React from "react";
import { MotionValue } from "framer-motion";

interface HeroArchitecturalMarksProps {
  scrollYProgress: MotionValue<number>;
}

/**
 * Clean architectural marks overlay:
 * Unnecessary technical HUD clutter (FLML Spec 01, coordinates, frame counters)
 * has been removed for a clean, editorial, professional presentation.
 */
export default function HeroArchitecturalMarks({
  scrollYProgress,
}: HeroArchitecturalMarksProps) {
  return null;
}
