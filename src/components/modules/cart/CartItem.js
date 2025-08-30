'use client';

import React from 'react';
import Image from 'next/image';
import Icon from '@/components/common/Icon';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { toast } from 'react-toastify';

export default function CartItem({ item }) {
  const { addToCart, updateCart, removeFromCart, cart } = useShoppingCart();
  const { product, quantity, productId, _id } = item;
  const pid = productId || product?._id || _id;

  const displayName =
    product?.shortDescription || product?.name || item?.name || 'محصول';
  const displayImg = product?.img || item?.product?.img || '/img/app-logo.png';
  const displayFinalPrice =
    product?.finalPrice ??
    item?.finalPrice ??
    product?.price ??
    item?.price ??
    0;

  const handleIncrease = async () => {
    try {
      await addToCart(pid, 1);
    } catch (err) {
      console.error('increase failed', err);
    }
  };

  const handleDecrease = async () => {
    try {
      if (quantity <= 1) return;

      const items = cart?.items ?? [];
      const targetKey = pid != null ? String(pid) : null;
      let found = false;

      const updated = items.map((it, index) => {
        const prodId =
          it?.product?._id ?? it?.product ?? it?.productId ?? it?._id;
        const key = prodId != null ? String(prodId) : `idx-${index}`;
        const qty = typeof it?.quantity === 'number' ? it.quantity : 1;

        if (!found && key === targetKey) {
          found = true;
          return { product: prodId, quantity: Math.max(1, qty - 1) };
        }
        return { product: prodId, quantity: qty };
      });

      if (!found) return;
      await updateCart(updated);
    } catch (err) {
      console.error('decrease failed', err);
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(pid);
      toast.success('محصول با موفقیت از سبد حذف شد !');
    } catch (err) {
      console.error('remove failed', err);
      toast.error('مشکلی پیش آمد لطفا دوباره تلاش کنید!');
    }
  };

  return (
    <div
      dir="rtl"
      className="flex flex-col md:flex-row items-center gap-3 p-3 transition">
      <div className="flex items-start gap-3 w-full md:w-auto">
        <Image
          src={displayImg}
          alt={displayName}
          width={100}
          height={100}
          className="w-16 h-16 rounded-md object-cover"
        />

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-vazir-md text-stone-800 dark:text-stone-200 line-clamp-2">
            {displayName}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            وزن: {product?.weight ?? item?.weight ?? 0} گرم
          </p>
          <div className="flex flex-wrap-reverse items-center gap-2 mt-1">
            <span className="text-sm font-semibold text-emerald-600">
              {Number(displayFinalPrice).toLocaleString()} تومان
            </span>
            {((product?.discount ?? 0) > 0 || (item?.discount ?? 0) > 0) && (
              <span className="text-xs text-stone-400 line-through">
                {Number(product?.price ?? item?.price ?? 0).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center border border-amber-400 rounded-md overflow-hidden">
          <button
            onClick={handleIncrease}
            className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-emerald-600 transition">
            +
          </button>

          <input
            type="text"
            value={quantity}
            readOnly
            className="w-10 h-8 text-center text-sm outline-none text-stone-800 dark:bg-stone-700 dark:text-white"
          />

          {quantity > 1 ? (
            <button
              onClick={handleDecrease}
              className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-red-500 transition">
              -
            </button>
          ) : (
            <button
              onClick={handleRemove}
              className="w-8 h-8 flex items-center justify-center text-red-500 transition"
              aria-label="حذف محصول">
              <Icon name="trash" className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
