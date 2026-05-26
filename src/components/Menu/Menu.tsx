"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import './Menu.scss';

const MENU_ITEMS = [
  { label: 'INDEX', image: '/menu_index_final.webp' },
  { label: 'ARCHIVE', image: '/menu_archive_final.webp' },
  { label: 'STUDIO', image: '/menu_studio_final.webp' },
  { label: 'CONTACT', image: '/menu_contact_final.webp' }
];

interface MenuProps {
  isOpen: boolean;
}

export default function Menu({ isOpen }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeImage, setActiveImage] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Open animation
      gsap.to(menuRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1,
        ease: 'power4.inOut'
      });

      gsap.to(itemsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.4
      });
    } else {
      // Close animation
      gsap.to(itemsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power3.in'
      });

      gsap.to(menuRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1,
        ease: 'power4.inOut',
        delay: 0.3
      });
      
      // Use functional update to avoid activeImage dependency and satisfy linter/Fast Refresh
      setTimeout(() => {
        setActiveImage(null);
      }, 0);
    }
  }, [isOpen]); // Removed activeImage dependency

  return (
    <div className="menu-overlay" ref={menuRef}>
      
      <div className="menu-images">
        {MENU_ITEMS.map((item, index) => (
          <div 
            key={index} 
            className={`menu-image ${activeImage === index ? 'active' : ''}`}
          >
            <Image 
              src={item.image} 
              alt={item.label} 
              fill 
              sizes="60vw"
            />
          </div>
        ))}
      </div>

      <div className="menu-links">
        {MENU_ITEMS.map((item, index) => (
          <div 
            key={index} 
            className="menu-item"
            ref={el => { itemsRef.current[index] = el; }}
            onMouseEnter={() => setActiveImage(index)}
            onMouseLeave={() => setActiveImage(null)}
          >
            {item.label}
          </div>
        ))}
      </div>

    </div>
  );
}
