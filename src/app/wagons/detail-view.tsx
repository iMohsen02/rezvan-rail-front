function faDate(v?: string) {
  if (!v) return "-";
  try { return new Date(v).toLocaleString("fa-IR"); } catch { return v; }
}

function faBool(v?: boolean) { return v ? "بله" : "خیر"; }

export default function WagonDetailView({ data }: { data: any }) {
  const cover = data?.cover?.value as boolean | undefined;
  const validation = data?.validation?.value as boolean | undefined;
  const cargo = (data?.cargos && data.cargos[0]) || undefined;
  return (
    <div className="space-y-3">
      <Section label="شماره واگن" value={data?.wagonId} />
      <Section label="وضعیت" value={data?.status} />
      <Section label="ایستگاه" value={data?.location} />
      <Section label="خط" value={data?.line} />
      <Section label="ظرفیت (تن)" value={data?.capacity} />
      <Section label="بار فعلی (تن)" value={data?.size} />
      <Section label="ورود اولیه" value={faDate(data?.firstEntryAt)} />
      <Section label="تعداد رام" value={data?.totalRams} />

      <Group title="مالک">
        <Section label="نام" value={data?.owner?.name} compact />
        <Section label="لوگو" value={data?.owner?.logo} compact />
      </Group>

      <Group title="پیمانکار">
        <Section label="نام" value={data?.forwarder?.name} compact />
        <Section label="لوگو" value={data?.forwarder?.logo} compact />
      </Group>

      <Group title="چادرکشی/تایید">
        <Section label="چادرکشی" value={faBool(cover)} compact />
        <Section label="تایید" value={faBool(validation)} compact />
      </Group>

      {cargo && (
        <Group title="کالا (آخرین)">
          <Section label="عنوان" value={cargo.title} compact />
          <Section label="تاجر" value={cargo.trader?.name} compact />
          <Section label="وزن بارگیری (تن)" value={cargo.loadWeight} compact />
        </Group>
      )}

      <Group title="ایجاد">
        <Section label="توسط" value={data?.create?.createBy?.name} compact />
        <Section label="زمان" value={faDate(data?.create?.createAt)} compact />
      </Group>
    </div>
  );
}

function Section({ label, value, compact = false }: { label: string; value: any; compact?: boolean }) {
  return (
    <div className={`grid items-center gap-3 rounded-lg border ${compact ? "p-2" : "p-3"}`} style={{ gridTemplateColumns: "200px 1fr", borderColor: "var(--neutral-200)" }}>
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


