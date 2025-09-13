'use server';
import { placeOrder } from '@/data/order';
import { sentOrderData } from '@/data/order';
import { revalidateTag } from 'next/cache';

export async function placeOrderAction(orderData: sentOrderData) {
  const result = await placeOrder(orderData);
  if (result.success) {
    revalidateTag('orders');
  }
  return result;
}
