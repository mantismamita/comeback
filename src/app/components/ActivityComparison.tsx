'use client';

import type { Variants } from 'framer-motion';
import { useActivities } from '../context/ActivitiesContext';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  useAnimation,
} from 'framer-motion';

export default function ActivityComparison() {
  const { peakActivity, currentActivity } = useActivities();
  const chartRef = useRef<HTMLDivElement>(null);
  const [_, setAnimationComplete] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Controls
  const isInView = useInView(chartRef, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible').then(() => {
        console.log('Animation completed');
        setAnimationComplete(true);
      });
      setTimeout(() => setShowMetrics(true), 1200);
    }
  }, [isInView, controls]);

  // Early returns
  if (!peakActivity || !currentActivity) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600"
        >
          <div className="text-center">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="inline-block text-4xl mb-4"
            >
              🏃‍♂️
            </motion.div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Select both peak and current activities to see your comeback story
            </h3>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (
    peakActivity.activityType.typeKey !== currentActivity.activityType.typeKey
  ) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 rounded-lg border-l-4 border-yellow-400"
      >
        <motion.p
          initial={{ x: -10 }}
          animate={{ x: 0 }}
          className="text-yellow-800 dark:text-yellow-200 flex items-center"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="mr-2"
          >
            ⚠️
          </motion.span>
          Please select activities of the same type to compare metrics.
        </motion.p>
      </motion.div>
    );
  }

  const metricsToCompare = [
    {
      key: 'distance',
      label: 'Distance',
      unit: 'km',
      icon: '📏',
      color: '#3B82F6',
      lightColor: '#DBEAFE',
    },
    {
      key: 'duration',
      label: 'Duration',
      unit: 'min',
      icon: '⏱️',
      color: '#10B981',
      lightColor: '#D1FAE5',
    },
    {
      key: 'avgSpeed',
      label: 'Avg Speed',
      unit: 'km/h',
      icon: '⚡',
      color: '#F59E0B',
      lightColor: '#FEF3C7',
    },
  ];

  // Get the data values
  const peakData = metricsToCompare.map((m) => ({
    ...m,
    value: (peakActivity[m.key as keyof typeof peakActivity] as number) || 0,
  }));

  const currentData = metricsToCompare.map((m) => ({
    ...m,
    value:
      (currentActivity[m.key as keyof typeof currentActivity] as number) || 0,
  }));

  console.log('peakData', peakData);
  console.log('currentData', currentData);

  // Find max value for scaling
  const maxValue = Math.max(
    ...peakData.map((d) => d.value),
    ...currentData.map((d) => d.value)
  );

  // Chart dimensions
  const chartHeight = 300;
  const chartWidth = 600;
  const barWidth = 60;
  const groupWidth = 140;
  const chartPadding = 60;

  // Animation variants
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={chartRef}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="mt-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6 text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Your Comeback Story
        </h2>
        <motion.p
          variants={itemVariants}
          className="text-gray-600 dark:text-gray-400 mt-2"
        >
          {peakActivity.activityType.typeKey} Performance Comparison
        </motion.p>
      </motion.div>

      {/* Chart */}
      <motion.div
        variants={itemVariants}
        className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        whileHover={{
          scale: 1.01,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Chart Container */}
        <div className="flex justify-center">
          <svg
            width={chartWidth}
            height={chartHeight + 80}
            className="overflow-visible"
          >
            {/* Background grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
              <motion.line
                key={index}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.1 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                x1={chartPadding}
                x2={chartWidth - chartPadding}
                y1={chartHeight - (chartHeight - 40) * ratio}
                y2={chartHeight - (chartHeight - 40) * ratio}
                stroke="currentColor"
                strokeDasharray="5,5"
                className="text-gray-400"
              />
            ))}

            {/* Bars */}
            {metricsToCompare.map((metric, index) => {
              const peakValue = peakData[index].value;
              const currentValue = currentData[index].value;

              const x = chartPadding + index * groupWidth;
              const peakHeight = (peakValue / maxValue) * (chartHeight - 40);
              const currentHeight =
                (currentValue / maxValue) * (chartHeight - 40);

              return (
                <g key={metric.key}>
                  {/* Peak bar */}
                  <motion.rect
                    initial={{ height: 0, y: chartHeight }}
                    animate={{
                      height: peakHeight,
                      y: chartHeight - peakHeight,
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.5 + index * 0.2,
                      ease: 'easeOut',
                    }}
                    whileHover={{
                      scale: 1.05,
                      filter: 'brightness(1.1)',
                    }}
                    x={x}
                    width={barWidth}
                    fill={metric.color}
                    rx={8}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredBar(`peak-${metric.key}`)}
                    onMouseLeave={() => setHoveredBar(null)}
                  />

                  {/* Current bar */}
                  <motion.rect
                    initial={{ height: 0, y: chartHeight }}
                    animate={{
                      height: currentHeight,
                      y: chartHeight - currentHeight,
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.7 + index * 0.2,
                      ease: 'easeOut',
                    }}
                    whileHover={{
                      scale: 1.05,
                      filter: 'brightness(1.1)',
                    }}
                    x={x + barWidth + 8}
                    width={barWidth}
                    fill={metric.color}
                    fillOpacity={0.6}
                    rx={8}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredBar(`current-${metric.key}`)}
                    onMouseLeave={() => setHoveredBar(null)}
                  />

                  {/* Value labels */}
                  <AnimatePresence>
                    {hoveredBar === `peak-${metric.key}` && (
                      <motion.text
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        x={x + barWidth / 2}
                        y={chartHeight - peakHeight - 10}
                        textAnchor="middle"
                        className="text-sm font-bold fill-current text-gray-800 dark:text-gray-200"
                      >
                        {peakValue.toFixed(1)}
                      </motion.text>
                    )}
                    {hoveredBar === `current-${metric.key}` && (
                      <motion.text
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        x={x + barWidth + 8 + barWidth / 2}
                        y={chartHeight - currentHeight - 10}
                        textAnchor="middle"
                        className="text-sm font-bold fill-current text-gray-800 dark:text-gray-200"
                      >
                        {currentValue.toFixed(1)}
                      </motion.text>
                    )}
                  </AnimatePresence>

                  {/* Metric labels */}
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    x={x + groupWidth / 2}
                    y={chartHeight + 25}
                    textAnchor="middle"
                    className="text-sm font-medium fill-current text-gray-600 dark:text-gray-300"
                  >
                    {metric.icon} {metric.label}
                  </motion.text>
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                    x={x + groupWidth / 2}
                    y={chartHeight + 40}
                    textAnchor="middle"
                    className="text-xs fill-current text-gray-500 dark:text-gray-400"
                  >
                    ({metric.unit})
                  </motion.text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="flex justify-center mt-6 space-x-8"
        >
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Peak Performance
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 opacity-60 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Current Level
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Animated metrics cards */}
      <AnimatePresence>
        {showMetrics && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {metricsToCompare.map((metric, index) => {
              const peakValue = peakData[index].value;
              const currentValue = currentData[index].value;
              const difference = currentValue - peakValue;
              const percentChange = peakValue
                ? (difference / peakValue) * 100
                : 0;

              return (
                <motion.div
                  key={metric.key}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                  }}
                  style={{ backgroundColor: metric.lightColor }}
                  className="p-6 rounded-xl shadow-lg relative overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-600"
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    style={{
                      backgroundColor: metric.color,
                      backgroundImage:
                        'radial-gradient(circle, white 2px, transparent 2px)',
                      backgroundSize: '30px 30px',
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <motion.span
                        className="text-2xl"
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      >
                        {metric.icon}
                      </motion.span>
                      <h3 className="font-bold text-gray-800 dark:text-gray-200">
                        {metric.label}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span>
                          Peak:{' '}
                          <strong>
                            {peakValue.toFixed(1)} {metric.unit}
                          </strong>
                        </span>
                        <span>
                          Current:{' '}
                          <strong>
                            {currentValue.toFixed(1)} {metric.unit}
                          </strong>
                        </span>
                      </div>

                      <motion.div
                        className="text-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 1.2 + index * 0.1,
                          type: 'spring',
                        }}
                      >
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Progress
                        </p>
                        <motion.p
                          className={`font-bold text-lg ${
                            difference >= 0
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                          animate={
                            difference >= 0
                              ? {
                                  scale: [1, 1.1, 1],
                                }
                              : {}
                          }
                          transition={{
                            duration: 2,
                            repeat: difference >= 0 ? Infinity : 0,
                            repeatType: 'reverse',
                          }}
                        >
                          {difference > 0 ? '+' : ''}
                          {difference.toFixed(2)}
                          <span className="text-sm ml-1">
                            ({percentChange.toFixed(1)}%)
                          </span>
                        </motion.p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Motivational footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="inline-block text-2xl mb-2"
        >
          💪
        </motion.div>
        <p className="text-gray-600 dark:text-gray-400 italic">
          &quot;Every comeback starts with a single step forward&quot;
        </p>
      </motion.div>
    </motion.div>
  );
}
