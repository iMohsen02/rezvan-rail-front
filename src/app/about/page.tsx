export default function AboutPage() {
  return (
    <section className="container py-12">
      <h1 className="text-2xl font-bold" style={{ color: "var(--brand-primary-strong)" }}>درباره ما</h1>
      <p className="mt-4 text-[15px] text-[var(--neutral-700)] max-w-prose">
        سامانه «پروژه ریلی رضوان» برای مدیریت یکپارچه‌ی فرآیند باربری ریلی بین ایستگاه‌های خواف و روزنک طراحی شده است. هدف ما فراهم کردن شفافیت و سرعت در عملیات بارگیری، چادرکشی، ثبت کتاژ، تخصیص بارنامه، و رهگیری وضعیت برای تجار و ذی‌نفعان است.
      </p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5">
          <h3 className="font-semibold" style={{ color: "var(--brand-primary)" }}>دقت عملیاتی</h3>
          <p className="mt-2 text-sm text-[var(--neutral-700)]">ثبت جزئیات واگن، بار و زمان‌بندی‌ها برای جلوگیری از خطای انسانی.</p>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold" style={{ color: "var(--brand-primary)" }}>شفافیت برای تاجر</h3>
          <p className="mt-2 text-sm text-[var(--neutral-700)]">مشاهده لحظه‌ای وضعیت کالا: روی زمین، داخل واگن، دارای کتاژ یا تحویل شده.</p>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold" style={{ color: "var(--brand-primary)" }}>گزارش‌گیری هوشمند</h3>
          <p className="mt-2 text-sm text-[var(--neutral-700)]">آنالیز رام‌ها، مالکان واگن، و عملکرد پیمانکاران به صورت قابل فیلتر.</p>
        </div>
      </div>
    </section>
  );
}


