import React from 'react';
import DesktopNavLinks from './DesktopNavLinks/DesktopNavLinks';
import MobileNavLinks from './MobileNavLinks/MobileNavLinks';
import Links from './Links';

export default function NavLinks() {
  return (
    <>
      <MobileNavLinks>
        <Links />
      </MobileNavLinks>
      <DesktopNavLinks>
        <Links />
      </DesktopNavLinks>
    </>
  );
}
