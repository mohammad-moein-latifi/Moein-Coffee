import Icon from '@/components/common/Icon';
import Image from 'next/image';
import React from 'react';

export default function Contact() {
  return (
    <section className="contact-us my-28">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-start gap-y-8 md:gap-x-5">
          <Image
            className="w-100 shrink-0"
            src="/img/contact.png"
            alt="contact us"
            weight={500}
            height={500}
          />
          <div className="flex flex-col items-start text-stone-800 dark:text-white">
            <div className="font-estedad-lg text-xl md:text-3xl">
              قهوه‌ای که دنبالش بودی، همین‌جاست!
            </div>
            <div className="font-estedad text-base md:text-lg mt-0.5 md:mt-1.5">
              کیفیت در هر دانه، طعمی در هر فنجان
            </div>
            <p className="sm:text-xs md:text-base lg:text-lg xl:text-xl my-6">
              هر فنجان قهوه یک بهانه‌ است برای کنار هم بودن. ما اینجاییم تا
              برایتان قهوه‌ای تازه و خوش‌طعم آماده کنیم که لحظه هایتان را گرم‌تر
              و شیرین‌تر کند.
            </p>
            <a
              href="tel:09339727833"
              className="text-yellow-600 text-base lg:text-xl tracking-tightest border md:border-2 border-yellow-600 rounded-full px-6 py-3.5 lg:py-4 flex-center gap-x-2">
              <Icon name="call" className="w-5 md:w-8 h-5 md:h-8"/>

              سفارش تلفنی هم داریم!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
