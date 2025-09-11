import { CheckoutFormData } from '@/components/checkout/checkout-form';
import { ApiResult, safeApi } from '@/lib/fetch';
import { requireSession } from './dal';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderData {
  orderInfo: CheckoutFormData;
  orderItems: Omit<OrderItem, 'price'>[];
}

export const placeOrder = async (
  orderData: OrderData
): Promise<ApiResult<OrderData>> => {
  await requireSession();
  return await safeApi.post(
    '/orders/create',
    { ...orderData },
    {
      next: { tags: ['orders'] },
    }
  );
};
