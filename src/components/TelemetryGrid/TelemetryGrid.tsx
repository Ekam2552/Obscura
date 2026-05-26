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
  const innerWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      // Zoom-out transition timeline when scrolling past the bottom
      if (innerWrapperRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom bottom", // Trigger when the bottom of lookbook reaches bottom of viewport
            end: "+=100%", // Animate for 1 full viewport height scroll depth
            pin: true, // Pin container
            pinSpacing: false, // Allow next section to scroll underneath during pin
            scrub: true, // Sync exactly with scroll position to prevent position jumping on fast scroll
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          onUpdate: function () {
            const prog = this.progress();
            const container = containerRef.current;
            if (container) {
              if (prog > 0 && prog < 1) {
                container.classList.add("is-transitioning");
              } else {
                container.classList.remove("is-transitioning");
              }
            }
          }
        })
        .to(innerWrapperRef.current, {
          scale: 0, // Shrink wrapper completely
          rotation: 12, // Rotate by 12 degrees to match COLLECTION animation behavior
          ease: "power2.inOut",
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="luxury-lookbook-section" ref={containerRef}>
      <div className="lookbook-inner-wrapper" ref={innerWrapperRef}>
        <div className="lookbook-content" ref={contentRef}>
      
      {/* Editorial Header Section */}
      <div className="lookbook-intro">
        <span className="mono-meta section-tag reveal-text">THE EDITORIAL LOOKBOOK</span>
        <h2 className="lookbook-title reveal-text">
          A STUDY IN<br />
          TABOO SILHOUETTES
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
          <div className="image-container tall-portrait overflow-hidden group">
            <Image 
              src="/lookbook_look1_v3.png" 
              alt="Look 01 - Taboo Structure" 
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="luxury-image-filter group-hover:scale-105"
              priority
            />
          </div>
          <div className="item-details">
            <span className="item-tag mono-meta">LOOK 01 // TABOO STRUCTURE</span>
            <h4 className="item-title">THE BRUTALIST DRAPE</h4>
            <p className="item-description">
              An oversized asymmetric drape that interacts with sharp, raw concrete spaces and shadows.
            </p>
          </div>
        </div>

        {/* LOOK 2: Asymmetric Right (Slightly Offset Square) */}
        <div className="lookbook-item item-right" ref={look2Ref}>
          <div className="image-container square-portrait overflow-hidden group">
            <Image 
              src="/lookbook_look2_v3.png" 
              alt="Look 02 - Sheer Silhouette" 
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="luxury-image-filter group-hover:scale-105"
            />
          </div>
          <div className="item-details">
            <span className="item-tag mono-meta">LOOK 02 // SHEER TENSION</span>
            <h4 className="item-title">THE SILHOUETTE SHEER</h4>
            <p className="item-description">
              Delicate sheer knit layering that exposes form beneath structured drapes, presenting a subtle and bold skin stance.
            </p>
          </div>
        </div>

        {/* LOOK 3: Landscape / Full Span Centered look */}
        <div className="lookbook-item item-center" ref={look3Ref}>
          <div className="image-container wide-landscape overflow-hidden group">
            <Image 
              src="/lookbook_look3_cinematic.png" 
              alt="Look 03 - Exposed Column" 
              fill
              sizes="100vw"
              quality={95}
              className="luxury-image-filter group-hover:scale-105"
              priority
            />
          </div>
          <div className="item-meta-grid">
            <div className="meta-col">
              <span className="mono-meta label">CATALOGUE REF</span>
              <p className="val">OBS-FW26-M4</p>
            </div>
            <div className="meta-col">
              <span className="mono-meta label">TEXTILE BLEND</span>
              <p className="val">RAW SILK & BRUTALIST WOOL CREPE</p>
            </div>
            <div className="meta-col">
              <span className="mono-meta label">STRUCTURAL FORM</span>
              <p className="val">EXPOSED BARE-BACK WITH DRAPED ARCHITECTURAL SILHOUETTE</p>
            </div>
          </div>
        </div>

        {/* LOOK 4 & 5: Asymmetric Double Columns (Broken layout) */}
        <div className="double-column-group">
          
          <div className="lookbook-item item-left-double" ref={look4Ref}>
            <div className="image-container medium-portrait overflow-hidden group">
              <Image 
                src="/lookbook_look4_v3.png" 
                alt="Look 04 - Sculpted Back" 
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="luxury-image-filter group-hover:scale-105"
              />
            </div>
            <div className="item-details">
              <span className="item-tag mono-meta">LOOK 03 // CÉLINE DRAPE</span>
              <h4 className="item-title">THE SCULPTED BACK</h4>
            </div>
          </div>

          <div className="lookbook-item item-right-double" ref={look5Ref}>
            <div className="image-container medium-portrait overflow-hidden group">
              <Image 
                src="/lookbook_look5_v3.png" 
                alt="Look 05 - Asymmetric Attitude" 
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="luxury-image-filter group-hover:scale-105"
              />
            </div>
            <div className="item-details">
              <span className="item-tag mono-meta">LOOK 04 // PROVOCATIVE FORMS</span>
              <h4 className="item-title">THE ATTITUDE STANCE</h4>
            </div>
          </div>

        </div>

      </div>

      </div>
      </div>
    </section>
  );
}
