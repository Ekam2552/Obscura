"use client";

import React, { useState } from 'react';
import Loader from '@/components/Loader/Loader';
import SmoothScroll from '@/components/SmoothScroll/SmoothScroll';
import Navbar from '@/components/Navbar/Navbar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaderDone(true)} />
      <SmoothScroll isLocked={!loaderDone}>
        <Navbar />
        {children}
      </SmoothScroll>
    </>
  );
}
