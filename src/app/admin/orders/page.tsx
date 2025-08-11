import type { Metadata } from 'next';
import AdminOrdersPageContent from './page-orders';

export const metadata: Metadata = {
  title: 'Orders - Admin - Chrono Click',
  description: 'Manage customer orders and fulfillment.',
};

const AdminOrdersPage = () => {
  return <AdminOrdersPageContent />;
};

export default AdminOrdersPage;
