# Architecture: Scalable, Reusable Component System

## Overview

The project uses a composable component architecture designed to keep the interface modular, reusable, and maintainable.

Large page sections are separated into smaller UI components, reusable compositions, custom hooks, and utility modules. This keeps presentation, interaction logic, and page structure easier to understand and extend.

## Folder Structure

```text
src/
├── components/
│   ├── base/                  # Core, single-purpose UI primitives
│   │   ├── Button/
│   │   ├── Text/
│   │   ├── Heading/
│   │   ├── Icon/
│   │   └── Container/
│   │
│   ├── composite/             # Reusable combinations of components
│   │   ├── IconButton/
│   │   ├── ContactItem/
│   │   ├── Card/
│   │   └── AnimatedText/
│   │
│   ├── layout/                # Shared page and section structure
│   │   ├── MainLayout/
│   │   ├── Section/
│   │   └── Navbar/
│   │
│   └── sections/              # Page-specific sections
│
├── hooks/                     # Reusable application logic
│   ├── useScrollObserver.ts
│   ├── useScrollTo.ts
│   ├── useParallax.ts
│   └── useMarqueeAnimation.ts
│
└── utils/                     # Shared utilities and constants
    ├── helpers.ts
    └── constants.ts
```

## Component Categories

### Base Components

Base components are the smallest reusable building blocks in the interface. Each component is responsible for a focused UI concern.

```tsx
import {
  Button,
  Text,
  Heading,
  Icon,
  Container,
} from "@/components/base";

<Button variant="primary">Click me</Button>

<Text size="lg" color="muted">
  Description
</Text>

<Heading level={1}>
  Title
</Heading>

<Icon name="arrow" size="md" />

<Container maxWidth="lg" padding="lg">
  Content
</Container>
```

### Composite Components

Composite components combine multiple base components into reusable interface patterns.

```tsx
import {
  IconButton,
  ContactItem,
  Card,
  AnimatedText,
} from "@/components/composite";

<IconButton icon="arrow" label="Next" />

<ContactItem
  icon="mail"
  label="Email"
  value="hello@domain.com"
  href="mailto:hello@domain.com"
  isLink
/>

<Card title="Project">
  Details
</Card>

<AnimatedText animation="slideUp">
  Animated text
</AnimatedText>
```

## Custom Hooks

Reusable interaction and animation logic is extracted into custom hooks. This prevents complex behavior from being tightly coupled to individual page sections.

```tsx
import {
  useScrollObserver,
  useScrollTo,
  useParallax,
  useMarqueeAnimation,
} from "@/hooks";
```

### Scroll Observer

Tracks the currently active section.

```tsx
const active = useScrollObserver([
  "home",
  "about",
  "contact",
]);
```

### Smooth Scrolling

Provides programmatic navigation between sections.

```tsx
const { scrollTo } = useScrollTo();

scrollTo("section-id");
```

### Parallax

Applies reusable parallax behavior to referenced elements.

```tsx
useParallax(
  containerRef,
  contentRef,
  {
    yPercent: [-18, 18],
  },
);
```

### Marquee Animation

Provides reusable animation logic for continuously scrolling content.

```tsx
useMarqueeAnimation(
  topRef,
  bottomRef,
  {
    duration: 30,
  },
);
```

## Composition Pattern

Page sections should primarily compose existing components rather than implementing every UI element and interaction inline.

### Before

A large section may contain structure, styling, animation logic, and repeated UI patterns in a single file.

```tsx
export const HeroSection = () => {
  // Section structure
  // Animation logic
  // Repeated UI
  // Styling
  // Interaction logic
};
```

### After

The same section can be assembled from reusable layout, base, and composite components.

```tsx
import { Section } from "@/components/layout";
import {
  Container,
  Text,
  Button,
} from "@/components/base";
import { AnimatedText } from "@/components/composite";

export const HeroSection = () => (
  <Section id="hero" fullWidth>
    <Container
      maxWidth="lg"
      padding="lg"
    >
      <AnimatedText
        animation="slideUp"
        size="3xl"
        weight="bold"
      >
        Welcome
      </AnimatedText>

      <Text
        size="lg"
        color="muted"
      >
        Independent digital design studio
      </Text>

      <Button variant="primary">
        Get Started
      </Button>
    </Container>
  </Section>
);
```

## Refactoring Guidelines

When adding or modifying a section:

1. Prefer existing base components before creating new primitives.
2. Extract repeated UI patterns into composite components.
3. Move reusable interaction logic into custom hooks.
4. Keep section-specific content and composition inside the section component.
5. Avoid duplicating animation or layout logic across multiple sections.
6. Create a new abstraction only when it provides genuine reuse or improves clarity.

## Example: Contact Section

Repeated contact rows can be extracted into a reusable `ContactItem` component.

```tsx
import { Section } from "@/components/layout";
import {
  Container,
  Heading,
} from "@/components/base";
import { ContactItem } from "@/components/composite";

export const ConnectSection = () => (
  <Section
    id="connect"
    fullWidth
  >
    <Container
      maxWidth="lg"
      padding="lg"
    >
      <Heading level={2}>
        Get in Touch
      </Heading>

      <ContactItem
        icon="mail"
        label="Email"
        value="hello@domain.com"
        href="mailto:hello@domain.com"
        isLink
      />

      <ContactItem
        icon="phone"
        label="Phone"
        value="+1 (555) 123-4567"
        href="tel:+15551234567"
        isLink
      />

      <ContactItem
        icon="location"
        label="Location"
        value="Bangalore, India"
      />
    </Container>
  </Section>
);
```

## Benefits

| Traditional Approach             | Component-Based Approach                 |
| -------------------------------- | ---------------------------------------- |
| Large monolithic files           | Smaller, focused modules                 |
| Repeated UI code                 | Reusable components                      |
| Mixed responsibilities           | Clear separation of concerns             |
| Difficult to modify safely       | Easier to maintain and extend            |
| Logic duplicated across sections | Shared hooks and utilities               |
| UI patterns tied to one section  | Patterns reusable across the application |

## Current Architecture

The codebase currently includes:

* Base UI components for common interface primitives
* Composite components for reusable patterns
* Shared layout components
* Custom hooks for scrolling, parallax, observation, and marquee animation
* Utility modules for shared constants and helper functions
* TypeScript throughout the component system

## Refactoring Roadmap

The remaining page sections can be progressively migrated to the component system.

### HeroSection

Extract reusable typography, animation, and layout patterns while keeping the section-specific composition intact.

### PhilosophySection

Reuse shared text, layout, and animation primitives where appropriate.

### ArchiveSection

Extract reusable project cards, animated content, and media interaction patterns.

### ConnectSection

Replace repeated contact-row markup with the shared `ContactItem` component and move reusable interaction logic into shared components or hooks.

The goal is not to reduce every file to a specific line count. The goal is to keep responsibilities clear, minimize duplication, and create abstractions only where they improve the codebase.
