import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getApiBaseUrl } from '../app/utils/config';
import { showNotification } from './notifications';

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (you might want to use a different storage method)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Check if response has a message field and it's not "success"
    if (response.data?.message && response.data.message !== 'success') {
      showNotification(response.data.message, 'error');
      return Promise.reject(new Error(response.data.message));
    }
    return response;
  },
  (error) => {
    let errorMessage = 'خطا در ارتباط با سرور';
    
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 401:
          errorMessage = 'عدم احراز هویت - لطفا مجدداً وارد شوید';
          // Redirect to login or clear token
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
          break;
        case 403:
          errorMessage = 'عدم دسترسی به این بخش';
          break;
        case 404:
          errorMessage = 'اطلاعات مورد نظر یافت نشد';
          break;
        case 422:
          errorMessage = data?.message || 'اطلاعات ارسالی نامعتبر است';
          break;
        case 500:
          errorMessage = 'خطا در سرور - لطفا بعداً تلاش کنید';
          break;
        default:
          errorMessage = data?.message || `خطا ${status}`;
      }
    } else if (error.request) {
      // Network error
      errorMessage = 'خطا در اتصال به اینترنت';
    } else {
      // Other error
      errorMessage = error.message || 'خطای غیرمنتظره';
    }
    
    showNotification(errorMessage, 'error');
    return Promise.reject(error);
  }
);

// Generic API methods
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.get(url, config).then(response => response.data),
    
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.post(url, data, config).then(response => response.data),
    
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.put(url, data, config).then(response => response.data),
    
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.delete(url, config).then(response => response.data),
    
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.patch(url, data, config).then(response => response.data),
};

export default apiClient;
