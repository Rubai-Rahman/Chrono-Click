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
  isFeatured?: boolean;
}

export interface ProductsResponse {
  products: ProductType[];
  count: number;
}

// Cart Item extends Product with quantity
export interface CartItem extends ProductType {
  quantity?: number;
}
