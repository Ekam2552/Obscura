# OBSCURA: DESIGN SYSTEM & ARCHITECTURE

## 1. Core Aesthetic
- **Vibe:** Editorial fashion magazine meets industrial brutalism. Extreme contrast, aggressive font scaling, massive whitespace, and unexpected pops of bold color. Taboo luxury.
- **Color Palette:**
  - **Background:** `#F4F4F0` (Unbleached Matte Paper) or pure `#FFFFFF` for luxury whitespace.
  - **Foreground/Text:** `#050505` (Carbon Ink).
  - **Accents:** Bold, commanding colors (e.g., `#E61919` Aviation Red, or vibrant acid greens/electric blues) to heavily contrast the monochrome base.

## 2. Typography Architecture
- **Macro-Typography (Structural Headers):**
  - **Fonts:** Cormorant Garamond (Semi-Bold/Medium).
  - **Rules:** Massive scale (`clamp(8rem, 20vw, 25rem)`), tight tracking (`-0.04em`), elegant line-height (`0.85`), strictly uppercase. Thin, curvy, feminine but bold and daring.
- **Micro-Typography (Data & Meta-labels):**
  - **Fonts:** Space Mono.
  - **Rules:** Fixed small size (`10-12px`), generous tracking (`0.15em`), uppercase. Used for navigation, image captions, and structural meta-tags.
- **Textural Contrast:**
  - **Fonts:** Cormorant Garamond (Italicized).
  - **Rules:** Used for pull-quotes or editorial disruption to add a layer of sophistication.

## 3. Layout & Composition
- **AIDA Structure:**
  - *Attention (Hero):* Absolute minimalism, massive typography bleeding off the edge.
  - *Interest:* Asymmetric broken grids. Gapless mathematical alignment mixed with overlapping elements.
  - *Desire:* Huge vertical pacing (e.g., `20vh` to `30vh` gaps) between major sections.
- **Geometry:** Zero `border-radius`. Sharp 90-degree cuts only.
- **Anti-Slop:** No floating generic cards, no 6-line center-aligned paragraphs, no cheap decorative pills.

## 4. Technical Stack & Packages
- **Framework:** Next.js (App Router).
- **Styling:** SCSS (Sass). No Tailwind. Strict CSS variables for grid logic and typography.
- **Motion & Scroll:**
  - `@gsap/react` and `gsap` (ScrollTrigger for pinning, scale-fades, text scrubs).
  - `@studio-freight/lenis` (for high-performance 60fps smooth scrolling).
- **Media:** Native HTML5 Video & Images manipulated via CSS (`mix-blend-mode`, `grayscale`, SVG noise).

## 5. Implementation Steps
1. **Initialize Project:** Scaffold Next.js app with `npx create-next-app@latest`. Install `sass`, `gsap`, and `lenis`.
2. **Setup Foundations:** Define `globals.scss` with CSS variables for the 3-tier typography system, the substrate/ink color palette, and the global noise overlay.
3. **Build Core Components:** Create the minimal split Navigation, the Cinematic Hero (with clamped text limits), and the Editorial Broken Grid layout.
4. **Integrate Motion:** Wire Lenis to the root layout. Add GSAP ScrollTrigger animations (parallax, text reveals, hover states).
5. **Populate Media:** Use the prompt helpers below to generate and integrate the taboo luxury assets.

---

## 6. Media Prompt Helpers (For Image-to-Code Generation)

### Image Generation Prompt Template
> "A high-end editorial fashion photography shot. High contrast lighting, raw and authentic, not shying away from bold, controversial, or avant-garde poses. The color palette must feature mostly stark black and white, punctuated by exactly one or two extremely vibrant, demanding accent colors (e.g., piercing neon red, acid green, or electric blue). The composition should be asymmetrical, leaving massive amounts of negative space (whitespace) on one side. Shot on 35mm film, subtle grain, analog texture. No text in the image."

### Video Generation Prompt Template
> "A 5-second seamless looping video of avant-garde high-fashion motion. Fast-paced, glitchy, or strobe-like editing. Predominantly monochrome (black and white) with sudden flashes of intensely saturated, aggressive accent colors (crimson, electric blue). The subject should be moving dynamically in a high-fashion editorial style. The lighting is stark and dramatic, with deep shadows and blown-out highlights. Raw, VHS or 16mm film texture, no audio, no text."
