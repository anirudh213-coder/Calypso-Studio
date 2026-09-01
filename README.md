# CALYPSO — High-End Digital Design Studio

Native React + Vite + TypeScript + Tailwind + GSAP + Three.js implementation of the layered Calypso concept.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Place `background-loop.mp4` in `public/`.

---

## 🏗️ NEW: Scalable Component Architecture

**Status:**
- ✅ Infrastructure created (components, hooks, utilities)
- ✅ Navbar refactored (450 → 50 lines)
- ❌ Sections not yet refactored (still large)

### What to Read

→ **[ARCHITECTURE.md](ARCHITECTURE.md)** - Explains the new component system

That's the only file you need. It shows:
- What was created
- How to use it
- Before/after examples
- What still needs to be done

### What Was Created

**15 Reusable Components:**
- 5 base components (Button, Text, Heading, Icon, Container)
- 4 composite components (IconButton, ContactItem, Card, AnimatedText)
- 2 layout components (MainLayout, Section)

**4 Custom Hooks:**
- useScrollObserver - Track active section
- useScrollTo - Smooth scroll navigation
- useParallax - Parallax effects
- useMarqueeAnimation - Continuous scroll

**Utilities:**
- helpers.ts - Pure utility functions
- constants.ts - Shared constants

### What Still Needs Refactoring

Your section components are still large (250-320+ lines each):
- HeroSection ❌
- PhilosophySection ❌
- ArchiveSection ❌
- ConnectSection ❌

These need to be refactored to USE the new components to become readable and maintainable.

---

## 📚 Original Architecture

- Layer 0 — `BackgroundVideo`: fixed cinematic video.
- Layer 1 — `WorkingArea`: normal scroll content.
- Layer 2 — `LiquidImage`: native Three.js + GLSL displacement.
- Layer 3 — `Navbar`, `CustomCursor`, magnets.

The image shader is intentionally lightweight: procedural noise + sinusoidal displacement + mouse influence. It is a foundation for a stronger fluid simulation later.
