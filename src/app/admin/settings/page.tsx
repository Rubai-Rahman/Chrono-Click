import type { Metadata } from 'next';
import AdminSettingsPageContent from './page-settings';

export const metadata: Metadata = {
  title: 'Settings - Admin - Chrono Click',
  description: 'Manage store settings and configuration.',
};

const AdminSettingsPage = () => {
  return <AdminSettingsPageContent />;
};

export default AdminSettingsPage;
