'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from './button';

interface GoBackButtonProps {
  fallbackHref?: string;
  className?: string;
  children?: React.ReactNode;
}

const GoBackButton = ({
  fallbackHref = '/',
  className,
  children,
}: GoBackButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleGoBack = () => {
    // Check if there's a referrer and it's not the same page
    if (
      typeof window !== 'undefined' &&
      document.referrer &&
      document.referrer !== window.location.href &&
      window.history.length > 1
    ) {
      router.back();
    } else {
      // Fallback: navigate to parent route or provided fallback
      const segments = pathname.split('/').filter(Boolean);
      const parentPath =
        segments.length > 1
          ? `/${segments.slice(0, -1).join('/')}`
          : fallbackHref;
      router.push(parentPath);
    }
  };

  return (
    <Button
      onClick={handleGoBack}
      className={className || 'w-full '}
      aria-label="Go back to previous page"
      type="button"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {children || 'Go Back'}
    </Button>
  );
};

export default GoBackButton;
