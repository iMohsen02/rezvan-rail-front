import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./auth-context";
import RouteGuard from "./route-guard";
import HeaderNav from "./header-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "پروژه ریلی رضوان",
  description: "سامانه مدیریت باربری ریلی خواف - روزنک",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <RouteGuard>
              <HeaderNav />
              <main>{children}</main>
              <footer className="mt-16 border-t border-[var(--neutral-300)]/70">
                <div className="container py-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p>© {new Date().getFullYear()} ریزان ریل. همه حقوق محفوظ است.</p>
                  <div className="flex items-center gap-4 text-[var(--neutral-700)]">
                    <Link href="/about">درباره</Link>
                    <Link href="/contact">تماس</Link>
                  </div>
                </div>
              </footer>
            </RouteGuard>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
