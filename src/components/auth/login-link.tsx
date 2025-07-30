'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { setReturnUrl } from '@/lib/auth/redirect-utils';

interface LoginLinkProps {
  children: React.ReactNode;
  className?: string;
}

export const LoginLink = ({ children, className }: LoginLinkProps) => {
  const pathname = usePathname();

  const handleClick = () => {
    // Store current path for redirect after login
    if (pathname !== '/login' && pathname !== '/signup') {
      setReturnUrl(pathname);
    }
  };

  return (
    <Link href="/login" className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};
