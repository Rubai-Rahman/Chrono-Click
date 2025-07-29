import { User } from '@/store/useAuthStore';

// Define user roles
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

// Define permissions
export enum Permission {
  READ_PRODUCTS = 'read:products',
  WRITE_PRODUCTS = 'write:products',
  DELETE_PRODUCTS = 'delete:products',
  MANAGE_USERS = 'manage:users',
  MANAGE_ORDERS = 'manage:orders',
  VIEW_ANALYTICS = 'view:analytics',
}

// Role-based permissions mapping
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.USER]: [Permission.READ_PRODUCTS],
  [UserRole.ADMIN]: [
    Permission.READ_PRODUCTS,
    Permission.WRITE_PRODUCTS,
    Permission.DELETE_PRODUCTS,
    Permission.MANAGE_ORDERS,
    Permission.VIEW_ANALYTICS,
  ],
  [UserRole.SUPER_ADMIN]: Object.values(Permission),
};

// Extended user interface with role
export interface UserWithRole extends User {
  role?: UserRole;
  permissions?: Permission[];
}

// Check if user has specific role
export const hasRole = (user: UserWithRole | null, role: UserRole): boolean => {
  if (!user || !user.role) return false;
  return user.role === role;
};

// Check if user has specific permission
export const hasPermission = (
  user: UserWithRole | null,
  permission: Permission
): boolean => {
  if (!user || !user.role) return false;
  const userPermissions = ROLE_PERMISSIONS[user.role] || [];
  return userPermissions.includes(permission);
};

// Check if user is admin (any admin level)
export const isAdmin = (user: UserWithRole | null): boolean => {
  return hasRole(user, UserRole.ADMIN) || hasRole(user, UserRole.SUPER_ADMIN);
};

// Get user permissions
export const getUserPermissions = (user: UserWithRole | null): Permission[] => {
  if (!user || !user.role) return [];
  return ROLE_PERMISSIONS[user.role] || [];
};
