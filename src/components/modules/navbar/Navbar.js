import React from 'react';
import MobileNavbar from './mobile-navbar/MobileNavbar';
import DesktopNavbar from './desktop-navbar/DesktopNavbar';

export default function Navbar() {
  return (
    <nav>
      <DesktopNavbar />
      <MobileNavbar />
    </nav>
  );
}
