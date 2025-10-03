import { api } from '../apiClient';
import { showSuccess } from '../notifications';

export interface Company {
  _id: string;
  name: string;
  logo?: string;
  address?: string;
  phone?: string;
  email?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCompanyData {
  name: string;
  logo?: string;
  address?: string;
  phone?: string;
  email?: string;
  description?: string;
}

export interface UpdateCompanyData extends Partial<CreateCompanyData> {
  _id: string;
}

export interface CompaniesListResponse {
  message: string;
  data: Company[];
  total: number;
}

export interface CompanyDetailResponse {
  message: string;
  data: Company;
}

class CompanyService {
  private baseUrl = '/api/v1/co';

  // Get all companies with pagination and filters
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    name?: string;
    [key: string]: any;
  }): Promise<CompaniesListResponse> {
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
      const response = await api.get<CompaniesListResponse>(url);
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get single company by ID
  async getOne(id: string): Promise<CompanyDetailResponse> {
    try {
      const response = await api.get<CompanyDetailResponse>(`${this.baseUrl}/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Create new company
  async createOne(companyData: CreateCompanyData): Promise<CompanyDetailResponse> {
    try {
      const response = await api.post<CompanyDetailResponse>(this.baseUrl, companyData);
      showSuccess('شرکت با موفقیت ایجاد شد');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Update company
  async updateOne(id: string, companyData: Partial<CreateCompanyData>): Promise<CompanyDetailResponse> {
    try {
      const response = await api.patch<CompanyDetailResponse>(`${this.baseUrl}/${id}`, companyData);
      showSuccess('شرکت با موفقیت به‌روزرسانی شد');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Delete company
  async deleteOne(id: string): Promise<{ message: string }> {
    try {
      const response = await api.delete<{ message: string }>(`${this.baseUrl}/${id}`);
      showSuccess('شرکت با موفقیت حذف شد');
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const companyService = new CompanyService();
