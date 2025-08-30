'use client';
import React, { useMemo } from 'react';
import validateField from '@/utils/fieldValidator';
import InputField from '@/components/modules/auth/InputField';

export default function SignupForm({ form, onSubmit, signup }) {
  const { fields, setField, handleBlur, touched, errors } = form;
  const { firstName, lastName, username, email, phone, password } = fields;

  const isValid = useMemo(() => {
    const checks = { firstName, lastName, username, email, phone, password };
    for (const k of Object.keys(checks)) {
      if (validateField(k, checks[k]) !== '') return false;
    }
    return true;
  }, [firstName, lastName, username, email, phone, password]);

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <InputField
        id="firstName"
        label="نام"
        value={firstName}
        onChange={(v) => setField('firstName', v)}
        onBlur={() => handleBlur('firstName', true)}
        placeholder="مثال: معین"
        error={errors.firstName}
        touched={!!touched.firstName}
      />
      <InputField
        id="lastName"
        label="نام خانوادگی"
        value={lastName}
        onChange={(v) => setField('lastName', v)}
        onBlur={() => handleBlur('lastName', true)}
        placeholder="مثال: لطیفی"
        error={errors.lastName}
        touched={!!touched.lastName}
      />
      <InputField
        id="username"
        label="نام کاربری"
        value={username}
        onChange={(v) => setField('username', v)}
        onBlur={() => handleBlur('username', true)}
        placeholder="مثال: moein-latifi"
        error={errors.username}
        touched={!!touched.username}
      />
      <InputField
        id="email"
        label="ایمیل"
        type="email"
        value={email}
        onChange={(v) => setField('email', v)}
        onBlur={() => handleBlur('email', true)}
        placeholder="moein@gmail.com"
        error={errors.email}
        touched={!!touched.email}
      />
      <InputField
        id="phone"
        label="شماره موبایل (اختیاری)"
        value={phone}
        onChange={(v) => setField('phone', v)}
        onBlur={() => handleBlur('phone', true)}
        placeholder="09123456789 یا +989123456789"
        error={errors.phone}
        touched={!!touched.phone}
      />
      <InputField
        id="password"
        label="رمز عبور"
        type="password"
        value={password}
        onChange={(v) => setField('password', v)}
        onBlur={() => handleBlur('password', true)}
        placeholder="حداقل ۸ کاراکتر، شامل حرف بزرگ و نماد"
        error={errors.password}
        touched={!!touched.password}
        showToggle
      />

      <button
        type="submit"
        disabled={!signup.isLoading ? false : true}
        className={`w-full py-3 rounded-2xl font-vazir-b text-white transition-all duration-150 flex items-center justify-center gap-2
          ${
            signup.isLoading
              ? 'bg-emerald-300 cursor-wait'
              : isValid
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-stone-300 text-stone-600 cursor-not-allowed'
          }`}>
        {signup.isLoading && (
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              strokeWidth="3"
              stroke="currentColor"
              className="opacity-20"
            />
            <path
              d="M22 12a10 10 0 00-10-10"
              strokeWidth="3"
              stroke="currentColor"
            />
          </svg>
        )}
        {signup.isLoading ? 'در حال ثبت‌نام...' : 'ایجاد حساب'}
      </button>
    </form>
  );
}
