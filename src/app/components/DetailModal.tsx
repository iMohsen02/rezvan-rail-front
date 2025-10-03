"use client";

import { useEffect, useState } from "react";
import { getApiBaseUrl, authHeaders } from "../utils/config";
import { useAuth } from "../auth-context";

type DetailModalProps = {
  id: string;
  buildPath: (id: string) => string;
  onClose: () => void;
  title?: string;
  schema?: string; // for logs
  renderContent?: (data: any) => React.ReactNode;
};

export default function DetailModal({ id, buildPath, onClose, title, schema, renderContent }: DetailModalProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    let ignore = false;
    async function run() {
      setLoading(true);
      try {
        const base = getApiBaseUrl();
        if (!token) {
          await new Promise((r) => setTimeout(r, 50));
        }
        const res = await fetch(`${base}${buildPath(id)}`, { headers: { ...authHeaders(token) } });
        const json = await res.json();
        if (!ignore) {
          if (json.message && json.message !== "success") {
            setError(typeof json.message === "string" ? json.message : "خطا در دریافت اطلاعات");
            setData(null);
          } else {
            setError(null);
            setData(json.data ?? json);
          }
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => { ignore = true; };
  }, [id, buildPath]);

  useEffect(() => {
    let ignore = false;
    async function runLogs() {
      if (!schema || !data) return;
      const dataId = String(data?._id ?? id);
      try {
        const base = getApiBaseUrl();
        if (!token) {
          await new Promise((r) => setTimeout(r, 50));
        }
        const res = await fetch(`${base}/api/v1/log/?schema=${encodeURIComponent(schema)}&dataId=${encodeURIComponent(dataId)}`, { headers: { ...authHeaders(token) } });
        const json = await res.json();
        if (!ignore) {
          if (json.message && json.message !== "success") {
            // keep logs empty on error
            setLogs([]);
          } else {
            setLogs(Array.isArray(json.data) ? json.data : []);
          }
        }
      } catch {
        if (!ignore) setLogs([]);
      }
    }
    runLogs();
    return () => { ignore = true; };
  }, [schema, data, id]);

  function isPrimitive(v: any) {
    return v == null || typeof v === "string" || typeof v === "number" || typeof v === "boolean" || v instanceof Date;
  }

  function isIsoDateString(s: string) {
    return typeof s === "string" && /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s);
  }

  function formatValue(v: any) {
    if (v == null) return "-";
    if (typeof v === "boolean") return v ? "بله" : "خیر";
    if (typeof v === "number") return String(v);
    if (typeof v === "string") {
      if (isIsoDateString(v)) return new Date(v).toLocaleString("fa-IR");
      return v;
    }
    if (v instanceof Date) return v.toLocaleString("fa-IR");
    return null;
  }

  function RenderObject({ obj, level = 0 }: { obj: any; level?: number }) {
    if (!obj || typeof obj !== "object") return <div>{String(obj)}</div>;
    if (Array.isArray(obj)) {
      return (
        <div className="space-y-2">
          {obj.length === 0 && <div className="text-[var(--neutral-600)] text-sm">بدون آیتم</div>}
          {obj.map((it, idx) => (
            <div key={idx} className="rounded-lg border p-2" style={{ borderColor: "var(--neutral-200)" }}>
              {isPrimitive(it) ? (
                <div className="text-sm">{String(formatValue(it) ?? it)}</div>
              ) : (
                <RenderObject obj={it} level={level + 1} />
              )}
            </div>
          ))}
        </div>
      );
    }
    const entries = Object.entries(obj);
    return (
      <div className="space-y-2">
        {entries.map(([k, v]) => (
          <details key={k} open={level < 1} className="rounded-lg border" style={{ borderColor: "var(--neutral-200)" }}>
            <summary className="flex items-center justify-between px-3 py-2 cursor-pointer select-none">
              <span className="text-sm font-medium">{localizeKey(k)}</span>
              {!isPrimitive(v) && <span className="text-xs text-[var(--neutral-600)]">{summarizeValue(v)}</span>}
            </summary>
            <div className="px-3 pb-3">
              {isPrimitive(v) ? (
                typeof v === "boolean" ? (
                  <span className={`text-xs inline-flex items-center px-2 py-1 rounded-full ${v ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{formatValue(v)}</span>
                ) : (
                  <div className="text-sm break-words">{String(formatValue(v) ?? v)}</div>
                )
              ) : (
                <RenderObject obj={v} level={level + 1} />
              )}
            </div>
          </details>
        ))}
      </div>
    );
  }

  const persianLabelsBySchema: Record<string, Record<string, string>> = {
    wagon: {
      _id: "شناسه",
      wagonId: "شماره واگن",
      status: "وضعیت",
      owner: "مالک",
      forwarder: "پیمانکار",
      firstEntryAt: "زمان ورود",
      sendAt: "ارسال",
      returnAt: "بازگشت",
      totalRams: "تعداد رام",
      line: "خط",
      capacity: "ظرفیت",
      size: "بارگیری",
      location: "ایستگاه",
      cargos: "کالاها",
      barnameh: "بارنامه",
      cover: "چادرکشی",
      validation: "تایید",
      update: "آخرین به‌روزرسانی",
      create: "ایجاد",
    },
    cargo: {
      _id: "شناسه",
      title: "عنوان",
      weight: "تناژ",
      status: "وضعیت",
      createdAt: "ایجاد",
      loadedWeight: "بارگیری شده",
      trader: "تاجر",
      wagons: "واگن‌ها",
      update: "به‌روزرسانی",
      description: "توضیحات",
      katageNumber: "شماره کتاژ",
    },
    user: {
      _id: "شناسه",
      name: "نام",
      phone: "تلفن",
      mail: "ایمیل",
      role: "نقش",
      activate: "فعال",
      photo: "عکس",
      nationalCode: "کدملی",
      createdAt: "ایجاد",
      address: "آدرس",
      passwordCreatedAt: "ایجاد رمز",
    },
    company: {
      _id: "شناسه",
      name: "نام شرکت",
      logo: "لوگو",
      create: "ایجاد",
      update: "به‌روزرسانی",
    },
  };

  function localizeKey(k: string) {
    if (schema && persianLabelsBySchema[schema] && persianLabelsBySchema[schema][k]) return persianLabelsBySchema[schema][k];
    const generic: Record<string, string> = {
      _id: "شناسه",
      name: "نام",
      title: "عنوان",
      status: "وضعیت",
      createdAt: "ایجاد",
      updateAt: "به‌روزرسانی",
    };
    return generic[k] || k;
  }

  function summarizeValue(v: any): string {
    if (v == null) return "-";
    if (typeof v === "boolean") return v ? "بله" : "خیر";
    if (typeof v === "number") return String(v);
    if (typeof v === "string") return v;
    if (Array.isArray(v)) return `${v.length} مورد`;
    if (typeof v === "object") {
      const keys = Object.keys(v);
      const pick = ["name", "title", "value", "status", "line", "wagonId", "_id"].find((k) => k in v);
      if (pick) return String((v as any)[pick]);
      return `${keys.length} فیلد`;
    }
    return String(v);
  }

  return (
    <div className="fixed inset-0 z-50" aria-modal role="dialog" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm grayscale" />
      <div className="absolute inset-0 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
        <div className="card w-full max-w-3xl max-h-[80vh] overflow-auto">
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--neutral-200)" }}>
            <h3 className="font-bold text-lg">{title || "جزئیات"}</h3>
            <button className="btn-ghost" onClick={onClose}>بستن</button>
          </div>
          <div className="p-4 text-sm space-y-4">
            {loading && <div>در حال بارگذاری...</div>}
            {error && <div className="text-red-600">{error}</div>}
            {!loading && !error && (
              <>
                <div>
                  <h4 className="font-semibold mb-2">نمای گرافیکی</h4>
                  {renderContent ? (
                    <div>
                      {renderContent(data)}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {Object.entries(data || {}).map(([k, v]) => (
                        <div key={k} className="grid items-start gap-3 p-3 rounded-lg border" style={{ gridTemplateColumns: "200px 1fr", borderColor: "var(--neutral-200)" }}>
                          <div className="text-sm text-[var(--neutral-700)]">{localizeKey(k)}</div>
                          <div className="text-sm">
                            {isPrimitive(v) ? (
                              <span>{String(formatValue(v) ?? v)}</span>
                            ) : (
                              <>
                                <div className="text-[var(--neutral-600)] mb-1">{summarizeValue(v)}</div>
                                <div className="rounded-md bg-[var(--neutral-50)] p-2">
                                  <RenderObject obj={v} />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <details>
                  <summary className="cursor-pointer select-none font-semibold">نمایش JSON</summary>
                  <pre className="mt-2 whitespace-pre-wrap break-words text-left ltr" dir="ltr">{JSON.stringify(data, null, 2)}</pre>
                </details>
                {schema && (
                  <div>
                    <h4 className="font-semibold mt-4 mb-2">لاگ</h4>
                    {logs.length === 0 && <div className="text-[var(--neutral-600)]">لاگی موجود نیست</div>}
                    <div className="space-y-2">
                      {logs.map((lg, i) => {
                        const actor = lg?.updateBy?.name || lg?.createBy?.name || lg?.user?.name || lg?.userName || "-";
                        const notes = lg?.notes || lg?.note || lg?.message || "-";
                        const when = lg?.updateAt || lg?.createAt || lg?.createdAt;
                        const whenFa = typeof when === "string" ? new Date(when).toLocaleString("fa-IR") : "";
                        return (
                          <details key={i} className="rounded-lg border" style={{ borderColor: "var(--neutral-200)" }}>
                            <summary className="flex items-center justify-between gap-3 px-3 py-2 cursor-pointer select-none">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-sm"><span className="text-[var(--neutral-600)]">کاربر:</span> {actor}</span>
                                <span className="text-xs text-[var(--neutral-700)]">{notes}</span>
                              </div>
                              <span className="text-xs text-[var(--neutral-600)]">{whenFa}</span>
                            </summary>
                            <div className="px-3 pb-3">
                              <pre className="whitespace-pre-wrap break-words text-left ltr" dir="ltr">{JSON.stringify(lg, null, 2)}</pre>
                            </div>
                          </details>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


