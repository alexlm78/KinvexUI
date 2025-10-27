import httpClient from './httpClient';
import { ReportFilter } from '../../types/entities';
import {
  ReportExportRequest,
  InventoryMovementReportDto,
  StockLevelReportDto,
  SupplierPerformanceReportDto
} from '../../types/api';

class ReportService {
  private readonly BASE_PATH = '/reports';

  // Inventory movement reports
  async getInventoryMovements(filter: ReportFilter): Promise<InventoryMovementReportDto[]> {
    const params = new URLSearchParams();

    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    return httpClient.get<InventoryMovementReportDto[]>(`${this.BASE_PATH}/inventory-movements?${params.toString()}`);
  }

  // Stock level reports
  async getStockLevels(filter?: ReportFilter): Promise<StockLevelReportDto[]> {
    const params = new URLSearchParams();

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    return httpClient.get<StockLevelReportDto[]>(`${this.BASE_PATH}/stock-levels?${params.toString()}`);
  }

  // Supplier performance reports
  async getSupplierPerformance(filter: ReportFilter): Promise<SupplierPerformanceReportDto[]> {
    const params = new URLSearchParams();

    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    return httpClient.get<SupplierPerformanceReportDto[]>(`${this.BASE_PATH}/supplier-performance?${params.toString()}`);
  }

  // Export reports
  async exportReport(request: ReportExportRequest): Promise<Blob> {
    const response = await httpClient.post(`${this.BASE_PATH}/export/${request.reportType}`, request, {
      responseType: 'blob',
      headers: {
        'Accept': request.format === 'PDF' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    });

    return response as unknown as Blob;
  }

  // Dashboard metrics
  async getDashboardMetrics(): Promise<{
    totalProducts: number;
    lowStockProducts: number;
    totalOrders: number;
    pendingOrders: number;
    totalMovements: number;
    totalValue: number;
  }> {
    return httpClient.get(`${this.BASE_PATH}/dashboard-metrics`);
  }

  // Inventory value report
  async getInventoryValue(categoryId?: number): Promise<{
    totalValue: number;
    totalProducts: number;
    categoryBreakdown: Array<{
      categoryName: string;
      value: number;
      productCount: number;
    }>;
  }> {
    const params = categoryId ? `?categoryId=${categoryId}` : '';
    return httpClient.get(`${this.BASE_PATH}/inventory-value${params}`);
  }

  // Movement trends
  async getMovementTrends(days: number = 30): Promise<Array<{
    date: string;
    inMovements: number;
    outMovements: number;
    netMovement: number;
  }>> {
    return httpClient.get(`${this.BASE_PATH}/movement-trends?days=${days}`);
  }
}

export const reportService = new ReportService();
export default reportService;
