import { useCartContext } from '@/context/CartContext';

export const useShoppingCart = () => {
  const { cart, addToCart, removeFromCart, clearCart, summary } = useCartContext();
  return { cart, addToCart, removeFromCart, clearCart, summary };
};