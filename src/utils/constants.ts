/**
 * Animation timing constants
 */
export const ANIMATION_DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 1,
  verySlow: 1.5,
} as const;

export const ANIMATION_EASES = {
  default: 'power2.inOut',
  in: 'power2.in',
  out: 'power2.out',
  inOut: 'power2.inOut',
  custom: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const;

/**
 * Spacing constants
 */
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
} as const;

/**
 * Breakpoints (must match Tailwind)
 */
export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Z-index layers
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  overlay: 40,
  modal: 50,
  tooltip: 60,
  nav: 999,
} as const;
