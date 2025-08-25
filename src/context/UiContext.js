'use client';

import { createContext, useState } from 'react';
import useTheme from '@/hooks/useTheme';
import useCart from '@/hooks/useCart';
import useMobileMenu from '@/hooks/useMobileMenu';

export const UIContext = createContext();

export function UIProvider({ children }) {
  const { theme, toggleTheme } = useTheme();
  const { isCartOpen, openCart, closeCart } = useCart();
  const { isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useMobileMenu();

  const [isOverlay, setOverlay] = useState(false);

  const handleOpenCart = () => {
    openCart();
    setOverlay(true);
  };
  const handleOpenMenu = () => {
    openMobileMenu();
    setOverlay(true);
  };

  const closeAll = () => {
    closeCart();
    closeMobileMenu();
    setOverlay(false);
  };

  return (
    <UIContext.Provider
      value={{
        theme,
        toggleTheme,
        isCartOpen,
        openCart: handleOpenCart,
        closeCart,
        isMobileMenuOpen,
        openMobileMenu: handleOpenMenu,
        closeMobileMenu,
        isOverlay,
        setOverlay,
        closeAll,
      }}>
      {children}
    </UIContext.Provider>
  );
}
