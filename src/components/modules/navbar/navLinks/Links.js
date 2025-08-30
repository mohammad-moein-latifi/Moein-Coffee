'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/constants/navLinks';

export default function Links() {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => (
        <li
          key={link.id}
          className={`max-md:px-3 ${
            pathname === link.href
              ? 'max-md:text-amber-700 max-md:bg-amber-500/20  max-md:w-52 max-md:h-10 max-md:rounded-md max-md:flex max-md:items-center max-md:justify-start'
              : ''
          }`}>
          <Link
            href={link.href}
            className={`gap-x-2 ${
              pathname === link.href
                ? 'inline-flex md:font-vazir-md md:text-amber-400'
                : 'flex md:hover:text-amber-700 md:transition-colors md:duration-200'
            }`}>
            <Icon name={link.icon} className="size-5 md:hidden" />
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
}
