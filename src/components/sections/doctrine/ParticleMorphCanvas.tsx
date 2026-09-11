"use client";

import React, { useRef, useEffect } from "react";

// NEW: 3D Particle Morphing System (Torus -> Sphere -> Structured Cube)
// Responsive, hardware-accelerated Canvas with pointer reactivity & offscreen pause

interface Point3D {
  x: number;
  y: number;
  z: number;
}

const PARTICLE_COUNT = 650;
const MORPH_DURATION = 5000; // ms per shape transition
const HOLD_DURATION = 2000;  // ms holding shape

export default function ParticleMorphCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let isTabActive = !document.hidden;

    // Pointer interaction offsets
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // Base dimensions
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = (canvas.offsetWidth || 500) * (window.devicePixelRatio || 1);
      height = canvas.height = (canvas.offsetHeight || 500) * (window.devicePixelRatio || 1);
    };

    window.addEventListener("resize", handleResize);

    // 1. Generate 3 Shape Targets: Torus, Sphere, Cube
    const torusPoints: Point3D[] = [];
    const spherePoints: Point3D[] = [];
    const cubePoints: Point3D[] = [];

    const R_TORUS = 140;
    const r_TORUS = 50;
    const R_SPHERE = 150;
    const CUBE_SIZE = 220;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // 1. Torus coordinates
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      torusPoints.push({
        x: (R_TORUS + r_TORUS * Math.cos(v)) * Math.cos(u),
        y: (R_TORUS + r_TORUS * Math.cos(v)) * Math.sin(u),
        z: r_TORUS * Math.sin(v),
      });

      // 2. Sphere coordinates (Fibonacci sphere distribution)
      const phi = Math.acos(1 - 2 * (i + 0.5) / PARTICLE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      spherePoints.push({
        x: R_SPHERE * Math.sin(phi) * Math.cos(theta),
        y: R_SPHERE * Math.sin(phi) * Math.sin(theta),
        z: R_SPHERE * Math.cos(phi),
      });

      // 3. Structured Cube coordinates (distributed across 6 faces)
      const face = i % 6;
      const uC = (Math.random() - 0.5) * CUBE_SIZE;
      const vC = (Math.random() - 0.5) * CUBE_SIZE;
      const half = CUBE_SIZE / 2;
      let cx = 0, cy = 0, cz = 0;

      if (face === 0) { cx = half; cy = uC; cz = vC; }
      else if (face === 1) { cx = -half; cy = uC; cz = vC; }
      else if (face === 2) { cx = uC; cy = half; cz = vC; }
      else if (face === 3) { cx = uC; cy = -half; cz = vC; }
      else if (face === 4) { cx = uC; cy = vC; cz = half; }
      else { cx = uC; cy = vC; cz = -half; }

      cubePoints.push({ x: cx, y: cy, z: cz });
    }

    const shapes = [torusPoints, spherePoints, cubePoints];
    let currentShapeIndex = 0;
    let nextShapeIndex = 1;
    let transitionStartTime = performance.now();
    let isHolding = false;

    // Rotational angles
    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Pointer move listener
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 0.8;
      targetMouseY = y * 0.8;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Visibility Observer to pause when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && isTabActive) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const onVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isVisible && isTabActive) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Easing helper
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Render loop
    const render = (time: number) => {
      if (!isVisible || !isTabActive) return;

      const elapsed = time - transitionStartTime;

      let morphProgress = 0;
      if (isHolding) {
        morphProgress = 1;
        if (elapsed > HOLD_DURATION) {
          isHolding = false;
          currentShapeIndex = nextShapeIndex;
          nextShapeIndex = (nextShapeIndex + 1) % shapes.length;
          transitionStartTime = performance.now();
        }
      } else {
        const rawProgress = Math.min(1, elapsed / MORPH_DURATION);
        morphProgress = easeInOutCubic(rawProgress);
        if (rawProgress >= 1) {
          isHolding = true;
          transitionStartTime = performance.now();
        }
      }

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate 3D space
      if (!prefersReducedMotion) {
        angleX += 0.003 + mouseY * 0.01;
        angleY += 0.005 + mouseX * 0.01;
        angleZ += 0.001;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 420;
      const scaleMultiplier = Math.min(width, height) / 580;

      const currPoints = shapes[currentShapeIndex];
      const nextPoints = shapes[nextShapeIndex];

      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ);

      // Render morphed particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p1 = currPoints[i];
        const p2 = nextPoints[i];

        // Linear interpolation between shapes
        const xBase = (p1.x + (p2.x - p1.x) * morphProgress) * scaleMultiplier;
        const yBase = (p1.y + (p2.y - p1.y) * morphProgress) * scaleMultiplier;
        const zBase = (p1.z + (p2.z - p1.z) * morphProgress) * scaleMultiplier;

        // 3D Rotations (Yaw, Pitch, Roll)
        // Rotate Y
        const x1 = xBase * cosY + zBase * sinY;
        const z1 = -xBase * sinY + zBase * cosY;

        // Rotate X
        const y2 = yBase * cosX - z1 * sinX;
        const z2 = yBase * sinX + z1 * cosX;

        // Rotate Z
        const x3 = x1 * cosZ - y2 * sinZ;
        const y3 = x1 * sinZ + y2 * cosZ;

        // 2D Perspective Projection
        const distance = fov + z2;
        if (distance <= 10) continue;

        const projection = fov / distance;
        const screenX = cx + x3 * projection;
        const screenY = cy + y3 * projection;

        // Depth-based size & opacity
        const depthNorm = Math.max(0.1, Math.min(1, (z2 + 200) / 400));
        const radius = Math.max(0.7, 1.8 * projection * (depthNorm * 0.8 + 0.4));
        const alpha = Math.min(0.95, Math.max(0.15, depthNorm * 0.9));

        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);

        // Brand blue #0A369D with cyan #38bdf8 and core ice-white highlight (Matching Hero Section)
        if (depthNorm > 0.72) {
          ctx.fillStyle = `rgba(230, 242, 255, ${alpha})`;
        } else if (depthNorm > 0.4) {
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(10, 54, 157, ${alpha * 0.85})`;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
