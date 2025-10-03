import { api } from '../apiClient';
import { showSuccess, showError } from '../notifications';

export interface User {
  _id: string;
  name: string;
  phone: string;
  mail?: string;
  role: string;
  activate: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserData {
  name: string;
  phone: string;
  mail?: string;
  role: string;
  password: string;
  activate?: boolean;
}

export interface UpdateUserData extends Partial<CreateUserData> {
  _id: string;
}

export interface LoginData {
  phone: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  data: User;
}

export interface UsersListResponse {
  message: string;
  data: User[];
  total: number;
}

export interface UserDetailResponse {
  message: string;
  data: User;
}

class UserService {
  private baseUrl = '/api/v1/users';

  // Get all users with pagination and filters
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    activate?: string;
    [key: string]: any;
  }): Promise<UsersListResponse> {
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
      const response = await api.get<UsersListResponse>(url);
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get single user by ID
  async getOne(id: string): Promise<UserDetailResponse> {
    try {
      const response = await api.get<UserDetailResponse>(`${this.baseUrl}/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Create new user
  async createOne(userData: CreateUserData): Promise<UserDetailResponse> {
    try {
      const response = await api.post<UserDetailResponse>(this.baseUrl, userData);
      showSuccess('کاربر با موفقیت ایجاد شد');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Update user
  async updateOne(id: string, userData: Partial<CreateUserData>): Promise<UserDetailResponse> {
    try {
      const response = await api.patch<UserDetailResponse>(`${this.baseUrl}/${id}`, userData);
      showSuccess('کاربر با موفقیت به‌روزرسانی شد');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Delete user
  async deleteOne(id: string): Promise<{ message: string }> {
    try {
      const response = await api.delete<{ message: string }>(`${this.baseUrl}/${id}`);
      showSuccess('کاربر با موفقیت حذف شد');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Login user
  async login(loginData: LoginData): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(`${this.baseUrl}/login`, loginData);
      showSuccess('ورود با موفقیت انجام شد');
      
      // Store token in localStorage
      if (typeof window !== 'undefined' && response.token) {
        localStorage.setItem('token', response.token);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      // Remove token from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      showSuccess('خروج با موفقیت انجام شد');
    } catch (error) {
      throw error;
    }
  }

  // Get current user profile
  async getProfile(): Promise<UserDetailResponse> {
    try {
      const response = await api.get<UserDetailResponse>(`${this.baseUrl}/profile`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Update current user profile
  async updateProfile(userData: Partial<CreateUserData>): Promise<UserDetailResponse> {
    try {
      const response = await api.put<UserDetailResponse>(`${this.baseUrl}/profile`, userData);
      showSuccess('پروفایل با موفقیت به‌روزرسانی شد');
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
