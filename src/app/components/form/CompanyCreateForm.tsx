"use client";

import { useState } from "react";
import { companyService, CreateCompanyData } from "../../../lib/services/companyService";

type CompanyCreateFormProps = {
  onSuccess?: () => void;
};

export default function CompanyCreateForm({ onSuccess }: CompanyCreateFormProps) {
  const [form, setForm] = useState<CreateCompanyData>({ name: "", logo: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubmitting(true);
      await companyService.createOne(form);
      setForm({ name: "", logo: "" });
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
      <input className="px-3 py-2 border rounded-lg" placeholder="نام شرکت" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input className="px-3 py-2 border rounded-lg" placeholder="لوگو (URL)" value={form.logo ?? ""} onChange={(e) => setForm({ ...form, logo: e.target.value })} />
      <textarea className="px-3 py-2 border rounded-lg" placeholder="توضیحات" value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <button type="submit" disabled={submitting} className="btn-primary">{submitting ? "در حال ایجاد..." : "ایجاد شرکت"}</button>
    </form>
  );
}

