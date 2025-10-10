'use client';

import { motion } from 'framer-motion';
import { SparkIcon, FlowIcon, DiamondIcon, LockIcon } from './Icons';

interface MobileProgressSectionProps {
  level: number;
  currentTier: 'spark' | 'vibe' | 'lockin';
  isUnlocked: {
    spark: boolean;
    vibe: boolean;
    lockin: boolean;
  };
  onTierChange: (tier: 'spark' | 'vibe' | 'lockin') => void;
}

export default function MobileProgressSection({ 
  level, 
  currentTier, 
  isUnlocked, 
  onTierChange 
}: MobileProgressSectionProps) {
  const getLevelLabel = (level: number) => {
    if (level < 25) return 'Getting Started';
    if (level < 50) return 'Building Connection';
    if (level < 75) return 'Deepening Bonds';
    return 'Locked In';
  };

  const getProgressColor = (level: number) => {
    if (level < 25) return '#FF6B6B';
    if (level < 50) return '#FFD700';
    if (level < 75) return '#4ECDC4';
    return '#9B59B6';
  };

  const tiers = [
    {
      id: 'spark' as const,
      name: 'Spark',
      icon: SparkIcon,
      color: '#FFD700',
      description: 'Light icebreakers'
    },
    {
      id: 'vibe' as const,
      name: 'Vibe',
      icon: FlowIcon,
      color: '#FF6B6B',
      description: 'Building bonds'
    },
    {
      id: 'lockin' as const,
      name: 'Lock-In',
      icon: DiamondIcon,
      color: '#9B59B6',
      description: 'Deep dreams'
    }
  ];

  return (
    <div className="min-h-screen bg-willow-dark text-white">
      {/* Mobile Layout */}
      <div className="sm:hidden">
        {/* Header with Progress */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-willow-green rounded-full flex items-center justify-center">
                <span className="text-willow-dark font-bold text-lg">W</span>
              </div>
              <h1 className="font-craftwork-heavy text-xl text-willow-green">Willow</h1>
            </div>
            <div className="bg-willow-dark border border-gray-600 text-white px-3 py-1 rounded-full text-sm font-craftwork-heavy">
              {level}%
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-800 rounded-full mb-6">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: getProgressColor(level) }}
              initial={{ width: 0 }}
              animate={{ width: `${level}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-craftwork-heavy text-3xl mb-3 text-center"
          >
            {getLevelLabel(level)}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-craftwork text-gray-300 text-center mb-8"
          >
            {level < 50 && "Keep going to unlock Vibe Check!"}
            {level >= 50 && level < 75 && "Vibe Check unlocked! Keep going for Lock-In Level!"}
            {level >= 75 && "All tiers unlocked! You're locked in! 💎"}
          </motion.p>

          {/* Tier Progress List */}
          <div className="space-y-4 mb-8">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-xl border ${
                  isUnlocked[tier.id] 
                    ? 'bg-willow-green bg-opacity-10 border-willow-green text-willow-green' 
                    : 'bg-gray-800 border-gray-700 text-gray-500'
                }`}
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  isUnlocked[tier.id] ? 'bg-willow-green' : 'bg-gray-600'
                }`}>
                  {isUnlocked[tier.id] && (
                    <motion.div
                      className="w-2 h-2 bg-willow-dark rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-craftwork-heavy text-sm">{tier.name} Stage</div>
                  <div className="font-craftwork text-xs opacity-75">{tier.description}</div>
                </div>
                {!isUnlocked[tier.id] && (
                  <LockIcon className="w-4 h-4" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-willow-dark border-t border-gray-800">
          <div className="flex justify-center gap-2">
            {tiers.map((tier) => {
              const IconComponent = tier.icon;
              const isActive = currentTier === tier.id;
              const isLocked = !isUnlocked[tier.id];

              return (
                <motion.button
                  key={tier.id}
                  onClick={() => !isLocked && onTierChange(tier.id)}
                  disabled={isLocked}
                  className={`relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 min-w-[80px] ${
                    isActive
                      ? 'bg-willow-green text-willow-dark'
                      : isLocked
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                  whileTap={!isLocked ? { scale: 0.95 } : {}}
                >
                  {/* Lock icon for locked tiers */}
                  {isLocked && (
                    <div className="absolute -top-1 -right-1">
                      <LockIcon className="w-3 h-3 text-gray-400" />
                    </div>
                  )}

                  {/* Tier icon */}
                  <div className={`${isLocked ? 'opacity-50' : ''}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Tier name */}
                  <span className="font-craftwork text-xs">
                    {tier.name}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 w-6 h-1 bg-willow-dark rounded-full"
                      layoutId="activeTier"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block min-h-screen bg-willow-dark text-white p-4 flex flex-col">
        {/* Progress Section */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Progress Bar */}
          <div className="relative mb-8">
            <div className="w-4 h-64 bg-gray-800 rounded-full relative overflow-hidden">
              <motion.div
                className="absolute bottom-0 w-full rounded-full"
                style={{ backgroundColor: getProgressColor(level) }}
                initial={{ height: 0 }}
                animate={{ height: `${level}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            
            {/* Percentage Badge */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="bg-willow-dark border border-gray-600 text-white px-3 py-1 rounded-full text-sm font-craftwork-heavy shadow-lg">
                {level}%
              </div>
            </div>
          </div>

          {/* Getting Started Content */}
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-craftwork-heavy text-2xl mb-3"
            >
              {getLevelLabel(level)}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-craftwork text-gray-300 text-sm mb-6"
            >
              {level < 50 && "Keep going to unlock Vibe Check!"}
              {level >= 50 && level < 75 && "Vibe Check unlocked! Keep going for Lock-In Level!"}
              {level >= 75 && "All tiers unlocked! You're locked in! 💎"}
            </motion.p>

            {/* Tier List */}
            <div className="space-y-3">
              {tiers.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`flex items-center gap-3 ${
                    isUnlocked[tier.id] ? 'text-willow-green' : 'text-gray-500'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${
                    isUnlocked[tier.id] ? 'bg-willow-green' : 'bg-gray-500'
                  }`} />
                  <span className="font-craftwork text-sm">{tier.name} Stage</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="flex justify-center gap-2 p-4 bg-black bg-opacity-30 rounded-2xl backdrop-blur-sm">
          {tiers.map((tier) => {
            const IconComponent = tier.icon;
            const isActive = currentTier === tier.id;
            const isLocked = !isUnlocked[tier.id];

            return (
              <motion.button
                key={tier.id}
                onClick={() => !isLocked && onTierChange(tier.id)}
                disabled={isLocked}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-willow-green text-willow-dark'
                    : isLocked
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                whileHover={!isLocked ? { scale: 1.05 } : {}}
                whileTap={!isLocked ? { scale: 0.95 } : {}}
              >
                {/* Lock icon for locked tiers */}
                {isLocked && (
                  <div className="absolute -top-1 -right-1">
                    <LockIcon className="w-4 h-4 text-gray-400" />
                  </div>
                )}

                {/* Tier icon */}
                <div className={`${isLocked ? 'opacity-50' : ''}`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Tier name */}
                <span className="font-craftwork text-xs">
                  {tier.name}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 w-8 h-1 bg-willow-dark rounded-full"
                    layoutId="activeTier"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
