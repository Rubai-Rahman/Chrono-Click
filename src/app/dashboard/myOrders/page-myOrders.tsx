'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/api-lib/products';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import OrderSkeleton from '@/components/skeletons/order-skeleton';
import MyOrdersList from '@/components/dashboard/my-orders-list';

export type OrderType = {
  _id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    img: string;
  }[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
};

const MyOrdersPageContent = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['myOrders'],
    queryFn: () => fetchData<OrderType[]>('orders/my'),
  });

  if (isLoading) return <OrderSkeleton />;
  if (isError) return <ErrorResultMessage />;
  if (!orders) return <ErrorResultMessage />;

  return <MyOrdersList orders={orders} />;
};

export default MyOrdersPageContent;
