import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types/entities';
import { LoginRequest, AuthResponse } from '@/types/api';
import { authService } from '@/services/api/authService';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize authentication state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);

      // Check if user is already authenticated
      if (authService.isAuthenticated()) {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          // Token exists but no user data, try to refresh
          const refreshSuccess = await handleRefreshToken();
          if (!refreshSuccess) {
            // Clear invalid tokens
            await logout();
          }
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await authService.login(credentials);

      setUser(response.user);
      authService.setCurrentUser(response.user);

      toast.success(`¡Bienvenido, ${response.user.username}!`);
      return true;
    } catch (error: any) {
      console.error('❌ Login error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
        }
      });

      // Handle specific error messages
      if (error.response?.status === 401) {
        toast.error('Credenciales inválidas. Verifica tu usuario y contraseña.');
      } else if (error.response?.status === 403) {
        toast.error('Tu cuenta está desactivada. Contacta al administrador.');
      } else if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        toast.error('No se puede conectar al servidor. Verifica que el backend esté ejecutándose.');
      } else {
        toast.error(`Error al iniciar sesión: ${error.message || 'Intenta nuevamente.'}`);
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await authService.logout({ refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with logout even if API call fails
    } finally {
      // Clear local state
      setUser(null);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      setIsLoading(false);

      toast.success('Sesión cerrada correctamente');
    }
  };

  const handleRefreshToken = async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return false;
      }

      const response: AuthResponse = await authService.refreshToken({ refreshToken });

      setUser(response.user);
      authService.setCurrentUser(response.user);

      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      // Clear invalid tokens
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser');
      return false;
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    return handleRefreshToken();
  };

  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    return checkUserRole(user.role, role);
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    if (!user) return false;
    return roles.some(role => checkUserRole(user.role, role));
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshToken,
    hasRole,
    hasAnyRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
