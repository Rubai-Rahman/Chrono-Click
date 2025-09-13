import { CheckoutFormData } from '@/components/checkout/checkout-form';
import { ApiResult, safeApi } from '@/lib/fetch';
import { requireSession } from './dal';
import { CreateOrderResponse, FrontendOrder } from '@/lib/types/api/order-type';

// In src/data/order.ts
export interface Product {
  _id: string;
  id: string;
  name: string;
  price: number;
  img: string;
  brand: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isFeatured?: boolean;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  _id: string;
  productId: Product;
  quantity: number;
  price?: number;
}

export interface OrderData {
  orderInfo: CheckoutFormData;
  orderItems: Omit<OrderItem, 'price'>[];
}

export const placeOrder = async (
  orderData: OrderData
): Promise<ApiResult<CreateOrderResponse>> => {
  await requireSession();
  return await safeApi.post(
    '/orders/create',
    { ...orderData },
    {
      next: { tags: ['orders'] },
    }
  );
};

export const fetchOrder = async (): Promise<ApiResult<FrontendOrder[]>> => {
  await requireSession();
  return await safeApi.get('/orders/userOrder', {
    next: { tags: ['orders'] },
  });
};
