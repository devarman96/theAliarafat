import React from 'react';

interface LogoMarkProps {
  className?: string;
  size?: number;
}

export function LogoMark({ className = 'w-9 h-9', size = 36 }: LogoMarkProps) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-700 text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/20 group-hover:shadow-indigo-500/35 group-hover:scale-105 transition-all duration-200 shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[22px] h-[22px]"
      >
        <defs>
          <linearGradient id="aliArafatGrad" x1="6" y1="6" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#E0E7FF" />
          </linearGradient>
          <linearGradient id="innerAGrad" x1="12" y1="12" x2="24" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A5B4FC" />
            <stop offset="1" stopColor="#C7D2FE" />
          </linearGradient>
        </defs>

        {/* Primary Outer 'A' for Ali */}
        <path
          d="M18 5.5L7.5 28.5H12L14.2 23H21.8L24 28.5H28.5L18 5.5ZM15.4 19.8L18 13.2L20.6 19.8H15.4Z"
          fill="url(#aliArafatGrad)"
        />

        {/* Nested Second 'A' Chevron for Arafat */}
        <path
          d="M18 15.5L13.8 24.5H16.2L18 20.2L19.8 24.5H22.2L18 15.5Z"
          fill="url(#innerAGrad)"
        />

        {/* Science & Curiosity Spark Node at Apex */}
        <circle cx="18" cy="5.5" r="1.5" fill="#38BDF8" />
      </svg>
    </div>
  );
}
