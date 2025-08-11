import type { Metadata } from 'next';
import AdminDashboardPageContent from './page-admin';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Chrono Click',
  description: 'Manage your store, products, and customers.',
};

const AdminDashboardPage = () => {
  return <AdminDashboardPageContent />;
};

export default AdminDashboardPage;
