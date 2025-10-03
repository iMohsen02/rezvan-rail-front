"use client";

import { useMemo, useState } from "react";

type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
};

export type DataListProps<T> = {
  rows: T[];
  columns: Column<T>[];
  searchKeys?: (keyof T)[];
};

export default function DataList<T extends Record<string, any>>({ rows, columns, searchKeys = [] }: DataListProps<T>) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q) return rows;
    const needle = q.toLowerCase();
    return rows.filter((r) =>
      searchKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(needle))
    );
  }, [q, rows, searchKeys]);

  return (
    <div className="card p-0 overflow-hidden">
      <div className="p-3 border-b" style={{ borderColor: "var(--neutral-200)" }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="جست‌وجو..." className="w-full rounded-lg border px-3 py-2 bg-transparent" style={{ borderColor: "var(--neutral-300)" }} />
      </div>
      <table className="w-full text-sm">
        <thead className="bg-[var(--neutral-100)]">
          <tr>
            {columns.map((c) => (
              <th key={String(c.key)} className="p-3 text-right">{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((r, idx) => (
            <tr key={idx} className="border-t" style={{ borderColor: "var(--neutral-200)" }}>
              {columns.map((c) => (
                <td key={String(c.key)} className="p-3">
                  {c.render ? c.render(r) : String(r[c.key as keyof T] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


