/**
 * Standardized spacing system for consistent UI
 * Use these constants throughout the application for consistent spacing
 */

// Container spacing - consistent container patterns
export const CONTAINER_CLASSES = {
  // Standard container with responsive padding (max-w-screen-2xl for large screens)
  base: 'mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-screen-2xl',
  // Narrow container for content-focused sections (max-w-5xl)
  narrow: 'mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl',
  // Wide container for full-width sections (no max-width)
  wide: 'mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-none',
  // Full width container (edge to edge with padding)
  full: 'w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16',
} as const;

// Section spacing - consistent vertical spacing between major sections
export const SECTION_SPACING = {
  // Small sections (cards, small components)
  sm: 'py-8 sm:py-12',
  // Medium sections (most common)
  md: 'py-12 sm:py-16 lg:py-20',
  // Large sections (hero, major sections)
  lg: 'py-16 sm:py-20 lg:py-24',
  // Extra large sections (landing page sections)
  xl: 'py-20 sm:py-24 lg:py-32',
} as const;

// Component spacing - internal component spacing
export const COMPONENT_SPACING = {
  // Card padding
  card: {
    sm: 'p-4 sm:p-6',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10 lg:p-12',
  },
  // Gap between elements
  gap: {
    xs: 'gap-2 sm:gap-3',
    sm: 'gap-3 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-10 lg:gap-12',
  },
  // Margin between elements
  margin: {
    xs: 'mb-2 sm:mb-3',
    sm: 'mb-3 sm:mb-4',
    md: 'mb-4 sm:mb-6',
    lg: 'mb-6 sm:mb-8',
    xl: 'mb-8 sm:mb-10 lg:mb-12',
  },
} as const;

// Grid spacing - consistent grid layouts
export const GRID_SPACING = {
  // Product grids
  products:
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6',
  // News/blog grids
  news: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6',
  // Feature grids
  features:
    'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8',
  // Brand grids
  brands:
    'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-4 sm:gap-6',
} as const;

// Header spacing - consistent header patterns
export const HEADER_SPACING = {
  // Section headers
  section: 'text-center mb-8 sm:mb-12 lg:mb-16',
  // Page headers
  page: 'text-center mb-12 sm:mb-16 lg:mb-20',
  // Component headers
  component: 'mb-6 sm:mb-8',
} as const;

// Button spacing - consistent button sizing
export const BUTTON_SPACING = {
  // Standard button padding
  default: 'px-6 py-3 sm:px-8 sm:py-4',
  // Large button padding
  lg: 'px-8 py-4 sm:px-10 sm:py-5',
  // Small button padding
  sm: 'px-4 py-2 sm:px-6 sm:py-3',
} as const;

// Utility function to combine spacing classes
export const combineSpacing = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

// Common layout patterns
export const LAYOUT_PATTERNS = {
  // Standard page layout
  page: combineSpacing(CONTAINER_CLASSES.base, SECTION_SPACING.md),
  // Hero section layout
  hero: combineSpacing(CONTAINER_CLASSES.wide, SECTION_SPACING.xl),
  // Content section layout
  content: combineSpacing(CONTAINER_CLASSES.base, SECTION_SPACING.md),
  // Feature section layout
  feature: combineSpacing(CONTAINER_CLASSES.wide, SECTION_SPACING.lg),
} as const;
