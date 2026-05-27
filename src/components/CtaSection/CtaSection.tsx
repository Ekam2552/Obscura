"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ParticleImage from './ParticleImage';
import './CtaSection.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const words = ["INITIATE", "INQUIRE", "CONNECT", "ENGAGE", "CREATE"];
  const [wordIndex, setWordIndex] = useState(0);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselImages = [
    "/cta_editorial_model_1779708923523.webp",
    "/cta_carousel_1.webp",
    "/cta_carousel_2.webp",
    "/cta_carousel_4.webp",
  ];

  // Cycling carousel interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 10000); // 10 seconds per image
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Cycling word interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll('.char');
        gsap.to(chars, {
          x: 60,
          opacity: 0,
          filter: "blur(12px)",
          stagger: 0.08,
          duration: 1.0,
          ease: "power2.inOut",
          onComplete: () => {
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animate letters in when word changes
  useEffect(() => {
    if (headingRef.current) {
      const chars = headingRef.current.querySelectorAll('.char');
      gsap.fromTo(chars,
        { x: -60, opacity: 0, filter: "blur(12px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", stagger: 0.1, duration: 1.2, ease: "power2.out" }
      );
    }
  }, [wordIndex]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      // Zoom out entrance animation perfectly synced with lookbook shrinking
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.querySelector(".luxury-lookbook-section") || undefined,
          start: "bottom bottom",
          end: "+=180%", // Pin longer to allow static interactive hold
          pin: containerRef.current,
          pinSpacing: true,
          scrub: 1,
        }
      });

      // Tiny initial delay so it starts appearing very early in the scroll
      tl.to({}, { duration: 4.0 });

      tl.fromTo('.cta-content',
        { scale: isMobile ? 1.8 : 2.5, rotation: isMobile ? 0 : 5, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 3.5, ease: "power3.in" },
        0.5
      );

      tl.fromTo(headingRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 2.5, ease: "power2.in" },
        1.0
      );

      tl.fromTo(infoRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 2.0, ease: "power3.in" },
        1.5
      );

      tl.fromTo(formRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: "power4.in" },
        2.0
      );

      tl.fromTo(footerRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power2.in" },
        3.0
      );

      // Static hold for the remaining 80% scroll so user can interact with the canvas/form
      tl.to({}, { duration: 3.2 });

      // Magnetic Button Effect
      const btn = btnRef.current;
      if (btn) {
        const isTouchDevice = typeof window !== 'undefined' && 
          ('ontouchstart' in window || navigator.maxTouchPoints > 0);

        if (isTouchDevice) {
          const touchStart = () => {
            gsap.to(btn, {
              scale: 0.95,
              duration: 0.2,
              ease: "power2.out"
            });
          };

          const touchEnd = () => {
            gsap.to(btn, {
              scale: 1,
              duration: 0.5,
              ease: "elastic.out(1.2, 0.5)"
            });
          };

          btn.addEventListener("touchstart", touchStart, { passive: true });
          btn.addEventListener("touchend", touchEnd, { passive: true });
          btn.addEventListener("touchcancel", touchEnd, { passive: true });
          return () => {
            btn.removeEventListener("touchstart", touchStart);
            btn.removeEventListener("touchend", touchEnd);
            btn.removeEventListener("touchcancel", touchEnd);
          };
        } else {
          const hoverEffect = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.4; // 0.4 magnet strength
            const y = (e.clientY - rect.top - rect.height / 2) * 0.4;

            gsap.to(btn, {
              x: x,
              y: y,
              duration: 0.6,
              ease: "power3.out"
            });
          };

          const resetEffect = () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.3)"
            });
          };

          btn.addEventListener("mousemove", hoverEffect);
          btn.addEventListener("mouseleave", resetEffect);
          return () => {
            btn.removeEventListener("mousemove", hoverEffect);
            btn.removeEventListener("mouseleave", resetEffect);
          };
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cta-section" ref={containerRef}>
      <div className="cta-content">

        {/* Left Side: Massive Bleeding Image */}
        <div className="cta-visual-pane">
          <ParticleImage 
            images={carouselImages}
            activeIndex={carouselIndex}
            alt="Editorial Moody Model Carousel" 
          />
        </div>

        {/* Right Side: Stark Minimal Form */}
        <div className="cta-form-pane">

          <h2 className="cta-heading" ref={headingRef}>
            {words[wordIndex].split('').map((char, idx) => (
              <span key={idx} className="char" style={{ display: 'inline-block' }}>
                {char}
              </span>
            ))}
          </h2>

          <div className="cta-grid">
            <div className="cta-info" ref={infoRef}>
              <p className="cta-description">
                For exclusive commissions, architectural styling, or editorial collaborations.
                Leave your mark in the void.
              </p>
              <div className="cta-contact-details">
                <a href="mailto:studio@obscura.com" className="hover-link">STUDIO@OBSCURA.COM</a>
                <p>PARIS / TOKYO / NEW YORK</p>
              </div>
            </div>

            <form className="cta-form" ref={formRef}>
              <div className="input-group">
                <input type="text" id="name" placeholder="YOUR IDENTITY" required />
                <label htmlFor="name">NAME</label>
                <div className="liquid-border"></div>
              </div>
              <div className="input-group">
                <input type="email" id="email" placeholder="DIGITAL ADDRESS" required />
                <label htmlFor="email">EMAIL</label>
                <div className="liquid-border"></div>
              </div>
              <div className="input-group">
                <textarea id="message" placeholder="THE INQUIRY..." rows={3} required></textarea>
                <label htmlFor="message">MESSAGE</label>
                <div className="liquid-border"></div>
              </div>

              <button type="button" className="submit-btn group" ref={btnRef}>
                <span className="btn-text">SUBMIT INQUIRY</span>
                <span className="btn-hover-effect"></span>
              </button>
            </form>
          </div>

          <div className="cta-footer" ref={footerRef}>
            <div className="footer-links">
              <a href="#" className="hover-link">INSTAGRAM</a>
              <a href="#" className="hover-link">X (TWITTER)</a>
              <a href="#" className="hover-link">ARCHIVE</a>
            </div>
            <p>&copy; 2026 OBSCURA. ALL RIGHTS RESERVED.</p>
          </div>

        </div>

      </div>
    </section>
  );
}
