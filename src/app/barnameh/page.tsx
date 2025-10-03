export default function BarnamehPage() {
  return (
    <section className="container py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">بارنامه‌ها</h1>
        <button className="btn-primary">افزودن بارنامه</button>
      </div>
      <div className="card p-6">
        <p className="text-sm text-[var(--neutral-700)]">لیست بارنامه‌ها با فیلتر و جزئیات.</p>
      </div>
    </section>
  );
}

