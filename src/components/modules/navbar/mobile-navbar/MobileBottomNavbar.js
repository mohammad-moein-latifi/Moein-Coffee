'use client';

import React from 'react';
import Link from 'next/link';
import { useUI } from '@/hooks/useUi';
import Icon from '@/components/common/Icon';
import { navLinks } from '@/constants/navLinks';

export default function MobileBottomNavbar() {
  const { openMobileMenu, openCart } = useUI();
  const order = ['nav-shop', 'nav-home', 'nav-blog'];
  const bottomNavLinks = navLinks
    .filter((link) => order.includes(link.id))
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

  return (
    <div className="fixed inset-x-0 bottom-0 z-10 w-full h-16 px-4 md:hidden bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-100 shadow-custom">
      <div className="flex items-center justify-around h-full px-2">
        <div
          className="menu-icon flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 cursor-pointer min-w-12"
          onClick={openMobileMenu}>
          <Icon name="menu" className="size-6 mb-1" />
          <span className="text-xs">منو</span>
        </div>

        {bottomNavLinks.map((link) => (
          <Link
            key={link.id}
            className="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 cursor-pointer min-w-12"
            href={link.href}>
            <Icon name={link.icon} className="size-6 mb-1" />
            <span className="text-xs">{link.label}</span>
          </Link>
        ))}

        <div
          className="cart-icon flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 cursor-pointer min-w-12"
          onClick={openCart}>
          <Icon name="cart" className="size-6 mb-1" />
          <span className="text-xs">سبد خرید</span>
        </div>
      </div>
    </div>
  );
}
