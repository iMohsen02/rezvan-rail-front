"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { companyService, Company } from "../../../lib/services";

export default function CompanyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Company>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCompany();
  }, [id]);

  const loadCompany = async () => {
    try {
      setLoading(true);
      const response = await companyService.getOne(id);
      setCompany(response.data);
      setEditData(response.data);
    } catch (error) {
      console.error("Error loading company:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!company) return;
    
    try {
      setSaving(true);
      await companyService.updateOne(company._id, {
        name: editData.name,
        logo: editData.logo,
        address: editData.address,
        phone: editData.phone,
        email: editData.email,
        description: editData.description,
      });
      await loadCompany(); // Reload to get updated data
      setEditing(false);
    } catch (error) {
      console.error("Error updating company:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData(company || {});
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

  if (!company) {
    return (
      <section className="container py-8">
        <div className="text-center text-red-600">
          <p>شرکت یافت نشد</p>
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

      {/* Company Details */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">جزئیات شرکت</h1>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">نام شرکت</label>
            {editing ? (
              <input
                type="text"
                value={editData.name || ''}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{company.name}</p>
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
              <p className="text-gray-900">{company.phone || '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
            {editing ? (
              <input
                type="email"
                value={editData.email || ''}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{company.email || '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">لوگو</label>
            {editing ? (
              <input
                type="url"
                value={editData.logo || ''}
                onChange={(e) => setEditData({ ...editData, logo: e.target.value })}
                placeholder="آدرس URL لوگو"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex items-center gap-3">
                <img 
                  src={company.logo || "/vercel.svg"} 
                  alt="logo" 
                  className="h-12 w-12 object-contain rounded border"
                />
                <span className="text-gray-900 text-sm">{company.logo || 'بدون لوگو'}</span>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">آدرس</label>
            {editing ? (
              <textarea
                value={editData.address || ''}
                onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{company.address || '-'}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
            {editing ? (
              <textarea
                value={editData.description || ''}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{company.description || '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ ایجاد</label>
            <p className="text-gray-900">
              {company.createdAt ? new Date(company.createdAt).toLocaleDateString('fa-IR') : '-'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">آخرین به‌روزرسانی</label>
            <p className="text-gray-900">
              {company.updatedAt ? new Date(company.updatedAt).toLocaleDateString('fa-IR') : '-'}
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
