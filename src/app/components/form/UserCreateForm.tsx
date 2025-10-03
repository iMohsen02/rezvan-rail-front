"use client";

import { useState } from "react";
import { userService, CreateUserData } from "../../../lib/services/userService";

type UserCreateFormProps = {
  onSuccess?: () => void;
};

export default function UserCreateForm({ onSuccess }: UserCreateFormProps) {
  const [form, setForm] = useState<CreateUserData>({ name: "", phone: "", role: "user", password: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubmitting(true);
      await userService.createOne(form);
      setForm({ name: "", phone: "", role: "user", password: "" });
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
      <input className="px-3 py-2 border rounded-lg" placeholder="نام" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input className="px-3 py-2 border rounded-lg" placeholder="تلفن" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
      <select className="px-3 py-2 border rounded-lg" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="user">کاربر</option>
        <option value="admin">مدیر</option>
        <option value="trader">تاجر</option>
      </select>
      <input className="px-3 py-2 border rounded-lg" type="password" placeholder="رمز عبور" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <button type="submit" disabled={submitting} className="btn-primary">{submitting ? "در حال ایجاد..." : "ایجاد کاربر"}</button>
    </form>
  );
}

