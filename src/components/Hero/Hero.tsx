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
    const isMobile = window.innerWidth <= 768;

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
          // Mobile: shorter scroll distance since image is already full-width
          end: isMobile ? "+=200%" : "+=350%",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        }
      });

      if (isMobile) {
        // MOBILE: Image is already full-width, skip Phase 1
        // Just fade out the overlay elements gently
        tl.to(rightRef.current, {
          opacity: 0,
          ease: "none",
          duration: 0.5
        }, 0);

        // BUFFER
        tl.to({}, { duration: 0.3 });

        // PHASE 2: Slide hero out, reveal grid
        tl.to(leftRef.current, {
          x: "100vw",
          ease: "none",
          duration: 1
        });

        tl.to(gridRef.current, {
          x: "0%",
          ease: "none",
          duration: 1
        }, "<");

        // BUFFER: Stay pinned on grid
        tl.to({}, { duration: 0.5 });

      } else {
        // DESKTOP: Original full animation

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
      }

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
                src="/editorial_drape_v2.webp" 
                alt="Avant-garde fashion editorial drape" 
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
                <p>A STUDY IN</p>
                <p className="highlight-block">CONFRONTATIONAL</p>
                <p>LUXURY FORM</p>
              </div>
              <div className="editorial-meta">
                <span className="mono-meta">VOL. 01 / COLLECTION</span>
                <span className="mono-meta warning-text">[EXPLICIT EDITORIAL]</span>
              </div>
              <div className="hero-actions" style={{ marginTop: '1.5rem', display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                <div className="obscura-shutter-widget">
                  <div className="shutter-meta">
                    <div className="shutter-tag-row">
                      <span className="shutter-label">LENS STAT:</span>
                      <span className="shutter-value warning-text">ACTIVE</span>
                    </div>
                    <div className="shutter-tag-row">
                      <span className="shutter-label">APERTURE:</span>
                      <span className="shutter-value font-mono">F/1.2 LTR</span>
                    </div>
                    <div className="shutter-action-prompt">
                      <span>SCROLL DOWN</span>
                    </div>
                  </div>

                  <div className="shutter-visual-frame">
                    <div className="shutter-peek-image">
                      <Image 
                        src="/editorial_eye_v2.webp" 
                        alt="Obscura lens peek" 
                        fill
                        sizes="120px"
                        priority
                      />
                    </div>
                    <svg viewBox="0 0 100 100" className="shutter-aperture-svg">
                      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2, 2" />
                      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.75" />
                      <circle cx="50" cy="50" r="20" fill="none" stroke="var(--accent-red)" strokeWidth="0.5" strokeDasharray="1, 3" className="inner-target-ring" />
                      
                      <line x1="50" y1="2" x2="50" y2="6" stroke="currentColor" strokeWidth="1" />
                      <line x1="50" y1="94" x2="50" y2="98" stroke="currentColor" strokeWidth="1" />
                      <line x1="2" y1="50" x2="6" y2="50" stroke="currentColor" strokeWidth="1" />
                      <line x1="94" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="1" />

                      <path d="M 50,6 L 80,20" stroke="currentColor" strokeWidth="0.5" opacity="0.3" className="blade-line" />
                      <path d="M 94,50 L 80,80" stroke="currentColor" strokeWidth="0.5" opacity="0.3" className="blade-line" />
                      <path d="M 50,94 L 20,80" stroke="currentColor" strokeWidth="0.5" opacity="0.3" className="blade-line" />
                      <path d="M 6,50 L 20,20" stroke="currentColor" strokeWidth="0.5" opacity="0.3" className="blade-line" />
                    </svg>
                  </div>
                </div>
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
