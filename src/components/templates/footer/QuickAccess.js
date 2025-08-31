import React from 'react';
import Link from 'next/link';
import { navLinks } from '@/constants/navLinks';

export default function QuickAccess() {
  return (
    <div className="mt-10 md:mt-[26px]">
      <span className="inline-block font-vazir-btext-xl md:text-2xl text-white mb-6 md:mb-7">
        دسترسی سریع
      </span>
      <div className="grid grid-cols gap-y-2.5 md:gap-y-5 gap-x-11 md:gap-x-16 text-sm md:text-base lg:text-lg">
        {navLinks.slice(1,5).map((navLink) => (
          <Link
            key={navLink.id}
            href={navLink.href}
            className="flex items-center gap-x-2 md:gap-x-3 hover:text-amber-700 transition-all delay-75">
            <span className="w-2 md:w-2.5 h-1 rounded-full bg-current" />
            {navLink.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
