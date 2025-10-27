// Example usage of the API services
// This file demonstrates how to use the implemented services

import {
  authService,
  inventoryService,
  orderService,
  reportService
} from '../services/api';
import {
  LoginRequest,
  CreateProductRequest,
  CreateOrderRequest
} from '../types/api';
import { ReportFilter, OrderStatus } from '../types/entities';
import { ApiUtils } from '../services/utils/apiUtils';

// Example: Authentication
export const authExamples = {
  // Login example
  async login(username: string, password: string) {
    const loginRequest: LoginRequest = { username, password };
    const response = await authService.login(loginRequest);

    // Store user data
    authService.setCurrentUser(response.user);

    return response;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return authService.isAuthenticated();
  },

  // Logout example
  async logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      await authService.logout({ refreshToken });
    }
  }
};

// Example: Product management
export const productExamples = {
  // Get products with pagination
  async getProducts(page = 0, size = 20, searchTerm?: string) {
    const pageRequest = ApiUtils.createPageRequest(page, size, 'name', 'ASC');
    const searchCriteria = searchTerm ? { name: searchTerm } : undefined;

    return await inventoryService.getProducts(pageRequest, searchCriteria);
  },

  // Create a new product
  async createProduct(productData: CreateProductRequest) {
    return await inventoryService.createProduct(productData);
  },

  // Update stock
  async updateStock(productId: number, quantity: number, notes?: string) {
    const request = { quantity, notes };

    if (quantity > 0) {
      return await inventoryService.increaseStock(productId, request);
    } else {
      return await inventoryService.decreaseStock(productId, {
        quantity: Math.abs(quantity),
        notes
      });
    }
  },

  // Get low stock products
  async getLowStockProducts() {
    return await inventoryService.getLowStockProducts();
  }
};

// Example: Order management
export const orderExamples = {
  // Get orders with filters
  async getOrders(page = 0, size = 20, supplierId?: number, status?: OrderStatus) {
    const pageRequest = ApiUtils.createPageRequest(page, size, 'orderDate', 'DESC');
    const searchCriteria = {
      ...(supplierId && { supplierId }),
      ...(status && { status })
    };

    return await orderService.getOrders(pageRequest, searchCriteria);
  },

  // Create a new order
  async createOrder(orderData: CreateOrderRequest) {
    return await orderService.createOrder(orderData);
  },

  // Receive order
  async receiveOrder(orderId: number, orderDetails: Array<{ orderDetailId: number; quantityReceived: number }>) {
    const request = {
      orderDetails,
      notes: 'Recepción procesada desde la interfaz web'
    };

    return await orderService.receiveOrder(orderId, request);
  },

  // Get overdue orders
  async getOverdueOrders() {
    return await orderService.getOverdueOrders();
  }
};

// Example: Reports
export const reportExamples = {
  // Get inventory movements report
  async getInventoryMovements(dateFrom?: string, dateTo?: string, productId?: number) {
    const filter: ReportFilter = {
      ...(dateFrom && { dateFrom }),
      ...(dateTo && { dateTo }),
      ...(productId && { productId })
    };

    return await reportService.getInventoryMovements(filter);
  },

  // Get stock levels report
  async getStockLevels() {
    return await reportService.getStockLevels();
  },

  // Export report
  async exportReport(reportType: string, format: 'PDF' | 'EXCEL', filters: any) {
    const request = {
      reportType,
      format,
      filters
    };

    const blob = await reportService.exportReport(request);

    // Download the file
    const filename = `${reportType}_${ApiUtils.formatDateForApi(new Date())}.${format.toLowerCase()}`;
    ApiUtils.downloadBlob(blob, filename);
  },

  // Get dashboard metrics
  async getDashboardMetrics() {
    return await reportService.getDashboardMetrics();
  }
};

// Example: Error handling
export const errorHandlingExample = {
  async handleApiCall<T>(apiCall: () => Promise<T>): Promise<T | null> {
    try {
      return await apiCall();
    } catch (error: any) {
      console.error('API Error:', error);

      // Handle specific error types
      if (error.response?.status === 401) {
        // Redirect to login
        window.location.href = '/login';
      } else if (error.response?.status === 403) {
        // Show access denied message
        console.error('Access denied');
      } else if (error.response?.status === 404) {
        // Handle not found
        console.error('Resource not found');
      }

      return null;
    }
  }
};

// Example: Using with React hooks
export const reactHookExample = `
// In a React component:
import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { inventoryService } from '../services/api';

function ProductList() {
  const { loading, error, data, execute } = useApi();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const pageRequest = { page: 0, size: 20 };
      const result = await execute(() => inventoryService.getProducts(pageRequest));
      if (result) {
        setProducts(result.content);
      }
    };

    loadProducts();
  }, [execute]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
`;

export default {
  authExamples,
  productExamples,
  orderExamples,
  reportExamples,
  errorHandlingExample,
  reactHookExample
};
