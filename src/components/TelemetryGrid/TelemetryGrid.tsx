"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import './TelemetryGrid.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TelemetryGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const look1Ref = useRef<HTMLDivElement>(null);
  const look2Ref = useRef<HTMLDivElement>(null);
  const look3Ref = useRef<HTMLDivElement>(null);
  const look4Ref = useRef<HTMLDivElement>(null);
  const look5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Parallax drifting for looks to evoke pure Kinfolk/Celine asymmetry
      if (look1Ref.current) {
        gsap.fromTo(look1Ref.current,
          { y: 40 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: look1Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2
            }
          }
        );
      }

      if (look2Ref.current) {
        gsap.fromTo(look2Ref.current,
          { y: 80 },
          {
            y: -80,
            ease: "none",
            scrollTrigger: {
              trigger: look2Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5
            }
          }
        );
      }

      if (look3Ref.current) {
        gsap.fromTo(look3Ref.current,
          { y: 20 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: look3Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.0
            }
          }
        );
      }

      if (look4Ref.current) {
        gsap.fromTo(look4Ref.current,
          { y: 60 },
          {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: look4Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4
            }
          }
        );
      }

      if (look5Ref.current) {
        gsap.fromTo(look5Ref.current,
          { y: 30 },
          {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: look5Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1
            }
          }
        );
      }

      // Smooth scroll-reveal for text
      const headings = container.querySelectorAll('.reveal-text');
      headings.forEach((heading) => {
        gsap.fromTo(heading,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="luxury-lookbook-section" ref={containerRef}>
      
      {/* Editorial Header Section */}
      <div className="lookbook-intro">
        <span className="mono-meta section-tag reveal-text">THE EDITORIAL LOOKBOOK</span>
        <h2 className="lookbook-title reveal-text">
          A STUDY IN<br />
          TAILORED VOLUMES
        </h2>
        <div className="lookbook-intro-desc reveal-text">
          <p>
            An ongoing examination of drape, weight, and silhouette. The capsule forces an interaction 
            between structural rigidity and the organic flow of textile forms, redefining the borders of 
            contemporary wear.
          </p>
        </div>
      </div>

      <div className="lookbook-grid">
        
        {/* LOOK 1: Asymmetric Left (Tall Vertical Portrait) */}
        <div className="lookbook-item item-left" ref={look1Ref}>
          <div className="image-container tall-portrait">
            <Image 
              src="/editorial_1.png" 
              alt="Look 01 - The Draped Silhouette" 
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className="item-details">
            <span className="item-tag mono-meta">LOOK 01 // SHADOW SCULPTURE</span>
            <h4 className="item-title">THE DRAPED COLUMN</h4>
            <p className="item-description">
              Heavy pleated wool crêpe engineered to capture harsh architectural shadows, balancing structural mass 
              with precise organic falls.
            </p>
          </div>
        </div>

        {/* LOOK 2: Asymmetric Right (Slightly Offset Square) */}
        <div className="lookbook-item item-right" ref={look2Ref}>
          <div className="image-container square-portrait">
            <Image 
              src="/editorial_2.png" 
              alt="Look 02 - Architectural Collapse" 
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="item-details">
            <span className="item-tag mono-meta">LOOK 02 // GEOMETRIC SEAMING</span>
            <h4 className="item-title">THE CONCRETE SHAPE</h4>
            <p className="item-description">
              Asymmetrical tailored jacket crafted in high-density gabardine, reinforcing torso boundaries 
              through rigid darts and custom clasps.
            </p>
          </div>
        </div>

        {/* LOOK 3: Landscape / Full Span Centered look */}
        <div className="lookbook-item item-center" ref={look3Ref}>
          <div className="image-container wide-landscape">
            <Image 
              src="/editorial_3.png" 
              alt="Look 03 - Technical Mass" 
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
          <div className="item-meta-grid">
            <div className="meta-col">
              <span className="mono-meta label">CATALOGUE REF</span>
              <p className="val">OBS-FW26-M4</p>
            </div>
            <div className="meta-col">
              <span className="mono-meta label">TEXTILE BLEND</span>
              <p className="val">DOUBLE-FACED ORGANZA & GARRISON WOOL</p>
            </div>
            <div className="meta-col">
              <span className="mono-meta label">STRUCTURAL FORM</span>
              <p className="val">OVERSIZED PANEL INTEGRATION WITH DECONSTRUCTED CUFFS</p>
            </div>
          </div>
        </div>

        {/* LOOK 4 & 5: Asymmetric Double Columns (Broken layout) */}
        <div className="double-column-group">
          
          <div className="lookbook-item item-left-double" ref={look4Ref}>
            <div className="image-container medium-portrait">
              <Image 
                src="/gallery_1.png" 
                alt="Look 04 - Organic Flow" 
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="item-details">
              <span className="item-tag mono-meta">LOOK 03 // SILHOUETTE FLUIDITY</span>
              <h4 className="item-title">THE SHADOW SCULPTOR</h4>
            </div>
          </div>

          <div className="lookbook-item item-right-double" ref={look5Ref}>
            <div className="image-container medium-portrait">
              <Image 
                src="/gallery_2.png" 
                alt="Look 05 - Tension Drape" 
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="item-details">
              <span className="item-tag mono-meta">LOOK 04 // ASYMMETRICAL WRAP</span>
              <h4 className="item-title">THE COLLAPSED COWL</h4>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
