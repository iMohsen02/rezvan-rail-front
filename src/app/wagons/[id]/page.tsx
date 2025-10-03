"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { wagonService, Wagon } from "../../../lib/services";

export default function WagonDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [wagon, setWagon] = useState<Wagon | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Wagon>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadWagon();
  }, [id]);

  const loadWagon = async () => {
    try {
      setLoading(true);
      const response = await wagonService.getOne(id);
      setWagon(response.data);
      setEditData(response.data);
    } catch (error) {
      console.error("Error loading wagon:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!wagon) return;
    
    try {
      setSaving(true);
      await wagonService.updateOne(wagon._id, {
        wagonId: editData.wagonId,
        status: editData.status,
        line: editData.line,
        capacity: editData.capacity,
        location: editData.location,
      });
      await loadWagon(); // Reload to get updated data
      setEditing(false);
    } catch (error) {
      console.error("Error updating wagon:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData(wagon || {});
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

  if (!wagon) {
    return (
      <section className="container py-8">
        <div className="text-center text-red-600">
          <p>واگن یافت نشد</p>
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

      {/* Wagon Details */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">جزئیات واگن</h1>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">شناسه واگن</label>
            {editing ? (
              <input
                type="number"
                value={editData.wagonId || ''}
                onChange={(e) => setEditData({ ...editData, wagonId: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">#{wagon.wagonId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">وضعیت</label>
            {editing ? (
              <select
                value={editData.status || ''}
                onChange={(e) => setEditData({ ...editData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="in-service">درخدمت</option>
                <option value="repair">در تعمیر</option>
                <option value="out-service">خارج از خدمت</option>
              </select>
            ) : (
              <p className="text-gray-900">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  wagon.status === 'in-service' ? 'bg-green-100 text-green-800' :
                  wagon.status === 'repair' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {wagon.status === 'in-service' ? 'درخدمت' : 
                   wagon.status === 'repair' ? 'در تعمیر' : 'خارج از خدمت'}
                </span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">مالک</label>
            <p className="text-gray-900">{wagon.owner?.name || '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">پیمانکار</label>
            <p className="text-gray-900">{wagon.forwarder?.name || '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">خط</label>
            {editing ? (
              <input
                type="number"
                value={editData.line || ''}
                onChange={(e) => setEditData({ ...editData, line: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{wagon.line ? `خط ${wagon.line}` : '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ظرفیت</label>
            {editing ? (
              <input
                type="number"
                value={editData.capacity || ''}
                onChange={(e) => setEditData({ ...editData, capacity: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{wagon.capacity ? `${wagon.capacity} تن` : '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">موقعیت</label>
            {editing ? (
              <input
                type="text"
                value={editData.location || ''}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{wagon.location || '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اندازه بار</label>
            <p className="text-gray-900">{wagon.size ? `${wagon.size} تن` : '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ ورود</label>
            <p className="text-gray-900">
              {wagon.firstEntryAt ? new Date(wagon.firstEntryAt).toLocaleDateString('fa-IR') : '-'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">چادرکشی</label>
            <p className="text-gray-900">{wagon.cover?.value || '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ارزیابی</label>
            <p className="text-gray-900">{wagon.validation?.value || '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">بارنامه</label>
            <p className="text-gray-900">{wagon.barname?.barnameId || '-'}</p>
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
