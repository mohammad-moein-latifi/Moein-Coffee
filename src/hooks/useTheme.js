'use client';
import { useEffect, useState } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const systemTheme = prefersDark ? 'dark' : 'light';
      setTheme(systemTheme);
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return { theme, toggleTheme };
}
