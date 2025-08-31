import Image from 'next/image';
import React from 'react';

export default function Category() {
  return (
    <section className="products-category mt-8 mb-10 md:my-20">
      <div className="container">
        <div className="flex-center flex-wrap gap-y-6 gap-x-7 md:gap-x-16 lg:gap-x-[65px]">
          <a
            href="#"
            className="w-30 sm:w-34 md:w-54 lg:w-60 gap-y-1.5 md:gap-y-2.5 flex-center flex-col text-center">
            <Image
              src="/img/categories/category1.png"
              loading="lazy"
              alt="category1"
              width={500}
              height={500}
            />
            <span className="font-vazir-b text-xs sm:text-sm md:text-base lg:text-lg text-stone-800 dark:text-amber-50">
              کپسول و فوری
            </span>
          </a>
          <a
            href="#"
            className="w-30 sm:w-34 md:w-54 lg:w-60 gap-y-1.5 md:gap-y-2.5 flex-center flex-col text-center">
            <Image
              src="/img/categories/category2.png"
              loading="lazy"
              alt="category2"
              width={500}
              height={500}
            />
            <span className="font-vazir-b text-xs sm:text-sm md:text-base lg:text-lg  text-stone-800 dark:text-amber-50">
              لوازم جانبی و تجهیزات
            </span>
          </a>
          <a
            href="#"
            className="w-30 sm:w-34 md:w-54 lg:w-60 gap-y-1.5 md:gap-y-2.5 flex-center flex-col text-center">
            <Image
              src="/img/categories/category3.png"
              loading="lazy"
              alt="category3"
              width={500}
              height={500}
            />
            <span className="font-vazir-b text-xs sm:text-sm md:text-base lg:text-lg text-stone-800 dark:text-amber-50">
              پاکت و هدیه
            </span>
          </a>
          <a
            href="#"
            className="w-30 sm:w-34 md:w-54 lg:w-60 gap-y-1.5 md:gap-y-2.5 flex-center flex-col text-center">
            <Image
              src="/img/categories/category4.png"
              loading="lazy"
              alt="category4"
              width={500}
              height={500}
            />
            <span className="font-vazir-b text-xs sm:text-sm md:text-base lg:text-lg text-stone-800 dark:text-amber-50">
              قهوه‌های ویژه
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
