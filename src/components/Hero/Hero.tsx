"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import EditorialGrid from '../EditorialGrid/EditorialGrid';
import './Hero.scss';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance for images and tags
      gsap.from(imageRef.current, {
        scale: 1.1,
        duration: 2,
        ease: "power3.out",
      });

      gsap.from(tagRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8
      });

      // Scroll Expansion & Reveal Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=350%", // Adjusted for snappier transition
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        }
      });

      // PHASE 1: Expand Hero Image
      tl.to(leftRef.current, {
        flex: "0 0 100%",
        ease: "none",
        duration: 1
      }, 0);

      tl.to(rightRef.current, {
        flex: "0 0 0%",
        opacity: 0,
        ease: "none",
        duration: 1
      }, 0);

      tl.to(textRef.current, {
        x: "10vw",
        ease: "none",
        duration: 1
      }, 0);

      tl.to(tagRef.current, {
        x: "70vw",
        ease: "none",
        duration: 1
      }, 0);

      // BUFFER 1: Stay at full width hero
      tl.to({}, { duration: 0.5 });

      // PHASE 2: Shrink Hero Left-to-Right & Reveal Grid
      tl.to(leftRef.current, {
        flex: "0 0 0%",
        x: "100vw",
        ease: "none",
        duration: 1
      });

      tl.to(gridRef.current, {
        x: "0%",
        ease: "none",
        duration: 1
      }, "<");

      // BUFFER 2: Stay pinned on EditorialGrid
      tl.to({}, { duration: 0.7 });

      // GLOBAL IMAGE ZOOM: Spans the entire timeline smoothly
      tl.fromTo(imageRef.current, { 
        scale: 1.0 
      }, {
        scale: 1.3,
        ease: "none",
        duration: tl.duration()
      }, 0);

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-transition-master">
      <section className="hero-section" ref={heroRef}>
        
        {/* Layer 1: The original hero content */}
        <div className="hero-content">
          <div className="hero-left" ref={leftRef}>
            <div className="hero-image-wrapper" ref={imageRef}>
              <Image 
                src="/loader_5.png" 
                alt="Avant-garde fashion editorial" 
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="hero-right" ref={rightRef}>
            <div className="hero-text-wrapper">
              <h1 ref={textRef}>OBSCURA</h1>
            </div>

            <div className="hero-editorial-block" ref={tagRef}>
              <div className="hazard-line"></div>
              <div className="manifesto-text">
                <p>TO IMPRESS</p>
                <p className="highlight-block">STOP GIVING</p>
                <p>SINGLE FUCKS</p>
              </div>
              <div className="editorial-meta">
                <span className="mono-meta">VOL. 01</span>
                <span className="mono-meta warning-text">[EXPLICIT]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 2: Hidden next section to be "dragged in" */}
        <div className="next-section-reveal" ref={gridRef}>
          <EditorialGrid />
        </div>
      </section>
    </div>
  );
}
