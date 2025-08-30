'use client';

import Icon from '@/components/common/Icon';
import Link from 'next/link';
import React from 'react';
import { useMe } from '@/hooks/useAuth';

export default function AuthButton() {
  const { data: user, isLoading } = useMe();

  const label = isLoading
    ? 'در حال بررسی...'
    : user
    ? 'ورود به پنل کاربری'
    : 'ورود | ثبت نام';
  const href = user ? '/p-user' : '/auth';
  const name = user ? 'user' : 'auth';

  return (
    <Link
      href={href}
      prefetch={false}
      className={`inline-flex md:flex items-center gap-x-2 md:gap-x-3 xl:ps-5 rounded-full tracking-tight xl:hover:bg-amber-400/10 transition-colors duration-200 `}
      aria-busy={isLoading ? 'true' : 'false'}>
      <Icon name={name} className="size-5 md:size-8" />
      <span className="max-md:inline-block md:hidden xl:inline-block md:py-5 pe-6 text-sm md:text-base">
        {label}
      </span>
    </Link>
  );
}
