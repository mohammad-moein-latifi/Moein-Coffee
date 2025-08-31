'use client';
import { useState } from 'react';

export default function useMobileMenu() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openMobileMenu = () => setMobileMenuOpen(true);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return { isMobileMenuOpen, openMobileMenu, closeMobileMenu };
}
