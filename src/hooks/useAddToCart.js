import { useCartContext } from '@/context/CartContext';

export const useCart = () => {
  const { cart, addToCart, removeFromCart, clearCart, summary } = useCartContext();
  return { cart, addToCart, removeFromCart, clearCart, summary };
};