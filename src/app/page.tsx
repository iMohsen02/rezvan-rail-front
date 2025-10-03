export default function Home() {
  return (
    <section className="container pt-12 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <div>
          <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border" style={{ borderColor: "var(--brand-primary)", color: "var(--brand-primary)" }}>
            سامانه مدیریت باربری ریلی
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-[1.15]" style={{ color: "var(--brand-primary-strong)" }}>
            پروژه ریلی رضوان
          </h1>
          <p className="mt-4 text-[15px] sm:text-base text-[var(--neutral-700)] max-w-prose">
            مدیریت کامل چرخه بار از ورود به ایستگاه خواف تا تحویل به بازرگانی؛ شامل واگن‌ها، بارگیری، چادرکشی، کتاژ، بارنامه و رهگیری وضعیت برای تجار.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a className="btn-primary" href="/login">شروع استفاده</a>
            <a className="btn-ghost" href="/about">بیشتر بدانید</a>
          </div>
        </div>
        <div className="card p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl p-4 border" style={{ borderColor: "var(--neutral-300)" }}>
              <p className="text-sm text-[var(--neutral-700)]">خطوط ایستگاه</p>
              <p className="mt-2 text-2xl font-bold" style={{ color: "var(--brand-primary)" }}>۱۳ خط</p>
            </div>
            <div className="rounded-xl p-4 border" style={{ borderColor: "var(--neutral-300)" }}>
              <p className="text-sm text-[var(--neutral-700)]">اولویت چادرکشی</p>
              <p className="mt-2 text-2xl font-bold" style={{ color: "var(--brand-primary)" }}>واگن‌های دارای کتاژ</p>
            </div>
            <div className="rounded-xl p-4 border" style={{ borderColor: "var(--neutral-300)" }}>
              <p className="text-sm text-[var(--neutral-700)]">رهگیری تاجر</p>
              <p className="mt-2 text-2xl font-bold" style={{ color: "var(--brand-primary)" }}>وضعیت لحظه‌ای</p>
            </div>
            <div className="rounded-xl p-4 border" style={{ borderColor: "var(--neutral-300)" }}>
              <p className="text-sm text-[var(--neutral-700)]">تم روشن/تیره</p>
              <p className="mt-2 text-2xl font-bold" style={{ color: "var(--brand-primary)" }}>برند زرشکی</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
