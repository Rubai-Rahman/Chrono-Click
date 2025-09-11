'use server';
import { placeOrder } from '@/data/order';
import { OrderData } from '@/data/order';
import { revalidateTag } from 'next/cache';

export async function placeOrderAction(orderData: OrderData) {
  const result = await placeOrder(orderData);
  if(result.success){
    revalidateTag("orders")
  }
  return result;  
}
