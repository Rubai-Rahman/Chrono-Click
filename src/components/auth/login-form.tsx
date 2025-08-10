'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, TestTube, User, Shield } from 'lucide-react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  CommonFormField,
} from '@/components/ui/form';
import { loginSchema, LoginFormData } from '@/lib/validations/auth';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  onGoogleSignIn: () => void;
  onGetDemoCredentials: (type: 'admin' | 'user') => {
    email: string;
    password: string;
  };
  showPassword: boolean;
  onTogglePassword: (show: boolean) => void;
  isLoading: boolean;
}

const LoginForm = ({
  onSubmit,
  onGoogleSignIn,
  onGetDemoCredentials,
  showPassword,
  onTogglePassword,
  isLoading,
}: LoginFormProps) => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const fillDemoCredentials = (type: 'admin' | 'user') => {
    const credentials = onGetDemoCredentials(type);
    form.setValue('email', credentials.email);
    form.setValue('password', credentials.password);
  };

  const handleSubmit = (data: LoginFormData) => {
    onSubmit(data);
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
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold tracking-tight text-foreground font-serif mb-2">
                Welcome Back
              </h2>
              <p className="text-muted-foreground text-base">
                Enter your email and password to access your account
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                {/* Email Input */}
                <CommonFormField
                  control={form.control}
                  name="email"
                  label="Email"
                >
                  {({ field }) => (
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className=""
                      {...field}
                    />
                  )}
                </CommonFormField>

                {/* Password Input */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => onTogglePassword(!showPassword)}
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Checkbox />
                    <Label htmlFor="remember">Remember me</Label>
                  </div>
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
                  className="w-full h-12"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Sign In
                </Button>

                {/* Google Sign In */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12"
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
              </form>
            </Form>

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
                  className="flex-1"
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
                  className="flex-1"
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
          <div className="text-center mt-8 lg:mt-4">
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
