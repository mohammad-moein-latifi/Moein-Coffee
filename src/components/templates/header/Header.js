'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/common/Icon';

export default function Header() {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    const scrollHandler = () => {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    };

    btn.addEventListener('click', scrollHandler);

    return () => {
      btn.removeEventListener('click', scrollHandler);
    };
  }, []);
  return (
    <header
      id="header"
      className="header relative h-48 xs:h-auto xs:aspect-[2/1] md:aspect-auto bg-header-desktop bg-no-repeat bg-cover bg-[center_top]">
      <div className="container relative overflow-y-hidden h-full md:min-h-[96vh] flex items-center justify-end">
        <div className="text-white text-right flex flex-col items-start justify-center">
          <span className="font-estedad-b text-amber-700 text-sm sm:text-base md:text-2xl lg:text-3xl xl:text-4xl xl:leading-[4rem] mb-0.5 md:mb-2">
            معین کافی
          </span>
          <span className="font-estedad text-amber-400 text-xs sm:text-sm md:text-xl lg:text-2xl xl:text-3xl xl:leading-[4rem]">
            همراه شما در هر جرعه قهوه !
          </span>
          <span className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-40 h-px md:h-0.5 my-3 md:my-6 lg:my-8 bg-amber-500" />
          <p className="text-stone-400 text-[10px] sm:text-xs md:text-base lg:text-lg xl:text-xl max-w-36 sm:max-w-44 md:max-w-80 lg:max-w-96 xl:max-w-[29rem] leading-relaxed">
            هر فنجان قهوه، پلی است میان شما و لحظه‌های آرامش؛ و ما همیشه کنارتان
            هستیم تا این مسیر خوش‌عطر و خوش‌طعم را دلنشین‌تر کنیم.
          </p>
        </div>

        <div className="circle circle--lg absolute bottom-0 right-0 left-0 mx-auto">
          <div className="circle circle--md">
            <div className="circle circle--sm" />
          </div>
        </div>
      </div>

      <Icon
        name="curve"
        className="absolute bottom-0 right-0 left-0 mx-auto w-[100px] h-[22px] hidden md:inline-block text-gray-100 dark:text-zinc-800"
      />
      <div
        ref={btnRef}
        className="absolute bottom-0 right-0 left-0 mx-auto w-[30px] h-[30px] border-2 border-amber-600 rounded-full hidden md:flex items-center justify-center translate-y-2/4">
        <Icon
          name="chevDown"
          className="size-4 text-stone-700 dark:text-stone-100"
        />
      </div>
    </header>
  );
}
