import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoginPageContent from './page-login';
import { LoginFormSkeleton } from '@/components/ui/skeletons';

export const metadata: Metadata = {
  title: 'Login - Chrono Click',
  description:
    'Sign in to your Chrono Click account to access exclusive features.',
};

const LoginPage = () => {
  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginPageContent />
    </Suspense>
  );
};

export default LoginPage;
