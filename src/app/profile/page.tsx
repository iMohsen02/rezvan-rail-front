"use client";

import { useAuth } from "../auth-context";

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return <section className="container py-8">ابتدا وارد شوید.</section>;
  return (
    <section className="container py-8">
      <h1 className="text-xl font-bold mb-4">پروفایل من</h1>
      <div className="card p-6 space-y-3">
        <div><span className="text-[var(--neutral-600)]">نام:</span> {user.name}</div>
        <div><span className="text-[var(--neutral-600)]">نقش:</span> {user.role}</div>
        <button className="btn-primary">ویرایش اطلاعات</button>
      </div>
    </section>
  );
}

