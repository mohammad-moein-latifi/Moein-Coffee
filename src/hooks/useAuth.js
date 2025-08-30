'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as authClient from '@/utils/authClient';

const fetchMe = async () => {
  const res = await fetch('/api/auth/me', {
    credentials: 'include',
    cache: 'no-store',
  });

  if (res.ok) {
    return res.json();
  }

  return null;
};

export const useMe = (options = {}) =>
  useQuery({
    queryKey: ['auth', 'me'],
    queryFn: fetchMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
    ...options,
  });

export const useSignin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => authClient.signin(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });
};

export const useSignup = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => authClient.signup(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });
};
