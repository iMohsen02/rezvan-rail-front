# ItemList Component - نسخه جدید

کامپوننت `ItemList` کاملاً بازنویسی شده و حالا بسیار ساده‌تر و حرفه‌ای‌تر است.

## ویژگی‌ها

✅ **جستجو با شناسه**: فیلد جستجو در بالای لیست برای یافتن آیتم با شناسه  
✅ **صفحه‌بندی هوشمند**: صفحه‌بندی کامل با نمایش تعداد آیتم‌ها  
✅ **کامپوننت‌های قابل تنظیم**: هدر و ردیف‌ها به عنوان props دریافت می‌شوند  
✅ **استفاده از Service Layer**: مستقیماً از سرویس‌ها استفاده می‌کند  
✅ **مدیریت خطا**: خطاها به صورت خودکار نمایش داده می‌شوند  
✅ **Loading States**: حالت‌های بارگذاری برای UX بهتر  

## نحوه استفاده

### 1. ایجاد Header Component

```tsx
// src/app/components/headers/UserListHeader.tsx
export default function UserListHeader() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b font-semibold text-sm">
      <div>نام</div>
      <div>تلفن</div>
      <div>ایمیل</div>
      <div>نقش</div>
    </div>
  );
}
```

### 2. ایجاد Row Component

```tsx
// src/app/components/rows/UserRow.tsx
export default function UserRow({ item }: { item: any }) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 border-b text-sm hover:bg-gray-50">
      <div className="font-medium">{item.name}</div>
      <div>{item.phone}</div>
      <div>{item.mail || '-'}</div>
      <div>{item.role}</div>
    </div>
  );
}
```

### 3. استفاده در صفحه

```tsx
"use client";

import ItemList from "../components/ItemList";
import UserListHeader from "../components/headers/UserListHeader";
import UserRow from "../components/rows/UserRow";
import { userService } from "../../lib/services";

export default function UsersPage() {
  return (
    <section className="container py-8">
      <h1 className="text-xl font-bold mb-6">کاربران</h1>
      
      <ItemList
        getAll={userService.getAll.bind(userService)}
        getOne={userService.getOne.bind(userService)}
        HeaderComponent={UserListHeader}
        RowComponent={UserRow}
        itemsPerPage={20}
        searchPlaceholder="جستجو کاربر با شناسه..."
      />
    </section>
  );
}
```

## Props

| Prop | Type | توضیحات |
|------|------|---------|
| `getAll` | Function | تابع دریافت لیست از سرویس |
| `getOne` | Function | تابع دریافت یک آیتم از سرویس |
| `HeaderComponent` | Component | کامپوننت هدر جدول |
| `RowComponent` | Component | کامپوننت نمایش هر ردیف |
| `itemsPerPage` | number | تعداد آیتم در هر صفحه (پیش‌فرض: 10) |
| `searchPlaceholder` | string | متن placeholder فیلد جستجو |

## مثال‌های مختلف

### واگن‌ها
```tsx
<ItemList
  getAll={wagonService.getAll.bind(wagonService)}
  getOne={wagonService.getOne.bind(wagonService)}
  HeaderComponent={WagonListHeader}
  RowComponent={WagonRow}
  itemsPerPage={15}
  searchPlaceholder="جستجو واگن با شناسه..."
/>
```

### محصولات
```tsx
<ItemList
  getAll={productService.getAll.bind(productService)}
  getOne={productService.getOne.bind(productService)}
  HeaderComponent={ProductListHeader}
  RowComponent={ProductRow}
  itemsPerPage={12}
  searchPlaceholder="جستجو محصول با شناسه..."
/>
```

### شرکت‌ها
```tsx
<ItemList
  getAll={companyService.getAll.bind(companyService)}
  getOne={companyService.getOne.bind(companyService)}
  HeaderComponent={CompanyListHeader}
  RowComponent={CompanyRow}
  itemsPerPage={20}
  searchPlaceholder="جستجو شرکت با شناسه..."
/>
```

## ویژگی‌های UI

- **جستجو**: فیلد جستجو با آیکون و دکمه جستجو
- **نتیجه جستجو**: نمایش نتیجه جستجو در کارت جداگانه
- **صفحه‌بندی**: کنترل‌های کامل صفحه‌بندی با نمایش تعداد
- **حالت‌های مختلف**: Loading، Error، Empty State
- **Responsive**: طراحی واکنش‌گرا برای موبایل و دسکتاپ

## مزایای نسخه جدید

1. **سادگی**: فقط 4 prop اصلی نیاز دارد
2. **انعطاف‌پذیری**: هر نوع داده‌ای را می‌تواند نمایش دهد
3. **قابلیت استفاده مجدد**: یک بار نوشته، همه جا استفاده
4. **عملکرد بهتر**: کد بهینه‌تر و سریع‌تر
5. **TypeScript**: پشتیبانی کامل از تایپ‌ها
6. **UX بهتر**: تجربه کاربری بهبود یافته

## تفاوت با نسخه قبل

| قبل | بعد |
|-----|-----|
| پیچیده و پر از props | ساده با 4 prop اصلی |
| فیلتر و جستجوی پیچیده | فقط جستجو با شناسه |
| وابسته به fetch | استفاده از Service Layer |
| کد طولانی و پیچیده | کد کوتاه و خوانا |
| سخت برای تست | آسان برای تست |
