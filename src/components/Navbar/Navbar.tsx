"use client";

import React, { useState } from 'react';
import './Navbar.scss';
import Menu from '../Menu/Menu';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar" style={{ mixBlendMode: isMenuOpen ? 'normal' : 'difference' }}>
        <div className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(!isMenuOpen); }}>
            {isMenuOpen ? 'CLOSE' : 'MENU'}
          </a>
        </div>
      </nav>
      <Menu isOpen={isMenuOpen} />
    </>
  );
}
