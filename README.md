# CALYPSO — High-End Digital Design Studio

Native React + Vite + TypeScript + Tailwind + GSAP + Three.js implementation of the layered Calypso concept.

## Run

```bash
npm install
npm run dev
```

Place `background-loop.mp4` in `public/`.

## Architecture

- Layer 0 — `BackgroundVideo`: fixed cinematic video.
- Layer 1 — `WorkingArea`: normal scroll content.
- Layer 2 — `LiquidImage`: native Three.js + GLSL displacement.
- Layer 3 — `Navbar`, `CustomCursor`, magnets.

The image shader is intentionally lightweight: procedural noise + sinusoidal displacement + mouse influence. It is a foundation for a stronger fluid simulation later.
