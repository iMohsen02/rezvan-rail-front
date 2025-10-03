"use client";

import { useState, useEffect } from "react";
import { wagonService, CreateWagonData } from "../../../lib/services/wagonService";

type WagonUpdateFormProps = {
  item: { _id: string; wagonId: number; status: 'in-service' | 'repair' | 'out-service'; line?: number; capacity?: number; location?: string };
  onSuccess?: () => void;
};

export default function WagonUpdateForm({ item, onSuccess }: WagonUpdateFormProps) {
  const [form, setForm] = useState<Partial<CreateWagonData>>({ wagonId: item.wagonId, status: item.status, line: item.line, capacity: item.capacity, location: item.location });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm({ wagonId: item.wagonId, status: item.status, line: item.line, capacity: item.capacity, location: item.location });
  }, [item]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubmitting(true);
      await wagonService.updateOne(item._id, form);
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
      <input className="px-3 py-2 border rounded-lg" placeholder="شماره واگن" type="number" value={form.wagonId ?? 0} onChange={(e) => setForm({ ...form, wagonId: Number(e.target.value) })} />
      <select className="px-3 py-2 border rounded-lg" value={form.status ?? "in-service"} onChange={(e) => setForm({ ...form, status: e.target.value as any })}>
        <option value="in-service">درخدمت</option>
        <option value="repair">در تعمیر</option>
        <option value="out-service">خارج از خدمت</option>
      </select>
      <input className="px-3 py-2 border rounded-lg" placeholder="موقعیت" value={form.location ?? ""} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <input className="px-3 py-2 border rounded-lg" placeholder="خط" type="number" value={form.line ?? 0} onChange={(e) => setForm({ ...form, line: Number(e.target.value) })} />
      <input className="px-3 py-2 border rounded-lg" placeholder="ظرفیت (تن)" type="number" value={form.capacity ?? 0} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} />
      <button type="submit" disabled={submitting} className="btn-primary">{submitting ? "در حال ذخیره..." : "ذخیره"}</button>
    </form>
  );
}

