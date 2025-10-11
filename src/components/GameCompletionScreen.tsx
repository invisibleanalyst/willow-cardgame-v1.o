'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, StarIcon, TrophyIcon, ShareIcon, MessageIcon, ArrowRightIcon } from './Icons';
import FeedbackForm from './FeedbackForm';

interface GameCompletionScreenProps {
  isOpen: boolean;
  onClose: () => void;
  gameStats: {
    tier: string;
    questionsAnswered: number;
    timeSpent: number;
    intimacyLevel: number;
    category: 'squad' | 'ride-or-die';
  };
  onPlayAgain: () => void;
  onNewCategory: () => void;
}

export default function GameCompletionScreen({ 
  isOpen, 
  onClose, 
  gameStats, 
  onPlayAgain, 
  onNewCategory 
}: GameCompletionScreenProps) {
  const [showFeedback, setShowFeedback] = useState(false);

  const handleFeedbackSubmit = async (feedback: any) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...feedback,
          gameStats
        }),
      });

      if (response.ok) {
        console.log('Feedback submitted successfully');
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const getCompletionMessage = () => {
    const { tier, intimacyLevel, category } = gameStats;
    
    if (tier === 'spark') {
      return {
        title: "Great Start! ✨",
        message: "You've taken the first step in deepening your connection. Keep the conversation flowing!",
        color: "text-yellow-400"
      };
    } else if (tier === 'vibe') {
      return {
        title: "Building Bonds! 💫",
        message: "You're really getting to know each other better. The connection is growing stronger!",
        color: "text-blue-400"
      };
    } else {
      return {
        title: "Locked In! 💎",
        message: "Amazing! You've reached the deepest level of connection. Your bond is truly special.",
        color: "text-purple-400"
      };
    }
  };

  const getIntimacyMessage = () => {
    const { intimacyLevel } = gameStats;
    
    if (intimacyLevel >= 80) {
      return "Incredible intimacy level! You two are deeply connected.";
    } else if (intimacyLevel >= 60) {
      return "Great intimacy level! Your connection is strong.";
    } else if (intimacyLevel >= 40) {
      return "Good intimacy level! You're building a solid foundation.";
    } else {
      return "Keep going! Every conversation brings you closer.";
    }
  };

  const completionData = getCompletionMessage();

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-theme rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-willow-green rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <TrophyIcon className="w-10 h-10 text-willow-dark" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`font-craftwork-heavy text-2xl mb-2 ${completionData.color}`}
              >
                {completionData.title}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-craftwork text-theme-secondary"
              >
                {completionData.message}
              </motion.p>
            </div>

            {/* Game Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-willow-green bg-opacity-10 rounded-xl p-4 mb-6"
            >
              <h3 className="font-craftwork-heavy text-sm text-willow-green mb-3">
                Your Session Summary
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-theme-secondary">Category:</span>
                    <span className="text-theme-primary font-medium capitalize">
                      {gameStats.category === 'squad' ? 'Squad Vibes' : 'Ride or Die'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-secondary">Tier:</span>
                    <span className="text-theme-primary font-medium capitalize">
                      {gameStats.tier}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-theme-secondary">Questions:</span>
                    <span className="text-theme-primary font-medium">
                      {gameStats.questionsAnswered}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-secondary">Time:</span>
                    <span className="text-theme-primary font-medium">
                      {gameStats.timeSpent}min
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Intimacy Level */}
              <div className="mt-4 pt-4 border-t border-willow-green border-opacity-20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-theme-secondary text-sm">Intimacy Level</span>
                  <span className="text-willow-green font-medium text-sm">
                    {gameStats.intimacyLevel}%
                  </span>
                </div>
                <div className="w-full bg-theme-secondary bg-opacity-20 rounded-full h-2">
                  <motion.div
                    className="bg-willow-green h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${gameStats.intimacyLevel}%` }}
                    transition={{ delay: 0.8, duration: 1 }}
                  />
                </div>
                <p className="text-xs text-theme-secondary mt-2">
                  {getIntimacyMessage()}
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <button
                onClick={() => setShowFeedback(true)}
                className="w-full bg-willow-green text-willow-dark py-3 px-4 rounded-xl font-craftwork-heavy hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <MessageIcon className="w-4 h-4" />
                Share Your Experience
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onPlayAgain}
                  className="bg-theme bg-opacity-20 text-theme-primary py-3 px-4 rounded-xl font-craftwork hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <HeartIcon className="w-4 h-4" />
                  Play Again
                </button>
                <button
                  onClick={onNewCategory}
                  className="bg-theme bg-opacity-20 text-theme-primary py-3 px-4 rounded-xl font-craftwork hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowRightIcon className="w-4 h-4" />
                  New Category
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-full text-theme-secondary hover:text-theme-primary py-2 font-craftwork transition-colors duration-200"
              >
                Close
              </button>
            </motion.div>

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-6 pt-6 border-t border-theme-secondary border-opacity-20"
            >
              <p className="text-center text-theme-secondary text-sm mb-3">
                Loved your experience? Share Willow with other couples!
              </p>
              <div className="flex justify-center gap-3">
                <button className="p-2 bg-theme bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200">
                  <ShareIcon className="w-5 h-5 text-theme-primary" />
                </button>
                <button className="p-2 bg-theme bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200">
                  <span className="text-theme-primary text-sm font-craftwork">Copy Link</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Feedback Form Modal */}
      <FeedbackForm
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        onSubmit={handleFeedbackSubmit}
        gameStats={gameStats}
      />
    </>
  );
}
