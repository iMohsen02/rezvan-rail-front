# Service Layer Documentation

این پوشه شامل لایه سرویس برنامه است که تمام ارتباطات با API را مدیریت می‌کند.

## ساختار

```
/lib
├── apiClient.ts          # کلاینت axios با تنظیمات عمومی
├── notifications.ts      # سیستم نوتیفیکیشن
├── services/
│   ├── index.ts         # Export همه سرویس‌ها
│   ├── userService.ts   # سرویس کاربران
│   ├── companyService.ts # سرویس شرکت‌ها
│   ├── productService.ts # سرویس محصولات
│   └── wagonService.ts  # سرویس واگن‌ها
└── index.ts             # Export کلی
```

## استفاده

### 1. Import کردن سرویس‌ها

```typescript
import { userService, companyService, productService, wagonService } from '@/lib/services';
// یا
import { userService } from '@/lib/services/userService';
```

### 2. استفاده از توابع CRUD

هر سرویس دارای توابع استاندارد زیر است:

#### getAll - دریافت لیست
```typescript
const users = await userService.getAll({
  page: 1,
  limit: 20,
  search: 'نام کاربر',
  role: 'admin'
});
```

#### getOne - دریافت یک آیتم
```typescript
const user = await userService.getOne('user_id');
```

#### createOne - ایجاد آیتم جدید
```typescript
const newUser = await userService.createOne({
  name: 'نام کاربر',
  phone: '09123456789',
  role: 'user',
  password: 'password123'
});
```

#### updateOne - به‌روزرسانی آیتم
```typescript
const updatedUser = await userService.updateOne('user_id', {
  name: 'نام جدید'
});
```

#### deleteOne - حذف آیتم
```typescript
await userService.deleteOne('user_id');
```

### 3. سیستم نوتیفیکیشن

```typescript
import { showSuccess, showError, showWarning, showInfo } from '@/lib/notifications';

// نمایش پیام موفقیت (سبز)
showSuccess('عملیات با موفقیت انجام شد');

// نمایش پیام خطا (قرمز)
showError('خطا در انجام عملیات');

// نمایش پیام اخطار (زرد)
showWarning('توجه: این عملیات قابل بازگشت نیست');

// نمایش پیام اطلاعات (آبی)
showInfo('اطلاعات مفید برای کاربر');
```

### 4. مدیریت خطا

خطاها به صورت خودکار توسط لایه سرویس مدیریت می‌شوند:

- خطاهای شبکه
- خطاهای احراز هویت (401)
- خطاهای دسترسی (403)
- خطاهای یافت نشدن (404)
- خطاهای اعتبارسنجی (422)
- خطاهای سرور (500)

```typescript
try {
  const result = await userService.createOne(userData);
  // عملیات موفق
} catch (error) {
  // خطا به صورت خودکار نمایش داده شده
  console.error('Error:', error);
}
```

## مثال کامل

```typescript
'use client';

import { useState, useEffect } from 'react';
import { userService, showSuccess } from '@/lib';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll({ limit: 20 });
      setUsers(response.data);
    } catch (error) {
      // خطا خودکار نمایش داده می‌شود
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await userService.deleteOne(id);
      loadUsers(); // بارگذاری مجدد لیست
    } catch (error) {
      // خطا خودکار نمایش داده می‌شود
    }
  };

  if (loading) return <div>در حال بارگذاری...</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user._id}>
          <span>{user.name}</span>
          <button onClick={() => handleDelete(user._id)}>
            حذف
          </button>
        </div>
      ))}
    </div>
  );
}
```

## ویژگی‌های کلیدی

1. **مدیریت خودکار خطا**: همه خطاها به صورت خودکار شناسایی و نمایش داده می‌شوند
2. **نوتیفیکیشن هوشمند**: پیام‌های موفقیت و خطا با رنگ‌های مناسب
3. **احراز هویت خودکار**: توکن به صورت خودکار به درخواست‌ها اضافه می‌شود
4. **TypeScript پشتیبانی**: تمام سرویس‌ها دارای تایپ کامل هستند
5. **قابلیت تست**: ساختار مناسب برای نوشتن تست‌های واحد

## تنظیمات

### تغییر baseURL
در فایل `src/app/utils/config.ts` می‌توانید آدرس پایه API را تغییر دهید.

### تنظیم timeout
در فایل `apiClient.ts` می‌توانید timeout درخواست‌ها را تغییر دهید (پیش‌فرض: 10 ثانیه).

### سفارشی‌سازی نوتیفیکیشن
در فایل `notifications.ts` می‌توانید استایل و موقعیت نمایش پیام‌ها را تغییر دهید.
