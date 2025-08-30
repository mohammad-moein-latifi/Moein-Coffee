'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useUI } from '@/hooks/useUi';

import Icon from '@/components/common/Icon';
import NavLinks from '../../navLinks/NavLinks';

export default function Menu() {
  const { isMobileMenuOpen, openMobileMenu } = useUI();
  return (
    <>
      <Icon name="menu" className="size-6" onClick={openMobileMenu} />

      <div
        className={`fixed inset-y-0 ${
          isMobileMenuOpen ? 'right-0' : '-right-64'
        }  w-64 py-3 px-2 space-y-5 bg-stone-50 dark:bg-stone-800 text-sm text-start z-50 transition-all duration-300 flex`}>
        <div className="overflow-y-auto custom-scroll px-2 space-y-5">
          <Header />
          <NavLinks />
          <Footer />
        </div>
      </div>
    </>
  );
}
