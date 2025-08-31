'use client';
import Icon from '@/components/common/Icon';
import React, { useState } from 'react';

export default function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  showToggle = false,
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (show ? 'text' : 'password') : type;

  const showError = touched && !!error;
  const showValid = touched && !error;

  return (
    <div className="flex flex-col relative">
      <div className="block md:flex items-center justify-between mb-2">
        <label htmlFor={id} className="text-sm font-vazir-md text-stone-200">
          {label} :
        </label>
        {showError ? (
          <div className="text-xs text-rose-500">{error}</div>
        ) : null}
      </div>

      <div className="relative">
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => onBlur && onBlur()}
          className={`w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl text-sm md:text-base font-vazir-md transition-all duration-300 outline-none placeholder:text-stone-400
            text-stone-100 bg-transparent
            ${
              showError
                ? 'border-2 border-rose-500 ring-1 ring-rose-100/40'
                : ''
            }
            ${
              showValid
                ? 'border-2 border-emerald-500 ring-1 ring-emerald-100/30'
                : ''
            }
            ${
              !touched && !showError && !showValid
                ? 'border border-stone-200'
                : ''
            }
            hover:shadow-sm hover:scale-[1.01]
            focus:scale-100 focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400`}
          aria-invalid={!!error}
          autoComplete={isPassword ? 'current-password' : undefined}
        />

        {isPassword && showToggle && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-pressed={show}
            aria-label={show ? 'مخفی کردن رمز' : 'نمایش رمز'}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
            {show ? (
              <Icon name="eye" className="w-5 h-5" />
            ) : (
              <Icon name="eyeOff" className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
