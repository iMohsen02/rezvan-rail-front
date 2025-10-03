"use client";

import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { canAccess, useAuth } from "./auth-context";

export default function RouteGuard({ children }: PropsWithChildren<{}>) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!user) return; // allow public pages; protected pages also validate below
    if (pathname === "/login") return;
    const ok = canAccess(pathname, user.role);
    if (!ok && pathname !== "/") {
      router.replace("/");
    }
  }, [pathname, router, user]);

  return children as JSX.Element;
}


