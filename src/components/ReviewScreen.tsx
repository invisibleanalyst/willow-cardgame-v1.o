'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon, ArrowLeftIcon, ArrowRightIcon } from './Icons';

interface Answer {
  promptId: string;
  text: string;
  rating: number;
  timestamp: Date;
}

interface ReviewScreenProps {
  answers: Answer[];
  prompts: Record<string, any[]>;
  category: 'squad' | 'ride-or-die';
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewScreen({ 
  answers, 
  prompts, 
  category, 
  isOpen, 
  onClose 
}: ReviewScreenProps) {
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);

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

  const currentAnswer = answers[currentAnswerIndex];

  const handlePrevious = () => {
    if (currentAnswerIndex > 0) {
      setCurrentAnswerIndex(currentAnswerIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentAnswerIndex < answers.length - 1) {
      setCurrentAnswerIndex(currentAnswerIndex + 1);
    }
  };

  if (!isOpen) return null;

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
              Review Your Answers
            </h2>
            <p className="font-craftwork text-willow-gray text-sm sm:text-base">
              {category === 'squad' 
                ? 'Look back at your friendship bonding session!'
                : 'Look back at your romantic connection session!'
              }
            </p>
          </div>

          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-craftwork text-sm text-willow-gray">
                Answer {currentAnswerIndex + 1} of {answers.length}
              </span>
              <span className="font-craftwork text-sm text-willow-gray">
                {Math.round(((currentAnswerIndex + 1) / answers.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-willow-gray bg-opacity-20 rounded-full h-2">
              <motion.div
                className="bg-willow-green h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentAnswerIndex + 1) / answers.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Answer content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAnswerIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-willow-gray bg-opacity-5 rounded-lg p-4 sm:p-6 mb-6"
            >
              {/* Mobile-first responsive layout */}
              <div className="space-y-4">
                {/* Prompt - Full width on all screens */}
                <div className="w-full">
                  <h4 className="font-craftwork-medium text-willow-dark text-sm sm:text-base mb-3 leading-tight">
                    {getPromptText(currentAnswer.promptId)}
                  </h4>
                </div>
                
                {/* Response - Full width on all screens */}
                <div className="w-full">
                  <p className="font-craftwork text-willow-gray text-sm sm:text-base leading-relaxed">
                    {currentAnswer.text}
                  </p>
                </div>
                
                {/* Rating - Full width on mobile, right-aligned on desktop */}
                <div className="w-full sm:w-auto sm:ml-auto sm:text-right">
                  <div className="flex items-center justify-between sm:justify-end gap-2">
                    <div className={`font-craftwork-medium text-sm ${getRatingColor(currentAnswer.rating)}`}>
                      {currentAnswer.rating}/5
                    </div>
                    <div className="font-craftwork text-xs text-willow-gray">
                      {getRatingLabel(currentAnswer.rating)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentAnswerIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-craftwork-medium transition-all duration-200 ${
                currentAnswerIndex === 0
                  ? 'bg-willow-gray bg-opacity-10 text-willow-gray cursor-not-allowed'
                  : 'bg-willow-gray bg-opacity-20 hover:bg-opacity-30 text-willow-dark'
              }`}
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex gap-2">
              {answers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAnswerIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentAnswerIndex
                      ? 'bg-willow-green'
                      : 'bg-willow-gray bg-opacity-30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentAnswerIndex === answers.length - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-craftwork-medium transition-all duration-200 ${
                currentAnswerIndex === answers.length - 1
                  ? 'bg-willow-gray bg-opacity-10 text-willow-gray cursor-not-allowed'
                  : 'bg-willow-green hover:bg-willow-green-dark text-willow-dark'
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 pt-6 border-t border-willow-gray border-opacity-20">
            <p className="font-craftwork text-willow-gray text-xs sm:text-sm">
              Thank you for playing! Your answers help us improve the experience.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
