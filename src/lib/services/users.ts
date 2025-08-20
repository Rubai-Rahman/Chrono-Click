import {
  UsersDAL,
  type User,
  type CreateUserData,
  type UpdateUserData,
} from '@/lib/dal';
import { cache } from 'react';

// Cached version for server components
export const getAllUsers = cache(async (page?: number, limit?: number) => {
  return UsersDAL.getAllUsers({ page, limit });
});

export const getUserByEmail = cache(async (email: string) => {
  return UsersDAL.getUserByEmail(email);
});

export const getUserById = cache(async (id: string) => {
  return UsersDAL.getUserById(id);
});

export const getUserStats = cache(async () => {
  return UsersDAL.getUserStats();
});

export const searchUsers = cache(
  async (query: string, page?: number, limit?: number) => {
    return UsersDAL.searchUsers(query, { page, limit });
  }
);

// Non-cached versions for mutations
export const upsertUser = async (data: CreateUserData) => {
  return UsersDAL.upsertUser(data);
};

export const updateUser = async (id: string, data: UpdateUserData) => {
  return UsersDAL.updateUser(id, data);
};

export const makeAdmin = async (email: string) => {
  return UsersDAL.makeAdmin(email);
};

export const removeAdmin = async (email: string) => {
  return UsersDAL.removeAdmin(email);
};

export const deleteUser = async (id: string) => {
  return UsersDAL.deleteUser(id);
};

export const updateUserPreferences = async (
  id: string,
  preferences: Record<string, unknown>
) => {
  return UsersDAL.updateUserPreferences(id, preferences);
};
