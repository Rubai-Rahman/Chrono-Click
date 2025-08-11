import type { Metadata } from 'next';
import OrdersPageContent from './page-orders';

export const metadata: Metadata = {
  title: 'My Orders - Chrono Click',
  description: 'View and track your order history.',
};

const OrdersPage = () => {
  return <OrdersPageContent />;
};

export default OrdersPage;
