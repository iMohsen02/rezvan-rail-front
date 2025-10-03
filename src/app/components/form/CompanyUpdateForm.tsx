"use client";

import { useState, useEffect } from "react";
import { companyService, CreateCompanyData } from "../../../lib/services/companyService";

type CompanyUpdateFormProps = {
  item: { _id: string; name: string; logo?: string; description?: string };
  onSuccess?: () => void;
};

export default function CompanyUpdateForm({ item, onSuccess }: CompanyUpdateFormProps) {
  const [form, setForm] = useState<Partial<CreateCompanyData>>({ name: item.name, logo: item.logo, description: item.description });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm({ name: item.name, logo: item.logo, description: item.description });
  }, [item]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubmitting(true);
      await companyService.updateOne(item._id, form);
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
      <input className="px-3 py-2 border rounded-lg" placeholder="نام شرکت" value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="px-3 py-2 border rounded-lg" placeholder="لوگو (URL)" value={form.logo ?? ""} onChange={(e) => setForm({ ...form, logo: e.target.value })} />
      <textarea className="px-3 py-2 border rounded-lg" placeholder="توضیحات" value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <button type="submit" disabled={submitting} className="btn-primary">{submitting ? "در حال ذخیره..." : "ذخیره"}</button>
    </form>
  );
}

