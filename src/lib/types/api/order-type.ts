// Order related types
export interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

export interface OrderType {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}
