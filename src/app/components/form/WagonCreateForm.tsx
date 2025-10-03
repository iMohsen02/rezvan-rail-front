"use client";

import { useState } from "react";
import { wagonService, CreateWagonData } from "../../../lib/services/wagonService";

type WagonCreateFormProps = {
  onSuccess?: () => void;
};

export default function WagonCreateForm({ onSuccess }: WagonCreateFormProps) {
  const [form, setForm] = useState<CreateWagonData>({ wagonId: 0, status: "in-service", location: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubmitting(true);
      await wagonService.createOne(form);
      setForm({ wagonId: 0, status: "in-service", location: "" });
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
      <input className="px-3 py-2 border rounded-lg" placeholder="شماره واگن" type="number" value={form.wagonId} onChange={(e) => setForm({ ...form, wagonId: Number(e.target.value) })} required />
      <select className="px-3 py-2 border rounded-lg" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })}>
        <option value="in-service">درخدمت</option>
        <option value="repair">در تعمیر</option>
        <option value="out-service">خارج از خدمت</option>
      </select>
      <input className="px-3 py-2 border rounded-lg" placeholder="موقعیت" value={form.location ?? ""} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <input className="px-3 py-2 border rounded-lg" placeholder="خط" type="number" value={form.line ?? 0} onChange={(e) => setForm({ ...form, line: Number(e.target.value) })} />
      <input className="px-3 py-2 border rounded-lg" placeholder="ظرفیت (تن)" type="number" value={form.capacity ?? 0} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} />
      <button type="submit" disabled={submitting} className="btn-primary">{submitting ? "در حال ایجاد..." : "ایجاد واگن"}</button>
    </form>
  );
}

