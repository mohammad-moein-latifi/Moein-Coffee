import Icon from '@/components/common/Icon';
import React from 'react';

export default function Contact() {
  return (
    <div className="mt-10 md:mt-[26px]">
      <span className="inline-block font-vazir-btext-xl md:text-2xl text-white mb-6 md:mb-7">
        در تماس باشیم
      </span>
      <address className="flex items-center gap-x-2 md:gap-x-3 not-italic text-sm md:text-base lg:text-lg">
        <Icon name="map" className="size-5  md:size-6" />
        بلوار مدرس، خیابان محلاتی، کوچه 22 بهمن
      </address>
      <div className="flex flex-wrap items-center gap-y-4 gap-x-5 mt-4 md:mt-5">
        <a
          href="mailto:mohammad.moein.latifi@gmail.com"
          className="flex gap-x-2 md:gap-x-3 font-vazir-md text-sm md:text-base lg:text-lg text-amber-400">
          <Icon name="mail" className="size-5  md:size-6" />
          mohammad.moein.latifi@gmail.com
        </a>
        <div className="flex items-center md:gap-x-5">
          <a
            href="tel:09339727833"
            className="ltr-element flex items-center gap-x-2 md:gap-x-3 font-vazir-md text-sm md:text-base lg:text-lg">
            0933 972 7833
            <Icon name="call" className="size-5  md:size-6" />
          </a>
        </div>
      </div>
      <div className="flex gap-x-1.5 md:gap-x-6 mt-10">
        <a
          href="https://t.me/Mohammad_Moein_Latifi"
          className="ltr-element flex-center grow gap-x-2 h-12 font-vazir-md text-sm md:text-base lg:text-lg text-yellow-600 border border-yellow-600 rounded-xl">
          @moein_caffee
          <Icon name="instagram" className="size-5 md:size-7" />
        </a>
        <a
          href="https://t.me/Mohammad_Moein_Latifi"
          className="ltr-element flex-center grow gap-x-2 h-12 font-vazir-md text-sm md:text-base lg:text-lg text-stone-900 bg-gradient-to-r from-amber-500/80 to-yellow-600/80 rounded-xl">
          @mohammad_moein_latifi
          <Icon name="telegram" className="size-5  md:size-7" />
        </a>
      </div>
    </div>
  );
}
