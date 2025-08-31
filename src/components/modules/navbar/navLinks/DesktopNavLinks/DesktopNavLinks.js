import React from 'react';

export default function DesktopNavLinks({ children }) {
  return (
    <ul className=" hidden md:flex h-full  items-center gap-x-4 lg:gap-x-6 xl:gap-x-8 text-base lg:text-lg text-stone-400 tracking-tight *:leading-14">
      {children}
    </ul>
  );
}
