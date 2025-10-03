import { api } from '../apiClient';
import { showSuccess } from '../notifications';

export interface Wagon {
  _id: string;
  wagonId: number;
  status: 'in-service' | 'repair' | 'out-service';
  owner?: {
    _id: string;
    name: string;
  };
  forwarder?: {
    _id: string;
    name: string;
  };
  firstEntryAt?: string;
  line?: number;
  capacity?: number;
  size?: number;
  location?: string;
  cover?: {
    value: string;
    status: string;
  };
  validation?: {
    value: string;
    status: string;
  };
  barname?: {
    barnameId: string;
    status: string;
  };
  sendAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateWagonData {
  wagonId: number;
  status: 'in-service' | 'repair' | 'out-service';
  ownerId?: string;
  forwarderId?: string;
  line?: number;
  capacity?: number;
  location?: string;
}

export interface UpdateWagonData extends Partial<CreateWagonData> {
  _id: string;
}

export interface WagonsListResponse {
  message: string;
  data: Wagon[];
  total: number;
}

export interface WagonDetailResponse {
  message: string;
  data: Wagon;
}

class WagonService {
  private baseUrl = '/api/v1/wagon';

  // Get all wagons with pagination and filters
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    wagonId?: number;
    status?: string;
    owner?: string;
    forwarder?: string;
    line?: number;
    location?: string;
    [key: string]: any;
  }): Promise<WagonsListResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const url = queryParams.toString() ? `${this.baseUrl}?${queryParams}` : this.baseUrl;
      const response = await api.get<WagonsListResponse>(url);
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get single wagon by ID
  async getOne(id: string): Promise<WagonDetailResponse> {
    try {
      const response = await api.get<WagonDetailResponse>(`${this.baseUrl}/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Create new wagon
  async createOne(wagonData: CreateWagonData): Promise<WagonDetailResponse> {
    try {
      const response = await api.post<WagonDetailResponse>(this.baseUrl, wagonData);
      showSuccess('واگن با موفقیت ایجاد شد');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Update wagon
  async updateOne(id: string, wagonData: Partial<CreateWagonData>): Promise<WagonDetailResponse> {
    try {
      const response = await api.patch<WagonDetailResponse>(`${this.baseUrl}/${id}`, wagonData);
      showSuccess('واگن با موفقیت به‌روزرسانی شد');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Delete wagon
  async deleteOne(id: string): Promise<{ message: string }> {
    try {
      const response = await api.delete<{ message: string }>(`${this.baseUrl}/${id}`);
      showSuccess('واگن با موفقیت حذف شد');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get wagons by status
  async getByStatus(status: string, params?: {
    page?: number;
    limit?: number;
  }): Promise<WagonsListResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('status', status);
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const response = await api.get<WagonsListResponse>(`${this.baseUrl}?${queryParams}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get wagons by line
  async getByLine(line: number, params?: {
    page?: number;
    limit?: number;
  }): Promise<WagonsListResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('line', String(line));
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const response = await api.get<WagonsListResponse>(`${this.baseUrl}?${queryParams}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Update wagon status
  async updateStatus(id: string, status: 'in-service' | 'repair' | 'out-service'): Promise<WagonDetailResponse> {
    try {
      const response = await api.put<WagonDetailResponse>(`${this.baseUrl}/${id}`, { status });
      showSuccess('وضعیت واگن با موفقیت به‌روزرسانی شد');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Update wagon location
  async updateLocation(id: string, location: string): Promise<WagonDetailResponse> {
    try {
      const response = await api.put<WagonDetailResponse>(`${this.baseUrl}/${id}`, { location });
      showSuccess('موقعیت واگن با موفقیت به‌روزرسانی شد');
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const wagonService = new WagonService();
