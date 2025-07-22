import type { Metadata } from 'next';
import ManageOrdersPageContent from './page-manageOrders';

export const metadata: Metadata = {
  title: 'Manage Orders - Chrono Click',
  description: 'Manage all customer orders and track their status.',
};

const ManageOrdersPage = () => {
  return <ManageOrdersPageContent />;
};

export default ManageOrdersPage;
