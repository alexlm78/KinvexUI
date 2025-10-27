import httpClient from './httpClient';
import {
  Product,
  PageResponse,
  PageRequest,
  ProductSearchCriteria,
  InventoryMovement
} from '../../types/entities';
import {
  CreateProductRequest,
  UpdateProductRequest,
  StockUpdateRequest,
  ExternalStockDeductionRequest,
  ExternalStockDeductionResponse
} from '../../types/api';

class InventoryService {
  private readonly BASE_PATH = '/inventory';

  // Product management
  async getProducts(
    pageRequest: PageRequest,
    searchCriteria?: ProductSearchCriteria
  ): Promise<PageResponse<Product>> {
    const params = new URLSearchParams();

    // Add pagination parameters
    params.append('page', pageRequest.page.toString());
    params.append('size', pageRequest.size.toString());
    if (pageRequest.sort) {
      params.append('sort', pageRequest.sort);
      params.append('direction', pageRequest.direction || 'ASC');
    }

    // Add search criteria
    if (searchCriteria) {
      Object.entries(searchCriteria).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    return httpClient.get<PageResponse<Product>>(`${this.BASE_PATH}/products?${params.toString()}`);
  }

  async getProductById(id: number): Promise<Product> {
    return httpClient.get<Product>(`${this.BASE_PATH}/products/${id}`);
  }

  async getProductByCode(code: string): Promise<Product> {
    return httpClient.get<Product>(`${this.BASE_PATH}/products/code/${code}`);
  }

  async createProduct(request: CreateProductRequest): Promise<Product> {
    return httpClient.post<Product>(`${this.BASE_PATH}/products`, request);
  }

  async updateProduct(id: number, request: UpdateProductRequest): Promise<Product> {
    return httpClient.put<Product>(`${this.BASE_PATH}/products/${id}`, request);
  }

  async deleteProduct(id: number): Promise<void> {
    return httpClient.delete<void>(`${this.BASE_PATH}/products/${id}`);
  }

  // Stock management
  async increaseStock(id: number, request: StockUpdateRequest): Promise<InventoryMovement> {
    return httpClient.post<InventoryMovement>(`${this.BASE_PATH}/products/${id}/stock/increase`, request);
  }

  async decreaseStock(id: number, request: StockUpdateRequest): Promise<InventoryMovement> {
    return httpClient.post<InventoryMovement>(`${this.BASE_PATH}/products/${id}/stock/decrease`, request);
  }

  // External API for billing systems
  async deductStockExternal(request: ExternalStockDeductionRequest): Promise<ExternalStockDeductionResponse> {
    return httpClient.post<ExternalStockDeductionResponse>(`${this.BASE_PATH}/external/deduct-stock`, request);
  }

  // Inventory movements
  async getInventoryMovements(
    productId?: number,
    pageRequest?: PageRequest
  ): Promise<PageResponse<InventoryMovement>> {
    const params = new URLSearchParams();

    if (productId) {
      params.append('productId', productId.toString());
    }

    if (pageRequest) {
      params.append('page', pageRequest.page.toString());
      params.append('size', pageRequest.size.toString());
      if (pageRequest.sort) {
        params.append('sort', pageRequest.sort);
        params.append('direction', pageRequest.direction || 'DESC');
      }
    }

    return httpClient.get<PageResponse<InventoryMovement>>(`${this.BASE_PATH}/movements?${params.toString()}`);
  }

  // Low stock alerts
  async getLowStockProducts(): Promise<Product[]> {
    return httpClient.get<Product[]>(`${this.BASE_PATH}/products/low-stock`);
  }
}

export const inventoryService = new InventoryService();
export default inventoryService;
