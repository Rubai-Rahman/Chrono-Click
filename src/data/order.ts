import { CheckoutFormData } from '@/components/checkout/checkout-form';
import { safeApi } from '@/lib/fetch';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderData {
  orderInfo: CheckoutFormData;
  orderItems: OrderItem[];
  orderSummary: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
}

export const placeOrder = async (orderData: OrderData) => {
  console.log('orderData', orderData);
  const res = await safeApi.post('/orders', { ...orderData });

  return res.data;
};
