import type { Metadata } from 'next';
import AccountPageContent from './page-account';

export const metadata: Metadata = {
  title: 'My Account - Chrono Click',
  description: 'Manage your account, orders, and preferences.',
};

const AccountPage = () => {
  return <AccountPageContent />;
};

export default AccountPage;
