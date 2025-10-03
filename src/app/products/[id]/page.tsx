"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { productService, Product } from "../../../lib/services";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Product>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await productService.getOne(id);
      setProduct(response.data);
      setEditData(response.data);
    } catch (error) {
      console.error("Error loading product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!product) return;
    
    try {
      setSaving(true);
      await productService.updateOne(product._id, {
        title: editData.title,
        weight: editData.weight,
        status: editData.status,
        description: editData.description,
        price: editData.price,
        category: editData.category,
      });
      await loadProduct(); // Reload to get updated data
      setEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData(product || {});
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

  if (!product) {
    return (
      <section className="container py-8">
        <div className="text-center text-red-600">
          <p>محصول یافت نشد</p>
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

      {/* Product Details */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">جزئیات محصول</h1>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">عنوان</label>
            {editing ? (
              <input
                type="text"
                value={editData.title || ''}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{product.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">وزن (تن)</label>
            {editing ? (
              <input
                type="number"
                step="0.1"
                value={editData.weight || ''}
                onChange={(e) => setEditData({ ...editData, weight: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{product.weight} تن</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">وضعیت</label>
            {editing ? (
              <select
                value={editData.status || ''}
                onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="انبار">انبار</option>
                <option value="بارگیری">بارگیری</option>
                <option value="ارسال شده">ارسال شده</option>
                <option value="تحویل داده شده">تحویل داده شده</option>
              </select>
            ) : (
              <p className="text-gray-900">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  product.status === 'انبار' ? 'bg-blue-100 text-blue-800' :
                  product.status === 'بارگیری' ? 'bg-orange-100 text-orange-800' :
                  product.status === 'ارسال شده' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {product.status}
                </span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">تاجر</label>
            <p className="text-gray-900">{product.trader?.name || '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">قیمت</label>
            {editing ? (
              <input
                type="number"
                value={editData.price || ''}
                onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{product.price ? `${product.price.toLocaleString()} تومان` : '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">دسته‌بندی</label>
            {editing ? (
              <input
                type="text"
                value={editData.category || ''}
                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{product.category || '-'}</p>
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
              <p className="text-gray-900">{product.description || '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ ایجاد</label>
            <p className="text-gray-900">
              {product.createdAt ? new Date(product.createdAt).toLocaleDateString('fa-IR') : '-'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">آخرین به‌روزرسانی</label>
            <p className="text-gray-900">
              {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString('fa-IR') : '-'}
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
