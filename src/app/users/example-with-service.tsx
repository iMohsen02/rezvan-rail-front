"use client";

import { useState, useEffect } from "react";
import { userService, User, showSuccess, showError } from "../../lib";

// مثال استفاده از لایه سرویس
export default function UsersExamplePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    phone: "",
    role: "user",
    password: ""
  });

  // بارگذاری لیست کاربران
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll({
        limit: 20,
        page: 1
      });
      setUsers(response.data);
    } catch (error) {
      // خطا به صورت خودکار نمایش داده می‌شود
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  // ایجاد کاربر جدید
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreating(true);
      await userService.createOne(newUser);
      // پیام موفقیت خودکار نمایش داده می‌شود
      setNewUser({ name: "", phone: "", role: "user", password: "" });
      loadUsers(); // بارگذاری مجدد لیست
    } catch (error) {
      // خطا خودکار نمایش داده می‌شود
      console.error("Error creating user:", error);
    } finally {
      setCreating(false);
    }
  };

  // حذف کاربر
  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`آیا از حذف کاربر "${name}" اطمینان دارید؟`)) return;
    
    try {
      await userService.deleteOne(id);
      // پیام موفقیت خودکار نمایش داده می‌شود
      loadUsers(); // بارگذاری مجدد لیست
    } catch (error) {
      // خطا خودکار نمایش داده می‌شود
      console.error("Error deleting user:", error);
    }
  };

  // تست نوتیفیکیشن‌ها
  const testNotifications = () => {
    showSuccess("این یک پیام موفقیت است");
    setTimeout(() => showError("این یک پیام خطا است"), 1000);
    setTimeout(() => showWarning("این یک پیام اخطار است"), 2000);
    setTimeout(() => showInfo("این یک پیام اطلاعات است"), 3000);
  };

  if (loading) {
    return (
      <section className="container py-8">
        <div className="text-center">در حال بارگذاری...</div>
      </section>
    );
  }

  return (
    <section className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">مثال استفاده از لایه سرویس</h1>
        <button 
          onClick={testNotifications}
          className="btn-ghost text-sm"
        >
          تست نوتیفیکیشن‌ها
        </button>
      </div>

      {/* فرم ایجاد کاربر جدید */}
      <div className="card p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">ایجاد کاربر جدید</h2>
        <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="نام"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="px-3 py-2 border rounded-lg"
            required
          />
          <input
            type="tel"
            placeholder="شماره تلفن"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            className="px-3 py-2 border rounded-lg"
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="user">کاربر</option>
            <option value="admin">مدیر</option>
            <option value="trader">تاجر</option>
          </select>
          <input
            type="password"
            placeholder="رمز عبور"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="px-3 py-2 border rounded-lg"
            required
          />
          <button 
            type="submit" 
            disabled={creating}
            className="btn-primary md:col-span-4"
          >
            {creating ? "در حال ایجاد..." : "ایجاد کاربر"}
          </button>
        </form>
      </div>

      {/* لیست کاربران */}
      <div className="card">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">لیست کاربران ({users.length})</h2>
        </div>
        <div className="divide-y">
          {users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              هیچ کاربری یافت نشد
            </div>
          ) : (
            users.map((user) => (
              <div key={user._id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.phone} • {user.role}</div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => showInfo(`جزئیات کاربر: ${user.name}`)}
                    className="btn-ghost text-sm"
                  >
                    مشاهده
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user._id, user.name)}
                    className="btn-ghost text-sm text-red-600"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* راهنمای استفاده */}
      <div className="mt-6 card p-6 bg-blue-50">
        <h3 className="font-semibold mb-2">راهنمای استفاده از لایه سرویس:</h3>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>• همه درخواست‌های API از طریق سرویس‌ها انجام می‌شود</li>
          <li>• خطاها به صورت خودکار مدیریت و نمایش داده می‌شوند</li>
          <li>• پیام‌های موفقیت خودکار نمایش داده می‌شوند</li>
          <li>• احراز هویت به صورت خودکار اضافه می‌شود</li>
          <li>• تمام سرویس‌ها دارای TypeScript هستند</li>
        </ul>
      </div>
    </section>
  );
}
