import type { Metadata } from 'next';
import SignupPageContent from './page-signup';

export const metadata: Metadata = {
  title: 'Sign Up - Chrono Click',
  description:
    'Create your Chrono Click account to start your premium timepiece journey.',
};

const SignupPage = () => {
  return <SignupPageContent />;
};

export default SignupPage;
