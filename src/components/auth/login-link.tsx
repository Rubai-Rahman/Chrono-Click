'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { setReferrerUrl } from '@/lib/auth/redirect-utils';

interface LoginLinkProps {
  children: React.ReactNode;
  className?: string;
}

export const LoginLink = ({ children, className }: LoginLinkProps) => {
  const pathname = usePathname();

  const handleClick = () => {
    // Store current path for redirect after login
    if (
      pathname !== '/login' &&
      pathname !== '/signup' &&
      pathname !== '/forgot-password'
    ) {
      setReferrerUrl(pathname);
    }
  };

  return (
    <Link href="/login" className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};
