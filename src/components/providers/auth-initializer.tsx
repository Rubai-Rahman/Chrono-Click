'use client';

import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';

interface AuthInitializerProps {
  children: ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  // This component initializes the auth state by calling useAuth
  // The useAuth hook sets up the Firebase auth state listener
  useAuth();

  return <>{children}</>;
}
