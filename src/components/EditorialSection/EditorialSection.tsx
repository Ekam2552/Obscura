"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import './EditorialSection.scss';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EditorialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const revealImgWrapperRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scrubbing Text Reveal
      if (textRef.current) {
        const words = textRef.current.querySelectorAll('.word');
        gsap.fromTo(words, 
          { opacity: 0.1 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              end: "bottom 40%",
              scrub: true,
            }
          }
        );
      }

      // 2. Horizontal Scroll + Centered Text-Spread Transition Timeline
      if (galleryWrapperRef.current && trackRef.current && headingRef.current && revealImgWrapperRef.current && overlayTextRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const scrollDistance = trackWidth - window.innerWidth;
        const transitionScrollDepth = window.innerHeight * 2;
        const totalDuration = scrollDistance + transitionScrollDepth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: galleryWrapperRef.current,
            start: "top top",
            end: () => `+=${totalDuration}`,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
          }
        });

        // Phase 1: Scroll track horizontally to the end cap
        tl.to(trackRef.current, {
          x: -scrollDistance,
          ease: "none",
          duration: 2,
        });

        // Phase 2: Lock track and transition (letters split down the center and blow off-screen, image expands)
        const leftHalf = headingRef.current.querySelector('.left-half');
        const rightHalf = headingRef.current.querySelector('.right-half');
        
        tl.to(headingRef.current, {
          scale: 8,
          ease: "power2.inOut",
          duration: 2,
        }, ">");

        tl.to(leftHalf, {
          x: "-25vw",
          ease: "power2.inOut",
          duration: 2,
        }, "<");

        tl.to(rightHalf, {
          x: "25vw",
          ease: "power2.inOut",
          duration: 2,
        }, "<");

        tl.to(revealImgWrapperRef.current, {
          rotation: 0,
          width: "100vw",
          height: "100vh",
          ease: "power2.inOut",
          duration: 2,
        }, "<");

        // Fade out heading cleanly as it spreads off-screen
        tl.to(headingRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "none",
        });

        // Phase 3: Animate in the editorial text on the expanded image
        tl.fromTo(overlayTextRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="editorial-desire-section" ref={sectionRef}>
      
      {/* Scrubbing Text Area */}
      <div className="scrub-text-container massive-spacing">
        <h2 className="scrub-heading" ref={textRef}>
          <span className="word">WE</span> <span className="word">DO</span> <span className="word">NOT</span> <span className="word">FOLLOW</span> <span className="word">TRENDS.</span>
          <br/>
          <span className="word">WE</span> <span className="word">ENGINEER</span> <span className="word">CULTURE.</span>
          <br/>
          <span className="word">OBSCURA</span> 
          <span className="inline-image-pill word" style={{backgroundImage: "url('/gallery_1.png')"}}></span>
          <span className="word">REDEFINES</span> <span className="word">THE</span>
          <br/>
          <span className="word">PARAMETERS</span> <span className="word">OF</span> <span className="word">LUXURY,</span>
          <br/>
          <span className="word">FORCING</span> <span className="word">A</span> <span className="word">CONFRONTATION</span>
          <span className="inline-image-pill word" style={{backgroundImage: "url('/gallery_2.png')"}}></span>
          <br/>
          <span className="word">BETWEEN</span> <span className="word">THE</span> <span className="word">ARCHITECTURAL</span>
          <br/>
          <span className="inline-image-pill word" style={{backgroundImage: "url('/gallery_3.png')"}}></span>
          <span className="word">AND</span> <span className="word">THE</span> <span className="word">ORGANIC.</span>
        </h2>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="horizontal-gallery-wrapper" ref={galleryWrapperRef}>
        <div className="horizontal-gallery-track" ref={trackRef}>
          
          <div className="gallery-item">
            <div className="image-frame">
              <Image src="/gallery_1.png" alt="Editorial 1" fill sizes="(max-width: 768px) 90vw, 70vw" style={{ objectFit: 'cover' }} />
            </div>
            <div className="item-meta mono-meta">LOOK 01 // SCARLET</div>
          </div>

          <div className="gallery-item">
            <div className="image-frame">
              <Image src="/gallery_2.png" alt="Editorial 2" fill sizes="(max-width: 768px) 90vw, 70vw" style={{ objectFit: 'cover' }} />
            </div>
            <div className="item-meta mono-meta">LOOK 02 // COBALT</div>
          </div>

          <div className="gallery-item">
            <div className="image-frame">
              <Image src="/gallery_3.png" alt="Editorial 3" fill sizes="(max-width: 768px) 90vw, 70vw" style={{ objectFit: 'cover' }} />
            </div>
            <div className="item-meta mono-meta">LOOK 03 // OBSIDIAN</div>
          </div>

          {/* End cap — THE COLLECTION centers, then triggers the zoom spread reveal */}
          <div className="gallery-end-cap flex-center">
            
            {/* Aspect-ratio reveal image: starts small + rotated, scales to full screen */}
            <div className="reveal-image-wrapper" ref={revealImgWrapperRef}>
              <Image
                src="/collection_reveal.png"
                alt="Obscura Reveal Anchor"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
            </div>

            <h3 className="macro-heading" ref={headingRef}>
              <span className="split-half left-half">THE COL</span>
              <span className="split-half right-half">LECTION</span>
            </h3>

            {/* Editorial overlay text revealed on full-screen image */}
            <div className="collection-overlay-text" ref={overlayTextRef}>
              <span className="mono-meta overlay-season">FW / 26 — OBSCURA</span>
              <h4 className="overlay-title">ARCHITECTURE<br/>OF DESIRE</h4>
              <div className="overlay-rule"></div>
              <p className="overlay-sub mono-meta">THREE LOOKS. ONE BRUTAL STATEMENT.</p>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
