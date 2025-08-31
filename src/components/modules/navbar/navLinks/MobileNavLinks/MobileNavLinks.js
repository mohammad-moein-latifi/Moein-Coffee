import React from 'react';

export default function MobileNavLinks({ children }) {
  return (
    <ul className="md:hidden text-stone-800 dark:text-stone-200 space-y-6 text-sm *:transition-colors *:duration-200  border-y border-y-stone-200 dark:border-y-stone-100/10 py-8 px-1">
      {children}
    </ul>
  );
}
