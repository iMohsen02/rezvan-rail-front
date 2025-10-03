import { api } from '../apiClient';
import { showSuccess } from '../notifications';

export interface Product {
  _id: string;
  title: string;
  weight: number;
  status: string;
  trader?: {
    _id: string;
    name: string;
    phone?: string;
  };
  description?: string;
  price?: number;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductData {
  title: string;
  weight: number;
  status: string;
  traderId?: string;
  description?: string;
  price?: number;
  category?: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  _id: string;
}

export interface ProductsListResponse {
  message: string;
  data: Product[];
  total: number;
}

export interface ProductDetailResponse {
  message: string;
  data: Product;
}

class ProductService {
  private baseUrl = '/api/v1/cargo';

  // Get all products with pagination and filters
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    title?: string;
    status?: string;
    trader?: string;
    weight?: number;
    [key: string]: any;
  }): Promise<ProductsListResponse> {
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
      const response = await api.get<ProductsListResponse>(url);
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get single product by ID
  async getOne(id: string): Promise<ProductDetailResponse> {
    try {
      const response = await api.get<ProductDetailResponse>(`${this.baseUrl}/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Create new product
  async createOne(productData: CreateProductData): Promise<ProductDetailResponse> {
    try {
      const response = await api.post<ProductDetailResponse>(this.baseUrl, productData);
      showSuccess('محصول با موفقیت ایجاد شد');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Update product
  async updateOne(id: string, productData: Partial<CreateProductData>): Promise<ProductDetailResponse> {
    try {
      const response = await api.patch<ProductDetailResponse>(`${this.baseUrl}/${id}`, productData);
      showSuccess('محصول با موفقیت به‌روزرسانی شد');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Delete product
  async deleteOne(id: string): Promise<{ message: string }> {
    try {
      const response = await api.delete<{ message: string }>(`${this.baseUrl}/${id}`);
      showSuccess('محصول با موفقیت حذف شد');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get products by trader
  async getByTrader(traderId: string, params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ProductsListResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('trader', traderId);
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const response = await api.get<ProductsListResponse>(`${this.baseUrl}?${queryParams}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Update product status
  async updateStatus(id: string, status: string): Promise<ProductDetailResponse> {
    try {
      const response = await api.put<ProductDetailResponse>(`${this.baseUrl}/${id}`, { status });
      showSuccess('وضعیت محصول با موفقیت به‌روزرسانی شد');
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const productService = new ProductService();
