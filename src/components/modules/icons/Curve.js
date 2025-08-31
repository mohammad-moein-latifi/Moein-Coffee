import React from 'react';

export default function Curve({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 22"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M50 0C69 0 81 22 100 22L0 22C18.75 22 31 0 50 0Z" />
    </svg>
  );
}
