import ForgotPasswordContent from './page-forgot-password';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password - Chrono Click',
  description: 'Reset your Chrono Click account password.',
};
export default function ForgotPasswordPage() {
  return <ForgotPasswordContent />;
}
