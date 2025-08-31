'use client';
import { useState } from 'react';

export default function useCart() {
  const [isCartOpen, setCartOpen] = useState(false);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  return { isCartOpen, openCart, closeCart };
}
