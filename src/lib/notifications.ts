import toast from 'react-hot-toast';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationOptions {
  duration?: number;
  position?: 'top-center' | 'top-right' | 'top-left' | 'bottom-center' | 'bottom-right' | 'bottom-left';
}

const defaultOptions: NotificationOptions = {
  duration: 4000,
  position: 'top-right',
};

export const showNotification = (
  message: string, 
  type: NotificationType = 'info', 
  options: NotificationOptions = {}
) => {
  const config = { ...defaultOptions, ...options };
  
  switch (type) {
    case 'success':
      return toast.success(message, {
        duration: config.duration,
        position: config.position,
        style: {
          background: '#10b981',
          color: '#ffffff',
          fontFamily: 'inherit',
          direction: 'rtl',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#10b981',
        },
      });
      
    case 'error':
      return toast.error(message, {
        duration: config.duration,
        position: config.position,
        style: {
          background: '#ef4444',
          color: '#ffffff',
          fontFamily: 'inherit',
          direction: 'rtl',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#ef4444',
        },
      });
      
    case 'warning':
      return toast(message, {
        duration: config.duration,
        position: config.position,
        icon: '⚠️',
        style: {
          background: '#f59e0b',
          color: '#ffffff',
          fontFamily: 'inherit',
          direction: 'rtl',
        },
      });
      
    case 'info':
    default:
      return toast(message, {
        duration: config.duration,
        position: config.position,
        icon: 'ℹ️',
        style: {
          background: '#3b82f6',
          color: '#ffffff',
          fontFamily: 'inherit',
          direction: 'rtl',
        },
      });
  }
};

// Convenience methods
export const showSuccess = (message: string, options?: NotificationOptions) => 
  showNotification(message, 'success', options);

export const showError = (message: string, options?: NotificationOptions) => 
  showNotification(message, 'error', options);

export const showWarning = (message: string, options?: NotificationOptions) => 
  showNotification(message, 'warning', options);

export const showInfo = (message: string, options?: NotificationOptions) => 
  showNotification(message, 'info', options);

// Clear all notifications
export const clearNotifications = () => toast.dismiss();
