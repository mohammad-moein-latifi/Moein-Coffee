import Link from 'next/link';
import React from 'react';
import Icon from './Icon';

export default function SectionHeader({ title, subTitle, href, link, hasButton ,className }) {
  return (
    <div className={`flex items-end justify-between mb-5 md:mb-12 ${className}`}>
      <div className="text-stone-800 dark:text-stone-400 flex flex-col justify-start">
        <span className="section-title">{title}</span>

        {subTitle && <span className="section-subtitle">{subTitle}</span>}
      </div>

      {link && (
        <Link href={href} className="section-link">
          <span className="inline-block">{link}</span>
          <Icon name="chevLeft" className="size-4" />
        </Link>
      )}

      {hasButton && (
        <div className="flex gap-x-3 md:gap-x-[18px]">
          <div className="swiper-button-prev-custom flex-center">
            <Icon
              name="chevRight"
              className="w-5 h-5 md:w-[26px] md:h-[26px]"
            />
          </div>
          <div className="swiper-button-next-custom flex-center">
            <Icon name="chevLeft" className="w-5 h-5 md:w-[26px] md:h-[26px]" />
          </div>
        </div>
      )}
    </div>
  );
}
