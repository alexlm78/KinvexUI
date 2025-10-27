import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { UserRole } from '@/types/entities';

interface UseAuthGuardOptions {
  requiredRole?: UserRole;
  redirectTo?: string;
}

/**
 * Hook to protect routes and check user permissions
 */
export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { requiredRole, redirectTo = '/login' } = options;

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) return;

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate(redirectTo, {
        replace: true,
        state: { from: location.pathname }
      });
      return;
    }

    // Check role-based access if required
    if (requiredRole && user) {
      const hasRequiredRole = checkUserRole(user.role, requiredRole);
      if (!hasRequiredRole) {
        navigate('/unauthorized', { replace: true });
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRole, navigate, redirectTo, location.pathname]);

  return {
    isAuthenticated,
    isLoading,
    user,
    hasRole: (role: UserRole) => user ? checkUserRole(user.role, role) : false,
  };
};

/**
 * Check if user has the required role or higher
 */
const checkUserRole = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const roleHierarchy = {
    [UserRole.VIEWER]: 1,
    [UserRole.OPERATOR]: 2,
    [UserRole.MANAGER]: 3,
    [UserRole.ADMIN]: 4,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};
