import type { Metadata } from 'next';
import OrdersPageContent from './page-orders';
import { fetchOrder } from '@/data/order';
import { Suspense } from 'react';
import CardSkeleton from '@/components/skeletons/review-skeleton';

export const metadata: Metadata = {
  title: 'My Orders - Chrono Click',
  description: 'View and track your order history.',
};

const OrdersPage = () => {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <OrdersPageContentWrapper />
    </Suspense>
  );
};

const OrdersPageContentWrapper = () => {
  const ordersPromise = fetchOrder();
  return <OrdersPageContent orderPromise={ordersPromise} />;
};

export default OrdersPage;
