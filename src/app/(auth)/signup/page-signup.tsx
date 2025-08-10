'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import SignupForm from '@/components/auth/signup-form';
import { SignupFormData } from '@/lib/validations/auth';
import { registerAction } from '@/app/actions/authAction';
import { useAuth } from '@/hooks/useAuth';

const SignupPageContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { googleSignIn } = useAuth();

  const handleSignup = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      const result = await registerAction({
        email: data.email,
        password: data.password,
        displayName: data.displayName,
      });

      if (result?.errors) {
        toast.error(result.errors.email?.[0] || 'Registration failed');
        return;
      }

      toast.success('Account created successfully!');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong'
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
