'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon, HeartIcon } from '@/components/Icons';

interface VIPFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VIPFormModal({ isOpen, onClose }: VIPFormModalProps) {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/vip-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          feedback,
          tier: 'vip-experience',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Auto close after 3 seconds
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setEmail('');
          setFeedback('');
        }, 3000);
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      console.error('VIP request submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-theme rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto border border-willow-green border-opacity-20 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-theme-secondary hover:text-theme-primary transition-colors"
            >
              <CloseIcon className="w-6 h-6" />
            </button>

            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <HeartIcon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-craftwork-heavy text-2xl text-high-contrast mb-2">
                    VIP Experience Request
                  </h2>
                  <p className="font-craftwork text-theme-secondary text-sm">
                    Join our exclusive VIP program and get personalized relationship coaching
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email input */}
                  <div>
                    <label className="block font-craftwork text-high-contrast mb-2 text-sm">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg bg-theme bg-opacity-60 border border-theme text-theme-primary placeholder-theme-muted focus:outline-none focus:border-willow-green focus:ring-2 focus:ring-willow-green focus:ring-opacity-50 text-sm"
                      required
                    />
                  </div>

                  {/* Feedback input */}
                  <div>
                    <label className="block font-craftwork text-high-contrast mb-2 text-sm">
                      What would you love to see in your VIP experience?
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Tell us about your relationship goals, challenges, or any specific features you'd like..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-theme bg-opacity-60 border border-theme text-theme-primary placeholder-theme-muted focus:outline-none focus:border-willow-green focus:ring-2 focus:ring-willow-green focus:ring-opacity-50 text-sm resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-craftwork-heavy transition-all duration-200 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="loading-spinner w-5 h-5"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      'Request VIP Access'
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Success state */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-willow-green rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="w-8 h-8 text-willow-dark" />
                </div>
                <h3 className="font-craftwork-heavy text-xl text-high-contrast mb-2">
                  Request Submitted! 💜
                </h3>
                <p className="font-craftwork text-theme-secondary text-sm leading-relaxed">
                  Thank you for your interest in our VIP experience! We'll review your request and get back to you within 24 hours with exclusive access details.
                </p>
                <div className="mt-4 p-3 bg-willow-green bg-opacity-10 rounded-lg border border-willow-green border-opacity-20">
                  <p className="font-craftwork text-willow-green text-xs">
                    Check your email for confirmation and next steps.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
