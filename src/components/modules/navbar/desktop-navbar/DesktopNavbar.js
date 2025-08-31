import React from 'react';
import AuthButton from '../AuthButton';
import NavLinks from '../navLinks/NavLinks';
import Icon from '@/components/common/Icon';
import Cart from '@/components/modules/cart/Cart';
import SwitchThemeButton from '../SwitchThemeButton';


export default function DesktopNavbar() {
  return (
    <div className="fixed inset-x-0 top-4 hidden md:flex items-center w-[98%] max-w-screen-2xl h-20 mx-auto px-6 py-4 rounded-3xl bg-stone-900/80 backdrop-blur-md z-50">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-x-4 lg:gap-x-6 xl:gap-x-8 h-14">
          <Icon name="appLogo" className="size-16 shrink-0 text-amber-700" />
          <NavLinks />
        </div>
        <div className="flex items-center text-lg lg:text-xl text-amber-400 gap-x-4 lg:gap-x-6 xl:gap-x-8">
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <Cart />
            <SwitchThemeButton />
          </div>
          {/* Divide Border */}
          <span className="block w-px h-14 bg-stone-100/20 dark:bg-stone-900" />
          <AuthButton />
        </div>
      </div>
    </div>
  );
}
