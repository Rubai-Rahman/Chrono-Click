import 'server-only';
import { api } from './base';
import type { News, CreateNewsData, PaginationParams } from './types';

export class NewsDAL {
  private static readonly ENDPOINT = '/news';

  /**
   * Get all news articles with pagination
   */
  static async getNews(params?: PaginationParams): Promise<{
    news: News[];
    count: number;
  }> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    const endpoint = searchParams.toString()
      ? `${this.ENDPOINT}?${searchParams.toString()}`
      : this.ENDPOINT;

    return api.get<{
      news: News[];
      count: number;
    }>(endpoint);
  }

  /**
   * Get a single news article by ID
   */
  static async getNewsById(id: string): Promise<News> {
    return api.get<News>(`${this.ENDPOINT}/${id}`);
  }

  /**
   * Create a new news article (admin only)
   */
  static async createNews(data: CreateNewsData): Promise<News> {
    return api.post<News>(this.ENDPOINT, data);
  }

  /**
   * Update a news article (admin only)
   */
  static async updateNews(
    id: string,
    data: Partial<CreateNewsData>
  ): Promise<News> {
    return api.put<News>(`${this.ENDPOINT}/${id}`, data);
  }

  /**
   * Delete a news article (admin only)
   */
  static async deleteNews(id: string): Promise<{ message: string }> {
    return api.delete<{ message: string }>(`${this.ENDPOINT}/${id}`);
  }

  /**
   * Get featured news articles
   */
  static async getFeaturedNews(limit?: number): Promise<News[]> {
    const searchParams = limit ? `?limit=${limit}` : '';
    return api.get<News[]>(`${this.ENDPOINT}/featured${searchParams}`);
  }

  /**
   * Get news by category
   */
  static async getNewsByCategory(
    category: string,
    params?: PaginationParams
  ): Promise<{
    news: News[];
    count: number;
  }> {
    const searchParams = new URLSearchParams();
    searchParams.set('category', category);

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    return api.get<{
      news: News[];
      count: number;
    }>(`${this.ENDPOINT}/category?${searchParams.toString()}`);
  }

  /**
   * Search news articles
   */
  static async searchNews(
    query: string,
    params?: PaginationParams
  ): Promise<{
    news: News[];
    count: number;
  }> {
    const searchParams = new URLSearchParams();
    searchParams.set('q', query);

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    return api.get<{
      news: News[];
      count: number;
    }>(`${this.ENDPOINT}/search?${searchParams.toString()}`);
  }

  /**
   * Get recent news articles
   */
  static async getRecentNews(limit: number = 5): Promise<News[]> {
    return api.get<News[]>(`${this.ENDPOINT}/recent?limit=${limit}`);
  }
}
