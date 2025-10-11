'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, StarIcon, MessageIcon, XIcon, CheckIcon } from './Icons';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: FeedbackData) => void;
  gameStats?: {
    tier: string;
    questionsAnswered: number;
    timeSpent: number;
  };
}

interface FeedbackData {
  overallRating: number;
  experience: string;
  favoriteAspects: string[];
  improvements: string;
  newFeatures: string;
  wouldRecommend: boolean;
  additionalComments: string;
  email?: string;
}

export default function FeedbackForm({ isOpen, onClose, onSubmit, gameStats }: FeedbackFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [feedback, setFeedback] = useState<FeedbackData>({
    overallRating: 0,
    experience: '',
    favoriteAspects: [],
    improvements: '',
    newFeatures: '',
    wouldRecommend: false,
    additionalComments: '',
    email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const favoriteOptions = [
    'The conversation prompts',
    'The intimacy meter progression',
    'The tier system (Spark/Vibe/Lock-In)',
    'The mobile-friendly design',
    'The dark theme aesthetic',
    'The AI-powered nudges',
    'The relationship building aspect',
    'The ease of use'
  ];

  const handleRatingClick = (rating: number) => {
    setFeedback(prev => ({ ...prev, overallRating: rating }));
  };

  const handleFavoriteToggle = (aspect: string) => {
    setFeedback(prev => ({
      ...prev,
      favoriteAspects: prev.favoriteAspects.includes(aspect)
        ? prev.favoriteAspects.filter(a => a !== aspect)
        : [...prev.favoriteAspects, aspect]
    }));
  };

  const handleInputChange = (field: keyof FeedbackData, value: string | boolean) => {
    setFeedback(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSubmit(feedback);
      setIsSubmitted(true);
      
      // Auto close after 3 seconds
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setCurrentStep(1);
        setFeedback({
          overallRating: 0,
          experience: '',
          favoriteAspects: [],
          improvements: '',
          newFeatures: '',
          wouldRecommend: false,
          additionalComments: '',
          email: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return feedback.overallRating > 0;
      case 2: return feedback.experience.trim().length > 0;
      case 3: return feedback.favoriteAspects.length > 0;
      case 4: return feedback.improvements.trim().length > 0;
      case 5: return true; // Optional step
      case 6: return true; // Optional step
      default: return false;
    }
  };

  const nextStep = () => {
    if (canProceed() && currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-theme rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-willow-green rounded-full flex items-center justify-center">
                <HeartIcon className="w-5 h-5 text-willow-dark" />
              </div>
              <div>
                <h2 className="font-craftwork-heavy text-xl text-theme-primary">
                  Share Your Experience
                </h2>
                <p className="font-craftwork text-sm text-theme-secondary">
                  Help us make Willow even better
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-theme-secondary hover:text-theme-primary transition-colors p-2"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-theme-secondary mb-2">
              <span>Step {currentStep} of 6</span>
              <span>{Math.round((currentStep / 6) * 100)}%</span>
            </div>
            <div className="w-full bg-theme-secondary bg-opacity-20 rounded-full h-2">
              <motion.div
                className="bg-willow-green h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / 6) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Game Stats */}
          {gameStats && (
            <div className="bg-willow-green bg-opacity-10 rounded-xl p-4 mb-6">
              <h3 className="font-craftwork-heavy text-sm text-willow-green mb-2">
                Your Game Session
              </h3>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-theme-secondary">Tier:</span>
                  <span className="text-theme-primary ml-1 font-medium">{gameStats.tier}</span>
                </div>
                <div>
                  <span className="text-theme-secondary">Questions:</span>
                  <span className="text-theme-primary ml-1 font-medium">{gameStats.questionsAnswered}</span>
                </div>
                <div>
                  <span className="text-theme-secondary">Time:</span>
                  <span className="text-theme-primary ml-1 font-medium">{gameStats.timeSpent}min</span>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-willow-green rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-willow-dark" />
              </div>
              <h3 className="font-craftwork-heavy text-xl text-theme-primary mb-2">
                Thank You! 🎉
              </h3>
              <p className="font-craftwork text-theme-secondary">
                Your feedback helps us create better experiences for couples everywhere.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Step 1: Overall Rating */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-craftwork-heavy text-lg text-theme-primary mb-2">
                      How would you rate your overall experience?
                    </h3>
                    <p className="font-craftwork text-theme-secondary text-sm">
                      Your honest feedback helps us improve
                    </p>
                  </div>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRatingClick(rating)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                          feedback.overallRating >= rating
                            ? 'bg-willow-green text-willow-dark'
                            : 'bg-theme-secondary bg-opacity-20 text-theme-secondary hover:bg-opacity-30'
                        }`}
                      >
                        <StarIcon className="w-6 h-6" />
                      </button>
                    ))}
                  </div>
                  {feedback.overallRating > 0 && (
                    <p className="text-center font-craftwork text-sm text-theme-secondary">
                      {feedback.overallRating === 1 && "We're sorry to hear that. We'll work to improve!"}
                      {feedback.overallRating === 2 && "Thanks for the feedback. We're listening!"}
                      {feedback.overallRating === 3 && "Good to know! We can definitely do better."}
                      {feedback.overallRating === 4 && "Great! We're glad you enjoyed it."}
                      {feedback.overallRating === 5 && "Amazing! We're thrilled you loved it!"}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Step 2: Experience Description */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-craftwork-heavy text-lg text-theme-primary mb-2">
                      Tell us about your experience
                    </h3>
                    <p className="font-craftwork text-theme-secondary text-sm">
                      What was it like playing Willow together?
                    </p>
                  </div>
                  <textarea
                    value={feedback.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="Share your thoughts about the conversation, connection, and overall experience..."
                    className="w-full h-32 px-4 py-3 bg-theme bg-opacity-60 border border-theme text-theme-primary placeholder-theme-muted rounded-xl focus:outline-none focus:border-willow-green focus:ring-2 focus:ring-willow-green focus:ring-opacity-50 resize-none"
                  />
                </motion.div>
              )}

              {/* Step 3: Favorite Aspects */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-craftwork-heavy text-lg text-theme-primary mb-2">
                      What did you love most?
                    </h3>
                    <p className="font-craftwork text-theme-secondary text-sm">
                      Select all that apply
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {favoriteOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleFavoriteToggle(option)}
                        className={`p-3 rounded-xl text-left transition-all duration-200 ${
                          feedback.favoriteAspects.includes(option)
                            ? 'bg-willow-green text-willow-dark'
                            : 'bg-theme bg-opacity-20 text-theme-primary hover:bg-opacity-30'
                        }`}
                      >
                        <span className="font-craftwork text-sm">{option}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Improvements */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-craftwork-heavy text-lg text-theme-primary mb-2">
                      What could we improve?
                    </h3>
                    <p className="font-craftwork text-theme-secondary text-sm">
                      Help us make Willow even better
                    </p>
                  </div>
                  <textarea
                    value={feedback.improvements}
                    onChange={(e) => handleInputChange('improvements', e.target.value)}
                    placeholder="Share your suggestions for improvements, new features, or changes you'd like to see..."
                    className="w-full h-32 px-4 py-3 bg-theme bg-opacity-60 border border-theme text-theme-primary placeholder-theme-muted rounded-xl focus:outline-none focus:border-willow-green focus:ring-2 focus:ring-willow-green focus:ring-opacity-50 resize-none"
                  />
                </motion.div>
              )}

              {/* Step 5: New Features */}
              {currentStep === 5 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-craftwork-heavy text-lg text-theme-primary mb-2">
                      What new features would you love to see?
                    </h3>
                    <p className="font-craftwork text-theme-secondary text-sm">
                      Help us plan our roadmap
                    </p>
                  </div>
                  <textarea
                    value={feedback.newFeatures}
                    onChange={(e) => handleInputChange('newFeatures', e.target.value)}
                    placeholder="Ideas for new features, game modes, or experiences you'd like to see in future updates..."
                    className="w-full h-32 px-4 py-3 bg-theme bg-opacity-60 border border-theme text-theme-primary placeholder-theme-muted rounded-xl focus:outline-none focus:border-willow-green focus:ring-2 focus:ring-willow-green focus:ring-opacity-50 resize-none"
                  />
                </motion.div>
              )}

              {/* Step 6: Final Questions */}
              {currentStep === 6 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-craftwork-heavy text-lg text-theme-primary mb-2">
                      Almost done! A few final questions
                    </h3>
                  </div>

                  {/* Would Recommend */}
                  <div className="space-y-3">
                    <p className="font-craftwork text-theme-primary">
                      Would you recommend Willow to other couples?
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleInputChange('wouldRecommend', true)}
                        className={`flex-1 py-3 px-4 rounded-xl transition-all duration-200 ${
                          feedback.wouldRecommend === true
                            ? 'bg-willow-green text-willow-dark'
                            : 'bg-theme bg-opacity-20 text-theme-primary hover:bg-opacity-30'
                        }`}
                      >
                        <span className="font-craftwork">Yes, definitely! 💚</span>
                      </button>
                      <button
                        onClick={() => handleInputChange('wouldRecommend', false)}
                        className={`flex-1 py-3 px-4 rounded-xl transition-all duration-200 ${
                          feedback.wouldRecommend === false
                            ? 'bg-willow-green text-willow-dark'
                            : 'bg-theme bg-opacity-20 text-theme-primary hover:bg-opacity-30'
                        }`}
                      >
                        <span className="font-craftwork">Maybe</span>
                      </button>
                    </div>
                  </div>

                  {/* Email (Optional) */}
                  <div className="space-y-2">
                    <p className="font-craftwork text-theme-primary">
                      Email (optional) - for updates on new features
                    </p>
                    <input
                      type="email"
                      value={feedback.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-theme bg-opacity-60 border border-theme text-theme-primary placeholder-theme-muted rounded-xl focus:outline-none focus:border-willow-green focus:ring-2 focus:ring-willow-green focus:ring-opacity-50"
                    />
                  </div>

                  {/* Additional Comments */}
                  <div className="space-y-2">
                    <p className="font-craftwork text-theme-primary">
                      Any other thoughts? (optional)
                    </p>
                    <textarea
                      value={feedback.additionalComments}
                      onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                      placeholder="Anything else you'd like to share..."
                      className="w-full h-24 px-4 py-3 bg-theme bg-opacity-60 border border-theme text-theme-primary placeholder-theme-muted rounded-xl focus:outline-none focus:border-willow-green focus:ring-2 focus:ring-willow-green focus:ring-opacity-50 resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-xl font-craftwork transition-all duration-200 ${
                    currentStep === 1
                      ? 'bg-theme-secondary bg-opacity-10 text-theme-secondary cursor-not-allowed'
                      : 'bg-theme bg-opacity-20 text-theme-primary hover:bg-opacity-30'
                  }`}
                >
                  Back
                </button>

                {currentStep < 6 ? (
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={`px-6 py-3 rounded-xl font-craftwork transition-all duration-200 ${
                      canProceed()
                        ? 'bg-willow-green text-willow-dark hover:bg-opacity-90'
                        : 'bg-theme-secondary bg-opacity-10 text-theme-secondary cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-willow-green text-willow-dark rounded-xl font-craftwork hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
