'use client';

import React from 'react';
import CartItem from './CartItem';
import { useShoppingCart } from '@/hooks/useShoppingCart';

export default function CartBody() {
  const { cart } = useShoppingCart();

  const items = cart?.items ?? [];

  if (!items || items.length === 0) {
    return (
      <div dir="ltr" className="custom-scroll pb-px h-auto md:max-h-60 overflow-y-auto">
        <div className="p-4 text-center text-stone-500">سبد شما خالی است</div>
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      className="custom-scroll pb-px h-auto md:max-h-60 overflow-y-auto">
      <div className="divide-y md:divide-stone-200 md:dark:divide-stone-700">
        {items.map((item, index) => {
          const key =
            item._id ?? item.product?._id ?? item.productId ?? `cart-item-${index}`;
          return <CartItem key={String(key)} item={item} />;
        })}
      </div>
    </div>
  );
}
