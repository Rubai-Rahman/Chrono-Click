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
          <h3 className="text-3xl font-extrabold text-foreground tracking-tight">
            Forgot Password?
          </h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Enter your new password to reset your account.
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/60 backdrop-blur-lg rounded-2xl transition-transform duration-300 hover:scale-[1.02]">
          <CardHeader className="pb-0">
            <CardTitle className="text-center text-xl font-semibold text-foreground">
              Reset Password
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <div className="space-y-1">
                      <FormLabel className="text-sm font-medium">
                        New Password
                      </FormLabel>
                      <PasswordInput
                        placeholder="Enter your password"
                        {...field}
                        className="transition border border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 rounded-md shadow-sm w-full"
                      />
                      {form.formState.errors.password && (
                        <p className="text-destructive text-xs mt-1">
                          {form.formState.errors.password.message}
                        </p>
                      )}
                      <PasswordStrength password={watchPassword || ''} />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <div className="space-y-1">
                      <FormLabel className="text-sm font-medium">
                        Confirm Password
                      </FormLabel>
                      <PasswordInput
                        placeholder="Confirm your password"
                        {...field}
                        className="transition border border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 rounded-md shadow-sm w-full"
                      />
                      {form.formState.errors.confirmPassword && (
                        <p className="text-destructive text-xs mt-1">
                          {form.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold mt-2 bg-primary hover:bg-primary/90 transition-all duration-200"
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
                className="text-primary hover:text-primary/80 font-medium inline-flex items-center transition-colors duration-200"
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
