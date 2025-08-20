import 'server-only';
import { api } from './base';
import type {
  Product,
  CreateProductData,
  UpdateProductData,
  PaginationParams,
  PaginatedResponse,
} from './types';

export class ProductsDAL {
  private static readonly ENDPOINT = '/products';

  /**
   * Get all products with pagination
   */
  static async getProducts(params?: PaginationParams): Promise<{
    products: Product[];
    count: number;
  }> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.size) searchParams.set('size', params.size.toString()); // Legacy support

    const endpoint = searchParams.toString()
      ? `${this.ENDPOINT}?${searchParams.toString()}`
      : this.ENDPOINT;

    return api.get<{
      products: Product[];
      count: number;
    }>(endpoint);
  }

  /**
   * Get a single product by ID
   */
  static async getProductById(id: string): Promise<Product> {
    return api.get<Product>(`${this.ENDPOINT}/${id}`);
  }

  /**
   * Create a new product
   */
  static async createProduct(data: CreateProductData): Promise<Product> {
    return api.post<Product>(this.ENDPOINT, data);
  }

  /**
   * Update an existing product
   */
  static async updateProduct(
    id: string,
    data: UpdateProductData
  ): Promise<Product> {
    return api.put<Product>(`${this.ENDPOINT}/${id}`, data);
  }

  /**
   * Delete a product
   */
  static async deleteProduct(id: string): Promise<{ message: string }> {
    return api.delete<{ message: string }>(`${this.ENDPOINT}/${id}`);
  }

  /**
   * Search products by name or category
   */
  static async searchProducts(
    query: string,
    params?: PaginationParams
  ): Promise<{
    products: Product[];
    count: number;
  }> {
    const searchParams = new URLSearchParams();
    searchParams.set('q', query);

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    return api.get<{
      products: Product[];
      count: number;
    }>(`${this.ENDPOINT}/search?${searchParams.toString()}`);
  }

  /**
   * Get products by category
   */
  static async getProductsByCategory(
    category: string,
    params?: PaginationParams
  ): Promise<{
    products: Product[];
    count: number;
  }> {
    const searchParams = new URLSearchParams();
    searchParams.set('category', category);

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    return api.get<{
      products: Product[];
      count: number;
    }>(`${this.ENDPOINT}/category?${searchParams.toString()}`);
  }

  /**
   * Get featured products
   */
  static async getFeaturedProducts(limit?: number): Promise<Product[]> {
    const searchParams = limit ? `?limit=${limit}` : '';
    return api.get<Product[]>(`${this.ENDPOINT}/featured${searchParams}`);
  }

  /**
   * Update product stock
   */
  static async updateProductStock(
    id: string,
    quantity: number
  ): Promise<Product> {
    return api.patch<Product>(`${this.ENDPOINT}/${id}/stock`, { quantity });
  }
}
