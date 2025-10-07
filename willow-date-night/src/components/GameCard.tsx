'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';

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

  // Define helper functions first
  const getCardBackground = (tier: string) => {
    switch (tier) {
      case 'spark': 
        return "linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)";
      case 'vibe': 
        return "linear-gradient(135deg, #00FFAA 0%, #00E096 100%)";
      case 'lockin': 
        return "linear-gradient(135deg, #FFFFFF 0%, #F0F4FF 100%)";
      default: 
        return "linear-gradient(135deg, #00FFAA 0%, #00E096 100%)";
    }
  };

  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    getCardBackground(prompt.tier),
    "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)"
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
      case 'vibe': return '#FFFFFF';
      case 'lockin': return '#9B59B6';
      default: return '#00FFAA';
    }
  };

  const getTextColor = (tier: string) => {
    switch (tier) {
      case 'spark': return '#1A1A1A';
      case 'vibe': return '#FFFFFF';
      case 'lockin': return '#1A1A1A';
      default: return '#FFFFFF';
    }
  };

  const getCategoryColor = (tier: string) => {
    switch (tier) {
      case 'spark': return '#6B7280';
      case 'vibe': return 'rgba(255, 255, 255, 0.8)';
      case 'lockin': return '#6B7280';
      default: return 'rgba(255, 255, 255, 0.8)';
    }
  };

  const getSkipColor = (tier: string) => {
    switch (tier) {
      case 'spark': return '#ef4444'; // red-500
      case 'vibe': return 'rgba(255, 255, 255, 0.8)'; // white with opacity
      case 'lockin': return '#ef4444'; // red-500
      default: return '#ef4444';
    }
  };

  const getAnswerColor = (tier: string) => {
    switch (tier) {
      case 'spark': return '#22c55e'; // green-500
      case 'vibe': return 'rgba(255, 255, 255, 0.8)'; // white with opacity
      case 'lockin': return '#22c55e'; // green-500
      default: return '#22c55e';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'spark': return '🔥';
      case 'vibe': return '💫';
      case 'lockin': return '💎';
      default: return '🔥';
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
              className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
              style={{ backgroundColor: getTierColor(prompt.tier) }}
            >
              {getTierIcon(prompt.tier)}
            </div>
            <div>
              <h3 className="font-craftwork-heavy text-lg capitalize" style={{ color: getTextColor(prompt.tier) }}>
                {prompt.tier} Stage
              </h3>
              <p className="font-craftwork text-sm" style={{ color: getCategoryColor(prompt.tier) }}>
                {prompt.category}
              </p>
            </div>
          </div>
        </div>

        {/* Prompt text */}
        <div className="flex-1 flex items-center justify-center">
          <h2 
            className="font-craftwork text-lg sm:text-xl lg:text-2xl text-center leading-relaxed px-2"
            style={{ color: getTextColor(prompt.tier) }}
          >
            {prompt.text}
          </h2>
        </div>

        {/* Swipe indicators */}
        <div className="flex justify-between items-center mt-4 lg:mt-6">
          <motion.div
            className="flex items-center gap-1 lg:gap-2"
            animate={{ opacity: isDragging ? 1 : 0.3 }}
            style={{ color: getSkipColor(prompt.tier) }}
          >
            <ArrowLeftIcon className="w-5 h-5 lg:w-6 lg:h-6" />
            <span className="font-craftwork text-xs lg:text-sm">Skip</span>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-1 lg:gap-2"
            animate={{ opacity: isDragging ? 1 : 0.3 }}
            style={{ color: getAnswerColor(prompt.tier) }}
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

