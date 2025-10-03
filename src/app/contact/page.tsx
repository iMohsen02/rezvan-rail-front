export default function ContactPage() {
  return (
    <section className="container py-12">
      <h1 className="text-2xl font-bold" style={{ color: "var(--brand-primary-strong)" }}>تماس با ما</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <form className="card p-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">نام و نام خانوادگی</label>
            <input className="w-full rounded-lg border px-3 py-2 bg-transparent" style={{ borderColor: "var(--neutral-300)" }} placeholder="مثال: علی رضایی" />
          </div>
          <div>
            <label className="block text-sm mb-1">ایمیل</label>
            <input type="email" className="w-full rounded-lg border px-3 py-2 bg-transparent" style={{ borderColor: "var(--neutral-300)" }} placeholder="example@mail.com" />
          </div>
          <div>
            <label className="block text-sm mb-1">پیام شما</label>
            <textarea rows={5} className="w-full rounded-lg border px-3 py-2 bg-transparent" style={{ borderColor: "var(--neutral-300)" }} placeholder="پیام خود را بنویسید..." />
          </div>
          <button type="button" className="btn-primary">ارسال پیام</button>
        </form>
        <div className="card p-6 space-y-3">
          <h2 className="font-semibold" style={{ color: "var(--brand-primary)" }}>اطلاعات تماس</h2>
          <p className="text-[15px] text-[var(--neutral-700)]">ایستگاه راه‌آهن خواف، خراسان رضوی</p>
          <p className="text-[15px]">تلفن: ۰۵۱-xxxxxxx</p>
          <p className="text-[15px]">ایمیل: info@example.com</p>
        </div>
      </div>
    </section>
  );
}


