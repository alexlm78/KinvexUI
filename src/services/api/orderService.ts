import httpClient from './httpClient';
import {
  PurchaseOrder,
  PageResponse,
  PageRequest,
  OrderSearchCriteria,
  Supplier
} from '../../types/entities';
import {
  CreateOrderRequest,
  UpdateOrderStatusRequest,
  ReceiveOrderRequest,
  OrderReceiptResponse,
  OrderAlertResponse
} from '../../types/api';

class OrderService {
  private readonly BASE_PATH = '/orders';

  // Order management
  async getOrders(
    pageRequest: PageRequest,
    searchCriteria?: OrderSearchCriteria
  ): Promise<PageResponse<PurchaseOrder>> {
    const params = new URLSearchParams();

    // Add pagination parameters
    params.append('page', pageRequest.page.toString());
    params.append('size', pageRequest.size.toString());
    if (pageRequest.sort) {
      params.append('sort', pageRequest.sort);
      params.append('direction', pageRequest.direction || 'DESC');
    }

    // Add search criteria
    if (searchCriteria) {
      Object.entries(searchCriteria).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    return httpClient.get<PageResponse<PurchaseOrder>>(`${this.BASE_PATH}?${params.toString()}`);
  }

  async getOrderById(id: number): Promise<PurchaseOrder> {
    return httpClient.get<PurchaseOrder>(`${this.BASE_PATH}/${id}`);
  }

  async getOrderByNumber(orderNumber: string): Promise<PurchaseOrder> {
    return httpClient.get<PurchaseOrder>(`${this.BASE_PATH}/number/${orderNumber}`);
  }

  async createOrder(request: CreateOrderRequest): Promise<PurchaseOrder> {
    return httpClient.post<PurchaseOrder>(`${this.BASE_PATH}`, request);
  }

  async updateOrderStatus(id: number, request: UpdateOrderStatusRequest): Promise<PurchaseOrder> {
    return httpClient.put<PurchaseOrder>(`${this.BASE_PATH}/${id}/status`, request);
  }

  async receiveOrder(id: number, request: ReceiveOrderRequest): Promise<OrderReceiptResponse> {
    return httpClient.post<OrderReceiptResponse>(`${this.BASE_PATH}/${id}/receive`, request);
  }

  async cancelOrder(id: number, reason?: string): Promise<PurchaseOrder> {
    return httpClient.put<PurchaseOrder>(`${this.BASE_PATH}/${id}/cancel`, { reason });
  }

  async deleteOrder(id: number): Promise<void> {
    return httpClient.delete<void>(`${this.BASE_PATH}/${id}`);
  }

  // Supplier management
  async getSuppliers(active?: boolean): Promise<Supplier[]> {
    const params = active !== undefined ? `?active=${active}` : '';
    return httpClient.get<Supplier[]>(`/suppliers${params}`);
  }

  async getSupplierById(id: number): Promise<Supplier> {
    return httpClient.get<Supplier>(`/suppliers/${id}`);
  }

  async createSupplier(supplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>): Promise<Supplier> {
    return httpClient.post<Supplier>('/suppliers', supplier);
  }

  async updateSupplier(id: number, supplier: Partial<Supplier>): Promise<Supplier> {
    return httpClient.put<Supplier>(`/suppliers/${id}`, supplier);
  }

  // Order alerts
  async getOverdueOrders(): Promise<OrderAlertResponse[]> {
    return httpClient.get<OrderAlertResponse[]>(`${this.BASE_PATH}/alerts/overdue`);
  }

  async getPendingOrders(): Promise<PurchaseOrder[]> {
    return httpClient.get<PurchaseOrder[]>(`${this.BASE_PATH}/pending`);
  }

  // Order statistics
  async getOrderStats(dateFrom?: string, dateTo?: string): Promise<{
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    totalAmount: number;
  }> {
    const params = new URLSearchParams();
    if (dateFrom) params.append('dateFrom', dateFrom);
    if (dateTo) params.append('dateTo', dateTo);

    return httpClient.get(`${this.BASE_PATH}/stats?${params.toString()}`);
  }
}

export const orderService = new OrderService();
export default orderService;
