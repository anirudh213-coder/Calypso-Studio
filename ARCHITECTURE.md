# Architecture: Scalable, Reusable Component System

## What Is This?

A composable component architecture that replaces large, monolithic components with small, reusable pieces.

## Folder Structure

```
src/
├── components/
│   ├── base/              # 5 core UI building blocks
│   │   ├── Button/
│   │   ├── Text/
│   │   ├── Heading/
│   │   ├── Icon/
│   │   └── Container/
│   │
│   ├── composite/         # 4 reusable combinations
│   │   ├── IconButton/
│   │   ├── ContactItem/
│   │   ├── Card/
│   │   └── AnimatedText/
│   │
│   ├── layout/            # Page structure
│   │   ├── MainLayout/
│   │   ├── Section/
│   │   └── Navbar/        # ✅ Already refactored
│   │
│   └── sections/          # Your content (to be refactored)
│
├── hooks/                 # 4 reusable logic hooks
│   ├── useScrollObserver.ts
│   ├── useScrollTo.ts
│   ├── useParallax.ts
│   └── useMarqueeAnimation.ts
│
└── utils/
    ├── helpers.ts
    └── constants.ts
```

## Component Categories

### Base Components (Building Blocks)
Simplest, single-purpose UI elements:

```tsx
import { Button, Text, Heading, Icon, Container } from '@/components/base';

<Button variant="primary">Click me</Button>
<Text size="lg" color="muted">Description</Text>
<Heading level={1}>Title</Heading>
<Icon name="arrow" size="md" />
<Container maxWidth="lg" padding="lg">Content</Container>
```

### Composite Components (Smart Combinations)
Combine base components into patterns:

```tsx
import { IconButton, ContactItem, Card, AnimatedText } from '@/components/composite';

<IconButton icon="arrow" label="Next" />
<ContactItem icon="mail" label="Email" value="hello@domain.com" href="mailto:..." isLink />
<Card title="Project">Details</Card>
<AnimatedText animation="slideUp">Animated text</AnimatedText>
```

### Custom Hooks (Reusable Logic)
Complex logic extracted into hooks:

```tsx
import { useScrollObserver, useScrollTo, useParallax, useMarqueeAnimation } from '@/hooks';

// Track active section
const active = useScrollObserver(['home', 'about', 'contact']);

// Smooth scroll
const { scrollTo } = useScrollTo();
scrollTo('section-id');

// Parallax effect
useParallax(containerRef, contentRef, { yPercent: [-18, 18] });

// Marquee animation
useMarqueeAnimation(topRef, bottomRef, { duration: 30 });
```

## How to Use

### Build a Section with Composable Components

**BEFORE (Large section file):**
```tsx
// 300+ lines: HTML, CSS, animations, logic all mixed together
export const HeroSection = () => {
  // ... 300 lines of code
};
```

**AFTER (Clean composition):**
```tsx
import { Section } from '@/components/layout';
import { Container, Heading, Text, Button } from '@/components/base';
import { AnimatedText } from '@/components/composite';

export const HeroSection = () => (
  <Section id="hero" fullWidth>
    <Container maxWidth="lg" padding="lg">
      <AnimatedText animation="slideUp" size="3xl" weight="bold">
        Welcome to Calypso
      </AnimatedText>
      <Text size="lg" color="muted">
        Independent digital design studio
      </Text>
      <Button variant="primary">Get Started</Button>
    </Container>
  </Section>
);
```

## Key Benefits

| Before | After |
|--------|-------|
| Large monolithic files (300+ lines) | Small focused components (50-100 lines) |
| Code duplication | Reusable pieces |
| Mixed concerns (HTML, CSS, logic) | Separation of concerns |
| Hard to maintain | Easy to maintain |
| Hard to test | Easy to test |
| Adding features = refactoring | Adding features = composing |

## Example: Refactoring ConnectSection

**Current (250+ lines, inline everything):**
```tsx
const MailIcon = () => (...);
const PhoneIcon = () => (...);
const LocationIcon = () => (...);

export const ConnectSection = () => {
  return (
    <section>
      {/* Contact items hardcoded inline */}
      <div className="flex gap-4">
        <MailIcon />
        <div>
          <p>Email</p>
          <p>hello@domain.com</p>
        </div>
      </div>
      {/* ... repeated for phone, location, etc */}
    </section>
  );
};
```

**Refactored (50 lines, using composables):**
```tsx
import { Section } from '@/components/layout';
import { Container, Heading } from '@/components/base';
import { ContactItem } from '@/components/composite';

export const ConnectSection = () => (
  <Section id="connect" fullWidth>
    <Container maxWidth="lg" padding="lg">
      <Heading level={2}>Get in Touch</Heading>
      <ContactItem icon="mail" label="Email" value="hello@domain.com" href="mailto:..." isLink />
      <ContactItem icon="phone" label="Phone" value="+1 (555) 123-4567" href="tel:..." isLink />
      <ContactItem icon="location" label="Location" value="Bangalore, India" />
    </Container>
  </Section>
);
```

## What's Already Done

✅ Created 15 reusable components  
✅ Created 4 custom hooks  
✅ Refactored Navbar.tsx (450 → 50 lines, -89%)  
✅ Full TypeScript support  
✅ Production ready  

## What Still Needs to Be Done

Your large sections are NOT YET refactored:
- HeroSection (300+ lines)
- PhilosophySection (320+ lines)
- ArchiveSection (280+ lines)
- ConnectSection (250+ lines)

These need to be refactored to USE the new base and composite components to reduce size and increase readability.
