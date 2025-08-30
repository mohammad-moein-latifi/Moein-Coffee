'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center justify-center text-center gap-4 px-4">
        <Image
          src="/img/404.png"
          alt="خطای 404"
          width={360}
          height={360}
          className="object-contain select-none"
        />
        <h1 className="text-amber-400 dark:text-amber-300 text-2xl sm:text-3xl font-estedad-b">
          وای نه — خطای ۴۰۴
        </h1>
        <p className="text-stone-400 text-sm sm:text-base">
          مثل اینکه قهوه‌ساز هنگ کرده — صفحه‌ای که دنبالش بودید وجود نداره.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-vazir-b bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </main>
  );
}
