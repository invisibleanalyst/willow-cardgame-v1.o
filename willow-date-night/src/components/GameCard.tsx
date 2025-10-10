'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  ArrowRightIcon,
  SecretsIcon,
  AdventureIcon,
  VulnerabilityIcon,
  DreamsIcon,
  LifestyleIcon,
  PersonalityIcon,
  MemoriesIcon,
  ConnectionIconNew,
  IntimacyIcon,
  RomanceIcon,
  FunnyIcon,
  QuirkyIcon,
  MessageIcon,
  SparkIcon,
  FlowIcon,
  TargetIcon,
  CheckIcon,
  CloseIcon
} from './Icons';

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

  // Dynamic color system based on category type
  const getCardDesign = (category: string) => {
    const categoryLower = category.toLowerCase();
    
    // Green variants for fun/positive categories
    if (categoryLower.includes('fun') || categoryLower.includes('quirky') || categoryLower.includes('secrets') || categoryLower.includes('adventure')) {
      return {
        background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        textColor: "#FFFFFF",
        accentColor: "#FEF3C7",
        iconBg: "rgba(254, 243, 199, 0.2)",
        borderColor: "rgba(16, 185, 129, 0.3)"
      };
    }
    
    // Black variants for deep/intimate categories
    if (categoryLower.includes('intimacy') || categoryLower.includes('vulnerability') || categoryLower.includes('deep') || categoryLower.includes('connection')) {
      return {
        background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
        textColor: "#F9FAFB",
        accentColor: "#A78BFA",
        iconBg: "rgba(167, 139, 250, 0.2)",
        borderColor: "rgba(31, 41, 55, 0.3)"
      };
    }
    
    // White variants for light/neutral categories
    if (categoryLower.includes('lifestyle') || categoryLower.includes('personality') || categoryLower.includes('memories') || categoryLower.includes('dreams')) {
      return {
        background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
        textColor: "#1F2937",
        accentColor: "#3B82F6",
        iconBg: "rgba(59, 130, 246, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.3)"
      };
    }
    
    // Default dynamic based on tier
    switch (prompt.tier) {
      case 'spark':
        return {
          background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
          textColor: "#92400E",
          accentColor: "#DC2626",
          iconBg: "rgba(220, 38, 38, 0.2)",
          borderColor: "rgba(254, 243, 199, 0.3)"
        };
      case 'vibe':
        return {
          background: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)",
          textColor: "#1E40AF",
          accentColor: "#059669",
          iconBg: "rgba(5, 150, 105, 0.2)",
          borderColor: "rgba(219, 234, 254, 0.3)"
        };
      case 'lockin':
        return {
          background: "linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)",
          textColor: "#6B21A8",
          accentColor: "#EC4899",
          iconBg: "rgba(236, 72, 153, 0.2)",
          borderColor: "rgba(243, 232, 255, 0.3)"
        };
      default:
        return {
          background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
          textColor: "#FFFFFF",
          accentColor: "#FEF3C7",
          iconBg: "rgba(254, 243, 199, 0.2)",
          borderColor: "rgba(16, 185, 129, 0.3)"
        };
    }
  };

  const cardDesign = getCardDesign(prompt.category);

  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    cardDesign.background,
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

  // Modern category-based icons
  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase();
    
    if (categoryLower.includes('fun') || categoryLower.includes('quirky')) return '✨';
    if (categoryLower.includes('secrets')) return '🤫';
    if (categoryLower.includes('adventure')) return '🚀';
    if (categoryLower.includes('intimacy') || categoryLower.includes('vulnerability')) return '💎';
    if (categoryLower.includes('deep') || categoryLower.includes('connection')) return '🌟';
    if (categoryLower.includes('lifestyle')) return '☕';
    if (categoryLower.includes('personality')) return '🎭';
    if (categoryLower.includes('memories')) return '📸';
    if (categoryLower.includes('dreams')) return '🌙';
    if (categoryLower.includes('love') || categoryLower.includes('romance')) return '💖';
    
    // Default tier icons
    switch (prompt.tier) {
      case 'spark': return '⚡';
      case 'vibe': return '🌀';
      case 'lockin': return '💫';
      default: return '✨';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'spark': return '⚡';
      case 'vibe': return '🌀';
      case 'lockin': return '💫';
      default: return '✨';
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
      whileHover={{ scale: 1.02 }}
      whileDrag={{ 
        scale: 1.05, 
        rotate: 3, 
        zIndex: 50,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)"
      }}
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{ background }}
      />

      {/* Card content */}
      <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-lg"
              style={{ 
                backgroundColor: cardDesign.iconBg,
                border: `2px solid ${cardDesign.accentColor}`
              }}
            >
              {getCategoryIcon(prompt.category)}
            </div>
            <div>
              <h3 className="font-craftwork-heavy text-lg capitalize" style={{ color: cardDesign.textColor }}>
                {prompt.tier} Stage
              </h3>
              <p className="font-craftwork text-sm opacity-80" style={{ color: cardDesign.textColor }}>
                {prompt.category}
              </p>
            </div>
          </div>
        </div>

        {/* Prompt text */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <h2 
            className="font-craftwork text-xl lg:text-2xl text-center leading-relaxed px-4"
            style={{ color: cardDesign.textColor }}
          >
            {prompt.text}
          </h2>
        </div>

        {/* Swipe indicators */}
        <div className="flex justify-between items-center">
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm"
            animate={{ opacity: isDragging ? 1 : 0.4 }}
            style={{ 
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#EF4444'
            }}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-craftwork text-sm font-medium">Skip</span>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm"
            animate={{ opacity: isDragging ? 1 : 0.4 }}
            style={{ 
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              color: '#22C55E'
            }}
          >
            <span className="font-craftwork text-sm font-medium">Answer</span>
            <ArrowRightIcon className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* Drag overlay */}
      {isDragging && (
        <motion.div
          className="absolute inset-0 rounded-2xl flex items-center justify-center backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-2xl"
              style={{ 
                backgroundColor: x.get() > 0 ? '#22C55E' : '#EF4444',
                color: 'white'
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
            >
              <span className="text-3xl">
                {x.get() > 0 ? '💚' : '💔'}
              </span>
            </motion.div>
            <motion.p 
              className="font-craftwork-heavy text-xl text-white drop-shadow-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              {x.get() > 0 ? 'Answer!' : 'Skip'}
            </motion.p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

