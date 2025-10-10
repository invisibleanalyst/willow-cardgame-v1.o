'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, StarIcon, BrainIcon } from '@/components/Icons';

interface PremiumAdaptiveNudgeProps {
  prompt: string;
  userAnswer?: string;
  intimacyLevel: number;
  onResponse: (accepted: boolean) => void;
  isPremium: boolean;
}

interface AINudge {
  text: string;
  type: 'sentiment' | 'context' | 'encouragement';
  color: string;
  icon: React.ReactNode;
}

export default function PremiumAdaptiveNudge({
  prompt,
  userAnswer,
  intimacyLevel,
  onResponse,
  isPremium
}: PremiumAdaptiveNudgeProps) {
  const [nudge, setNudge] = useState<AINudge | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isPremium && userAnswer) {
      generateAdaptiveNudge();
    } else {
      // Fallback to basic nudge for free users
      setNudge({
        text: "That's a great start! Want to explore this deeper?",
        type: 'encouragement',
        color: '#FF69B4',
        icon: <HeartIcon className="w-6 h-6" />
      });
    }
  }, [userAnswer, isPremium]);

  const generateAdaptiveNudge = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/ai/sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          answer: userAnswer,
          intimacyLevel
        }),
      });

      if (response.ok) {
        const analysis = await response.json();
        const adaptiveNudge = createAdaptiveNudge(analysis);
        setNudge(adaptiveNudge);
      } else {
        // Fallback if AI fails
        setNudge({
          text: "That's interesting! Tell me more about that feeling.",
          type: 'context',
          color: '#FF69B4',
          icon: <BrainIcon className="w-6 h-6" />
        });
      }
    } catch (error) {
      console.error('AI nudge generation failed:', error);
      // Fallback nudge
      setNudge({
        text: "I'd love to hear more about that. Care to elaborate?",
        type: 'encouragement',
        color: '#FF69B4',
        icon: <HeartIcon className="w-6 h-6" />
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const createAdaptiveNudge = (analysis: any): AINudge => {
    const { sentiment, vulnerability, depth, wordCount } = analysis;

    // Context-aware nudging based on analysis
    if (vulnerability < 3) {
      return {
        text: "I sense there's more beneath the surface. What's really going on there?",
        type: 'sentiment',
        color: '#FF69B4',
        icon: <StarIcon className="w-6 h-6" />
      };
    }

    if (wordCount < 20) {
      return {
        text: "That's a start! Can you paint me a fuller picture of that moment?",
        type: 'context',
        color: '#FF69B4',
        icon: <BrainIcon className="w-6 h-6" />
      };
    }

    if (sentiment === 'positive') {
      return {
        text: "That sounds beautiful! What made that moment so special for you?",
        type: 'sentiment',
        color: '#00FFAA',
        icon: <HeartIcon className="w-6 h-6" />
      };
    }

    if (sentiment === 'negative') {
      return {
        text: "That sounds challenging. How did you work through those feelings?",
        type: 'sentiment',
        color: '#FF69B4',
        icon: <HeartIcon className="w-6 h-6" />
      };
    }

    // Default adaptive nudge
    return {
      text: "There's something intriguing about that response. Can you dig a little deeper?",
      type: 'context',
      color: '#FF69B4',
      icon: <StarIcon className="w-6 h-6" />
    };
  };

  if (!nudge) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div className="bg-theme rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto border border-willow-green border-opacity-20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `${nudge.color}20`, border: `2px solid ${nudge.color}` }}
            >
              <div style={{ color: nudge.color }}>
                {isGenerating ? (
                  <div className="loading-spinner w-8 h-8" />
                ) : (
                  nudge.icon
                )}
              </div>
            </div>
            
            <h3 className="font-craftwork-heavy text-xl text-high-contrast mb-2">
              {isPremium ? 'AI-Powered Insight' : 'Deeper Dive'}
            </h3>
            
            <p className="font-craftwork text-theme-secondary text-sm leading-relaxed">
              {nudge.text}
            </p>
          </div>

          {/* Premium badge */}
          {isPremium && (
            <div className="mb-4 p-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-10 rounded-lg border border-purple-500 border-opacity-20">
              <p className="font-craftwork text-purple-400 text-xs text-center">
                ✨ Premium AI Analysis Active
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onResponse(false)}
              className="btn-willow-outline w-full sm:w-auto px-6 py-3 min-h-[48px] flex items-center justify-center"
            >
              Skip This Time
            </button>
            <button
              onClick={() => onResponse(true)}
              className="btn-willow w-full sm:w-auto px-6 py-3 min-h-[48px] flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${nudge.color} 0%, ${nudge.color}dd 100%)`,
                borderColor: nudge.color 
              }}
            >
              {isGenerating ? 'Analyzing...' : 'Explore Deeper'}
            </button>
          </div>

          {/* Frequency indicator for premium */}
          {isPremium && (
            <div className="mt-4 text-center">
              <p className="font-craftwork text-willow-green text-xs opacity-70">
                3x more frequent insights with Premium
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
