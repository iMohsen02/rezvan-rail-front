"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { userService, User } from "../../../lib/services";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<User>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const response = await userService.getOne(id);
      setUser(response.data);
      setEditData(response.data);
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    try {
      setSaving(true);
      await userService.updateOne(user._id, editData);
      await loadUser(); // Reload to get updated data
      setEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData(user || {});
    setEditing(false);
  };

  if (loading) {
    return (
      <section className="container py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">در حال بارگذاری...</p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="container py-8">
        <div className="text-center text-red-600">
          <p>کاربر یافت نشد</p>
          <button onClick={() => router.back()} className="mt-3 btn-ghost">
            بازگشت
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        بازگشت
      </button>

      {/* User Details */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">جزئیات کاربر</h1>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="btn-primary"
            >
              ویرایش
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نام</label>
            {editing ? (
              <input
                type="text"
                value={editData.name || ''}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">تلفن</label>
            {editing ? (
              <input
                type="tel"
                value={editData.phone || ''}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{user.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
            {editing ? (
              <input
                type="email"
                value={editData.mail || ''}
                onChange={(e) => setEditData({ ...editData, mail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{user.mail || '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نقش</label>
            {editing ? (
              <select
                value={editData.role || ''}
                onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">کاربر</option>
                <option value="admin">مدیر</option>
                <option value="trader">تاجر</option>
                <option value="loader">بارگیر</option>
                <option value="coverer">چادرکش</option>
                <option value="traffic-admin">مدیر ترافیک</option>
              </select>
            ) : (
              <p className="text-gray-900">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.role === 'admin' ? 'bg-red-100 text-red-800' :
                  user.role === 'trader' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {user.role}
                </span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">وضعیت</label>
            {editing ? (
              <select
                value={editData.activate ? 'true' : 'false'}
                onChange={(e) => setEditData({ ...editData, activate: e.target.value === 'true' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="true">فعال</option>
                <option value="false">غیرفعال</option>
              </select>
            ) : (
              <p className="text-gray-900">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.activate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.activate ? 'فعال' : 'غیرفعال'}
                </span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ ایجاد</label>
            <p className="text-gray-900">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fa-IR') : '-'}
            </p>
          </div>
        </div>

        {editing && (
          <div className="flex gap-3 mt-6 pt-4 border-t">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary"
            >
              {saving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
            </button>
            <button
              onClick={handleCancel}
              className="btn-ghost"
            >
              انصراف
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
