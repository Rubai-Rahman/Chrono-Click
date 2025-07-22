'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/api-lib/products';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import OrderSkeleton from '@/components/skeletons/order-skeleton';
import AdminOrdersList from '@/components/dashboard/admin-orders-list';
import { OrderType } from '@/app/dashboard/myOrders/page-myOrders';

const ManageOrdersPageContent = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['allOrders'],
    queryFn: () => fetchData<OrderType[]>('orders/all'),
  });

  if (isLoading) return <OrderSkeleton />;
  if (isError) return <ErrorResultMessage />;
  if (!orders) return <ErrorResultMessage />;

  return <AdminOrdersList orders={orders} />;
};

export default ManageOrdersPageContent;
