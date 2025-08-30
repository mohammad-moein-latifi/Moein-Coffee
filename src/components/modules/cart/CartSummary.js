'use client';

import React from 'react';
import { useShoppingCart } from '@/hooks/useShoppingCart';

export default function CartSummary() {
  const { summary } = useShoppingCart();
  const deliveryCost = 30_000;
  const freeShippingMin = 1_000_000;

  return (
    <div className=" border-t-amber-400 border-t-2 mt-auto pt-4 px-4 space-y-2 text-stone-700 dark:text-stone-200 text-sm">
      <div className="flex justify-between">
        <span>جمع کل محصولات</span>
        <span>{summary.total.toLocaleString()} تومان</span>
      </div>
      {summary.discount > 0 && (
        <div className="flex justify-between items-center">
          <span>جمع کل تخفیفات</span>
          <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-semibold">
            {summary.discount.toLocaleString()} تومان
          </span>
        </div>
      )}
      <div className="flex justify-between items-center">
        <span>هزینه ارسال </span>
        {summary.final > freeShippingMin ? (
          <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">
            رایگان
          </span>
        ) : (
          <span>{deliveryCost.toLocaleString()} تومان</span>
        )}
      </div>
      <div className="flex justify-between font-bold text-base md:text-lg">
        <span>مجموع نهایی</span>
        <span className="text-emerald-600">
          {summary.final.toLocaleString()} تومان
        </span>
      </div>
      <div className="p-4 space-y-2">
        <button className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-vazir-md hover:bg-emerald-700 transition">
          ادامه و ثبت سفارش
        </button>
      </div>
    </div>
  );
}
