import { PageRequest, PageResponse } from '../../types/entities';

// Utility functions for API operations
export class ApiUtils {

  // Create default page request
  static createPageRequest(
    page: number = 0,
    size: number = 20,
    sort?: string,
    direction: 'ASC' | 'DESC' = 'ASC'
  ): PageRequest {
    return {
      page,
      size,
      sort,
      direction
    };
  }

  // Build query parameters from object
  static buildQueryParams(params: Record<string, any>): URLSearchParams {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, item.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    return searchParams;
  }

  // Format date for API
  static formatDateForApi(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // Parse API date
  static parseApiDate(dateString: string): Date {
    return new Date(dateString);
  }

  // Format currency
  static formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Format number
  static formatNumber(num: number, decimals: number = 0): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  }

  // Check if page response is empty
  static isPageEmpty<T>(page: PageResponse<T>): boolean {
    return page.empty || page.content.length === 0;
  }

  // Get total pages from page response
  static getTotalPages<T>(page: PageResponse<T>): number {
    return page.totalPages;
  }

  // Check if there's a next page
  static hasNextPage<T>(page: PageResponse<T>): boolean {
    return !page.last;
  }

  // Check if there's a previous page
  static hasPreviousPage<T>(page: PageResponse<T>): boolean {
    return !page.first;
  }

  // Download blob as file
  static downloadBlob(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  // Debounce function for search inputs
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Validate email format
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate phone format (basic)
  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  // Generate unique ID for forms
  static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Deep clone object
  static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  // Check if object is empty
  static isEmpty(obj: any): boolean {
    if (obj === null || obj === undefined) return true;
    if (typeof obj === 'string') return obj.trim().length === 0;
    if (Array.isArray(obj)) return obj.length === 0;
    if (typeof obj === 'object') return Object.keys(obj).length === 0;
    return false;
  }
}

export default ApiUtils;
