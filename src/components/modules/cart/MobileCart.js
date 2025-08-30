'use client';

import React from 'react';
import { useUI } from '@/hooks/useUi';
import CartSummary from './CartSummary';
import Icon from '@/components/common/Icon';
import CartBody from './CartBody';
import { useShoppingCart } from '@/hooks/useShoppingCart';

export default function MobileCart() {
  const { isCartOpen, openCart, closeAll } = useUI();
  const { cart, isLoading } = useShoppingCart();

  return (
    <>
      <Icon name="cart" className="size-6 md:hidden" onClick={openCart} />

      <div
        className={`fixed md:hidden inset-y-0 ${
          isCartOpen ? 'left-0' : '-left-64'
        } w-64 px-4 flex flex-col bg-stone-50 dark:bg-stone-800 text-xs text-start z-50 transition-all duration-300`}>
        <div className="flex items-center justify-between py-5 border-b">
          <Icon
            name="closeBtn"
            className="size-5 text-stone-800 dark:text-stone-200"
            onClick={closeAll}
          />
          <span className="font-vazir-md text-sm">سبد خرید</span>
        </div>

        {isLoading ? (
          <div className="p-4 text-center text-stone-500">
            در حال بارگذاری سبد خرید...
          </div>
        ) : cart && cart.items && cart.items.length > 0 ? (
          <>
            <CartBody />
            <CartSummary />
          </>
        ) : (
          <div className="p-4 text-center text-stone-500">سبد شما خالی است</div>
        )}
      </div>
    </>
  );
}
