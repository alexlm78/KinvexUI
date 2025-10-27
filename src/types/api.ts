import { User } from './entities';

// Authentication types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

// Product API types
export interface CreateProductRequest {
  code: string;
  name: string;
  description?: string;
  categoryId?: number;
  unitPrice: number;
  minStock: number;
  maxStock?: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  categoryId?: number;
  unitPrice?: number;
  minStock?: number;
  maxStock?: number;
  active?: boolean;
}

export interface StockUpdateRequest {
  quantity: number;
  notes?: string;
}

export interface ExternalStockDeductionRequest {
  productCode: string;
  quantity: number;
  sourceSystem: string;
  notes?: string;
}

export interface ExternalStockDeductionResponse {
  success: boolean;
  message: string;
  newStock: number;
  movementId: number;
}

// Order API types
export interface CreateOrderRequest {
  supplierId: number;
  orderDate: string;
  expectedDate?: string;
  notes?: string;
  orderDetails: CreateOrderDetailRequest[];
}

export interface CreateOrderDetailRequest {
  productId: number;
  quantityOrdered: number;
  unitPrice: number;
}

export interface UpdateOrderStatusRequest {
  status: string;
  notes?: string;
}

export interface ReceiveOrderRequest {
  orderDetails: OrderDetailReceiptRequest[];
  notes?: string;
}

export interface OrderDetailReceiptRequest {
  orderDetailId: number;
  quantityReceived: number;
}

export interface OrderDetailReceiptResponse {
  orderDetailId: number;
  quantityReceived: number;
  newStock: number;
}

export interface OrderReceiptResponse {
  orderId: number;
  status: string;
  receivedDate: string;
  orderDetails: OrderDetailReceiptResponse[];
}

// Report API types
export interface ReportExportRequest {
  reportType: string;
  format: 'PDF' | 'EXCEL';
  filters: Record<string, any>;
}

export interface InventoryMovementReportDto {
  id: number;
  productCode: string;
  productName: string;
  movementType: string;
  quantity: number;
  referenceType?: string;
  referenceId?: number;
  sourceSystem?: string;
  notes?: string;
  createdAt: string;
  createdBy?: string;
}

export interface StockLevelReportDto {
  productId: number;
  productCode: string;
  productName: string;
  categoryName?: string;
  currentStock: number;
  minStock: number;
  maxStock?: number;
  stockStatus: 'LOW' | 'NORMAL' | 'HIGH';
  lastMovementDate?: string;
}

export interface SupplierPerformanceReportDto {
  supplierId: number;
  supplierName: string;
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  averageDeliveryDays: number;
  onTimeDeliveryRate: number;
  totalAmount: number;
}

// Alert types
export interface AlertSummaryResponse {
  lowStockAlerts: number;
  overdueOrders: number;
  pendingOrders: number;
  totalAlerts: number;
}

export interface OrderAlertResponse {
  orderId: number;
  orderNumber: string;
  supplierName: string;
  expectedDate: string;
  daysOverdue: number;
  status: string;
}

// Error response type
export interface ErrorResponse {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// File upload types
export interface FileUploadResponse {
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: string;
}
