'use client';

import { ReactNode, useRef } from 'react';

type CardProps = {
  children: ReactNode;
};

export default function Card({ children }: CardProps) {
  const borderRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    const el = borderRef.current;
    if (el) {
      el.classList.remove('animate-border-glow');
      void el.offsetWidth;
      el.classList.add('animate-border-glow');
    }
  };

  return (
    <div className="relative group" onMouseEnter={handleMouseEnter}>
      {/* Animated border */}
      <div
        ref={borderRef}
        className={`
          pointer-events-none absolute inset-0 rounded-xl p-[2px]
          bg-[conic-gradient(from_90deg_at_50%_50%,var(--gradient-start),var(--gradient-middle-1),var(--gradient-middle-2),var(--gradient-end),var(--gradient-start))]
          animate-gradient
        `}
        aria-hidden="true"
      />
      {/* Card content */}
      <div className="relative z-10 px-12 py-6 border-2 border-transparent bg-clip-padding bg-gray-50 dark:bg-gray-800 rounded-xl">
        {children}
      </div>
    </div>
  );
}
