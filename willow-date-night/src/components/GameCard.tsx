'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { SparkIcon, FlowIcon, DiamondIcon, ArrowLeftIcon, ArrowRightIcon } from './Icons';

interface GameCardProps {
  prompt: {
    id: string;
    text: string;
    tier: 'spark' | 'vibe' | 'lockin';
    category: string;
  };
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export default function GameCard({ prompt, onSwipeLeft, onSwipeRight }: GameCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(180deg, #ff6b6b 0%, #ee5a24 100%)",
    "linear-gradient(180deg, #00FFAA 0%, #00FFAA 100%)",
    "linear-gradient(180deg, #4ecdc4 0%, #44a08d 100%)"
  ]);

  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    const threshold = 100;

    if (info.offset.x > threshold) {
      // Swipe right
      controls.start({ x: 300, opacity: 0 });
      setTimeout(() => {
        onSwipeRight();
        x.set(0);
        y.set(0);
        controls.start({ x: 0, opacity: 1 });
      }, 300);
    } else if (info.offset.x < -threshold) {
      // Swipe left
      controls.start({ x: -300, opacity: 0 });
      setTimeout(() => {
        onSwipeLeft();
        x.set(0);
        y.set(0);
        controls.start({ x: 0, opacity: 1 });
      }, 300);
    } else {
      // Return to center
      controls.start({ x: 0, y: 0 });
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'spark': return '#FFD700';
      case 'vibe': return '#FF6B6B';
      case 'lockin': return '#9B59B6';
      default: return '#00FFAA';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'spark': return <SparkIcon className="w-6 h-6" />;
      case 'vibe': return <FlowIcon className="w-6 h-6" />;
      case 'lockin': return <DiamondIcon className="w-6 h-6" />;
      default: return <SparkIcon className="w-6 h-6" />;
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{ x, y, rotate, opacity }}
      className="willow-card cursor-grab active:cursor-grabbing"
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{ background }}
      />

      {/* Card content */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-lg"
              style={{ backgroundColor: getTierColor(prompt.tier) }}
            >
              {getTierIcon(prompt.tier)}
            </div>
            <div>
              <h3 className="font-craftwork-heavy text-lg text-willow-dark capitalize">
                {prompt.tier} Stage
              </h3>
              <p className="font-craftwork text-sm text-willow-gray">
                {prompt.category}
              </p>
            </div>
          </div>
        </div>

        {/* Prompt text */}
        <div className="flex-1 flex items-center justify-center">
          <h2 className="font-craftwork text-lg sm:text-xl lg:text-2xl text-willow-dark text-center leading-relaxed px-2">
            {prompt.text}
          </h2>
        </div>

        {/* Swipe indicators */}
        <div className="flex justify-between items-center mt-4 lg:mt-6">
          <motion.div
            className="flex items-center gap-1 lg:gap-2 text-red-500"
            animate={{ opacity: isDragging ? 1 : 0.3 }}
          >
            <ArrowLeftIcon className="w-5 h-5 lg:w-6 lg:h-6" />
            <span className="font-craftwork text-xs lg:text-sm">Skip</span>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-1 lg:gap-2 text-green-500"
            animate={{ opacity: isDragging ? 1 : 0.3 }}
          >
            <span className="font-craftwork text-xs lg:text-sm">Answer</span>
            <ArrowRightIcon className="w-5 h-5 lg:w-6 lg:h-6" />
          </motion.div>
        </div>
      </div>

      {/* Drag overlay */}
      {isDragging && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <motion.div
              className="text-6xl mb-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              {x.get() > 0 ? '✓' : '✗'}
            </motion.div>
            <p className="font-craftwork-heavy text-lg text-white">
              {x.get() > 0 ? 'Answer!' : 'Skip'}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

