import React, { useEffect, useRef } from 'react';
import Icon from '@/components/common/Icon';
import About from '@/components/templates/footer/About';
import Contact from '@/components/templates/footer/Contact';
import CopyRight from '@/components/templates/footer/CopyRight';
import QuickAccess from '@/components/templates/footer/QuickAccess';

export default function Footer() {
  const btnRef = useRef(null);
  
  useEffect(() => {
    const btn = btnRef.current;
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    btn.addEventListener('click', scrollToTop);

    return () => {
      btn.removeEventListener('click', scrollToTop);
    };
  }, []);

  return (
    <footer className="footer relative bg-stone-900 mb-16 md:mb-0 py-8 md:pb-11 md:pt-[62px]">
      <Icon
        name="footerCurve"
        className="absolute top-0 right-0 left-0 mx-auto w-[100px] h-[22px] hidden md:inline-block text-gray-100 dark:text-zinc-800"
      />

      <div
        ref={btnRef}
        className="absolute top-0 right-0 left-0 mx-auto w-[30px] h-[30px] border-2 border-amber-600 rounded-full hidden md:flex items-center justify-center -translate-y-2/4">
        <Icon name="chevUp" className="size-4 text-stone-900 dark:text-white" />
      </div>

      <div className="text-right text-stone-300 px-4 mx-auto">
        <div className="flex flex-wrap justify-between">
          <About />
          <QuickAccess />
          <Contact />
        </div>
        <CopyRight />
      </div>
    </footer>
  );
}
