'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { signupSchema, SignupFormData } from '@/lib/validations/auth';
import { PasswordStrength } from '@/components/ui/password-strength';
import { toast } from 'sonner';
import { registerAction } from '@/app/actions/authAction';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { googleSignIn, isLoading, registerError, setLoading } = useAuth();

  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
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
              <CardHeader>
                {/* <CardTitle className="text-center">Get Started</CardTitle> */}
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {registerError && (
                    <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-red-800 dark:text-red-200 text-sm">
                        {registerError.message}
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="displayName"
                        className="block text-sm font-medium mb-2"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                          id="displayName"
                          type="text"
                          placeholder="Enter your full name"
                          className="pl-10"
                          {...register('displayName')}
                        />
                      </div>
                      {errors.displayName && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.displayName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          {...register('email')}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium mb-2"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a password"
                          className="pl-10 pr-10"
                          {...register('password')}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.password.message}
                        </p>
                      )}
                      <PasswordStrength password={password || ''} />
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium mb-2"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10"
                          {...register('confirmPassword')}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      <>Create Account</>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-muted-foreground/20" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or
                    </span>
                  </div>
                </div>

                {/* Google Sign In */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-base font-medium border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 flex items-center justify-center gap-2 rounded-md"
                  onClick={() => googleSignIn()}
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
