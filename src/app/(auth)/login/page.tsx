import type { Metadata } from 'next';
import LoginPageContent from './page-login';

export const metadata: Metadata = {
  title: 'Login - Chrono Click',
  description:
    'Sign in to your Chrono Click account to access exclusive features.',
};

const LoginPage = () => {
  return <LoginPageContent />;
};

export default LoginPage;
