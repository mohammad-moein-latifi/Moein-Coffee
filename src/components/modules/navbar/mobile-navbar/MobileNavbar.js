import React from 'react';
import Menu from './menu/Menu';
import Icon from '@/components/common/Icon';
import Cart from '@/components/modules/cart/Cart';
import MobileBottomNavbar from './MobileBottomNavbar';

export default function MobileNavbar() {
  return (
    <>
      <div className="w-full h-16 px-4 flex md:hidden items-center justify-between bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-100">
        <Menu />
        <Icon name="logoType" className="h-10 text-amber-700" />
        <Cart />
      </div>

      <MobileBottomNavbar />
    </>
  );
}
