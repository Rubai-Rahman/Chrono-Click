'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  TestTube,
  User,
  Shield,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  loginSchema,
  LoginFormData,
  DEMO_CREDENTIALS,
} from '@/lib/validations/auth';
import { setReturnUrl, setReferrerUrl } from '@/lib/auth/redirect-utils';

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
  const { login, googleSignIn, isLoading, loginError } = useAuth();

  // Store referrer URL when component mounts (if not already stored)
  useEffect(() => {
    // Only store referrer if there's no returnUrl in URL params and no stored returnUrl
    const urlParams = new URLSearchParams(window.location.search);
    const hasReturnUrl = urlParams.get('returnUrl');
    const hasStoredUrl = sessionStorage.getItem('returnUrl');

    if (!hasReturnUrl && !hasStoredUrl && document.referrer) {
      const referrerUrl = new URL(document.referrer);
      // Only store if referrer is from same origin and not an auth page
      if (referrerUrl.origin === window.location.origin) {
        const referrerPath = referrerUrl.pathname;
        if (
          !referrerPath.startsWith('/login') &&
          !referrerPath.startsWith('/signup') &&
          !referrerPath.startsWith('/forgot-password')
        ) {
          console.log('📍 Storing referrer URL:', referrerPath);
          setReferrerUrl(referrerPath);
        }
      }
    }
  }, []);

  // Demo credentials handler
  const fillDemoCredentials = (type: 'admin' | 'user') => {
    const credentials = DEMO_CREDENTIALS[type];
    setValue('email', credentials.email);
    setValue('password', credentials.password);
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      // Error is handled by the useAuth hook
      // Error is handled by useAuth hook with toast notifications
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/LogIn.webp"
          alt="Login"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Welcome Back!</h1>
            <p className="text-xl opacity-90 max-w-md">
              Sign in to access your account and continue your premium timepiece
              journey.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-background via-muted/5 to-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-foreground">Sign In</h3>
            <p className="text-muted-foreground mt-2">
              Enter your credentials to access your account
            </p>
          </div>

          <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-center">Welcome Back</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {loginError && (
                  <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-800 dark:text-red-200 text-sm">
                      {loginError.message}
                    </p>
                  </div>
                )}

                <div className="space-y-4">
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
                        placeholder="Enter your password"
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
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-muted-foreground gap-2">
                    <input type="checkbox" className="accent-primary" />
                    Remember me
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Demo Credentials Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TestTube className="w-4 h-4" />
                    <span>Quick Demo Access</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 h-9 text-xs"
                      onClick={() => fillDemoCredentials('admin')}
                      disabled={isLoading}
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      Admin Demo
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 h-9 text-xs"
                      onClick={() => fillDemoCredentials('user')}
                      disabled={isLoading}
                    >
                      <User className="w-3 h-3 mr-1" />
                      User Demo
                    </Button>
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
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
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
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Sign In */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12"
                onClick={() => googleSignIn()}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/signup"
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>

              {/* Demo credentials removed for security */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
