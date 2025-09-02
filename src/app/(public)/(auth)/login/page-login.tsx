'use client';

import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { LoginFormData, DEMO_CREDENTIALS } from '@/lib/validations/auth';
import { loginAction } from '@/app/actions/authAction';
import { useAuth } from '@/hooks/useAuth';
import { validateCallbackUrl } from '@/lib/security';
import LoginForm from '@/components/auth/login-form';
import { useTransition } from 'react';

const LoginPageContent = () => {
  const { googleSignIn } = useAuth();
  const searchParams = useSearchParams();
  const rawCallbackUrl = searchParams.get('callbackUrl');
  const [isPending, startTransition] = useTransition();

  // Define trusted domains for your application
  const trustedDomains = [
    'localhost:3000',
    'your-domain.com',
    'your-staging-domain.com',
  ];

  const callbackUrl = validateCallbackUrl(rawCallbackUrl, trustedDomains);

  const handleLogin = (data: LoginFormData) => {
    startTransition(async () => {
      try {
        await loginAction(data, callbackUrl || undefined);
        // If loginAction redirects, this may never run
      } catch (error) {
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
          return;
        }
        toast.error(
          error instanceof Error ? error.message : 'Invalid email or password'
        );
      }
    });
  };

  const handleGoogleSignIn = () => {
    googleSignIn(callbackUrl || undefined);
  };

  const handleDemoCredentials = (type: 'admin' | 'user') => {
    return DEMO_CREDENTIALS[type];
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      onGoogleSignIn={handleGoogleSignIn}
      onGetDemoCredentials={handleDemoCredentials}
      isLoading={isPending}
    />
  );
};

export default LoginPageContent;
