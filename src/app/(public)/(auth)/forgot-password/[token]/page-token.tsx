'use client';
import { Form, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail, ArrowLeft } from 'lucide-react';
import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from '@/lib/validations/auth';
import { FormField, FormLabel } from '@/components/ui/form';
import Link from 'next/link';
import { useTransition } from 'react';

const TokenPageContent = () => {
  const [isLoading, startTransition] = useTransition();
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-foreground">
            Forgot Password?
          </h3>
          <p className="text-muted-foreground mt-2">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-center">Reset Password</CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...form} className="space-y-6">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div>
                      <FormLabel>Email Address</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </div>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold"
                  disabled={isLoading}
                  loading={isLoading}
                >
                  Send Reset Link
                </Button>
              </form>
            </Form>
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TokenPageContent;
