'use client';

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Arrow({ className = '' }: { className?: string }) {
  const [animate, setAnimate] = useState(false);
  const [arrowHeadBlink, setArrowHeadBlink] = useState(false);

  // repeats every 5 seconds
  useEffect(() => {
    setAnimate(true);
    const interval = setInterval(() => {
      setAnimate(false);
      setArrowHeadBlink(false);
      setTimeout(() => setAnimate(true), 100);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Trigger arrowhead blink when glow reaches the end
  useEffect(() => {
    if (animate) {
      // Time when the glow reaches the arrowhead - should match the animation timing
      const blinkDelay = 1800; // This matches the glow's arrival at the arrowhead
      const blinkTimer = setTimeout(() => {
        setArrowHeadBlink(true);
      }, blinkDelay);

      return () => clearTimeout(blinkTimer);
    }
  }, [animate]);

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
            <stop offset="0%" stopColor="var(--gradient-start)" />
            <stop offset="40%" stopColor="var(--gradient-middle-1)" />
            <stop offset="60%" stopColor="var(--gradient-middle-2)" />
            <stop offset="100%" stopColor="var(--gradient-end)" />
          </linearGradient>
          <linearGradient
            id="arrowHeadGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="var(--gradient-middle-2)" />
            <stop offset="100%" stopColor="var(--gradient-end)" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Main arrow path */}
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
          stroke="url(#arrowHeadGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: animate ? 1 : 0,
            opacity: animate ? 1 : 0,
            filter: arrowHeadBlink ? 'url(#glow)' : 'none',
            strokeWidth: arrowHeadBlink ? [4, 6, 4] : 4,
          }}
          transition={{
            pathLength: { duration: 0.5, delay: 1.4, ease: 'easeOut' },
            opacity: { duration: 0.3, delay: 1.4 },
            filter: { duration: 0.6, ease: 'easeInOut' },
            strokeWidth: {
              duration: 0.6,
              times: [0, 0.5, 1],
              ease: 'easeInOut',
              repeat: 2,
              repeatType: 'reverse',
            },
          }}
        />

        {/* Highlight points at each vertex */}
        {[
          { x: 5, y: 50, delay: 0.3, color: 'var(--gradient-start)' },
          { x: 15, y: 35, delay: 0.6, color: 'var(--gradient-middle-1)' },
          { x: 30, y: 35, delay: 0.9, color: 'var(--gradient-middle-2)' },
          { x: 55, y: 10, delay: 1.2, color: 'var(--gradient-end)' },
        ].map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={3}
            fill={point.color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale:
                index === 3 && arrowHeadBlink ? [1, 1.33, 1] : animate ? 1 : 0,
              opacity: animate ? 1 : 0,
              filter: index === 3 && arrowHeadBlink ? 'url(#glow)' : 'none',
            }}
            transition={{
              scale: {
                duration: index === 3 && arrowHeadBlink ? 0.6 : 0.3,
                delay: index === 3 && arrowHeadBlink ? 0 : point.delay,
                times: index === 3 && arrowHeadBlink ? [0, 0.5, 1] : undefined,
                repeat: index === 3 && arrowHeadBlink ? 2 : 0,
                repeatType:
                  index === 3 && arrowHeadBlink ? 'reverse' : undefined,
              },
              opacity: { duration: 0.3, delay: point.delay },
              filter: { duration: 0.6, ease: 'easeInOut' },
            }}
          />
        ))}

        {/* Traveling highlight effect along the path */}
        <motion.circle
          cx="0"
          cy="0"
          r={5} // Fixed: Set a static value here
          fill="var(--color-pink-400)"
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

        <motion.circle
          cx={55}
          cy={10}
          r={8} // Fixed: Set a static value here
          fill="var(--color-pink-400)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: arrowHeadBlink ? [0, 0.3, 0] : 0,
            scale: arrowHeadBlink ? [0.5, 1.5, 0.5] : 0.5,
          }}
          transition={{
            opacity: { duration: 0.8, times: [0, 0.5, 1], ease: 'easeInOut' },
            scale: { duration: 0.8, times: [0, 0.5, 1], ease: 'easeInOut' },
            repeat: arrowHeadBlink ? 2 : 0,
            repeatType: 'reverse',
          }}
        />
      </svg>
    </div>
  );
}
