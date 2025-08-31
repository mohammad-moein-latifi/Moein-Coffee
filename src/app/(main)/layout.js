'use client'; 

import { UIProvider } from '@/contexts/UiContext';
import Overlay from '@/components/common/Overlay';
import { CartProvider } from '@/contexts/CartContext';
import Navbar from '@/components/modules/navbar/Navbar';
import Footer from '@/components/modules/footer/Footer';

export default function SiteLayout({ children }) {
  return (
    <UIProvider>
      <CartProvider>
        <Navbar />
        <main>{children}</main>
        <Footer/>
        <Overlay />
      </CartProvider>
    </UIProvider>
  );
}
