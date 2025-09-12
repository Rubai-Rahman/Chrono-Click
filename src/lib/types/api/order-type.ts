import { CheckoutFormData } from '@/components/checkout/checkout-form';
import { OrderItem } from '@/data/order';
import { TAddress } from './address-types';
export interface ReturnOrderItem extends OrderItem {
  image: string;
  name: string;
}
// --- Keep your existing FrontendOrder ---
export interface FrontendOrder {
  orderItems: ReturnOrderItem[];
  orderInfo: CheckoutFormData & { address: TAddress };
  orderCode: string;
  paymentMethod: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

// --- NEW: API Response type (wrapper) ---
export interface CreateOrderResponse {
  message: string;
  data: FrontendOrder;
}
