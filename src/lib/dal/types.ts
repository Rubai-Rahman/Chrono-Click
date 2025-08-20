// Enhanced API types for the DAL
export interface PaginationParams {
  page?: number;
  limit?: number;
  size?: number; // Legacy support
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

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Product related types
export interface Product {
  _id: string;
  id: string;
  name: string;
  description?: string;
  details?: string;
  price: number;
  img: string;
  brand?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  quantity?: number;
}

export interface CreateProductData {
  name: string;
  price: string | number;
  details: string;
  description?: string;
  img?: string;
  brand?: string;
  category?: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  _id: string;
}

// Order related types
export interface CartProduct {
  _id: string;
  name: string;
  price: number;
  img: string;
  qty: number;
  status?: string;
}

export interface Order {
  _id: string;
  email: string;
  cart: CartProduct[];
  totalAmount?: number;
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate?: string;
  deliveryDate?: string;
}

export interface CreateOrderData {
  email: string;
  cart: CartProduct[];
}

// User related types
export interface User {
  _id: string;
  email: string;
  name: string;
  photoURL?: string;
  role: 'admin' | 'user';
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface CreateUserData {
  email: string;
  name: string;
  photoURL?: string;
  role?: 'admin' | 'user';
}

export interface UpdateUserData extends Partial<CreateUserData> {
  _id?: string;
}

// News related types
export interface News {
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

export interface CreateNewsData {
  name: string;
  details: string;
  featured?: string;
  category?: string;
  author?: string;
  readTime?: string;
  img?: string;
}

// Testimonial types
export interface Testimonial {
  _id: string;
  name: string;
  comment: string;
  img: string;
  location?: string;
  verified?: boolean;
  rating?: number;
}

export interface CreateTestimonialData {
  name: string;
  comment: string;
  img?: string;
  location?: string;
  verified?: boolean;
  rating?: number;
}
