import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import toast from 'react-hot-toast';

// Base configuration for the HTTP client
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor to add JWT token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle common errors
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        this.handleResponseError(error);
        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private handleResponseError(error: AxiosError): void {
    if (error.response?.status === 401) {
      // Token expired or invalid
      this.clearAuthToken();
      toast.error('Sesión expirada. Por favor, inicia sesión nuevamente.');
      // Redirect to login page
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      toast.error('No tienes permisos para realizar esta acción.');
    } else if (error.response?.status === 404) {
      toast.error('Recurso no encontrado.');
    } else if (error.response && error.response.status >= 500) {
      toast.error('Error interno del servidor. Intenta nuevamente más tarde.');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('La solicitud ha tardado demasiado. Verifica tu conexión.');
    } else if (!error.response) {
      toast.error('Error de conexión. Verifica tu conexión a internet.');
    }
  }

  private clearAuthToken(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }

  // Public methods for making HTTP requests
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // Method to set auth token (used after login)
  public setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Method to set refresh token
  public setRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }

  // Method to get refresh token
  public getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  // Method to refresh token
  public async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;
      this.setAuthToken(accessToken);
      this.setRefreshToken(newRefreshToken);

      return accessToken;
    } catch (error) {
      this.clearAuthToken();
      window.location.href = '/login';
      return null;
    }
  }
}

// Export singleton instance
export const httpClient = new HttpClient();
export default httpClient;
