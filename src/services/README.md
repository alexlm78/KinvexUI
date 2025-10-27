# API Services Documentation

This directory contains the API communication layer for the KinvexUI frontend application.

## Structure

```
services/
├── api/
│   ├── httpClient.ts       # Base HTTP client with Axios
│   ├── authService.ts      # Authentication service
│   ├── inventoryService.ts # Inventory management service
│   ├── orderService.ts     # Order management service
│   ├── reportService.ts    # Reports service
│   └── index.ts           # Service exports
├── utils/
│   └── apiUtils.ts        # Utility functions for API operations
└── README.md              # This file
```

## HTTP Client

The `httpClient.ts` provides a configured Axios instance with:

- **Base URL configuration** from environment variables
- **JWT token interceptors** for automatic authentication
- **Error handling interceptors** for common HTTP errors
- **Token refresh logic** for expired tokens
- **Toast notifications** for user feedback

### Usage

```typescript
import httpClient from './httpClient';

// GET request
const data = await httpClient.get<Product[]>('/products');

// POST request
const newProduct = await httpClient.post<Product>('/products', productData);
```

## Services

### AuthService

Handles user authentication and token management.

**Methods:**
- `login(credentials)` - User login
- `logout(request)` - User logout
- `refreshToken(request)` - Refresh access token
- `isAuthenticated()` - Check authentication status
- `getCurrentUser()` - Get current user data

### InventoryService

Manages product inventory operations.

**Methods:**
- `getProducts(pageRequest, searchCriteria)` - Get paginated products
- `getProductById(id)` - Get product by ID
- `createProduct(request)` - Create new product
- `updateProduct(id, request)` - Update existing product
- `increaseStock(id, request)` - Increase product stock
- `decreaseStock(id, request)` - Decrease product stock
- `getLowStockProducts()` - Get products with low stock

### OrderService

Manages purchase orders and suppliers.

**Methods:**
- `getOrders(pageRequest, searchCriteria)` - Get paginated orders
- `createOrder(request)` - Create new purchase order
- `receiveOrder(id, request)` - Process order reception
- `updateOrderStatus(id, request)` - Update order status
- `getSuppliers(active)` - Get suppliers list
- `getOverdueOrders()` - Get overdue orders

### ReportService

Handles report generation and export.

**Methods:**
- `getInventoryMovements(filter)` - Get inventory movement reports
- `getStockLevels(filter)` - Get stock level reports
- `getSupplierPerformance(filter)` - Get supplier performance reports
- `exportReport(request)` - Export reports to PDF/Excel
- `getDashboardMetrics()` - Get dashboard metrics

## Types

All TypeScript types are defined in the `types/` directory:

- `entities.ts` - Domain entity types
- `api.ts` - API request/response types
- `index.ts` - Type exports

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TIMEOUT=10000
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=development
```

### Error Handling

The HTTP client automatically handles common errors:

- **401 Unauthorized** - Redirects to login page
- **403 Forbidden** - Shows access denied message
- **404 Not Found** - Shows resource not found message
- **500+ Server Errors** - Shows server error message
- **Network Errors** - Shows connection error message

## Usage Examples

### Basic API Call

```typescript
import { inventoryService } from '../services/api';

const products = await inventoryService.getProducts(
  { page: 0, size: 20 },
  { name: 'search term' }
);
```

### With React Hook

```typescript
import { useApi } from '../hooks/useApi';
import { inventoryService } from '../services/api';

function ProductList() {
  const { loading, error, execute } = useApi();

  const loadProducts = async () => {
    await execute(() => inventoryService.getProducts({ page: 0, size: 20 }));
  };

  // Component logic...
}
```

### Error Handling

```typescript
try {
  const product = await inventoryService.createProduct(productData);
  toast.success('Producto creado exitosamente');
} catch (error) {
  // Error is automatically handled by interceptors
  // Additional custom handling can be added here
}
```

## Best Practices

1. **Use TypeScript types** for all API calls
2. **Handle loading states** in UI components
3. **Use the provided hooks** for consistent error handling
4. **Implement proper pagination** for large datasets
5. **Cache frequently accessed data** using React Query
6. **Validate data** before sending API requests
7. **Use environment variables** for configuration
8. **Test API integrations** thoroughly

## Testing

API services can be tested using:

```typescript
// Mock the HTTP client for unit tests
jest.mock('./httpClient');

// Test service methods
describe('InventoryService', () => {
  it('should get products', async () => {
    const mockProducts = [{ id: 1, name: 'Test Product' }];
    httpClient.get.mockResolvedValue({ content: mockProducts });

    const result = await inventoryService.getProducts({ page: 0, size: 20 });
    expect(result.content).toEqual(mockProducts);
  });
});
```
