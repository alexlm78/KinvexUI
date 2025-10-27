import { useAuth as useAuthContext } from '@/contexts/AuthContext';
import { UserRole } from '@/types/entities';

// Re-export the useAuth hook from context for convenience
export const useAuth = useAuthContext;

/**
 * Hook that provides authentication utilities
 */
export const useAuthUtils = () => {
  const auth = useAuthContext();

  const isAdmin = () => auth.hasRole(UserRole.ADMIN);
  const isManager = () => auth.hasRole(UserRole.MANAGER);
  const isOperator = () => auth.hasRole(UserRole.OPERATOR);
  const isViewer = () => auth.hasRole(UserRole.VIEWER);

  const canManageProducts = () => auth.hasRole(UserRole.OPERATOR);
  const canManageOrders = () => auth.hasRole(UserRole.OPERATOR);
  const canViewReports = () => auth.hasRole(UserRole.MANAGER);
  const canManageUsers = () => auth.hasRole(UserRole.ADMIN);

  return {
    ...auth,
    isAdmin,
    isManager,
    isOperator,
    isViewer,
    canManageProducts,
    canManageOrders,
    canViewReports,
    canManageUsers,
  };
};
