'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import SignupForm from '@/components/auth/signup-form';
import { SignupFormData } from '@/lib/validations/auth';
import { registerAction } from '@/app/actions/authAction';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const SignupPageContent = () => {
  const { setUser, setAccessToken } = useAuthStore();
  const [isPending, startTransition] = useTransition();
  const { googleSignIn } = useAuth();
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
      } finally {
      }
    });
  };

  const handleGoogleSignIn = async () => {
    await googleSignIn();
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
