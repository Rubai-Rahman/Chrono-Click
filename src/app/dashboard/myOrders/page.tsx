import type { Metadata } from 'next';
import MyOrdersPageContent from './page-myOrders';

export const metadata: Metadata = {
  title: 'My Orders - Chrono Click',
  description: 'View and track your order history.',
};

const MyOrdersPage = () => {
  return <MyOrdersPageContent />;
};

export default MyOrdersPage;
