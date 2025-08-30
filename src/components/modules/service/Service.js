import React from 'react';
import Icon from '@/components/common/Icon';

export default function Service({ title, desc, icon }) {
  return (
    <div className="flex-center flex-col lg:flex-row gap-y-5 gap-x-4">
      <Icon name={icon} className="w-15 h-20 text-amber-700" />
      <div className="flex-center flex-col lg:items-start gap-y-1 lg:gap-y-3.5">
        <div className="font-vazir-b text-sm/6 lg:text-lg/6">{title}</div>
        <div className="text-xs/6 lg:text-sm/6">{desc}</div>
      </div>
    </div>
  );
}
