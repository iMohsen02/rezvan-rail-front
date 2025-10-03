"use client";

import { useState } from "react";
import { productService, CreateProductData } from "../../../lib/services/productService";

type ProductCreateFormProps = {
  onSuccess?: () => void;
};

export default function ProductCreateForm({ onSuccess }: ProductCreateFormProps) {
  const [form, setForm] = useState<CreateProductData>({ title: "", weight: 0, status: "انبار" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubmitting(true);
      await productService.createOne(form);
      setForm({ title: "", weight: 0, status: "انبار" });
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
      <input className="px-3 py-2 border rounded-lg" placeholder="عنوان" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <input className="px-3 py-2 border rounded-lg" placeholder="وزن (تن)" type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })} required />
      <select className="px-3 py-2 border rounded-lg" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
        <option value="انبار">انبار</option>
        <option value="بارگیری">بارگیری</option>
        <option value="ارسال">ارسال</option>
      </select>
      <textarea className="px-3 py-2 border rounded-lg" placeholder="توضیحات" value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <button type="submit" disabled={submitting} className="btn-primary">{submitting ? "در حال ایجاد..." : "ایجاد محصول"}</button>
    </form>
  );
}

