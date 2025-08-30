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
  paymentMethod: string;
  orderSummary: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
}

export const placeOrder = async (orderData: OrderData) => {
  const res = await safeApi.post('/orders', JSON.stringify(orderData));

  return res.data;
};
