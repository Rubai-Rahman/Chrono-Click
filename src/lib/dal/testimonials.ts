import 'server-only';
import { api } from './base';
import type {
  Testimonial,
  CreateTestimonialData,
  PaginationParams,
} from './types';

export class TestimonialsDAL {
  private static readonly ENDPOINT = '/testimonials';

  /**
   * Get all testimonials with pagination
   */
  static async getTestimonials(params?: PaginationParams): Promise<{
    testimonials: Testimonial[];
    count: number;
  }> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    const endpoint = searchParams.toString()
      ? `${this.ENDPOINT}?${searchParams.toString()}`
      : this.ENDPOINT;

    return api.get<{
      testimonials: Testimonial[];
      count: number;
    }>(endpoint);
  }

  /**
   * Get a single testimonial by ID
   */
  static async getTestimonialById(id: string): Promise<Testimonial> {
    return api.get<Testimonial>(`${this.ENDPOINT}/${id}`);
  }

  /**
   * Create a new testimonial
   */
  static async createTestimonial(
    data: CreateTestimonialData
  ): Promise<Testimonial> {
    return api.post<Testimonial>(this.ENDPOINT, data);
  }

  /**
   * Update a testimonial (admin only)
   */
  static async updateTestimonial(
    id: string,
    data: Partial<CreateTestimonialData>
  ): Promise<Testimonial> {
    return api.put<Testimonial>(`${this.ENDPOINT}/${id}`, data);
  }

  /**
   * Delete a testimonial (admin only)
   */
  static async deleteTestimonial(id: string): Promise<{ message: string }> {
    return api.delete<{ message: string }>(`${this.ENDPOINT}/${id}`);
  }

  /**
   * Get featured testimonials
   */
  static async getFeaturedTestimonials(limit?: number): Promise<Testimonial[]> {
    const searchParams = limit ? `?limit=${limit}` : '';
    return api.get<Testimonial[]>(`${this.ENDPOINT}/featured${searchParams}`);
  }

  /**
   * Get verified testimonials only
   */
  static async getVerifiedTestimonials(params?: PaginationParams): Promise<{
    testimonials: Testimonial[];
    count: number;
  }> {
    const searchParams = new URLSearchParams();
    searchParams.set('verified', 'true');

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    return api.get<{
      testimonials: Testimonial[];
      count: number;
    }>(`${this.ENDPOINT}?${searchParams.toString()}`);
  }

  /**
   * Verify a testimonial (admin only)
   */
  static async verifyTestimonial(id: string): Promise<Testimonial> {
    return api.patch<Testimonial>(`${this.ENDPOINT}/${id}/verify`, {});
  }

  /**
   * Unverify a testimonial (admin only)
   */
  static async unverifyTestimonial(id: string): Promise<Testimonial> {
    return api.patch<Testimonial>(`${this.ENDPOINT}/${id}/unverify`, {});
  }

  /**
   * Get testimonials by rating
   */
  static async getTestimonialsByRating(
    minRating: number,
    params?: PaginationParams
  ): Promise<{
    testimonials: Testimonial[];
    count: number;
  }> {
    const searchParams = new URLSearchParams();
    searchParams.set('minRating', minRating.toString());

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    return api.get<{
      testimonials: Testimonial[];
      count: number;
    }>(`${this.ENDPOINT}/rating?${searchParams.toString()}`);
  }
}
