import type { Metadata } from 'next';
import SettingsPageContent from './page-settings';

export const metadata: Metadata = {
  title: 'Account Settings - Chrono Click',
  description: 'Manage your account preferences and settings.',
};

const SettingsPage = () => {
  return <SettingsPageContent />;
};

export default SettingsPage;
