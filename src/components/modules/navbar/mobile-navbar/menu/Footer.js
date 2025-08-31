'use client';

import React from 'react';
import { useUI } from '@/hooks/useUi';
import Icon from '@/components/common/Icon';
import SwitchThemeButton from '../../SwitchThemeButton';
import AuthButton from '../../AuthButton';

export default function Footer() {
  const { openCart, closeAll } = useUI();
  return (
    <div className="text-amber-700 text-sm px-4 flex flex-col items-start gap-6">
      <AuthButton />
      <SwitchThemeButton />
      <div
        href="/"
        className="inline-flex items-center gap-x-2"
        onClick={() => {
          closeAll();
          openCart();
        }}>
        <Icon name="cart" className="size-5" />
        سبد خرید
      </div>
    </div>
  );
}
