'use client';

import { useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';

export const useShoppingCart = () => {
  const { cart, isLoading, addToCart, removeFromCart, updateCart, clearCart } =
    useContext(CartContext);

  const summary = {
    total: cart.totalPrice,
    discount: cart.totalDiscount,
    final: cart.finalPrice,
  };

  return { cart, isLoading, addToCart, removeFromCart, updateCart, clearCart, summary };
};
