import React, { forwardRef } from 'react';
import Image from 'next/image';
import './EditorialGrid.scss';

const EditorialGrid = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section className="editorial-grid-section" ref={ref}>
      <div className="grid-container">
        
        {/* Cell 1: Large Vertical Image */}
        <div className="grid-cell col-span-5 row-span-2">
          <div className="cell-inner image-reveal">
            <Image 
              src="/editorial_1.png" 
              alt="Editorial 1" 
              fill 
              sizes="(max-width: 1024px) 100vw, 40vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="cell-meta">
            <span className="mono-meta">ARCHIVE / NO. 042</span>
          </div>
        </div>

        {/* Cell 2: Massive Headline */}
        <div className="grid-cell col-span-7 flex-center p-macro">
          <h2 className="macro-heading reveal-text">
            BRUTAL<br/>
            <span className="indent">PRECISION</span>
          </h2>
        </div>

        {/* Cell 3: Technical Detail */}
        <div className="grid-cell col-span-3">
          <div className="cell-inner image-reveal">
            <Image 
              src="/editorial_2.png" 
              alt="Editorial 2" 
              fill 
              sizes="(max-width: 1024px) 100vw, 25vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Cell 4: Description Text */}
        <div className="grid-cell col-span-4 p-micro">
          <p className="editorial-desc">
            A radical departure from the ornamental. Obscura explores the tension between 
            architectural rigidity and the fluidity of form. 
          </p>
          <div className="status-indicator">
            <div className="dot"></div>
            <span className="mono-meta">FW/26 CAPSULE</span>
          </div>
        </div>

        {/* Cell 5: Another Large Image */}
        <div className="grid-cell col-span-12 row-span-1 h-screen-100">
          <div className="cell-inner image-reveal">
            <Image 
              src="/editorial_3.png" 
              alt="Editorial 3" 
              fill 
              sizes="(max-width: 1024px) 100vw, 90vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        </div>

      </div>
    </section>
  );
});

EditorialGrid.displayName = 'EditorialGrid';

export default EditorialGrid;
