"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AppRole = "admin" | "loader" | "traffic-admin" | "coverer" | "trader" | "user";

export type AppUser = {
  _id: string;
  name: string;
  role: AppRole;
  phone?: string;
};

type AuthContextType = {
  user: AppUser | null;
  token: string | null;
  login: (payload: { user: AppUser; token: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "rr_auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(() => {
    try {
      if (typeof window === "undefined") return null;
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed?.user ?? null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    try {
      if (typeof window === "undefined") return null;
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed?.token ?? null;
    } catch {
      return null;
    }
  });

  const login = (payload: { user: AppUser; token: string }) => {
    setUser(payload.user);
    setToken(payload.token);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {}
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export const roleAccessMap: Record<AppRole, string[]> = {
  admin: [
    "/wagons",
    "/products",
    "/users",
    "/barnameh",
    "/companies",
    "/accounting",
    "/analysis",
  ],
  "traffic-admin": ["/wagons", "/products", "/barnameh", "/companies"],
  loader: ["/wagons", "/products"],
  coverer: ["/wagons", "/products"],
  trader: ["/products"],
  user: [],
};

export function canAccess(pathname: string, role: AppRole | undefined) {
  if (!role) return false;
  if (role === "admin") return true;
  const allowed = roleAccessMap[role] || [];
  return allowed.some((p) => pathname.startsWith(p));
}


