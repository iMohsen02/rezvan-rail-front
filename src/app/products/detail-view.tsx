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

export default function ProductDetailView({ data }: { data: any }) {
  const wagon = (data?.wagons && data.wagons[0]) || undefined;
  return (
    <div className="space-y-3">
      <Section label="عنوان" value={data?.title} />
      <Section label="وضعیت" value={data?.status} />
      <Section label="تناژ" value={data?.weight} />
      <Section label="تناژ بارگیری شده" value={data?.loadedWeight} />
      <Section label="زمان ایجاد" value={faDate(data?.createdAt)} />

      <Group title="تاجر">
        <Section label="نام" value={data?.trader?.name} />
      </Group>

      {wagon && (
        <Group title="واگن (آخرین)">
          <Section label="شناسه" value={wagon._id} />
          <Section label="وزن بارگیری" value={wagon.loadWeight} />
        </Group>
      )}
    </div>
  );
}


