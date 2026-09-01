# CALYPSO — Digital Design Studio

A high-end digital design studio concept built with native React, Vite, TypeScript, Tailwind CSS, GSAP, and Three.js.

The project combines editorial typography, motion, interactive media, custom cursor interactions, and experimental visual effects into a single responsive experience.

## 🚀 Quick Start

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

### Required Media

Place the following file in the `public/` directory:

```text
public/
└── background-loop.mp4
```

## 🏗️ Component Architecture

The project follows a reusable component architecture designed to keep UI primitives, composite patterns, layout structures, animation logic, and page sections separated.

### Structure

```text
src/
├── components/
│   ├── base/
│   ├── composite/
│   ├── layout/
│   └── sections/
│
├── hooks/
│
└── utils/
```

The architecture documentation provides an overview of the component hierarchy, composition patterns, reusable hooks, and refactoring guidelines.

See [ARCHITECTURE.md](ARCHITECTURE.md) for details.

### Reusable Components

The current component system includes:

**Base components**

* Button
* Text
* Heading
* Icon
* Container

**Composite components**

* IconButton
* ContactItem
* Card
* AnimatedText

**Layout components**

* MainLayout
* Section
* Navbar

### Shared Hooks

Reusable interaction and animation logic is organized into custom hooks:

* `useScrollObserver` — observes active sections
* `useScrollTo` — provides smooth section navigation
* `useParallax` — handles parallax movement
* `useMarqueeAnimation` — manages continuous marquee animations

### Utilities

```text
src/utils/
├── helpers.ts
└── constants.ts
```

These modules contain shared helper functions and application-level constants.

## 📐 Original Visual Architecture

The experience is organized into several visual and interaction layers:

### Layer 0 — Background

A fixed cinematic background video establishes the visual foundation of the experience.

### Layer 1 — Working Area

The primary page content and sections occupy the normal document flow and provide the main scroll experience.

### Layer 2 — Liquid Image

A native Three.js and GLSL-based image treatment introduces interactive displacement and fluid-like movement.

The shader currently uses lightweight procedural noise, sinusoidal displacement, and mouse interaction. It is intentionally designed as a foundation that can be expanded into a more advanced fluid simulation.

### Layer 3 — Interaction Systems

Global interface elements sit above the primary content, including:

* Navigation
* Custom cursor
* Magnetic interactions
* Motion and hover effects

## 🛠️ Technology

| Technology   | Purpose                           |
| ------------ | --------------------------------- |
| React        | UI and component architecture     |
| Vite         | Development and build tooling     |
| TypeScript   | Type safety                       |
| Tailwind CSS | Responsive styling                |
| GSAP         | Animation and scroll-based motion |
| Three.js     | Interactive visual effects        |
| GLSL         | Custom shader effects             |

## 📌 Development Principles

The project is designed around:

* Reusable components
* Clear separation of concerns
* Responsive behavior across screen sizes
* Lightweight animation and shader implementations
* Progressive enhancement of interactive effects
* Type-safe development with TypeScript

The component architecture can be extended as new sections, interactions, and visual systems are introduced.
