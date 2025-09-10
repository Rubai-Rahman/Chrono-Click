'use client';

import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { LoginFormData, DEMO_CREDENTIALS } from '@/lib/validations/auth';
import { googleSignInAction, loginAction } from '@/app/actions/authAction';
import { validateCallbackUrl } from '@/lib/security';
import LoginForm from '@/components/auth/login-form';
import { useTransition } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { CredentialResponse } from '@react-oauth/google';

const LoginPageContent = () => {
  const searchParams = useSearchParams();
  const rawCallbackUrl = searchParams.get('callbackUrl');
  const [isPending, startTransition] = useTransition();
  const { setUser, setAccessToken } = useAuthStore();
  const router = useRouter();
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
        const result = await loginAction(data);
        if (result.success) {
          setUser(result.payload.user);
          setAccessToken(result.payload.accessToken);
          router.push(callbackUrl || '/products/gents');
        }
        if (!result.success) {
          const errorMessage = result.message;
          toast.error(errorMessage, { id: 'signup-error' });
          return;
        }
        toast.success(`🎉 Welcome back!${result.payload.user.name}`, {
          id: 'signup-success',
        });
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
  const rememberMe = true;
  const handleGoogleSignIn = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse?.credential) {
      toast.error('Google login failed');
      return;
    }
    try {
      const res = await googleSignInAction(
        credentialResponse?.credential,
        rememberMe
      );
      if (res.success) {
        setUser(res.payload.user);
        setAccessToken(res.payload.accessToken);
        router.push(callbackUrl || '/products/gents');
      }
      if (!res.success) {
        const errorMessage = res.message;
        toast.error(errorMessage, { id: 'signup-error' });
        return;
      }
      toast.success(`🎉 Welcome back!${res.payload.user.name}`, {
        id: 'signup-success',
      });
    } catch (error) {
      console.log('error', error);
    }
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
