"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children, isLocked }: { children: React.ReactNode, isLocked?: boolean }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (isLocked) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isLocked]);

  return <>{children}</>;
}
