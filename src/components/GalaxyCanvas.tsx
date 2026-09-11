"use client";

import { useEffect, useRef } from "react";

interface ConstellationParticle {
  x: number;
  y: number;
  z: number;
  homeX: number;
  homeY: number;
  homeZ: number;
  spawnX: number;
  spawnY: number;
  spawnZ: number;
  scatterDirX: number;
  scatterDirY: number;
  scatterDirZ: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  isBackgroundStar?: boolean;
  screenX?: number;
  screenY?: number;
  renderRadius?: number;
  renderAlpha?: number;
  transformedZ?: number;
}

export default function GalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ rotX: 0, rotY: 0, velX: 0, velY: 0 });
  const scrollRef = useRef({ targetProgress: 0, currentProgress: 0 });
  const loadRef = useRef({ progress: 0 }); // 0 to 1 smooth cinematic load
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 600;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.75;
      scrollRef.current.targetProgress = Math.min(1, Math.max(0, scrollY / heroHeight));
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Mouse Handlers
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;

      if (mouseRef.current.isDragging) {
        const deltaX = e.clientX - mouseRef.current.lastX;
        const deltaY = e.clientY - mouseRef.current.lastY;

        rotationRef.current.velY = deltaX * 0.003;
        rotationRef.current.velX = deltaY * 0.003;

        rotationRef.current.rotY += rotationRef.current.velY;
        rotationRef.current.rotX += rotationRef.current.velX;

        mouseRef.current.lastX = e.clientX;
        mouseRef.current.lastY = e.clientY;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const onMouseUp = () => {
      mouseRef.current.isDragging = false;
    };

    const onMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
      mouseRef.current.isDragging = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const particles: ConstellationParticle[] = [];
    let isLoaded = false;

    // Load FLML Logo
    const logoImg = new Image();
    logoImg.src = "/FLML-01.png";

    logoImg.onload = () => {
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      const imgWidth = 270;
      const imgHeight = 194;
      offscreen.width = imgWidth;
      offscreen.height = imgHeight;

      offCtx.drawImage(logoImg, 0, 0, imgWidth, imgHeight);
      const data = offCtx.getImageData(0, 0, imgWidth, imgHeight).data;

      const scaleMultiplier = Math.min(width, height) < 640 ? 1.6 : 2.2;
      const colors = [
        "rgba(255, 255, 255, ", 
        "rgba(224, 242, 254, ", 
        "rgba(186, 230, 253, ", 
        "rgba(96, 165, 250, ",  
        "rgba(147, 197, 253, ", 
      ];

      const step = 4;

      for (let y = 0; y < imgHeight; y += step) {
        for (let x = 0; x < imgWidth; x += step) {
          const index = (y * imgWidth + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 100) {
            const homeX = (x - imgWidth / 2) * scaleMultiplier;
            const homeY = (y - imgHeight / 2) * scaleMultiplier;
            const homeZ = (Math.random() - 0.5) * 30;

            // Outer spawn coordinates for graceful fly-in entry
            const angle = Math.random() * Math.PI * 2;
            const spawnDist = Math.random() * 900 + 700;
            const spawnX = Math.cos(angle) * spawnDist;
            const spawnY = Math.sin(angle) * spawnDist;
            const spawnZ = (Math.random() - 0.5) * 800;

            const len = Math.hypot(homeX, homeY) || 1;
            const scatterDirX = (homeX / len) + (Math.random() - 0.5) * 0.6;
            const scatterDirY = (homeY / len) + (Math.random() - 0.5) * 0.6;
            const scatterDirZ = (Math.random() - 0.5) * 2.2;

            const color = colors[Math.floor(Math.random() * colors.length)];
            const baseAlpha = Math.random() * 0.2 + 0.8;

            particles.push({
              x: spawnX,
              y: spawnY,
              z: spawnZ,
              homeX,
              homeY,
              homeZ,
              spawnX,
              spawnY,
              spawnZ,
              scatterDirX,
              scatterDirY,
              scatterDirZ,
              vx: 0,
              vy: 0,
              vz: 0,
              radius: Math.random() < 0.25 ? Math.random() * 3.2 + 2.4 : Math.random() * 1.8 + 1.2,
              color,
              alpha: baseAlpha,
              baseAlpha,
              twinkleSpeed: Math.random() * 0.05 + 0.01,
            });
          }
        }
      }

      // Background ambient stars
      for (let i = 0; i < 350; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * width * 0.45 + 80;
        const homeX = Math.cos(angle) * dist;
        const homeY = Math.sin(angle) * dist * 0.6;
        const homeZ = (Math.random() - 0.5) * 200;

        particles.push({
          x: homeX,
          y: homeY,
          z: homeZ,
          homeX,
          homeY,
          homeZ,
          spawnX: homeX,
          spawnY: homeY,
          spawnZ: homeZ,
          scatterDirX: (Math.random() - 0.5) * 1.5,
          scatterDirY: (Math.random() - 0.5) * 1.5,
          scatterDirZ: (Math.random() - 0.5) * 1.5,
          vx: 0,
          vy: 0,
          vz: 0,
          radius: Math.random() * 2.0 + 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.4 + 0.15,
          baseAlpha: Math.random() * 0.4 + 0.15,
          twinkleSpeed: Math.random() * 0.03 + 0.005,
          isBackgroundStar: true,
        });
      }

      isLoaded = true;
    };

    let time = 0;

    const render = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      time += 0.015;

      // 1. Cinematic Initial Load Assembly (Slower, silky smooth 2.5s duration)
      if (loadRef.current.progress < 1) {
        loadRef.current.progress += 0.0075; // Slower progress step for majestic entry
        if (loadRef.current.progress > 1) loadRef.current.progress = 1;
      }

      const t = loadRef.current.progress;
      // Smooth easeInOutCubic curve
      const loadEase = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      // 2. Smooth Scroll Inertia (Inertia lerp for fluid scroll scatter)
      scrollRef.current.currentProgress +=
        (scrollRef.current.targetProgress - scrollRef.current.currentProgress) * 0.08;
      const scrollProgress = scrollRef.current.currentProgress;

      // Radial Glow Fading
      const glowAlpha = Math.max(0, 0.14 * (1 - scrollProgress));
      if (glowAlpha > 0.01) {
        const bgGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.4);
        bgGlow.addColorStop(0, `rgba(255, 255, 255, ${glowAlpha})`);
        bgGlow.addColorStop(0.25, `rgba(59, 130, 246, ${glowAlpha * 0.45})`);
        bgGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = bgGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Rotation Damping & Auto-Righting
      if (!mouseRef.current.isDragging) {
        rotationRef.current.velX *= 0.9;
        rotationRef.current.velY *= 0.9;
        rotationRef.current.rotX += rotationRef.current.velX;
        rotationRef.current.rotY += rotationRef.current.velY;

        while (rotationRef.current.rotX > Math.PI) rotationRef.current.rotX -= Math.PI * 2;
        while (rotationRef.current.rotX < -Math.PI) rotationRef.current.rotX += Math.PI * 2;
        while (rotationRef.current.rotY > Math.PI) rotationRef.current.rotY -= Math.PI * 2;
        while (rotationRef.current.rotY < -Math.PI) rotationRef.current.rotY += Math.PI * 2;

        rotationRef.current.rotX += (0 - rotationRef.current.rotX) * 0.035;
        rotationRef.current.rotY += (0 - rotationRef.current.rotY) * 0.035;
      }

      const cosX = Math.cos(rotationRef.current.rotX);
      const sinX = Math.sin(rotationRef.current.rotX);
      const cosY = Math.cos(rotationRef.current.rotY);
      const sinY = Math.sin(rotationRef.current.rotY);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const scatterRadius = 140;
      const fov = 500;

      if (isLoaded) {
        // Vortex Swirl Rotation Angle during fly-in entry
        const swirlAngle = (1 - loadEase) * 0.75;
        const swirlCos = Math.cos(swirlAngle);
        const swirlSin = Math.sin(swirlAngle);

        particles.forEach((p) => {
          if (!p.isBackgroundStar) {
            // Scroll Dispersion with subtle spiral curve
            const scatterDistance = scrollProgress * 750;
            const scrollAngle = scrollProgress * 0.5;
            const sCos = Math.cos(scrollAngle);
            const sSin = Math.sin(scrollAngle);

            const rotScatterX = p.scatterDirX * sCos - p.scatterDirY * sSin;
            const rotScatterY = p.scatterDirX * sSin + p.scatterDirY * sCos;

            const targetX = p.homeX + rotScatterX * scatterDistance;
            const targetY = p.homeY + rotScatterY * scatterDistance;
            const targetZ = p.homeZ + p.scatterDirZ * scatterDistance;

            // Swirl entry during initial load
            const rawX = p.spawnX + (targetX - p.spawnX) * loadEase;
            const rawY = p.spawnY + (targetY - p.spawnY) * loadEase;
            const rawZ = p.spawnZ + (targetZ - p.spawnZ) * loadEase;

            const assembledX = rawX * swirlCos - rawY * swirlSin;
            const assembledY = rawX * swirlSin + rawY * swirlCos;
            const assembledZ = rawZ;

            // Mouse Interaction Physics (active when near top)
            if (!mouseRef.current.isDragging && scrollProgress < 0.3) {
              const rotY1 = p.y * cosX - p.z * sinX;
              const rotZ1 = p.y * sinX + p.z * cosX;
              const rotX2 = p.x * cosY + rotZ1 * sinY;
              const rotZ2 = -p.x * sinY + rotZ1 * cosY;

              const pScale = fov / (fov + rotZ2 + 100);
              const screenX = centerX + rotX2 * pScale;
              const screenY = centerY + rotY1 * pScale;

              const dx = screenX - mouseX;
              const dy = screenY - mouseY;
              const dist = Math.hypot(dx, dy);

              if (dist < scatterRadius && dist > 0.1) {
                const normDist = dist / scatterRadius;
                const force = (1 - normDist) * (1 - normDist) * 2.8;

                const nx = dx / dist;
                const ny = dy / dist;
                const mass = p.radius > 1.6 ? 1.6 : 0.85;

                p.vx += nx * (force / mass) * cosY;
                p.vy += ny * (force / mass) * cosX;
              }
            }

            p.vx *= 0.94;
            p.vy *= 0.94;
            p.vz *= 0.94;

            p.x += p.vx;
            p.y += p.vy;
            p.z += p.vz;

            p.x += (assembledX - p.x) * 0.04;
            p.y += (assembledY - p.y) * 0.04;
            p.z += (assembledZ - p.z) * 0.04;
          }

          // Projection & Render Setup
          const rotY1 = p.y * cosX - p.z * sinX;
          const rotZ1 = p.y * sinX + p.z * cosX;
          const rotX2 = p.x * cosY + rotZ1 * sinY;
          const rotZ2 = -p.x * sinY + rotZ1 * cosY;

          const finalScale = fov / (fov + rotZ2 + 100);
          p.screenX = centerX + rotX2 * finalScale;
          p.screenY = centerY + rotY1 * finalScale;
          p.renderRadius = Math.max(0.5, p.radius * finalScale);

          p.alpha = p.baseAlpha + Math.sin(time * 2 + p.homeX * 0.03) * 0.2;
          const scrollFade = Math.max(0.1, 1 - scrollProgress * 0.85);
          p.renderAlpha = Math.min(1, Math.max(0.05, p.alpha * Math.pow(finalScale, 1.1) * scrollFade));
          p.transformedZ = rotZ2;
        });

        particles.sort((a, b) => (b.transformedZ || 0) - (a.transformedZ || 0));

        particles.forEach((p) => {
          const sx = p.screenX ?? 0;
          const sy = p.screenY ?? 0;
          const r = p.renderRadius ?? 1;
          const a = p.renderAlpha ?? 0.8;

          if (sx < -40 || sx > width + 40 || sy < -40 || sy > height + 40) return;

          ctx.beginPath();
          ctx.arc(sx, sy, Math.max(1.2, r), 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${Math.min(1, Math.max(0.05, a)).toFixed(2)})`;
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing z-0"
    />
  );
}
