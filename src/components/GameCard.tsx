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
  gameCategory?: 'squad' | 'ride-or-die';
}

export default function GameCard({ prompt, onSwipeLeft, onSwipeRight, gameCategory }: GameCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  // Nuanced color system using the new sophisticated palette
  const getCardDesign = (category: string) => {
    const categoryLower = category.toLowerCase();
    
    // Soft Pink (#FFD7E0) for romantic/intimate categories
    if (categoryLower.includes('romance') || categoryLower.includes('love') || categoryLower.includes('intimacy')) {
      return {
        background: "linear-gradient(135deg, #FFD7E0 0%, #FFB3D1 100%)",
        textColor: "#8B1538",
        accentColor: "#A4B8FD",
        iconBg: "rgba(164, 184, 253, 0.2)",
        borderColor: "rgba(255, 215, 224, 0.4)"
      };
    }
    
    // Pale Blue (#EAF0F8) for calm/reflective categories
    if (categoryLower.includes('memories') || categoryLower.includes('dreams') || categoryLower.includes('lifestyle')) {
      return {
        background: "linear-gradient(135deg, #EAF0F8 0%, #D1E7DD 100%)",
        textColor: "#2D3748",
        accentColor: "#7593CD",
        iconBg: "rgba(117, 147, 205, 0.2)",
        borderColor: "rgba(234, 240, 248, 0.4)"
      };
    }
    
    // Medium Blue (#7593CD) for thoughtful/connection categories
    if (categoryLower.includes('connection') || categoryLower.includes('vulnerability') || categoryLower.includes('deep')) {
      return {
        background: "linear-gradient(135deg, #7593CD 0%, #5A7BC7 100%)",
        textColor: "#FFFFFF",
        accentColor: "#BFFCDD",
        iconBg: "rgba(191, 252, 221, 0.2)",
        borderColor: "rgba(117, 147, 205, 0.4)"
      };
    }
    
    // Periwinkle (#A4B8FD) for dreamy/imaginative categories
    if (categoryLower.includes('adventure') || categoryLower.includes('quirky') || categoryLower.includes('funny')) {
      return {
        background: "linear-gradient(135deg, #A4B8FD 0%, #8FA4F7 100%)",
        textColor: "#2D3748",
        accentColor: "#FFD7E0",
        iconBg: "rgba(255, 215, 224, 0.2)",
        borderColor: "rgba(164, 184, 253, 0.4)"
      };
    }
    
    // Mint Green (#BFFCDD) for growth/positive categories
    if (categoryLower.includes('personality') || categoryLower.includes('fun') || categoryLower.includes('secrets')) {
      return {
        background: "linear-gradient(135deg, #BFFCDD 0%, #A8F5CC 100%)",
        textColor: "#1A365D",
        accentColor: "#7593CD",
        iconBg: "rgba(117, 147, 205, 0.2)",
        borderColor: "rgba(191, 252, 221, 0.4)"
      };
    }
    
    // Deep Black (#000000) for special/deep dive categories
    if (categoryLower.includes('lockin') || categoryLower.includes('deep') || categoryLower.includes('intimate')) {
      return {
        background: "linear-gradient(135deg, #000000 0%, #1A1A1A 100%)",
        textColor: "#FFFFFF",
        accentColor: "#A4B8FD",
        iconBg: "rgba(164, 184, 253, 0.3)",
        borderColor: "rgba(0, 0, 0, 0.6)"
      };
    }
    
    // Pure White (#FFFFFF) for neutral/clean categories
    if (categoryLower.includes('lifestyle') || categoryLower.includes('neutral') || categoryLower.includes('clean')) {
      return {
        background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
        textColor: "#2D3748",
        accentColor: "#7593CD",
        iconBg: "rgba(117, 147, 205, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.4)"
      };
    }
    
    // Default tier-based fallbacks using the new palette
    switch (prompt.tier) {
      case 'spark':
        return {
          background: "linear-gradient(135deg, #BFFCDD 0%, #A8F5CC 100%)", // Mint Green
          textColor: "#1A365D",
          accentColor: "#7593CD",
          iconBg: "rgba(117, 147, 205, 0.2)",
          borderColor: "rgba(191, 252, 221, 0.4)"
        };
      case 'vibe':
        return {
          background: "linear-gradient(135deg, #A4B8FD 0%, #8FA4F7 100%)", // Periwinkle
          textColor: "#2D3748",
          accentColor: "#FFD7E0",
          iconBg: "rgba(255, 215, 224, 0.2)",
          borderColor: "rgba(164, 184, 253, 0.4)"
        };
      case 'lockin':
        return {
          background: "linear-gradient(135deg, #7593CD 0%, #5A7BC7 100%)", // Medium Blue
          textColor: "#FFFFFF",
          accentColor: "#BFFCDD",
          iconBg: "rgba(191, 252, 221, 0.2)",
          borderColor: "rgba(117, 147, 205, 0.4)"
        };
      default:
        return {
          background: "linear-gradient(135deg, #EAF0F8 0%, #D1E7DD 100%)", // Pale Blue
          textColor: "#2D3748",
          accentColor: "#7593CD",
          iconBg: "rgba(117, 147, 205, 0.2)",
          borderColor: "rgba(234, 240, 248, 0.4)"
        };
    }
  };

  const cardDesign = getCardDesign(prompt.category);

  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(135deg, #FFD7E0 0%, #FFB3D1 100%)", // Soft Pink for skip
    cardDesign.background,
    "linear-gradient(135deg, #BFFCDD 0%, #A8F5CC 100%)"  // Mint Green for answer
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
      {/* Background gradient with subtle texture */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{ background }}
      >
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-transparent via-white to-transparent"></div>
        
        {/* Abstract 3D-inspired accent shapes */}
        <motion.div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10"
          style={{ 
            background: `radial-gradient(circle, ${cardDesign.accentColor} 0%, transparent 70%)`,
            filter: 'blur(20px)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-8"
          style={{ 
            background: `radial-gradient(circle, ${cardDesign.textColor} 0%, transparent 70%)`,
            filter: 'blur(15px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>

      {/* Card content */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full flex flex-col max-w-sm mx-auto">
        {/* Enhanced Header with sophisticated typography */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl sm:rounded-3xl flex items-center justify-center text-lg sm:text-xl shadow-xl backdrop-blur-sm"
              style={{ 
                backgroundColor: `${cardDesign.iconBg}80`,
                border: `2px solid ${cardDesign.accentColor}`,
                boxShadow: `0 8px 32px ${cardDesign.accentColor}20`
              }}
            >
              {getCategoryIcon(prompt.category)}
            </div>
            <div className="flex-1">
              <h3 className="font-craftwork text-lg sm:text-xl capitalize tracking-tight font-medium" style={{ color: cardDesign.textColor }}>
                {prompt.tier}
              </h3>
              <p className="font-craftwork text-xs sm:text-sm opacity-70 tracking-wide font-light" style={{ color: cardDesign.textColor }}>
                {prompt.category}
              </p>
            </div>
          </div>
          
          {/* Sophisticated progress indicator */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: `${cardDesign.textColor}20` }}>
              <motion.div 
                className="h-full rounded-full"
                style={{ backgroundColor: cardDesign.accentColor }}
                initial={{ width: "0%" }}
                animate={{ width: `${Math.random() * 40 + 30}%` }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cardDesign.accentColor }}></div>
              <span className="font-craftwork text-xs opacity-60" style={{ color: cardDesign.textColor }}>
                {prompt.tier === 'spark' ? '01' : prompt.tier === 'vibe' ? '02' : '03'} — 03
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Prompt text with sophisticated styling */}
        <div className="flex-1 flex items-center justify-center mb-6 sm:mb-8">
          <div className="text-center">
            <motion.h2
              className="font-craftwork text-base sm:text-lg lg:text-xl leading-relaxed px-4 sm:px-6"
              style={{ color: cardDesign.textColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {prompt.text}
            </motion.h2>

            {/* Subtle accent line */}
            <motion.div
              className="w-12 sm:w-16 h-0.5 mx-auto mt-3 sm:mt-4 rounded-full"
              style={{ backgroundColor: cardDesign.accentColor }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
        </div>

        {/* Sophisticated Swipe indicators */}
        <div className="flex justify-between items-center gap-3 sm:gap-4">
          <motion.div
            className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3 rounded-xl sm:rounded-2xl backdrop-blur-md transition-all duration-300 min-h-[48px] touch-manipulation"
            style={{
              backgroundColor: `${cardDesign.textColor}10`,
              border: `1px solid ${cardDesign.textColor}20`,
              color: cardDesign.textColor
            }}
            whileTap={{ scale: 0.95 }}
            onTap={() => onSwipeLeft()}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="font-craftwork text-xs font-medium tracking-wide">Skip</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3 rounded-xl sm:rounded-2xl backdrop-blur-md transition-all duration-300 min-h-[48px] touch-manipulation"
            style={{
              backgroundColor: `${cardDesign.accentColor}20`,
              border: `1px solid ${cardDesign.accentColor}`,
              color: cardDesign.accentColor,
              boxShadow: `0 4px 16px ${cardDesign.accentColor}30`
            }}
            whileTap={{ scale: 0.95 }}
            onTap={() => onSwipeRight()}
          >
            <span className="font-craftwork text-xs font-medium tracking-wide">Answer</span>
            <ArrowRightIcon className="w-4 h-4" />
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
                {x.get() > 0 
                  ? (gameCategory === 'squad' ? '🤝' : '💚') 
                  : (gameCategory === 'squad' ? '👋' : '💔')
                }
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

