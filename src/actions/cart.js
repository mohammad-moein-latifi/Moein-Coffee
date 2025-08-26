'use server';

import connectToDB from '@/configs/db';
import CartModel from '@/models/Cart';
import { authUser } from '@/utils/serverHelpers';

export const addToCartAction = async (productId, price, discount) => {
  await connectToDB();
  const user = await authUser();
  if (!user) return { error: 'Unauthorized', redirect: '/login' };

  let cart = await CartModel.findOne({ user: user._id });
  if (!cart) cart = await CartModel.create({ user: user._id, items: [] });

  const existingItem = cart.items.find(item => item.product.toString() === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ product: productId, quantity: 1, price, discount });
  }

  cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cart.totalDiscount = cart.items.reduce((sum, item) => sum + item.discount * item.quantity, 0);
  cart.finalPrice = cart.totalPrice - cart.totalDiscount;

  await cart.save();
  return { success: true, cart };
};