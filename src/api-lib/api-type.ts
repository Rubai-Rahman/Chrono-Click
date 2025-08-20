// Base Product Type
export interface ProductType {
  _id: string;
  id: string;
  name: string;
  description?: string;
  price: number;
  img: string;
  brand?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
}

// Cart Item extends Product with quantity
export interface CartItem extends ProductType {
  quantity?: number;
}

// News/Article Type
export interface NewsType {
  _id: string;
  name: string;
  details: string;
  featured?: string;
  category?: string;
  author?: string;
  readTime?: string;
  date: string;
  img: string;
}

// Review Type
export interface ReviewType {
  _id: string;
  name: string;
  comment: string;
  img: string;
  location?: string;
  verified?: boolean;
  rating?: number;
}

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

// User/Customer Type
export interface UserType {
  _id: string;
  name: string;
  email: string;
  img?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
