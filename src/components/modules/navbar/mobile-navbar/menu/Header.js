'use client';

import React from 'react';
import { useUI } from '@/hooks/useUi';
import Icon from '@/components/common/Icon';

export default function Header() {
  const { closeAll } = useUI();
  return (
    <div className="flex items-center justify-between pt-3">
      <div className="flex items-center gap-x-4 text-amber-700">
        <Icon name="appLogo" className="size-14" />
        <Icon name="logoType" className="w-24 h-12" />
      </div>
      <div>
        <Icon
          name="closeBtn"
          className="menu-close-btn size-5 text-stone-800 dark:text-stone-200"
          onClick={closeAll}
        />
      </div>
    </div>
  );
}
