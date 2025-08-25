'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import SignupForm from '@/components/auth/signup-form';
import { SignupFormData } from '@/lib/validations/auth';
import { registerAction } from '@/app/actions/authAction';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const SignupPageContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { googleSignIn } = useAuth();
  const router = useRouter();

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const result = await registerAction({
        email: data.email,
        password: data.password,
        displayName: data.displayName,
      });
      console.log('reuslt', result);
      if (!result.success) {
        // Show validation errors
        const errorMessage =
          result.errors?.email?.[0] ||
          result.errors?.password?.[0] ||
          result.errors?.displayName?.[0] ||
          'Registration failed';
        toast.error(errorMessage, { id: 'signup-error' });
        return;
      }

      // Success case
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
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await googleSignIn();
  };

  return (
    <SignupForm
      onSubmit={handleSignup}
      onGoogleSignIn={handleGoogleSignIn}
      isLoading={isLoading}
    />
  );
};

export default SignupPageContent;
