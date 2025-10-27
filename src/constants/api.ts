// API endpoint constants
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },

  // Inventory
  INVENTORY: {
    PRODUCTS: '/inventory/products',
    PRODUCT_BY_ID: (id: number) => `/inventory/products/${id}`,
    PRODUCT_BY_CODE: (code: string) => `/inventory/products/code/${code}`,
    INCREASE_STOCK: (id: number) => `/inventory/products/${id}/stock/increase`,
    DECREASE_STOCK: (id: number) => `/inventory/products/${id}/stock/decrease`,
    MOVEMENTS: '/inventory/movements',
    LOW_STOCK: '/inventory/products/low-stock',
    EXTERNAL_DEDUCT: '/inventory/external/deduct-stock',
  },

  // Orders
  ORDERS: {
    BASE: '/orders',
    BY_ID: (id: number) => `/orders/${id}`,
    BY_NUMBER: (orderNumber: string) => `/orders/number/${orderNumber}`,
    UPDATE_STATUS: (id: number) => `/orders/${id}/status`,
    RECEIVE: (id: number) => `/orders/${id}/receive`,
    CANCEL: (id: number) => `/orders/${id}/cancel`,
    PENDING: '/orders/pending',
    OVERDUE_ALERTS: '/orders/alerts/overdue',
    STATS: '/orders/stats',
  },

  // Suppliers
  SUPPLIERS: {
    BASE: '/suppliers',
    BY_ID: (id: number) => `/suppliers/${id}`,
  },

  // Reports
  REPORTS: {
    INVENTORY_MOVEMENTS: '/reports/inventory-movements',
    STOCK_LEVELS: '/reports/stock-levels',
    SUPPLIER_PERFORMANCE: '/reports/supplier-performance',
    EXPORT: (type: string) => `/reports/export/${type}`,
    DASHBOARD_METRICS: '/reports/dashboard-metrics',
    INVENTORY_VALUE: '/reports/inventory-value',
    MOVEMENT_TRENDS: '/reports/movement-trends',
  },

  // Categories
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id: number) => `/categories/${id}`,
  },

  // Audit
  AUDIT: {
    LOGS: '/audit/logs',
  },
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error codes
export const ERROR_CODES = {
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  INSUFFICIENT_STOCK: 'INSUFFICIENT_STOCK',
  DUPLICATE_PRODUCT_CODE: 'DUPLICATE_PRODUCT_CODE',
  ORDER_NOT_FOUND: 'ORDER_NOT_FOUND',
  SUPPLIER_NOT_FOUND: 'SUPPLIER_NOT_FOUND',
  INVALID_ORDER_STATUS: 'INVALID_ORDER_STATUS',
  AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED',
  ACCESS_DENIED: 'ACCESS_DENIED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
} as const;

// Request timeout values
export const TIMEOUTS = {
  DEFAULT: 10000, // 10 seconds
  UPLOAD: 30000, // 30 seconds
  EXPORT: 60000, // 60 seconds
  LONG_RUNNING: 120000, // 2 minutes
} as const;

// Content types
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
  PDF: 'application/pdf',
  EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  CSV: 'text/csv',
} as const;

export default API_ENDPOINTS;
