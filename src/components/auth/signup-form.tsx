'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input, PasswordInput } from '@/components/ui/input';
import { Form, CommonFormField } from '@/components/ui/form';
import { signupSchema, SignupFormData } from '@/lib/validations/auth';
import { PasswordStrength } from '@/components/ui/password-strength';

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => Promise<void>;
  onGoogleSignIn: () => void;
  isLoading: boolean;
}

const SignupForm = ({
  onSubmit,
  onGoogleSignIn,
  isLoading,
}: SignupFormProps) => {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = form.watch('password');

  const handleSubmit = (formData: SignupFormData) => {
    onSubmit(formData);
  };

  return (
    <div className="container mx-auto flex responsive-space-x lg:py-12">
      <div className=" flex container mx-auto h-full rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl lg:shadow-foreground/20">
        {/* Left Side */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <Image
            src="/SignUp.webp"
            alt="Sign Up"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-6">Join Us Today!</h1>
              <p className="text-xl opacity-90 max-w-md">
                Create your account and discover our premium collection of
                timepieces.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-background via-muted/5 to-background">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-foreground">
                Create Account
              </h3>
              <p className="text-muted-foreground mt-2">
                Sign up to get started with your premium timepiece journey
              </p>
            </div>

            <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-md">
              <CardHeader></CardHeader>

              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      {/* Full Name Input */}
                      <CommonFormField
                        control={form.control}
                        name="displayName"
                        label="Full Name"
                      >
                        {({ field }) => (
                          <Input
                            type="text"
                            placeholder="Enter your full name"
                            {...field}
                          />
                        )}
                      </CommonFormField>

                      {/* Email Input */}
                      <CommonFormField
                        control={form.control}
                        name="email"
                        label="Email Address"
                      >
                        {({ field }) => (
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        )}
                      </CommonFormField>

                      {/* Password Input */}
                      <div className="space-y-2">
                        <CommonFormField
                          control={form.control}
                          name="password"
                          label="Password"
                        >
                          {({ field }) => (
                            <PasswordInput
                              placeholder="Create a password"
                              {...field}
                            />
                          )}
                        </CommonFormField>

                        <PasswordStrength password={password || ''} />
                      </div>

                      {/* Confirm Password Input */}
                      <CommonFormField
                        control={form.control}
                        name="confirmPassword"
                        label="Confirm Password"
                      >
                        {({ field }) => (
                          <PasswordInput
                            placeholder="Confirm your password"
                            {...field}
                          />
                        )}
                      </CommonFormField>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-lg font-semibold"
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      Create Account
                    </Button>
                  </form>
                </Form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-muted-foreground/20" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className=" text-muted-foreground">Or</span>
                  </div>
                </div>

                {/* Google Sign In */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-base font-medium"
                  onClick={onGoogleSignIn}
                  disabled={isLoading}
                >
                  <Image
                    className="rounded"
                    src="/google_logo.jpg"
                    width={20}
                    height={20}
                    alt="Google logo"
                  />
                  Sign In with Google
                </Button>

                <div className="mt-6 text-center">
                  <p className="text-muted-foreground">
                    Already have an account?{' '}
                    <Link
                      href="/login"
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      Login here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
