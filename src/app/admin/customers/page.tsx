import type { Metadata } from 'next';
import AdminCustomersPageContent from './page-customers';

export const metadata: Metadata = {
  title: 'Customers - Admin - Chrono Click',
  description: 'Manage customer accounts and permissions.',
};

const AdminCustomersPage = () => {
  return <AdminCustomersPageContent />;
};

export default AdminCustomersPage;
