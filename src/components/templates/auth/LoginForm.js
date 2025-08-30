'use client';
import React, { useMemo } from 'react';
import validateField from '@/utils/fieldValidator';
import InputField from '@/components/modules/auth/InputField';

export default function LoginForm({ form, onSubmit, signin }) {
  const { fields, setField, handleBlur, touched, errors } = form;

  const isValid = useMemo(() => {
    return (
      validateField('loginEmail', fields.email) === '' &&
      validateField('loginPassword', fields.password) === ''
    );
  }, [fields]);

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <InputField
        id="loginEmail"
        label="ایمیل"
        type="email"
        value={fields.email}
        onChange={(v) => setField('email', v)}
        onBlur={() => handleBlur('email', true)}
        placeholder="you@example.com"
        error={errors.email}
        touched={!!touched.email}
      />

      <InputField
        id="loginPassword"
        label="رمز عبور"
        type="password"
        value={fields.password}
        onChange={(v) => setField('password', v)}
        onBlur={() => handleBlur('password', true)}
        placeholder="********"
        error={errors.password}
        touched={!!touched.password}
        showToggle
      />

      <button
        type="submit"
        disabled={!isValid || signin.isLoading}
        className={`w-full py-3 rounded-2xl font-vazir-b text-white transition-all duration-150 flex items-center justify-center gap-2
          ${
            signin.isLoading
              ? 'bg-emerald-300 cursor-wait'
              : isValid
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-stone-300 text-stone-600 cursor-not-allowed'
          }`}>
        {signin.isLoading && (
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
        {signin.isLoading ? 'در حال ورود...' : 'ورود به حساب'}
      </button>
    </form>
  );
}
