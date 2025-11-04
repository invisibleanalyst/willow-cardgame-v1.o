'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';
import { usePromptGenerator } from '@/hooks/usePromptGenerator';

interface DynamicGameCardProps {
  category: 'squad' | 'ride-or-die';
  tier: 'spark' | 'vibe' | 'lockin';
  pack: 'free' | 'premium';
  onSwipeLeft: () => void;
  onSwipeRight: (prompt: any) => void;
  gameCategory?: 'squad' | 'ride-or-die';
}

export default function DynamicGameCard({ 
  category, 
  tier, 
  pack, 
  onSwipeLeft, 
  onSwipeRight, 
  gameCategory 
}: DynamicGameCardProps) {
  const [currentPrompt, setCurrentPrompt] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { generatePrompt, markPromptAsUsed, isLoading: isGenerating } = usePromptGenerator();

  // Load initial prompt
  useEffect(() => {
    loadPrompt();
  }, [category, tier, pack]);

  const loadPrompt = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const prompt = await generatePrompt(category, tier, pack);
      if (prompt) {
        setCurrentPrompt(prompt);
      } else {
        setError('Failed to generate prompt');
      }
    } catch (err) {
      setError('Error loading prompt');
      console.error('Error loading prompt:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwipeLeft = async () => {
    if (currentPrompt) {
      // Mark prompt as used when skipped
      await markPromptAsUsed(currentPrompt.id);
    }
    onSwipeLeft();
  };

  const handleSwipeRight = async () => {
    if (currentPrompt) {
      // Mark prompt as used when answered
      await markPromptAsUsed(currentPrompt.id);
      onSwipeRight(currentPrompt);
    }
  };

  // Loading state
  if (isLoading || isGenerating) {
    return (
      <div className="willow-card">
        <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full flex flex-col items-center justify-center">
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: '#BFFCDD' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-2xl">✨</span>
          </motion.div>
          <p className="font-craftwork text-willow-gray text-center">
            Generating your perfect prompt...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !currentPrompt) {
    return (
      <div className="willow-card">
        <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-red-100">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="font-craftwork text-red-600 text-center mb-4">
            {error || 'Failed to load prompt'}
          </p>
          <button
            onClick={loadPrompt}
            className="px-4 py-2 bg-willow-green text-willow-dark rounded-lg font-craftwork-medium hover:bg-willow-green-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Card design based on category and tier
  const getCardDesign = () => {
    const isSquad = category === 'squad';
    
    if (isSquad) {
      // Squad designs - more playful and individual-focused
      switch (tier) {
        case 'spark':
          return {
            background: "linear-gradient(135deg, #BFFCDD 0%, #A8F5CC 100%)", // Mint Green
            textColor: "#1A365D",
            accentColor: "#7593CD",
            iconBg: "rgba(117, 147, 205, 0.2)",
            borderColor: "rgba(191, 252, 221, 0.4)",
            icon: "⚡"
          };
        case 'vibe':
          return {
            background: "linear-gradient(135deg, #A4B8FD 0%, #8FA4F7 100%)", // Periwinkle
            textColor: "#2D3748",
            accentColor: "#FFD7E0",
            iconBg: "rgba(255, 215, 224, 0.2)",
            borderColor: "rgba(164, 184, 253, 0.4)",
            icon: "🌀"
          };
        case 'lockin':
          return {
            background: "linear-gradient(135deg, #7593CD 0%, #5A7BC7 100%)", // Medium Blue
            textColor: "#FFFFFF",
            accentColor: "#BFFCDD",
            iconBg: "rgba(191, 252, 221, 0.2)",
            borderColor: "rgba(117, 147, 205, 0.4)",
            icon: "💫"
          };
      }
    } else {
      // Ride or Die designs - more romantic and couple-focused
      switch (tier) {
        case 'spark':
          return {
            background: "linear-gradient(135deg, #FFD7E0 0%, #FFB3D1 100%)", // Soft Pink
            textColor: "#8B1538",
            accentColor: "#A4B8FD",
            iconBg: "rgba(164, 184, 253, 0.2)",
            borderColor: "rgba(255, 215, 224, 0.4)",
            icon: "💖"
          };
        case 'vibe':
          return {
            background: "linear-gradient(135deg, #EAF0F8 0%, #D1E7DD 100%)", // Pale Blue
            textColor: "#2D3748",
            accentColor: "#7593CD",
            iconBg: "rgba(117, 147, 205, 0.2)",
            borderColor: "rgba(234, 240, 248, 0.4)",
            icon: "💕"
          };
        case 'lockin':
          return {
            background: "linear-gradient(135deg, #000000 0%, #1A1A1A 100%)", // Deep Black
            textColor: "#FFFFFF",
            accentColor: "#A4B8FD",
            iconBg: "rgba(164, 184, 253, 0.3)",
            borderColor: "rgba(0, 0, 0, 0.6)",
            icon: "💎"
          };
      }
    }
  };

  const cardDesign = getCardDesign();

  return (
    <motion.div
      className="willow-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{ background: cardDesign.background }}
      >
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-transparent via-white to-transparent"></div>
        
        {/* Animated accent shapes */}
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
      </div>

      {/* Card content */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full flex flex-col max-w-sm mx-auto">
        {/* Header */}
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
              {cardDesign.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-craftwork text-lg sm:text-xl capitalize tracking-tight font-medium" style={{ color: cardDesign.textColor }}>
                {tier}
              </h3>
              <p className="font-craftwork text-xs sm:text-sm opacity-70 tracking-wide font-light" style={{ color: cardDesign.textColor }}>
                {category === 'squad' ? 'Squad Vibes' : 'Ride or Die'}
              </p>
            </div>
          </div>
          
          {/* Progress indicator */}
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
                {tier === 'spark' ? '01' : tier === 'vibe' ? '02' : '03'} — 03
              </span>
            </div>
          </div>
        </div>

        {/* Prompt text */}
        <div className="flex-1 flex items-center justify-center mb-6 sm:mb-8">
          <div className="text-center">
            <motion.h2
              className="font-craftwork text-base sm:text-lg lg:text-xl leading-relaxed px-4 sm:px-6"
              style={{ color: cardDesign.textColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {currentPrompt.text}
            </motion.h2>

            {/* Accent line */}
            <motion.div
              className="w-12 sm:w-16 h-0.5 mx-auto mt-3 sm:mt-4 rounded-full"
              style={{ backgroundColor: cardDesign.accentColor }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center gap-3 sm:gap-4">
          <motion.button
            className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3 rounded-xl sm:rounded-2xl backdrop-blur-md transition-all duration-300 min-h-[48px] touch-manipulation"
            style={{
              backgroundColor: `${cardDesign.textColor}10`,
              border: `1px solid ${cardDesign.textColor}20`,
              color: cardDesign.textColor
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSwipeLeft}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="font-craftwork text-xs font-medium tracking-wide">Skip</span>
          </motion.button>

          <motion.button
            className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3 rounded-xl sm:rounded-2xl backdrop-blur-md transition-all duration-300 min-h-[48px] touch-manipulation"
            style={{
              backgroundColor: `${cardDesign.accentColor}20`,
              border: `1px solid ${cardDesign.accentColor}`,
              color: cardDesign.accentColor,
              boxShadow: `0 4px 16px ${cardDesign.accentColor}30`
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSwipeRight}
          >
            <span className="font-craftwork text-xs font-medium tracking-wide">Answer</span>
            <ArrowRightIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
