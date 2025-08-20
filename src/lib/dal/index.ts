// Data Access Layer - Main exports
export { ProductsDAL } from './products';
export { OrdersDAL } from './orders';
export { UsersDAL } from './users';
export { NewsDAL } from './news';
export { TestimonialsDAL } from './testimonials';

// Base utilities
export { api, APIError } from './base';

// Types
export type * from './types';

// Re-export commonly used functions
export { apiRequest } from './base';
