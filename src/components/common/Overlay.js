'use client';
import { useUI } from '@/hooks/useUi';

export default function Overlay() {
  const { isOverlay, closeAll } = useUI();

  return (
    <div
      className={`overlay ${isOverlay ? 'overlay--visible' : ''}`}
      onClick={closeAll}
    />
  );
}