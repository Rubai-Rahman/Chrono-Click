# Spacing System Documentation

## Overview

This document outlines the standardized spacing system implemented to ensure consistent UI across the Chrono Click application. The system addresses margin/padding inconsistencies and provides a stable foundation for component development.

## Key Benefits

- **Consistency**: Uniform spacing across all components
- **Responsiveness**: Mobile-first approach with breakpoint-aware spacing
- **Maintainability**: Centralized spacing tokens reduce code duplication
- **Scalability**: Easy to extend and modify spacing patterns

## Core Components

### 1. Container Classes

Use these for consistent container patterns:

```css
.container-base     /* Standard container: container mx-auto px-4 sm:px-6 lg:px-8 */
/* Standard container: container mx-auto px-4 sm:px-6 lg:px-8 */
/* Standard container: container mx-auto px-4 sm:px-6 lg:px-8 */
/* Standard container: container mx-auto px-4 sm:px-6 lg:px-8 */
/* Standard container: container mx-auto px-4 sm:px-6 lg:px-8 */
/* Standard container: container mx-auto px-4 sm:px-6 lg:px-8 */
/* Standard container: container mx-auto px-4 sm:px-6 lg:px-8 */
/* Standard container: container mx-auto px-4 sm:px-6 lg:px-8 */
.container-narrow   /* Narrow container: max-w-4xl */
.container-wide; /* Wide container: max-w-7xl */
```

### 2. Section Spacing

Vertical spacing between major sections:

```css
.section-sm    /* py-8 sm:py-12 */
/* py-8 sm:py-12 */
/* py-8 sm:py-12 */
/* py-8 sm:py-12 */
/* py-8 sm:py-12 */
/* py-8 sm:py-12 */
/* py-8 sm:py-12 */
/* py-8 sm:py-12 */
.section-md    /* py-12 sm:py-16 lg:py-20 (most common) */
.section-lg    /* py-16 sm:py-20 lg:py-24 */
.section-xl; /* py-20 sm:py-24 lg:py-32 */
```

### 3. Card Spacing

Internal component padding:

```css
.card-padding-sm    /* p-4 sm:p-6 */
/* p-4 sm:p-6 */
/* p-4 sm:p-6 */
/* p-4 sm:p-6 */
/* p-4 sm:p-6 */
/* p-4 sm:p-6 */
/* p-4 sm:p-6 */
/* p-4 sm:p-6 */
.card-padding-md    /* p-6 sm:p-8 */
.card-padding-lg; /* p-8 sm:p-10 lg:p-12 */
```

### 4. Gap Patterns

Responsive gaps between elements:

```css
.gap-responsive-sm    /* gap-3 sm:gap-4 */
/* gap-3 sm:gap-4 */
/* gap-3 sm:gap-4 */
/* gap-3 sm:gap-4 */
/* gap-3 sm:gap-4 */
/* gap-3 sm:gap-4 */
/* gap-3 sm:gap-4 */
/* gap-3 sm:gap-4 */
.gap-responsive-md    /* gap-4 sm:gap-6 */
.gap-responsive-lg; /* gap-6 sm:gap-8 */
```

## Usage Guidelines

### Standard Page Structure

```tsx
<section className="section-md">
  <div className="container-base">
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-4xl font-bold">Page Title</h2>
    </div>
    <!-- Page content -->
  </div>
</section>
```

### Using PageWrapper Component

```tsx
import PageWrapper from '@/components/layout/page-wrapper';

<PageWrapper spacing="md" containerSize="base">
  <h2>Section Title</h2>
  <!-- Content -->
</PageWrapper>
```

### Product Grids

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-responsive-md">
  {products.map((product) => (
    <Product key={product.id} product={product} />
  ))}
</div>
```

### Card Components

```tsx
<Card>
  <CardContent className="card-padding-md">
    <!-- Card content -->
  </CardContent>
</Card>
```

## Responsive Breakpoints

The system uses Tailwind's default breakpoints:

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up

## Migration Guide

### Before (Inconsistent)

```tsx
// Different spacing patterns
<section className="py-8">
<section className="py-10">
<section className="py-6">

// Different container patterns
<div className="container mx-auto px-4">
<div className="max-w-6xl mx-auto px-6">
```

### After (Consistent)

```tsx
// Standardized spacing
<section className="section-md">
<section className="section-lg">

// Standardized containers
<div className="container-base">
<div className="container-wide">
```

## Component Updates Made

### Updated Components:

1. **Brands Component** - Standardized section and container spacing
2. **Featured Products** - Added proper section wrapper and responsive grid
3. **News Component** - Consistent container and spacing patterns
4. **Newsletter Component** - Standardized card padding and container
5. **Product Component** - Consistent card padding

### Key Changes:

- Replaced `py-8`, `py-10`, `py-6` with `section-md`, `section-lg`
- Replaced `container mx-auto px-4` with `container-base`
- Replaced `p-6`, `p-8 lg:p-12` with `card-padding-md`, `card-padding-lg`
- Standardized grid gaps with `gap-responsive-md`

## Best Practices

### Do's:

✅ Use standardized spacing classes
✅ Follow mobile-first responsive approach
✅ Use PageWrapper for consistent page structure
✅ Test spacing on different screen sizes
✅ Use semantic spacing (section-md for sections, card-padding-md for cards)

### Don'ts:

❌ Use arbitrary padding/margin values
❌ Mix different spacing patterns in the same component
❌ Forget responsive considerations
❌ Override spacing classes with inline styles
❌ Use fixed pixel values for spacing

## Testing Spacing

### Visual Testing:

1. Test on mobile (320px-640px)
2. Test on tablet (640px-1024px)
3. Test on desktop (1024px+)
4. Check component alignment and consistency

### Development Tools:

- Use the SpacingGuide component for reference
- Browser dev tools for responsive testing
- Tailwind CSS IntelliSense for class suggestions

## Future Enhancements

### Planned Improvements:

1. Add animation-aware spacing for transitions
2. Implement spacing tokens for custom CSS properties
3. Add spacing validation in development mode
4. Create spacing linting rules

### Extending the System:

To add new spacing patterns, update:

1. `src/lib/spacing.ts` - Add new constants
2. `src/app/globals.css` - Add new utility classes
3. Update this documentation

## Troubleshooting

### Common Issues:

1. **Spacing looks different on mobile**: Ensure responsive classes are used
2. **Components don't align**: Check container class consistency
3. **Too much/little spacing**: Verify correct spacing size (sm/md/lg/xl)

### Debug Steps:

1. Check if correct spacing classes are applied
2. Verify responsive breakpoints
3. Inspect computed styles in browser dev tools
4. Compare with spacing guide component

## Support

For questions about the spacing system, refer to:

- This documentation
- `src/components/ui/spacing-guide.tsx` for visual reference
- `src/lib/spacing.ts` for implementation details
