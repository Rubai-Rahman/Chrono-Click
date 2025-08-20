import { ProductsDAL, type Product, type CreateProductData } from '@/lib/dal';
import { cache } from 'react';

// Cached version for server components
export const getProducts = cache(async (page?: number, limit?: number) => {
  return ProductsDAL.getProducts({ page, limit });
});

// Cached version for single product
export const getProductById = cache(async (id: string) => {
  return ProductsDAL.getProductById(id);
});

// Non-cached versions for mutations
export const createProduct = async (data: CreateProductData) => {
  return ProductsDAL.createProduct(data);
};

export const updateProduct = async (
  id: string,
  data: Partial<CreateProductData>
) => {
  return ProductsDAL.updateProduct(id, data);
};

export const deleteProduct = async (id: string) => {
  return ProductsDAL.deleteProduct(id);
};

export const searchProducts = cache(
  async (query: string, page?: number, limit?: number) => {
    return ProductsDAL.searchProducts(query, { page, limit });
  }
);

export const getProductsByCategory = cache(
  async (category: string, page?: number, limit?: number) => {
    return ProductsDAL.getProductsByCategory(category, { page, limit });
  }
);

export const getFeaturedProducts = cache(async (limit?: number) => {
  return ProductsDAL.getFeaturedProducts(limit);
});
