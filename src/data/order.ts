import { CheckoutFormData } from '@/components/checkout/checkout-form';
import { safeApi } from '@/lib/fetch';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderData {
  orderInfo: CheckoutFormData;
  orderItems: Omit<OrderItem, 'price'>[];
}

export const placeOrder = async (orderData: OrderData) => {
  const res = await safeApi.post('/orders', { ...orderData });

  return res.data;
};
