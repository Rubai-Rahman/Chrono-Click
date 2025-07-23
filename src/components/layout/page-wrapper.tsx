import React, { JSX } from 'react';
import { cn } from '@/lib/utils';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: 'base' | 'narrow' | 'wide' | 'full';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  as?: keyof JSX.IntrinsicElements;
}

/**
 * PageWrapper component ensures consistent spacing and container sizing
 * across all pages and sections
 */
const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className,
  containerSize = 'base',
  spacing = 'md',
  as: Component = 'section',
}) => {
  const containerClass = {
    base: 'container-base',
    narrow: 'container-narrow',
    wide: 'container-wide',
    full: 'container-full',
  }[containerSize];

  const spacingClass = {
    sm: 'section-sm',
    md: 'section-md',
    lg: 'section-lg',
    xl: 'section-xl',
  }[spacing];

  return (
    <Component className={cn(spacingClass, className)}>
      <div className={containerClass}>{children}</div>
    </Component>
  );
};

export default PageWrapper;
