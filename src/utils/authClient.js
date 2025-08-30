import { guestCartKey } from '@/constants/auth';

export const getGuestCart = () => {
  try {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(guestCartKey);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Failed to get guest cart:', e);
    return null;
  }
};

export const clearGuestCart = () => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(guestCartKey);
  } catch (e) {
    console.error('Failed to clear guest cart:', e);
  }
};

const getGuestId = () => {
  try {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('guestId') || null;
  } catch (e) {
    return null;
  }
};

const jsonOrText = async (res) => {
  try {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  } catch (e) {
    return null;
  }
};

export const signin = async ({ email, password }) => {
  const guestCart = getGuestCart();
  const guestId = getGuestId();

  const res = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(guestId ? { 'x-guest-id': guestId } : {}),
    },
    body: JSON.stringify({ email, password, guestCart }),
    credentials: 'include',
  });

  if (res.ok) {
    const data = await res.json().catch(() => null);
    clearGuestCart();
    return data;
  }

  const payload = await jsonOrText(res);
  if (payload && typeof payload === 'object') {
    payload.status = res.status;
    throw payload;
  }
  throw { status: res.status, message: payload || 'Signin failed' };
};

export const signup = async (payload) => {
  const guestCart = getGuestCart();
  const guestId = getGuestId();

  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(guestId ? { 'x-guest-id': guestId } : {}),
    },
    body: JSON.stringify({ ...payload, guestCart }),
    credentials: 'include',
  });

  if (res.ok) {
    const data = await res.json().catch(() => null);
    clearGuestCart();
    return data;
  }

  const body = await jsonOrText(res);
  if (body && typeof body === 'object') {
    body.status = res.status;
    throw body;
  }

  throw { status: res.status, message: body || 'Signup failed' };
};
