'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UsersIcon, HeartIcon, ArrowRightIcon, SparkIcon, ConnectionIcon, MessageIcon, MicrophoneIcon } from '@/components/Icons';
import ThemeToggle from '@/components/ThemeToggle';

export default function CategorySelectionPage() {
  const [selectedCategory, setSelectedCategory] = useState<'squad' | 'ride-or-die' | null>(null);
  const router = useRouter();

  const handleCategorySelect = (category: 'squad' | 'ride-or-die') => {
    setSelectedCategory(category);
    // Navigate to game with category parameter
    setTimeout(() => {
      router.push(`/game?category=${category}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-theme text-theme-primary">
      {/* Header */}
      <header className="flex justify-between items-center p-4 sm:p-6 border-b border-theme flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity duration-200">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-willow-green rounded-full flex items-center justify-center shadow-lg">
            <span className="text-willow-dark font-bold text-lg sm:text-xl">W</span>
          </div>
          <h1 className="font-craftwork-heavy text-xl sm:text-2xl text-willow-green">Willow</h1>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h1 className="font-craftwork-heavy text-4xl md:text-6xl lg:text-7xl mb-6 text-high-contrast">
              Pick Your{' '}
              <span className="text-willow-green-contrast relative">
                Adventure
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-willow-green opacity-30"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </h1>
            <p className="font-craftwork text-xl md:text-2xl text-theme-secondary max-w-3xl mx-auto leading-relaxed">
              Two completely different experiences.{' '}
              <span className="text-accent-high-contrast font-medium">Same incredible results.</span>{' '}
              Choose your path and prepare for conversations that will blow your mind.
            </p>
          </motion.div>

          {/* Category Selection Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto px-4 sm:px-6">
            {/* Squad Vibes - Friends Category */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`relative group cursor-pointer transition-all duration-500 ${
                selectedCategory === 'squad' ? 'scale-105' : 'hover:scale-102'
              }`}
              onClick={() => handleCategorySelect('squad')}
            >
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border-2 border-blue-400/30 backdrop-blur-md p-6 sm:p-8 lg:p-12 h-full">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 delay-100"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <UsersIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>

                  {/* Title */}
                  <h2 className="font-craftwork-heavy text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 text-high-contrast text-center">
                    Squad Vibes
                  </h2>
                  <div className="text-center mb-3">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-craftwork-medium">
                      FRIENDS EDITION
                    </span>
                  </div>
                  
                  {/* Subtitle */}
                  <p className="font-craftwork text-base sm:text-lg text-theme-secondary mb-4 sm:mb-6 text-center leading-relaxed">
                    For friends who want to laugh harder and connect deeper
                  </p>

                  {/* Description */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="font-craftwork text-theme-primary">25 Spark prompts (light & fun)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="font-craftwork text-theme-primary">25 Vibe prompts (deeper connection)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span className="font-craftwork text-theme-primary">25 Lock-in prompts (ultimate bonding)</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex justify-center">
                    <motion.div
                      className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-craftwork font-medium text-sm shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Start Squad Session</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Ride or Die - Couples Category */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`relative group cursor-pointer transition-all duration-500 ${
                selectedCategory === 'ride-or-die' ? 'scale-105' : 'hover:scale-102'
              }`}
              onClick={() => handleCategorySelect('ride-or-die')}
            >
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-red-500/20 via-pink-500/20 to-orange-500/20 border-2 border-red-400/30 backdrop-blur-md p-6 sm:p-8 lg:p-12 h-full">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 w-24 h-24 bg-red-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 delay-100"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <HeartIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>

                  {/* Title */}
                  <h2 className="font-craftwork-heavy text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 text-high-contrast text-center">
                    Ride or Die
                  </h2>
                  <div className="text-center mb-3">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-craftwork-medium">
                      COUPLES EDITION
                    </span>
                  </div>
                  
                  {/* Subtitle */}
                  <p className="font-craftwork text-base sm:text-lg text-theme-secondary mb-4 sm:mb-6 text-center leading-relaxed">
                    For couples ready to explore love's deepest mysteries
                  </p>

                  {/* Description */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="font-craftwork text-theme-primary">25 Spark prompts (romantic discovery)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span className="font-craftwork text-theme-primary">25 Vibe prompts (intimate connection)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="font-craftwork text-theme-primary">25 Lock-in prompts (soul-deep bonding)</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex justify-center">
                    <motion.div
                      className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-craftwork font-medium text-sm shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Start Ride or Die</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-400/20 via-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12 lg:mt-16"
          >
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 bg-theme bg-opacity-40 backdrop-blur-md border border-theme px-4 py-2 rounded-full">
                <MessageIcon className="w-5 h-5 text-willow-green" />
                <span className="font-craftwork text-sm text-theme-primary">150+ Total Questions</span>
              </div>
              <div className="flex items-center gap-2 bg-theme bg-opacity-40 backdrop-blur-md border border-theme px-4 py-2 rounded-full">
                <MicrophoneIcon className="w-5 h-5 text-willow-green" />
                <span className="font-craftwork text-sm text-theme-primary">Voice & Text Input</span>
              </div>
            </div>
            <p className="font-craftwork text-theme-secondary text-sm">
              Both experiences unlock deeper levels as you progress - but the journey is completely different
            </p>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-willow-green opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-willow-green opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-willow-green opacity-15 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-purple-500 opacity-8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-pink-500 opacity-6 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

