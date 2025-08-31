'use client';

import React from 'react';
import { getProducts } from '@/libs/productApi';
import { useQuery } from '@tanstack/react-query';
import SectionHeader from '@/components/common/SectionHeader';
import Product from '@/components/modules/product/Product';

export default function Products() {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const products = Array.isArray(data) ? data : data?.data || [];

  return (
    <section className="products pt-8 md:pt-24">
      <div className="container">
        <SectionHeader
          className="lg:pt-48"
          title="جدیدترین محصولات"
          subTitle="دانه‌هایی آماده برای یک فنجان دلنشین"
          link="مشاهده همه"
          href="/shop"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
          {products.slice(0, 8).map((product) => (
            <Product
              key={product._id}
              id={product._id}
              img={product.img}
              name={product.name}
              shortDescription={product.shortDescription}
              isSpecial={product.isSpecial}
              isNew={product.isNew}
              discount={product.discount}
              score={product.score}
              weight={product.weight}
              price={product.price}
              finalPrice={product.finalPrice}
              stock={product.stock}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
