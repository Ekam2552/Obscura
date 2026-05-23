import React, { forwardRef } from 'react';
import Image from 'next/image';
import './EditorialGrid.scss';

const EditorialGrid = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section className="editorial-grid-section" ref={ref}>
      <div className="grid-container brutalist-grid">
        
        {/* Cell 1: Large Vertical Image (col-span-5, row-span-2) */}
        <div className="grid-cell col-span-5 row-span-2 bleed-top-left">
          <div className="cell-inner image-reveal overflow-hidden group">
            <Image 
              src="/editorial_sheer_v2.png" 
              alt="High-fashion sheer black drape" 
              fill 
              sizes="(max-width: 1024px) 100vw, 40vw"
              style={{ objectFit: 'cover' }}
              className="luxury-image-filter group-hover:scale-105"
            />
          </div>
          <div className="cell-meta">
            <span className="mono-meta">ARCHIVE / FW26 LOOK 02</span>
          </div>
        </div>

        {/* Cell 2: Massive Headline with Inline Image (col-span-7, row-span-1) */}
        <div className="grid-cell col-span-7 flex-center p-macro">
          <h2 className="macro-heading reveal-text">
            BRUTAL 
            <span 
              className="inline-image-pill" 
              style={{ backgroundImage: "url('/editorial_provocative_v2.png')" }}
            ></span>
            <span className="indent">SILHOUETTE</span>
          </h2>
        </div>

        {/* Cell 3: Description Text Card (col-span-4, row-span-1) */}
        <div className="grid-cell col-span-4 p-micro editorial-desc-cell">
          <p className="editorial-desc">
            A confrontational approach to draping. Obscura explores the stark boundaries between raw concrete architectures and the flowing form of double-faced silk.
          </p>
          <div className="status-indicator">
            <div className="dot"></div>
            <span className="mono-meta">FW/26 CAPSULE</span>
          </div>
        </div>

        {/* Cell 4: Technical Detail Image Card (col-span-3, row-span-1) */}
        <div className="grid-cell col-span-3 bleed-bottom-right">
          <div className="cell-inner image-reveal overflow-hidden group">
            <Image 
              src="/editorial_sculpt_v2.png" 
              alt="Céline shoulder drape texture detail" 
              fill 
              sizes="(max-width: 1024px) 100vw, 25vw"
              style={{ objectFit: 'cover' }}
              className="luxury-image-filter group-hover:scale-105"
            />
          </div>
          <div className="cell-meta">
            <span className="mono-meta">DETAIL // CÉLINE DRAPE</span>
          </div>
        </div>

      </div>
    </section>
  );
});

EditorialGrid.displayName = 'EditorialGrid';

export default EditorialGrid;
