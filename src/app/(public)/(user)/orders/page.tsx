import type { Metadata } from 'next';
import OrdersPageContent from './page-orders';
import { fetchOrder } from '@/data/order';
import { Suspense } from 'react';
import OrderSkeleton from '@/components/skeletons/order-skeleton';

export const metadata: Metadata = {
  title: 'My Orders - Chrono Click',
  description: 'View and track your order history.',
};

const OrdersPage = () => {
  return (
    <Suspense fallback={<OrderSkeleton />}>
      <OrdersPageContentWrapper />
    </Suspense>
  );
};

const OrdersPageContentWrapper = () => {
  const ordersPromise = fetchOrder();
  return <OrdersPageContent orderPromise={ordersPromise} />;
};

export default OrdersPage;
