'use client';

import ForgotPasswordForm from '@/components/auth/forgot-password-form';
import { useTransition } from 'react';
import { resetEmailAction} from '@/app/actions/authAction';
import { toast } from 'sonner';

const ForgotPasswordContent = () => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: { email: string }) => {
    startTransition(async () => {
      try {
        const response = await resetEmailAction(data.email);
        if (response.success) {
          toast.success('Password reset email sent successfully!');
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
    <div>
      <ForgotPasswordForm onSubmit={onSubmit} isLoading={isPending} />
    </div>
  );
};

export default ForgotPasswordContent;
