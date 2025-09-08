'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PasswordInput } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { NewPasswordFormData } from '@/lib/validations/auth';
import { Form, FormField, FormLabel } from '@/components/ui/form';
import Link from 'next/link';
import { useTransition } from 'react';
import { newPasswordSchema } from '@/lib/validations/auth';
import { PasswordStrength } from '@/components/ui/password-strength';
import { toast } from 'sonner';
import { resetPasswordAction } from '@/app/actions/authAction';

const TokenPageContent = ({ token }: { token: string }) => {
  const [isLoading, startTransition] = useTransition();
  const form = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  console.log('token', token);
  const watchPassword = form.watch('password');
  const onSubmit = (data: NewPasswordFormData) => {
    startTransition(async () => {
      try {
        console.log(data);
        const response = await resetPasswordAction({
          password: data.password,
          token: token,
        });
        if (response.success) {
          toast.success('Password reset successfully!');
        }
        if (!response.success) {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Something went wrong'
        );
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-foreground">
            Forgot Password?
          </h3>
          <p className="text-muted-foreground mt-2">Enter your New password.</p>
        </div>

        <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-center">Reset Password</CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <div>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <PasswordInput
                          placeholder="Enter your password"
                          {...field}
                        />
                        {form.formState.errors.password && (
                          <p className="text-destructive text-sm mt-1">
                            {form.formState.errors.password.message}
                          </p>
                        )}
                      </div>
                      <PasswordStrength password={watchPassword || ''} />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <div>
                      <FormLabel>Confirm Password</FormLabel>
                      <div className="relative">
                        <PasswordInput
                          placeholder="Enter your password"
                          {...field}
                        />
                        {form.formState.errors.confirmPassword && (
                          <p className="text-destructive text-sm mt-1">
                            {form.formState.errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold mt-6"
                  disabled={isLoading}
                  loading={isLoading}
                >
                  Reset Password
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
