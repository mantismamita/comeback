import { ReactNode } from 'react';

type CardProps = {
  animated?: boolean;
  children: ReactNode;
};

export default function Card({ animated = true, children }: CardProps) {
  return (
    <div
      className={`px-12 py-6 border-2 border-transparent bg-clip-padding bg-gray-50 dark:bg-gray-800 relative before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-comeback-gradient-animated ${
        animated
          ? 'before:bg-comeback-gradient-animated'
          : 'before:bg-comeback-gradient-static'
      }`}
    >
      {children}
    </div>
  );
}
