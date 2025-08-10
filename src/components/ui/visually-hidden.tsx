import * as React from 'react';
import { cn } from '@/lib/utils';

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

/**
 * VisuallyHidden component for screen reader only content
 * Follows WCAG guidelines for accessible hidden text
 */
const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
          'clip-path-[inset(50%)]', // Modern clip-path approach
          'sr-only', // Tailwind's screen reader only class as fallback
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

VisuallyHidden.displayName = 'VisuallyHidden';

export { VisuallyHidden };
