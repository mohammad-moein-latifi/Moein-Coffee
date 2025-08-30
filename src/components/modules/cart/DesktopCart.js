'use client';

import React from 'react';
import CartSummary from './CartSummary';
import Icon from '@/components/common/Icon';
import CartBody from './CartBody';
import { useShoppingCart } from '@/hooks/useShoppingCart';

export default function DesktopCart() {
  const { cart, isLoading } = useShoppingCart();

  return (
    <div className="hidden md:block relative group">
      <div className="py-3 cursor-pointer">
        <Icon name="cart" className="size-8" />
      </div>

      <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible w-96 max-w-sm p-5 bg-stone-50 dark:bg-stone-800 border-t-4 border-t-amber-600 shadow-lg rounded-2xl transition-all duration-200 delay-75">
        
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
          <div className="p-4 text-center text-stone-500">
            سبد شما خالی است
          </div>
        )}

      </div>
    </div>
  );
}
