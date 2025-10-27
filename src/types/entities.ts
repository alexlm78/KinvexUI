// Base types
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt?: string;
}

// User related types
export interface User extends BaseEntity {
  username: string;
  email: string;
  role: UserRole;
  active: boolean;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  OPERATOR = 'OPERATOR',
  VIEWER = 'VIEWER'
}

// Supplier types
export interface Supplier extends BaseEntity {
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  active: boolean;
}

// Category types
export interface Category extends BaseEntity {
  name: string;
  description?: string;
  parentId?: number;
  parent?: Category;
  children?: Category[];
}

// Product types
export interface Product extends BaseEntity {
  code: string;
  name: string;
  description?: string;
  category?: Category;
  categoryId?: number;
  unitPrice: number;
  currentStock: number;
  minStock: number;
  maxStock?: number;
  active: boolean;
}

// Purchase Order types
export interface PurchaseOrder extends BaseEntity {
  orderNumber: string;
  supplier: Supplier;
  supplierId: number;
  status: OrderStatus;
  orderDate: string;
  expectedDate?: string;
  receivedDate?: string;
  totalAmount?: number;
  notes?: string;
  createdBy?: User;
  createdById?: number;
  orderDetails: OrderDetail[];
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PARTIAL = 'PARTIAL',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

// Order Detail types
export interface OrderDetail extends BaseEntity {
  orderId: number;
  product: Product;
  productId: number;
  quantityOrdered: number;
  quantityReceived: number;
  unitPrice: number;
  totalPrice: number;
}

// Inventory Movement types
export interface InventoryMovement extends BaseEntity {
  product: Product;
  productId: number;
  movementType: MovementType;
  quantity: number;
  referenceType?: ReferenceType;
  referenceId?: number;
  sourceSystem?: string;
  notes?: string;
  createdBy?: User;
  createdById?: number;
}

export enum MovementType {
  IN = 'IN',
  OUT = 'OUT'
}

export enum ReferenceType {
  PURCHASE_ORDER = 'PURCHASE_ORDER',
  SALE = 'SALE',
  ADJUSTMENT = 'ADJUSTMENT'
}

// Audit Log types
export interface AuditLog extends BaseEntity {
  user?: User;
  userId?: number;
  action: string;
  entityType: string;
  entityId?: number;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

// Pagination types
export interface PageRequest {
  page: number;
  size: number;
  sort?: string;
  direction?: 'ASC' | 'DESC';
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

// Search and filter types
export interface ProductSearchCriteria {
  name?: string;
  code?: string;
  categoryId?: number;
  active?: boolean;
  minStock?: boolean;
}

export interface OrderSearchCriteria {
  orderNumber?: string;
  supplierId?: number;
  status?: OrderStatus;
  dateFrom?: string;
  dateTo?: string;
}

export interface ReportFilter {
  dateFrom?: string;
  dateTo?: string;
  productId?: number;
  supplierId?: number;
  categoryId?: number;
  movementType?: MovementType;
}
