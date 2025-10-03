"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth-context";
import { userService } from "../../lib/services";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await userService.login({
        phone: username,
        password: password,
      });
      
      const user = response.data;
      login({ 
        user: { 
          _id: user._id, 
          name: user.name, 
          role: user.role as any, 
          phone: user.phone 
        }, 
        token: response.token 
      });
      router.replace("/wagons");
    } catch (error: any) {
      // Error handling is done automatically by the service layer
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="container py-16">
      <div className="max-w-md mx-auto card p-8">
        <h1 className="text-xl font-bold text-center" style={{ color: "var(--brand-primary-strong)" }}>ورود به سامانه</h1>
        <p className="mt-2 text-center text-[var(--neutral-700)] text-sm">برای دسترسی به پنل، اطلاعات خود را وارد کنید.</p>
        <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div>
            <label className="block text-sm mb-1">نام کاربری</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-lg border px-3 py-2 bg-transparent" style={{ borderColor: "var(--neutral-300)" }} placeholder="username" />
          </div>
          <div>
            <label className="block text-sm mb-1">رمز عبور</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border px-3 py-2 bg-transparent" style={{ borderColor: "var(--neutral-300)" }} placeholder="********" />
          </div>
          <button type="submit" className="btn-primary w-full">
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>
        <p className="mt-3 text-xs text-center text-[var(--neutral-600)]">دسترسی تاجر فقط خواندنی است. برای دسترسی مدیر با ادمین هماهنگ کنید.</p>
      </div>
    </section>
  );
}


