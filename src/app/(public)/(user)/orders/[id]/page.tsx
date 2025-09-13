import { Metadata } from 'next';
import OrderDetailsContent from './order-details';
import { Suspense } from 'react';
import CardSkeleton from '@/components/skeletons/review-skeleton';
import { fetchOrderById } from '@/data/order';
import { ErrorResultMessage } from '@/components/ui/data-result-message';

export const metadata: Metadata = {
  title: 'Order Details - Chrono Click',
  description: 'View and manage your order details.',
};

const OrderDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <OrderDetailsContentWrapper params={params} />
    </Suspense>
  );
};

const OrderDetailsContentWrapper = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const orderDetails = await fetchOrderById(id); // Ensure this function is async
  if (orderDetails.error || !orderDetails.data?.[0]) {
    return <ErrorResultMessage />;
  }

  return <OrderDetailsContent orderDetails={orderDetails.data?.[0]} />;
};

export default OrderDetailsPage;
