"use client";

import { useState, useEffect } from "react";
import { userService, CreateUserData } from "../../../lib/services/userService";

type UserUpdateFormProps = {
  item: { _id: string; name: string; phone: string; role: string; mail?: string };
  onSuccess?: () => void;
};

export default function UserUpdateForm({ item, onSuccess }: UserUpdateFormProps) {
  const [form, setForm] = useState<Partial<CreateUserData>>({ name: item.name, phone: item.phone, role: item.role, mail: item.mail });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm({ name: item.name, phone: item.phone, role: item.role, mail: item.mail });
  }, [item]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubmitting(true);
      await userService.updateOne(item._id, form);
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
      <input className="px-3 py-2 border rounded-lg" placeholder="نام" value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="px-3 py-2 border rounded-lg" placeholder="تلفن" value={form.phone ?? ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <input className="px-3 py-2 border rounded-lg" placeholder="ایمیل" value={form.mail ?? ""} onChange={(e) => setForm({ ...form, mail: e.target.value })} />
      <select className="px-3 py-2 border rounded-lg" value={form.role ?? "user"} onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="user">کاربر</option>
        <option value="admin">مدیر</option>
        <option value="trader">تاجر</option>
      </select>
      <button type="submit" disabled={submitting} className="btn-primary">{submitting ? "در حال ذخیره..." : "ذخیره"}</button>
    </form>
  );
}

