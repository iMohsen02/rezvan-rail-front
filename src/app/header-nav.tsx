"use client";

import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { useAuth } from "./auth-context";

export default function HeaderNav() {
  const { user, logout } = useAuth();
  return (
    <header className="border-b border-[var(--neutral-300)]/70 sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--background)_85%,transparent)]">
      <nav className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full" style={{ background: "var(--brand-primary)" }} />
          <Link href="/" className="font-semibold text-lg">ریزان ریل</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/wagons" className="hover:opacity-80">واگن‌ها</Link>
          <Link href="/products" className="hover:opacity-80">محصولات</Link>
          <Link href="/barnameh" className="hover:opacity-80">بارنامه</Link>
          <Link href="/companies" className="hover:opacity-80">شرکت‌ها</Link>
          <Link href="/users" className="hover:opacity-80">کاربران</Link>
          <Link href="/accounting" className="hover:opacity-80">حسابداری</Link>
          <Link href="/analysis" className="hover:opacity-80">آنالیز</Link>
          {!user ? (
            <Link href="/login" className="btn-ghost">ورود</Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/profile" className="hover:opacity-80 text-sm">{user.name} ({user.role})</Link>
              <button className="btn-ghost" onClick={logout}>خروج</button>
            </div>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}


