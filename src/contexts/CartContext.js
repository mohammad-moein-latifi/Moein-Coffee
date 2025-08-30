'use client';

import React, { createContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const CartContext = createContext();

const getOrCreateGuestId = () => {
  if (typeof window === 'undefined') return null;
  let gid = localStorage.getItem('guestId');
  if (!gid) {
    gid =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    localStorage.setItem('guestId', gid);
  }
  return gid;
};

const buildHeaders = () => {
  const guestId = getOrCreateGuestId();
  const headers = { 'Content-Type': 'application/json' };
  if (guestId) headers['x-guest-id'] = guestId;
  return headers;
};

const fetchCart = async () => {
  const res = await fetch('/api/cart', { headers: buildHeaders() });
  if (!res.ok) {
    const text = await res.text();
    throw new Error('Failed to fetch cart: ' + text);
  }
  const data = await res.json();
  return data.cart;
};

const addItemToServer = async ({ productId, quantity }) => {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error('Failed to add item to cart: ' + text);
  }
  const data = await res.json();
  return data.cart;
};

const removeItemFromServer = async (productId) => {
  const res = await fetch('/api/cart', {
    method: 'DELETE',
    headers: buildHeaders(),
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error('Failed to remove item from cart: ' + text);
  }
  const data = await res.json();
  return data.cart;
};

const updateCartOnServer = async (items) => {
  const res = await fetch('/api/cart', {
    method: 'PUT',
    headers: buildHeaders(),
    body: JSON.stringify({ items }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error('Failed to update cart: ' + text);
  }
  const data = await res.json();
  return data.cart;
};

const normalizeOptimisticItems = (
  incomingItems = [],
  previous = { items: [] }
) => {
  const prevItems = previous?.items ?? [];

  return incomingItems.map((it, idx) => {
    const incomingProd = it?.product;
    const incomingProdId =
      incomingProd && typeof incomingProd === 'object'
        ? incomingProd._id
        : incomingProd;

    const existing = prevItems.find(
      (p) =>
        String(p?.product?._id ?? p?.product ?? '') ===
        String(incomingProdId ?? '')
    );

    if (existing && existing.product && typeof existing.product === 'object') {
      return {
        product: existing.product,
        quantity: it.quantity,
      };
    }

    return {
      product:
        incomingProd && typeof incomingProd === 'object'
          ? incomingProd
          : {
              _id: incomingProdId,
              name: 'در حال بارگذاری...',
              img: '/img/app-logo.png',
              finalPrice: incomingProd?.finalPrice ?? 0,
            },
      quantity: it.quantity,
    };
  });
};

export const CartProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const {
    data: cartData = {
      items: [],
      totalPrice: 0,
      totalDiscount: 0,
      finalPrice: 0,
    },
    isLoading,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
  });

  const addToCartMutation = useMutation({
    mutationFn: addItemToServer,
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previous = queryClient.getQueryData(['cart']);
      const optimistic = JSON.parse(
        JSON.stringify(
          previous || {
            items: [],
            totalPrice: 0,
            totalDiscount: 0,
            finalPrice: 0,
          }
        )
      );

      const pid = newItem.productId;
      const idx = optimistic.items.findIndex(
        (i) => String(i?.product?._id ?? i?.product ?? '') === String(pid)
      );

      if (idx > -1) {
        optimistic.items[idx].quantity += newItem.quantity || 1;
      } else {
        optimistic.items.push({
          product: {
            _id: pid,
            name: 'در حال بارگذاری...',
            img: '/img/app-logo.png',
            finalPrice: newItem?.price ?? 0,
          },
          quantity: newItem.quantity || 1,
        });
      }

      queryClient.setQueryData(['cart'], optimistic);
      return { previous };
    },
    onError: (err, newItem, context) => {
      if (context?.previous)
        queryClient.setQueryData(['cart'], context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: removeItemFromServer,
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previous = queryClient.getQueryData(['cart']);
      const optimistic = JSON.parse(JSON.stringify(previous || { items: [] }));
      optimistic.items = optimistic.items.filter(
        (i) => String(i?.product?._id ?? i?.product ?? '') !== String(productId)
      );
      queryClient.setQueryData(['cart'], optimistic);
      return { previous };
    },
    onError: (err, productId, context) => {
      if (context?.previous)
        queryClient.setQueryData(['cart'], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  //
  const updateCartMutation = useMutation({
    mutationFn: updateCartOnServer,
    onMutate: async (items) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previous = queryClient.getQueryData(['cart']);
      const optimistic = JSON.parse(
        JSON.stringify(
          previous || {
            items: [],
            totalPrice: 0,
            totalDiscount: 0,
            finalPrice: 0,
          }
        )
      );

      optimistic.items = normalizeOptimisticItems(items, previous);
      queryClient.setQueryData(['cart'], optimistic);

      return { previous };
    },
    onError: (err, vars, context) => {
      if (context?.previous)
        queryClient.setQueryData(['cart'], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const addToCart = (productId, quantity = 1) =>
    addToCartMutation.mutateAsync({ productId, quantity });
  const removeFromCart = (productId) =>
    removeFromCartMutation.mutateAsync(productId);
  const updateCart = (items) => updateCartMutation.mutateAsync(items);
  const clearCart = () => updateCart([]);

  return (
    <CartContext.Provider
      value={{
        cart: cartData,
        isLoading,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
        addToCartStatus: addToCartMutation,
        removeFromCartStatus: removeFromCartMutation,
        updateCartStatus: updateCartMutation,
      }}>
      {children}
    </CartContext.Provider>
  );
};
