'use client';

import React from 'react';
import { useUI } from '@/hooks/useUi';
import Icon from '@/components/common/Icon';

export default function SwitchThemeButton() {
  const { toggleTheme } = useUI();
  return (
    <div
      className="max-md:inline-block md:cursor-pointer"
      onClick={toggleTheme}>
      <div className="flex md:block dark:hidden items-center gap-x-2">
        <Icon name="moonBtn" className="size-5 md:size-8" />
        <span className='md:hidden'>تم تیره</span>
      </div>
      <div className="hidden dark:flex md:dark:block items-center gap-x-2">
        <Icon name="sunBtn" className="size-5 md:size-8" />
        <span className='md:hidden'>تم روشن</span>
      </div>
    </div>
  );
}
