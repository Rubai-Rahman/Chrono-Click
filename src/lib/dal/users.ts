import 'server-only';
import { api } from './base';
import type {
  User,
  CreateUserData,
  UpdateUserData,
  PaginationParams,
} from './types';

export class UsersDAL {
  private static readonly ENDPOINT = '/users';

  /**
   * Create or update user (upsert operation)
   */
  static async upsertUser(data: CreateUserData): Promise<User> {
    return api.put<User>(this.ENDPOINT, data);
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string): Promise<User> {
    return api.get<User>(`${this.ENDPOINT}/${email}`);
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: string): Promise<User> {
    return api.get<User>(`${this.ENDPOINT}/id/${id}`);
  }

  /**
   * Get all users (admin only)
   */
  static async getAllUsers(params?: PaginationParams): Promise<{
    users: User[];
    count: number;
  }> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    const endpoint = searchParams.toString()
      ? `${this.ENDPOINT}/all?${searchParams.toString()}`
      : `${this.ENDPOINT}/all`;

    return api.get<{
      users: User[];
      count: number;
    }>(endpoint);
  }

  /**
   * Update user profile
   */
  static async updateUser(id: string, data: UpdateUserData): Promise<User> {
    return api.patch<User>(`${this.ENDPOINT}/${id}`, data);
  }

  /**
   * Make user admin
   */
  static async makeAdmin(email: string): Promise<User> {
    return api.put<User>(`${this.ENDPOINT}/admin`, { email });
  }

  /**
   * Remove admin privileges
   */
  static async removeAdmin(email: string): Promise<User> {
    return api.put<User>(`${this.ENDPOINT}/remove-admin`, { email });
  }

  /**
   * Delete user account
   */
  static async deleteUser(id: string): Promise<{ message: string }> {
    return api.delete<{ message: string }>(`${this.ENDPOINT}/${id}`);
  }

  /**
   * Get user statistics (admin only)
   */
  static async getUserStats(): Promise<{
    total: number;
    admins: number;
    activeUsers: number;
    newUsersThisMonth: number;
  }> {
    return api.get<{
      total: number;
      admins: number;
      activeUsers: number;
      newUsersThisMonth: number;
    }>(`${this.ENDPOINT}/stats`);
  }

  /**
   * Search users by name or email (admin only)
   */
  static async searchUsers(
    query: string,
    params?: PaginationParams
  ): Promise<{
    users: User[];
    count: number;
  }> {
    const searchParams = new URLSearchParams();
    searchParams.set('q', query);

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    return api.get<{
      users: User[];
      count: number;
    }>(`${this.ENDPOINT}/search?${searchParams.toString()}`);
  }

  /**
   * Update user preferences
   */
  static async updateUserPreferences(
    id: string,
    preferences: Record<string, unknown>
  ): Promise<User> {
    return api.patch<User>(`${this.ENDPOINT}/${id}/preferences`, preferences);
  }
}
