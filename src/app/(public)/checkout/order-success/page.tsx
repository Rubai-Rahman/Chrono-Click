import type { Metadata } from 'next';
import OrderSuccessPageContent from './page-order-success';

export const metadata: Metadata = {
  title: 'Order Success',
  description: 'Order success page',
};

const OrderSuccessPage = () => {
  return <OrderSuccessPageContent />;
};

export default OrderSuccessPage;
