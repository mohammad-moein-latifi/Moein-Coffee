import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { slugify } from "@/utils/slugify";
import Icon from '@/components/common/Icon';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { toast } from 'react-toastify';

export default function Product({
  id,
  img,
  name,
  shortDescription,
  isSpecial,
  isNew,
  discount,
  score,
  weight,
  price,
  finalPrice,
  stock,
}) {
  const { addToCart } = useShoppingCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    try {
      setIsAdding(true);
      await addToCart(id, 1);
      toast.success("محصول با موفقیت به سبد اضافه شد !")
    } catch (err) {
      toast.error("مشکلی پیش آمد لطفا دوباره تلاش کنید!")
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <div className="bg-stone-50 dark:bg-stone-800 rounded-xl shadow-md overflow-hidden flex flex-col transform transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Product Image */}
      <div className="relative p-3 sm:p-4 md:p-5">
        <div className="size-32 h-22 md:size-auto lg:h-44 mx-auto overflow-hidden rounded-lg group relative">
          <Image
            src={img}
            alt={name}
            className=" mx-auto transform transition-transform duration-300 group-hover:scale-105"
            width={500}
            height={500}
          />
          {/* Hover Overlay with Actions */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
            <button className="p-2 sm:p-3 md:p-3 bg-white rounded-full hover:bg-rose-500 hover:text-white transition">
              <Icon
                name="heart"
                className="w-4 sm:w-5 md:w-5 h-4 sm:h-5 md:h-5"
              />
            </button>
          </div>
        </div>
        {discount > 0 && (
          <span className="absolute top-3 sm:top-4 md:top-4 right-3 sm:right-4 md:right-5 bg-amber-600 text-white text-xs/6 md:text-sm/[34px] font-vazir-md px-2 sm:px-3 rounded-lg shadow">
            %{discount} تخفیف
          </span>
        )}

        {isSpecial && (
          <span className="absolute top-3 sm:top-4 md:top-4 left-3 sm:left-4 md:left-5 bg-amber-400 text-white text-xs/6 md:text-sm/[34px] font-vazir-md px-2 rounded-lg shadow">
            ویژه
          </span>
        )}

        {isNew && (
          <span className="absolute top-3 sm:top-4 md:top-4 left-3 sm:left-4 md:left-5 bg-emerald-600 text-white text-xs/6 md:text-sm/[34px] font-vazir-md px-2 rounded-lg shadow">
            جدید
          </span>
        )}
      </div>
      {/* Product Info */}
      <div className="flex flex-col flex-1 px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5">
        <div className="h-8 sm:h-10 md:h-12 text-stone-800 dark:text-white font-vazir-md line-clamp-2 hover:text-emerald-600 transition-colors">
          <Link
            href={`/shop/${slugify(name)}-${id}`}
            className="text-xs sm:text-sm md:text-base line-clamp-2">
            {shortDescription}
          </Link>
        </div>
        {/* score + weight */}
        <div className=" flex flex-wrap items-center justify-between mt-2 gap-2 sm:gap-3 md:gap-4">
          <span className="max-md:block md:inline-block text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
            وزن: {weight} گرم
          </span>
          <div className="max-md:block md:inline-block flex items-center gap-0.5 sm:gap-1">
            {new Array(5 - Math.trunc(score)).fill().map((_, id) => (
              <Icon
                key={`empty-${id}`}
                name="star"
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 fill-current"
              />
            ))}
            {new Array(Math.trunc(score)).fill().map((_, id) => (
              <Icon
                key={`filled-${id}`}
                name="star"
                className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-current"
              />
            ))}
          </div>
        </div>

        {stock !== 0 && (
          <div className="flex items-center gap-x-2 md:gap-x-2.5 mt-1.5 md:mt-2.5 mb-2.5 text-stone-500 text-sm sm:text-base md:text-lg">
            <div className="font-vazir-b text-emerald-700 dark:text-emerald-400">
              {finalPrice?.toLocaleString?.() ?? finalPrice}
              <span className="text-xs sm:text-sm tracking-tighter text-stone-500 mr-0.5">
                تومان
              </span>
            </div>
            {discount > 0 && (
              <div className="offer">
                {price?.toLocaleString?.() ?? price}
                <span className="hidden xl:inline text-sm tracking-tighter mr-0.5">
                  تومان
                </span>
              </div>
            )}
          </div>
        )}

        {stock === 0 && (
          <div className="mt-1.5 md:mt-2.5 mb-2.5 text-sm sm:text-base md:text-lg font-vazir-b text-red-500">
            فعلا موجود نیست
          </div>
        )}
        {stock !== 0 ? (
          <button
            className={`mt-4 w-full text-sm sm:text-base md:text-base font-semibold py-2 sm:py-2.5 md:py-3 rounded-lg shadow transition-colors cursor-pointer ${
              isAdding
                ? 'bg-stone-200 dark:bg-stone-700 text-stone-500 cursor-wait'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
            onClick={handleAdd}
            disabled={isAdding}>
            {isAdding ? 'در حال افزودن...' : 'افزودن به سبد خرید'}
          </button>
        ) : (
          <button
            disabled
            className="mt-4 w-full bg-stone-200 dark:bg-stone-700 text-stone-500 text-sm sm:text-base md:text-base font-semibold py-2 sm:py-2.5 md:py-3 rounded-lg shadow transition-colors cursor-not-allowed">
            افزودن به سبد خرید
          </button>
        )}
      </div>
    </div>
  );
}
