import { guestCartKey } from '@/constants/auth';

export const getGuestCart = () => {
  try {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(guestCartKey);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const saveGuestCart = (cart) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(guestCartKey, JSON.stringify(cart));
  } catch (e) {}
};

export const clearGuestCart = () => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(guestCartKey);
  } catch (e) {}
};
