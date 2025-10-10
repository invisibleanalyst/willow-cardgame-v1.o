'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CloseIcon } from '@/components/Icons';
import ThemeToggle from '@/components/ThemeToggle';
import GameCard from '@/components/GameCard';
import IntimacyMeter from '@/components/IntimacyMeter';
import TierSelector from '@/components/TierSelector';
import AnswerInput from '@/components/AnswerInput';
import StarRating from '@/components/StarRating';
import AdaptiveNudge from '@/components/AdaptiveNudge';
import { prompts, getRandomPrompts, type Prompt } from '@/data/prompts';

// Prompt interface is now imported from @/data/prompts

interface Answer {
  promptId: string;
  text: string;
  rating: number;
  timestamp: Date;
}

function GamePage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as 'squad' | 'ride-or-die' | null;
  
  const [currentTier, setCurrentTier] = useState<'spark' | 'vibe' | 'lockin'>('spark');
  const [intimacyLevel, setIntimacyLevel] = useState(0);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [seenPrompts, setSeenPrompts] = useState<Set<string>>(new Set());
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentRating, setCurrentRating] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState({
    spark: true,
    vibe: false,
    lockin: false
  });

  // Filter prompts based on category
  const getFilteredPrompts = (tier: 'spark' | 'vibe' | 'lockin') => {
    const tierPrompts = prompts[tier];
    
    if (category === 'squad') {
      // For Squad Vibes, filter for friendship-appropriate questions
      return tierPrompts.filter(prompt => {
        // Check if prompt has categoryType and it's squad or both
        if (prompt.categoryType) {
          return prompt.categoryType === 'squad' || prompt.categoryType === 'both';
        }
        
        // Fallback to text-based filtering for existing prompts
        return !prompt.category.toLowerCase().includes('intimacy') &&
               !prompt.category.toLowerCase().includes('romance') &&
               !prompt.category.toLowerCase().includes('love') &&
               !prompt.category.toLowerCase().includes('sexual') &&
               !prompt.text.toLowerCase().includes('partner') &&
               !prompt.text.toLowerCase().includes('relationship') &&
               !prompt.text.toLowerCase().includes('our ') &&
               !prompt.text.toLowerCase().includes('together') &&
               !prompt.text.toLowerCase().includes('us ');
      });
    } else if (category === 'ride-or-die') {
      // For Ride or Die, include all questions (couples can handle everything)
      return tierPrompts;
    }
    
    // Default to all prompts if no category
    return tierPrompts;
  };

  const currentPrompts = getFilteredPrompts(currentTier);
  const currentPrompt = currentPrompts[currentPromptIndex];

  // Calculate statistics
  const getTotalQuestions = () => {
    return Object.keys(prompts).reduce((total, tier) => {
      return total + getFilteredPrompts(tier as 'spark' | 'vibe' | 'lockin').length;
    }, 0);
  };

  const totalQuestions = getTotalQuestions();
  const answeredQuestions = answers.length;
  const seenQuestions = seenPrompts.size;

  // Redirect to category selection if no category is selected
  useEffect(() => {
    if (!category) {
      window.location.href = '/category-selection';
    }
  }, [category]);

  // Check if tier should be unlocked
  useEffect(() => {
    if (intimacyLevel >= 50 && !isUnlocked.vibe) {
      setIsUnlocked(prev => ({ ...prev, vibe: true }));
    }
    if (intimacyLevel >= 75 && !isUnlocked.lockin) {
      setIsUnlocked(prev => ({ ...prev, lockin: true }));
    }
  }, [intimacyLevel, isUnlocked]);

  const handleSwipeLeft = () => {
    // Track seen prompt
    if (currentPrompt) {
      setSeenPrompts(prev => new Set(prev).add(currentPrompt.id));
    }
    // Skip current prompt
    setCurrentPromptIndex(prev => (prev + 1) % currentPrompts.length);
  };

  const handleSwipeRight = () => {
    // Track seen prompt
    if (currentPrompt) {
      setSeenPrompts(prev => new Set(prev).add(currentPrompt.id));
    }
    // Show answer input
    setShowAnswerInput(true);
  };

  const handleAnswerSubmit = (answer: string) => {
    setCurrentAnswer(answer);
    setShowAnswerInput(false);
    setShowRating(true);
  };

  const handleRatingSubmit = (rating: number) => {
    const newAnswer: Answer = {
      promptId: currentPrompt.id,
      text: currentAnswer,
      rating,
      timestamp: new Date()
    };

    setAnswers(prev => [...prev, newAnswer]);
    setIntimacyLevel(prev => Math.min(prev + 10, 100));
    setCurrentRating(rating);
    setShowRating(false);

    // Check for adaptive nudge
    if (currentAnswer.length < 20 || rating < 3) {
      setTimeout(() => setShowNudge(true), 1000);
    }

    // Move to next prompt
    setTimeout(() => {
      setCurrentPromptIndex(prev => (prev + 1) % currentPrompts.length);
      setCurrentAnswer('');
      setCurrentRating(0);
    }, 2000);
  };

  const handleNudgeResponse = (accepted: boolean) => {
    setShowNudge(false);
    if (accepted) {
      // Move to next tier if available
      if (currentTier === 'spark' && isUnlocked.vibe) {
        setCurrentTier('vibe');
        setCurrentPromptIndex(0);
      } else if (currentTier === 'vibe' && isUnlocked.lockin) {
        setCurrentTier('lockin');
        setCurrentPromptIndex(0);
      }
    }
  };

  const handleTierChange = (tier: 'spark' | 'vibe' | 'lockin') => {
    if (isUnlocked[tier]) {
      setCurrentTier(tier);
      setCurrentPromptIndex(0);
    }
  };

  // Get tier statistics for the tier selector
  const getTierStats = () => {
    return {
      spark: getFilteredPrompts('spark').length,
      vibe: getFilteredPrompts('vibe').length,
      lockin: getFilteredPrompts('lockin').length
    };
  };

  return (
    <div className="min-h-screen bg-theme text-theme-primary flex flex-col">

      {/* Header */}
      <header className="flex justify-between items-center p-4 sm:p-6 border-b border-theme flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity duration-200">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-willow-green rounded-full flex items-center justify-center shadow-lg">
            <span className="text-willow-dark font-bold text-lg sm:text-xl">W</span>
          </div>
          <h1 className="font-craftwork-heavy text-xl sm:text-2xl text-willow-green">Willow</h1>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          
          {/* Category Badge */}
          {category && (
            <div className="hidden sm:flex items-center gap-2 bg-black bg-opacity-30 px-3 py-2 rounded-full">
              <span className="font-craftwork text-willow-green text-xs">
                {category === 'squad' ? 'Squad Vibes' : 'Ride or Die'}
              </span>
            </div>
          )}
          
          {/* Question Counters */}
          <div className="flex items-center gap-2 bg-black bg-opacity-30 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
            <span className="font-craftwork text-willow-gray text-xs sm:text-sm">
              {answeredQuestions}/{seenQuestions}/{totalQuestions}
            </span>
          </div>
          
          {/* Intimacy Level */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-willow-green rounded-full flex items-center justify-center shadow-lg">
            <span className="text-willow-dark font-bold text-xs sm:text-sm">
              {Math.floor(intimacyLevel / 10)}
            </span>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <div className="flex-1 flex justify-center items-center px-4 sm:px-6 py-4">
        <div className="relative w-full max-w-6xl">
          {/* Mobile Layout */}
          <div className="block lg:hidden">
            {/* Game Cards - Mobile Centered */}
            <div className="flex justify-center mb-8">
              <div className="willow-card-stack">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentTier}-${currentPromptIndex}`}
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GameCard
                      prompt={currentPrompt}
                      onSwipeLeft={handleSwipeLeft}
                      onSwipeRight={handleSwipeRight}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Intimacy Meter - Mobile Below Card */}
            <div className="flex justify-center">
              <IntimacyMeter
                level={intimacyLevel}
                isPulsing={intimacyLevel >= 75}
              />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            {/* Game Cards - Perfectly Centered */}
            <div className="flex justify-center">
              <div className="willow-card-stack">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentTier}-${currentPromptIndex}`}
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GameCard
                      prompt={currentPrompt}
                      onSwipeLeft={handleSwipeLeft}
                      onSwipeRight={handleSwipeRight}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Intimacy Meter - Positioned absolutely on the right */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <IntimacyMeter
                level={intimacyLevel}
                isPulsing={intimacyLevel >= 75}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tier Selector */}
      <div className="flex justify-center p-4 sm:p-6 flex-shrink-0">
        <TierSelector
          currentTier={currentTier}
          isUnlocked={isUnlocked}
          onTierChange={handleTierChange}
          tierStats={getTierStats()}
        />
      </div>

      {/* Answer Input Modal */}
      <AnimatePresence>
            {showAnswerInput && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-overlay flex items-center justify-center p-4 z-50"
              >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="modal-content relative"
            >
              {/* Close button */}
              <button
                onClick={() => setShowAnswerInput(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-willow-gray bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 group"
              >
                <CloseIcon className="w-4 h-4 text-willow-gray group-hover:text-willow-dark" />
              </button>
              
              <h3 className="font-craftwork-heavy text-xl mb-4 text-willow-dark pr-12">
                {currentPrompt.text}
              </h3>
              <AnswerInput
                onSubmit={handleAnswerSubmit}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Star Rating Modal */}
      <AnimatePresence>
            {showRating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-overlay flex items-center justify-center p-4 z-50"
              >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="modal-content relative"
            >
              {/* Close button */}
              <button
                onClick={() => setShowRating(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-willow-gray bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 group"
              >
                <CloseIcon className="w-4 h-4 text-willow-gray group-hover:text-willow-dark" />
              </button>
              
              <h3 className="font-craftwork-heavy text-xl mb-4 text-willow-dark pr-12">
                {category === 'squad' 
                  ? "How good was this vibe?" 
                  : "How romantic was this?"
                }
              </h3>
              <StarRating
                rating={currentRating}
                onRatingChange={setCurrentRating}
                onSubmit={handleRatingSubmit}
                category={category || undefined}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Adaptive Nudge Modal */}
      <AnimatePresence>
            {showNudge && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-overlay flex items-center justify-center p-4 z-50"
              >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="modal-content relative"
            >
              {/* Close button */}
              <button
                onClick={() => setShowNudge(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-willow-gray bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 group z-10"
              >
                <CloseIcon className="w-4 h-4 text-willow-gray group-hover:text-willow-dark" />
              </button>
              
              <AdaptiveNudge
                currentTier={currentTier}
                isUnlocked={isUnlocked}
                onResponse={handleNudgeResponse}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-willow-green opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-willow-green opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-willow-green opacity-15 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}

export default function GamePageWithSuspense() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-theme text-theme-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-willow-green rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-willow-dark font-bold text-lg sm:text-xl">W</span>
          </div>
          <p className="font-craftwork text-theme-secondary">Loading your game...</p>
        </div>
      </div>
    }>
      <GamePage />
    </Suspense>
  );
}

