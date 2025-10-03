function Section({ label, value }: { label: string; value: any }) {
  return (
    <div className="grid items-center gap-3 rounded-lg border p-3" style={{ gridTemplateColumns: "200px 1fr", borderColor: "var(--neutral-200)" }}>
      <div className="text-sm text-[var(--neutral-700)]">{label}</div>
      <div className="text-sm break-words">{value ?? "-"}</div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border" style={{ borderColor: "var(--neutral-200)" }}>
      <div className="px-3 py-2 text-sm font-semibold">{title}</div>
      <div className="p-2 space-y-2">{children}</div>
    </div>
  );
}

function faDate(v?: string) {
  if (!v) return "-";
  try { return new Date(v).toLocaleString("fa-IR"); } catch { return v; }
}

export default function UserDetailView({ data }: { data: any }) {
  return (
    <div className="space-y-3">
      <Section label="نام" value={data?.name} />
      <Section label="تلفن" value={data?.phone} />
      <Section label="ایمیل" value={data?.mail} />
      <Section label="نقش" value={data?.role} />
      <Section label="وضعیت" value={data?.activate ? "فعال" : "غیرفعال"} />
      <Section label="تاریخ ساخت" value={faDate(data?.createdAt)} />
      <Section label="تاریخ ایجاد رمز" value={faDate(data?.passwordCreatedAt)} />
    </div>
  );
}


