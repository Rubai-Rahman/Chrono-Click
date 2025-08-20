import {
  OrdersDAL,
  type Order,
  type CreateOrderData,
  type CartProduct,
} from '@/lib/dal';
import { cache } from 'react';

// Cached version for server components
export const getAllOrders = cache(async (page?: number, limit?: number) => {
  return OrdersDAL.getAllOrders({ page, limit });
});

export const getOrdersByEmail = cache(async (email: string) => {
  return OrdersDAL.getOrdersByEmail(email);
});

export const getOrderById = cache(async (id: string) => {
  return OrdersDAL.getOrderById(id);
});

export const getOrderStats = cache(async () => {
  return OrdersDAL.getOrderStats();
});

export const getRecentOrders = cache(async (limit?: number) => {
  return OrdersDAL.getRecentOrders(limit);
});

// Non-cached versions for mutations
export const createOrder = async (data: CreateOrderData) => {
  return OrdersDAL.createOrder(data);
};

export const updateOrderStatus = async (
  id: string,
  status: Order['status']
) => {
  return OrdersDAL.updateOrderStatus(id, status);
};

export const deleteOrder = async (id: string) => {
  return OrdersDAL.deleteOrder(id);
};

export const cancelOrder = async (id: string, reason?: string) => {
  return OrdersDAL.cancelOrder(id, reason);
};
