import 'server-only';
import { api } from './base';
import type {
  Order,
  CreateOrderData,
  CartProduct,
  PaginationParams,
} from './types';

export class OrdersDAL {
  private static readonly ENDPOINT = '/orders';

  /**
   * Create a new order
   */
  static async createOrder(data: CreateOrderData): Promise<Order> {
    return api.post<Order>(this.ENDPOINT, data);
  }

  /**
   * Get all orders (admin only)
   */
  static async getAllOrders(params?: PaginationParams): Promise<Order[]> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    const endpoint = searchParams.toString()
      ? `${this.ENDPOINT}?${searchParams.toString()}`
      : this.ENDPOINT;

    return api.get<Order[]>(endpoint);
  }

  /**
   * Get orders for a specific user
   */
  static async getOrdersByEmail(email: string): Promise<CartProduct[]> {
    return api.get<CartProduct[]>(`${this.ENDPOINT}?email=${email}`);
  }

  /**
   * Get a single order by ID
   */
  static async getOrderById(id: string): Promise<Order> {
    return api.get<Order>(`${this.ENDPOINT}/${id}`);
  }

  /**
   * Update order status
   */
  static async updateOrderStatus(
    id: string,
    status: Order['status']
  ): Promise<Order> {
    return api.patch<Order>(`${this.ENDPOINT}/${id}/status`, { status });
  }

  /**
   * Delete an order
   */
  static async deleteOrder(id: string): Promise<{ message: string }> {
    return api.delete<{ message: string }>(`${this.ENDPOINT}/${id}`);
  }

  /**
   * Get order statistics (admin only)
   */
  static async getOrderStats(): Promise<{
    total: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    totalRevenue: number;
  }> {
    return api.get<{
      total: number;
      pending: number;
      processing: number;
      shipped: number;
      delivered: number;
      cancelled: number;
      totalRevenue: number;
    }>(`${this.ENDPOINT}/stats`);
  }

  /**
   * Get recent orders (admin dashboard)
   */
  static async getRecentOrders(limit: number = 10): Promise<Order[]> {
    return api.get<Order[]>(`${this.ENDPOINT}/recent?limit=${limit}`);
  }

  /**
   * Cancel an order
   */
  static async cancelOrder(id: string, reason?: string): Promise<Order> {
    return api.patch<Order>(`${this.ENDPOINT}/${id}/cancel`, { reason });
  }
}
