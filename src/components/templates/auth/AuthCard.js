'use client';
import React from 'react';

export default function AuthCard({ children, title, mode, setMode }) {
  return (
    <div className="w-full  mx-auto rounded-3xl p-1">
      <div
        className="
          rounded-3xl p-6 shadow-2xl border border-stone-100/20 dark:border-stone-800
          bg-white/5 dark:bg-stone-900/50
          overflow-hidden
        ">
        <h2 className="text-center text-2xl font-estedad-b text-amber-500 mb-4">
          {title}
        </h2>

        <div
          className="
            w-full overflow-x-hidden overflow-y-auto
            px-3
          ">
          {children}
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between gap-3 z-20">
            <div className="text-sm text-stone-400">
              {mode === 'login' ? 'حساب کاربری ندارید؟' : 'حساب دارید؟'}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('login')}
                className={`px-4 py-2 rounded-lg font-vazir-md transition z-30 ${
                  mode === 'login'
                    ? 'bg-amber-400 text-stone-900'
                    : 'bg-white/5 text-stone-200 hover:bg-white/10'
                }`}>
                ورود
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`px-4 py-2 rounded-lg font-vazir-md transition z-30 ${
                  mode === 'signup'
                    ? 'bg-amber-400 text-stone-900'
                    : 'bg-white/5 text-stone-200 hover:bg-white/10'
                }`}>
                ثبت‌نام
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
