'use server';
import { OrderData } from '@/data/order';
import { placeOrder } from '@/data/order';

export async function checkoutAction(data: OrderData) {
  const result = await placeOrder(data);
  if (!result) {
    return {
      success: false,
      error: {
        message: 'Failed to place order',
        status: 'error',
        details: 'Failed to place order',
      },
    };
  }

  return { success: true, data: result };
}
