'use client';

import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Auth state is now managed by Zustand store
  // This component just wraps children without providing context
  return <>{children}</>;
}
