'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/libs/productApi';
import SectionHeader from '@/components/common/SectionHeader';
import Product from '@/components/modules/product/Product';

import 'swiper/css';
import 'swiper/css/navigation';

export default function PopularProducts() {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const products = Array.isArray(data) ? data : data?.data || [];

  return (
    <section className="best-selling mb-8 md:mb-20">
      <div className="container">
        <SectionHeader
          title="محصولات پر طرفدار"
          subTitle="پیشنهادی برای لحظه‌های خوش‌طعم"
          hasButton={true}
        />

        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={2}
          spaceBetween={14}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {products.filter(product => product.score >= 4).map((product) => (
            <SwiperSlide key={product._id}>
              <Product
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
