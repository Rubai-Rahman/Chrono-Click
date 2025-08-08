'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Mail, Lock, TestTube, User, Shield } from 'lucide-react'; // Re-import icons for demo section
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
    <div className="flex items-center justify-center bg-background responsive-space-x md:py-12">
      <div className=" flex container mx-auto h-full rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl lg:shadow-foreground/20">
        {/* Left Side - Abstract Background & Quote */}
        <div className="hidden lg:flex lg:w-1/2 relative items-end p-12 border border-white/20 rounded-l-3xl">
          <Image
            src="/LogIn.webp"
            alt="Abstract Background"
            fill
            className="object-cover object-center z-0"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
          <div className="relative z-20 text-white flex flex-col justify-between h-full">
            <div className="text-sm font-light tracking-wider opacity-80">
              A WISE QUOTE
              <div className="w-16 h-px bg-white mt-1" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight tracking-tighter font-serif">
                A MOMENT TO REMEMBER
              </h1>
              <p className="text-lg font-light opacity-90 max-w-md">
                A watch is more than a way to tell time — it’s a way to hold it,
                cherish it, and make it yours.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 bg-background flex flex-col justify-between p-8 sm:p-12 rounded-3xl lg:rounded-l-none lg:rounded-r-3xl">
          {/* Logo */}

          {/* Form Content */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold tracking-tight text-foreground font-serif mb-2">
                Welcome Back
              </h2>
              <p className="text-muted-foreground text-base">
                Enter your email and password to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-4 pr-4 py-2.5 rounded-md  bg-input/50 text-foreground placeholder:text-muted-foreground "
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
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pl-4 pr-10 py-2.5 rounded-md border border-input bg-input/50 text-foreground placeholder:text-muted-foreground"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-0"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-muted-foreground gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-primary focus:ring-offset-background"
                  />
                  Remember me
                </label>
                <Link
                  href="/forgot-password"
                  className="text-primary hover:underline font-medium"
                >
                  Forgot Password
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full h-12 text-primary-foreground font-semibold bg-primary rounded-md shadow-md hover:bg-primary/80 transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Google Sign In */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base font-medium border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 flex items-center justify-center gap-2 rounded-md"
                onClick={() => googleSignIn(callbackUrl || undefined)}
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
            </form>

            {/* Demo Credentials Section - RESTORED */}
            <div className="space-y-3 mt-6 p-4 bg-muted/10 rounded-lg border border-dashed border-border/50">
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
                  className="flex-1 h-10 text-sm font-medium bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors duration-200 rounded-md"
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
                  className="flex-1 h-10 text-sm font-medium bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors duration-200 rounded-md"
                  onClick={() => fillDemoCredentials('user')}
                  disabled={isLoading}
                >
                  <User className="w-4 h-4 mr-2" />
                  User Demo
                </Button>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-8 lg:mt-0">
            <p className="text-muted-foreground text-sm">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-primary hover:underline font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
