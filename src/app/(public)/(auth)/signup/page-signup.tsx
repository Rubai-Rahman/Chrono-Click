'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import SignupForm from '@/components/auth/signup-form';
import { SignupFormData } from '@/lib/validations/auth';
import { googleSignInAction, registerAction } from '@/app/actions/authAction';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { CredentialResponse } from '@react-oauth/google';

const SignupPageContent = () => {
  const { setUser, setAccessToken } = useAuthStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignup = async (data: SignupFormData) => {
    startTransition(async () => {
      try {
        const result = await registerAction({
          email: data.email,
          password: data.password,
          name: data.name,
        });
        if (result.success) {
          setUser(result.payload.user);
          setAccessToken(result.payload.accessToken);
        }
        if (!result.success) {
          const errorMessage = result.message;
          toast.error(errorMessage, { id: 'signup-error' });
          return;
        }
        toast.success('🎉 Account created successfully!', {
          id: 'signup-success',
        });
        router.push('/products/gents');
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Something went wrong',
          { id: 'signup-unexpected' }
        );
      }
    });
  };

  const handleGoogleSignIn = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse?.credential) {
      toast.error('Google login failed');
      return;
    }
    try {
      const res = await googleSignInAction(
        credentialResponse?.credential,
        false
      );
      if (res.success) {
        setUser(res.payload.user);
        setAccessToken(res.payload.accessToken);
        router.push('/products/gents');
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

  return (
    <SignupForm
      onSubmit={handleSignup}
      onGoogleSignIn={handleGoogleSignIn}
      isLoading={isPending}
    />
  );
};

export default SignupPageContent;
