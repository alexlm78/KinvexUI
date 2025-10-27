import httpClient from './httpClient';
import { LoginRequest, AuthResponse, RefreshTokenRequest, LogoutRequest } from '../../types/api';

class AuthService {
  private readonly BASE_PATH = '/auth';

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>(`${this.BASE_PATH}/login`, credentials);

    // Store tokens after successful login
    httpClient.setAuthToken(response.accessToken);
    httpClient.setRefreshToken(response.refreshToken);

    return response;
  }

  async refreshToken(request: RefreshTokenRequest): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>(`${this.BASE_PATH}/refresh`, request);

    // Update stored tokens
    httpClient.setAuthToken(response.accessToken);
    httpClient.setRefreshToken(response.refreshToken);

    return response;
  }

  async logout(request: LogoutRequest): Promise<void> {
    try {
      await httpClient.post<void>(`${this.BASE_PATH}/logout`, request);
    } finally {
      // Clear tokens regardless of API response
      this.clearTokens();
    }
  }

  private clearTokens(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}

export const authService = new AuthService();
export default authService;
