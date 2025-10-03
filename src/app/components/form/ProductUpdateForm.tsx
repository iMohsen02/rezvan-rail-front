"use client";

import { useState, useEffect } from "react";
import { productService, CreateProductData } from "../../../lib/services/productService";

type ProductUpdateFormProps = {
  item: { _id: string; title: string; weight: number; status: string; description?: string };
  onSuccess?: () => void;
};

export default function ProductUpdateForm({ item, onSuccess }: ProductUpdateFormProps) {
  const [form, setForm] = useState<Partial<CreateProductData>>({ title: item.title, weight: item.weight, status: item.status, description: item.description });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm({ title: item.title, weight: item.weight, status: item.status, description: item.description });
  }, [item]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubmitting(true);
      await productService.updateOne(item._id, form);
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
      <input className="px-3 py-2 border rounded-lg" placeholder="عنوان" value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input className="px-3 py-2 border rounded-lg" placeholder="وزن (تن)" type="number" value={form.weight ?? 0} onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })} />
      <select className="px-3 py-2 border rounded-lg" value={form.status ?? "انبار"} onChange={(e) => setForm({ ...form, status: e.target.value })}>
        <option value="انبار">انبار</option>
        <option value="بارگیری">بارگیری</option>
        <option value="ارسال">ارسال</option>
      </select>
      <textarea className="px-3 py-2 border rounded-lg" placeholder="توضیحات" value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <button type="submit" disabled={submitting} className="btn-primary">{submitting ? "در حال ذخیره..." : "ذخیره"}</button>
    </form>
  );
}

