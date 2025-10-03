"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = theme === "dark";
  return (
    <button
      aria-label="toggle theme"
      className="btn-ghost"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? "حالت روشن" : "حالت تیره"}
    </button>
  );
}


