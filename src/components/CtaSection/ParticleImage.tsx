"use client";

import React, { useEffect, useRef } from "react";

interface ParticleImageProps {
  images: string[];
  activeIndex: number;
  alt: string;
}

class Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
  density: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.color = color;
    this.size = 2; 
    this.vx = 0;
    this.vy = 0;
    this.density = Math.random() * 8 + 1; 
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update(mouse: { x: number; y: number; radius: number }) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance; 
    
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.vx -= directionX;
      this.vy -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.vx -= dx / 5;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.vy -= dy / 5;
      }
      // Add subtle constant jitter/glitch
      this.vx += (Math.random() - 0.5) * 0.4;
      this.vy += (Math.random() - 0.5) * 0.4;
    }

    this.vx *= 0.75;
    this.vy *= 0.75;

    this.x += this.vx;
    this.y += this.vy;
  }
}

export default function ParticleImage({ images, activeIndex, alt }: ParticleImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesArray = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(null);
  const imageObjects = useRef<HTMLImageElement[]>([]);
  const isInitialized = useRef(false);

  const mouse = useRef({
    x: -1000,
    y: -1000,
    radius: 60 
  });

  // Preload images
  useEffect(() => {
    imageObjects.current = images.map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, [images]);

  // Handle Image Switching / Swarm Transition
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    
    // Only set width/height on first load to prevent clearing the canvas entirely 
    // mid-animation if we don't have to
    if (canvas.width !== width) canvas.width = width;
    if (canvas.height !== height) canvas.height = height;

    const img = imageObjects.current[activeIndex] || new Image();
    
    const extractPixels = () => {
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;
      
      let renderWidth, renderHeight, xOffset, yOffset;

      if (imgRatio > canvasRatio) {
        renderHeight = height;
        renderWidth = height * imgRatio;
        xOffset = (width - renderWidth) / 2;
        yOffset = 0;
      } else {
        renderWidth = width;
        renderHeight = width / imgRatio;
        yOffset = (height - renderHeight) / 2;
        xOffset = 0;
      }

      // Draw to a temporary offscreen canvas for data extraction 
      // so we don't flash the image on the visible canvas
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
      if (!tempCtx) return;

      tempCtx.drawImage(img, xOffset, yOffset, renderWidth, renderHeight);
      const imageData = tempCtx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      const newTargets: {x: number, y: number, color: string}[] = [];
      const gap = 5; 
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const alpha = data[index + 3];
          
          if (alpha > 128) {
            newTargets.push({x, y, color: `rgb(${r},${g},${b})`});
          }
        }
      }

      if (!isInitialized.current || particlesArray.current.length === 0) {
        particlesArray.current = newTargets.map(t => new Particle(t.x, t.y, t.color));
        isInitialized.current = true;
      } else {
        // Swarm Transition: 
        // Shuffle the targets so particles fly across each other randomly rather than sliding in a block
        for (let i = newTargets.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newTargets[i], newTargets[j]] = [newTargets[j], newTargets[i]];
        }

        const currentParticles = particlesArray.current;
        const newParticles: Particle[] = [];

        for (let i = 0; i < newTargets.length; i++) {
          const target = newTargets[i];
          if (i < currentParticles.length) {
            const p = currentParticles[i];
            p.baseX = target.x;
            p.baseY = target.y;
            p.color = target.color;
            // Kick the particles slightly so they explode outwards when changing
            p.vx = (Math.random() - 0.5) * 40;
            p.vy = (Math.random() - 0.5) * 40;
            newParticles.push(p);
          } else {
            const spawnX = Math.random() * width;
            const spawnY = Math.random() * height;
            const p = new Particle(spawnX, spawnY, target.color);
            p.baseX = target.x;
            p.baseY = target.y;
            newParticles.push(p);
          }
        }
        particlesArray.current = newParticles;
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      extractPixels();
    } else {
      img.onload = extractPixels;
      if (!img.src) img.src = images[activeIndex];
    }

  }, [activeIndex, images]);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      // Semi-transparent clear creates trail effects for flying particles!
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.current.length; i++) {
        particlesArray.current[i].update(mouse.current);
        particlesArray.current[i].draw(ctx);
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Event Listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.current.x = -1000;
      mouse.current.y = -1000;
    };

    const handleResize = () => {
      if (canvas.width !== container.clientWidth) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', display: 'block' }} 
        aria-label={alt}
      />
    </div>
  );
}
