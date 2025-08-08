'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Mail, Lock, TestTube, User, Shield } from 'lucide-react';
import {
  loginSchema,
  LoginFormData,
  DEMO_CREDENTIALS,
} from '@/lib/validations/auth';
import { toast } from 'sonner';
import { loginAction } from '@/app/actions/authAction';
import { useAuth } from '@/hooks/useAuth';
import { useSearchParams } from 'next/navigation';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, googleSignIn, setLoading } = useAuth();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  // Demo credentials handler
  const fillDemoCredentials = (type: 'admin' | 'user') => {
    const credentials = DEMO_CREDENTIALS[type];
    setValue('email', credentials.email);
    setValue('password', credentials.password);
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      await loginAction(data, callbackUrl || undefined);
    } catch (error) {
      if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
        return;
      }
      toast.error(
        error instanceof Error ? error.message : 'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      {/* Left Side - Image (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 relative h-screen">
        <Image
          src="/LogIn.webp"
          alt="Abstract Login Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h3 className="text-4xl font-extrabold text-foreground mb-2">
              Welcome Back
            </h3>
          </div>

          <Card className="border-none shadow-2xl bg-card/80 backdrop-blur-lg rounded-xl p-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-2xl font-bold text-primary-foreground"></CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@example.com"
                        className="pl-10 pr-4 py-2 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                        {...register('email')}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10 py-2 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                        {...register('password')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1"
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
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
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-muted-foreground gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-primary h-4 w-4" />
                    Remember me
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary hover:underline transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-lg transition-all duration-300 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              {/* Google Sign In */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base font-medium border-2 border-input hover:bg-accent hover:text-accent-foreground transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={() => googleSignIn(callbackUrl || undefined)}
                disabled={isLoading}
              >
                <Image
                  className="rounded-full"
                  src="/google_logo.jpg"
                  width={20}
                  height={20}
                  alt="Google logo"
                />
                Google
              </Button>

              {/* Demo Credentials Section */}
              <div className="space-y-3 mt-6 p-4 bg-muted/30 rounded-lg border border-dashed border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TestTube className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground">
                    Quick Demo Access
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="flex-1 h-10 text-sm font-medium bg-secondary/80 hover:bg-secondary transition-colors duration-200"
                    onClick={() => fillDemoCredentials('admin')}
                    disabled={isLoading}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Demo
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="flex-1 h-10 text-sm font-medium bg-secondary/80 hover:bg-secondary transition-colors duration-200"
                    onClick={() => fillDemoCredentials('user')}
                    disabled={isLoading}
                  >
                    <User className="w-4 h-4 mr-2" />
                    User Demo
                  </Button>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/signup"
                    className="text-primary hover:underline font-semibold transition-colors duration-200"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
