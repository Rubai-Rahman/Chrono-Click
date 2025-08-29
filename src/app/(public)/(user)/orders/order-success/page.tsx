import OrderSuccessPageContent from './page-order-sucess';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Success',
  description: 'Order success page',
};
const OrderSuccessPage = () => {
  return (
    <div>
      <OrderSuccessPageContent />
    </div>
  );
};

export default OrderSuccessPage;
