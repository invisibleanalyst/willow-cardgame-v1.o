'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CloseIcon } from '@/components/Icons';
import { type Prompt } from '@/data/prompts';

interface Answer {
  promptId: string;
  text: string;
  rating: number;
  timestamp: Date;
}

interface GameCompletionScreenProps {
  answers: Answer[];
  prompts: Record<string, Prompt[]>;
  category: 'squad' | 'ride-or-die';
  onClose: () => void;
  onContinue: () => void;
}

export default function GameCompletionScreen({ 
  answers, 
  prompts, 
  category, 
  onClose, 
  onContinue 
}: GameCompletionScreenProps) {
  const [showReview, setShowReview] = useState(false);

  // Create a map of prompt ID to prompt text for quick lookup
  const promptMap = new Map<string, string>();
  Object.values(prompts).forEach(tierPrompts => {
    tierPrompts.forEach(prompt => {
      promptMap.set(prompt.id, prompt.text);
    });
  });

  // Get the prompt text for an answer, with fallback
  const getPromptText = (promptId: string): string => {
    return promptMap.get(promptId) || `Question ${promptId}`;
  };

  // Calculate statistics
  const totalAnswers = answers.length;
  const averageRating = answers.length > 0 
    ? (answers.reduce((sum, answer) => sum + answer.rating, 0) / answers.length).toFixed(1)
    : '0.0';

  const getCategoryTitle = () => {
    return category === 'squad' ? 'Squad Vibes' : 'Ride or Die';
  };

  const getCategoryDescription = () => {
    return category === 'squad' 
      ? 'You\'ve completed your friendship bonding session!'
      : 'You\'ve completed your romantic connection session!';
  };

  const getRatingLabel = (rating: number) => {
    if (category === 'squad') {
      return rating >= 4 ? 'Amazing Vibe' : rating >= 3 ? 'Good Vibe' : rating >= 2 ? 'Okay Vibe' : 'Meh Vibe';
    } else {
      return rating >= 4 ? 'Super Romantic' : rating >= 3 ? 'Pretty Romantic' : rating >= 2 ? 'Somewhat Romantic' : 'Not Very Romantic';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-willow-green';
    if (rating >= 3) return 'text-yellow-500';
    if (rating >= 2) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="fixed inset-0 bg-overlay flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="modal-content relative max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-willow-gray bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 group z-10"
        >
          <CloseIcon className="w-4 h-4 text-willow-gray group-hover:text-willow-dark" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-willow-green rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
              <span className="text-willow-dark font-bold text-2xl sm:text-3xl">W</span>
            </div>
            <h2 className="font-craftwork-heavy text-2xl sm:text-3xl text-willow-dark mb-2">
              {getCategoryTitle()} Complete!
            </h2>
            <p className="font-craftwork text-willow-gray text-sm sm:text-base">
              {getCategoryDescription()}
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-willow-green bg-opacity-10 rounded-lg p-4 text-center">
              <div className="font-craftwork-heavy text-2xl sm:text-3xl text-willow-green">
                {totalAnswers}
              </div>
              <div className="font-craftwork text-willow-gray text-xs sm:text-sm">
                Questions Answered
              </div>
            </div>
            <div className="bg-willow-green bg-opacity-10 rounded-lg p-4 text-center">
              <div className="font-craftwork-heavy text-2xl sm:text-3xl text-willow-green">
                {averageRating}
              </div>
              <div className="font-craftwork text-willow-gray text-xs sm:text-sm">
                Average Rating
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={() => setShowReview(!showReview)}
              className="flex-1 bg-willow-green hover:bg-willow-green-dark text-willow-dark font-craftwork-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {showReview ? 'Hide' : 'Review'} Your Answers
            </button>
            <button
              onClick={onContinue}
              className="flex-1 bg-willow-gray bg-opacity-20 hover:bg-opacity-30 text-willow-dark font-craftwork-medium py-3 px-6 rounded-lg transition-all duration-200"
            >
              Continue to Feedback
            </button>
          </div>

          {/* Review Section */}
          <AnimatePresence>
            {showReview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-willow-gray border-opacity-20 pt-6"
              >
                <h3 className="font-craftwork-heavy text-lg sm:text-xl text-willow-dark mb-4">
                  Your Answers
                </h3>
                <div className="max-h-96 overflow-y-auto space-y-4">
                  {answers.map((answer, index) => (
                    <motion.div
                      key={answer.promptId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-willow-gray bg-opacity-5 rounded-lg p-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                        <div className="flex-1">
                          <h4 className="font-craftwork-medium text-willow-dark text-sm sm:text-base mb-2">
                            {getPromptText(answer.promptId)}
                          </h4>
                          <p className="font-craftwork text-willow-gray text-sm sm:text-base leading-relaxed">
                            {answer.text}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                          <div className={`font-craftwork-medium text-sm ${getRatingColor(answer.rating)}`}>
                            {answer.rating}/5
                          </div>
                          <div className="font-craftwork text-xs text-willow-gray">
                            {getRatingLabel(answer.rating)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="text-center mt-6 pt-6 border-t border-willow-gray border-opacity-20">
            <p className="font-craftwork text-willow-gray text-xs sm:text-sm">
              Thank you for playing {getCategoryTitle()}! Your answers help us improve the experience.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}