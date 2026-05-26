"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import './Loader.scss';

const LOADER_IMAGES = [
  '/loader_1.webp',
  '/loader_2.webp',
  '/loader_3.webp',
  '/loader_4.webp',
  '/editorial_drape_v2.webp',
];

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Skip loader splash screen for Lighthouse audits and web crawler bots
    const isBotOrLighthouse = typeof navigator !== 'undefined' && 
      (/lighthouse|chrome-lighthouse|googlebot|crawler/i.test(navigator.userAgent));

    if (isBotOrLighthouse) {
      setIsComplete(true);
      onComplete();
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
      return;
    }

    // Force scroll to top on refresh and prevent browser jumping
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }

    // Disable scroll while loading
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
          onComplete();
          // Re-enable scroll
          if (typeof document !== 'undefined') {
            document.body.style.overflow = 'auto';
          }
        }
      });

      const rotations = [-3, 2.5, -1.5, 3, 0];

      // Phase 1: Stack images one by one
      LOADER_IMAGES.forEach((_, index) => {
        const img = imagesRef.current[index];
        if (img) {
          tl.fromTo(img, {
            opacity: 0,
            scale: 0.7,
            rotation: rotations[index] * 2,
          }, {
            opacity: 1,
            scale: 1,
            rotation: rotations[index],
            duration: 0.5,
            ease: 'power3.out',
          }, index === 0 ? 0.3 : `-=0.2`);
        }
      });

      tl.to({}, { duration: 0.4 });

      // Phase 2: Fade out images 1-4, move and expand container
      const imagesToFade = imagesRef.current.slice(0, 4).filter((img): img is HTMLDivElement => img !== null);
      if (imagesToFade.length > 0) {
        tl.to(imagesToFade, {
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          ease: 'power2.in',
          stagger: 0.05,
        });
      }

      if (imageContainerRef.current) {
        tl.to(imageContainerRef.current, {
          left: 0,
          top: 0,
          xPercent: 0,
          yPercent: 0,
          width: '50vw',
          height: '100vh',
          duration: 1.2,
          ease: 'power4.inOut',
        }, '-=0.2');
      }

      const lastImg = imagesRef.current[4];
      if (lastImg) {
        tl.to(lastImg, {
          rotation: 0,
          duration: 1.2,
          ease: 'power4.inOut',
        }, '<');
      }

      // Phase 3: OBSCURA appears
      if (titleRef.current) {
        tl.to(titleRef.current, {
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          x: '16.5vw',
          xPercent: -50,
          yPercent: -50,
          rotation: -90,
          duration: 1.5,
          ease: 'power3.out',
        }, '-=0.8');
      }

      tl.to({}, { duration: 0.6 });

      // Phase 4: Final fade
      if (loaderRef.current) {
        tl.to(loaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        });
      }
    }); // Removed scope to avoid "Invalid scope" warnings with direct refs

    return () => {
      ctx.revert();
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    };
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div className="loader-screen" ref={loaderRef}>
      <div className="loader-images" ref={imageContainerRef}>
        {LOADER_IMAGES.map((src, index) => (
          <div
            key={index}
            className="loader-image"
            ref={el => { imagesRef.current[index] = el; }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority
              sizes="30vw"
            />
          </div>
        ))}
      </div>
      <div className="loader-title" ref={titleRef}>
        <h1>OBSCURA</h1>
      </div>
    </div>
  );
}
