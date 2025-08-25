'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Arrow({ className = '' }: { className?: string }) {
  const [animate, setAnimate] = useState(false);

  // repeats every 5 seconds
  useEffect(() => {
    setAnimate(true);
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 100);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        className="overflow-visible"
      >
        <defs>
          <linearGradient
            id="comebackGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="oklch(55.8% 0.288 302.321)" />{' '}
            {/* purple-600 */}
            <stop offset="40%" stopColor="oklch(65% 0.25 305)" />{' '}
            {/* custom middle */}
            <stop offset="60%" stopColor="oklch(68% 0.23 345)" />{' '}
            {/* custom middle */}
            <stop offset="100%" stopColor="oklch(59.2% 0.249 0.584)" />{' '}
            {/* pink-600 */}
          </linearGradient>
        </defs>

        {/* Main arrow path with balanced segments */}
        <motion.path
          d="M5,50 L15,35 L30,35 L55,10"
          stroke="url(#comebackGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: animate ? 1 : 0,
            opacity: animate ? 1 : 0,
          }}
          transition={{
            pathLength: { duration: 1.5, ease: 'easeInOut' },
            opacity: { duration: 0.3 },
          }}
        />

        {/* Arrow head */}
        <motion.path
          d="M55,10 L45,10 M55,10 L55,20"
          stroke="url(#comebackGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: animate ? 1 : 0,
            opacity: animate ? 1 : 0,
          }}
          transition={{
            pathLength: { duration: 0.5, delay: 1.4, ease: 'easeOut' },
            opacity: { duration: 0.3, delay: 1.4 },
          }}
        />

        {/* Highlight points at each vertex */}
        {[
          { x: 5, y: 50, delay: 0.3, color: 'oklch(55.8% 0.288 302.321)' }, // purple-600
          { x: 15, y: 35, delay: 0.6, color: 'oklch(65% 0.25 305)' }, // custom middle
          { x: 30, y: 35, delay: 0.9, color: 'oklch(68% 0.23 345)' }, // custom middle
          { x: 55, y: 10, delay: 1.2, color: 'oklch(59.2% 0.249 0.584)' }, // pink-600
        ].map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="3"
            fill={point.color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: animate ? 1 : 0,
              opacity: animate ? 1 : 0,
            }}
            transition={{
              scale: { duration: 0.3, delay: point.delay },
              opacity: { duration: 0.3, delay: point.delay },
            }}
          />
        ))}

        {/* Traveling highlight effect along the path */}
        <motion.circle
          cx="0"
          cy="0"
          r="5"
          fill="oklch(71.8% 0.202 349.761)" // pink-400
          filter="blur(3px)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: animate ? [0, 1, 1, 1, 0] : 0,
            x: animate ? [5, 15, 30, 55] : 5,
            y: animate ? [50, 35, 35, 10] : 50,
          }}
          transition={{
            opacity: {
              duration: 1.8,
              times: [0, 0.2, 0.5, 0.8, 1],
              delay: 0.3,
            },
            x: {
              duration: 1.8,
              times: [0, 0.25, 0.5, 1],
              delay: 0.3,
              ease: 'easeInOut',
            },
            y: {
              duration: 1.8,
              times: [0, 0.25, 0.5, 1],
              delay: 0.3,
              ease: 'easeInOut',
            },
          }}
        />
      </svg>
    </div>
  );
}
