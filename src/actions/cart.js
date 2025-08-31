'use server';

import connectToDB from '@/configs/db';
import CartModel from '@/models/Cart';
import { cookies } from 'next/headers';
import { authUser } from '@/utils/serverHelpers';

async function getCartOwner() {
  const user = await authUser();
  if (user) return { user: user._id };

  const cookieStore = await cookies();
  let guestId = cookieStore.get('guestId')?.value;
  if (!guestId) {
    guestId = crypto.randomUUID();
    cookieStore.set('guestId', guestId, {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });
  }
  return { guestId };
}

function recalcTotals(cart) {
  cart.totalPrice = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  cart.totalDiscount = cart.items.reduce(
    (sum, i) => sum + i.discount * i.quantity,
    0
  );
  cart.finalPrice = cart.totalPrice - cart.totalDiscount;
  return cart;
}

export const addToCartAction = async (product) => {
  await connectToDB();
  const owner = await getCartOwner();
  let cart = await CartModel.findOne(owner);
  if (!cart) {
    cart = new CartModel({ ...owner, items: [] });
  }

  const existing = cart.items.find((i) => i.product.toString() === product._id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({
      product: product._id,
      quantity: 1,
      price: product.discountPrice || product.price,
      discount: product.discount || 0,
    });
  }

  recalcTotals(cart);
  await cart.save();
  return { success: true, cart };
};

export const updateCartItemQuantityAction = async (productId, quantity) => {
  await connectToDB();
  const owner = await getCartOwner();
  const cart = await CartModel.findOne(owner);
  if (!cart) return { error: 'Cart not found' };

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) return { error: 'Item not found' };

  item.quantity = Math.max(quantity, 1);
  recalcTotals(cart);
  await cart.save();
  return { success: true, cart };
};

export const removeCartItemAction = async (productId) => {
  await connectToDB();
  const owner = await getCartOwner();
  const cart = await CartModel.findOne(owner);
  if (!cart) return { error: 'Cart not found' };

  cart.items = cart.items.filter((i) => i.product.toString() !== productId);
  recalcTotals(cart);
  await cart.save();
  return { success: true, cart };
};

export const clearCartAction = async () => {
  await connectToDB();
  const owner = await getCartOwner();
  const cart = await CartModel.findOne(owner);
  if (!cart) return { error: 'Cart not found' };

  cart.items = [];
  cart.totalPrice = 0;
  cart.totalDiscount = 0;
  cart.finalPrice = 0;
  await cart.save();
  return { success: true, cart };
};
