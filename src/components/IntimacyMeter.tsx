'use client';

import { motion } from 'framer-motion';
import { HeartIcon } from './Icons';

interface IntimacyMeterProps {
  level: number;
  isPulsing: boolean;
}

export default function IntimacyMeter({ level, isPulsing }: IntimacyMeterProps) {
  const getLevelColor = (level: number) => {
    if (level < 25) return '#FF6B6B';
    if (level < 50) return '#FFD700';
    if (level < 75) return '#4ECDC4';
    return '#9B59B6';
  };

  const getLevelLabel = (level: number) => {
    if (level < 25) return 'Getting Started';
    if (level < 50) return 'Building Connection';
    if (level < 75) return 'Deepening Bonds';
    return 'Locked In';
  };

  return (
    <>
      {/* Desktop/Tablet Vertical Layout */}
      <div className="hidden md:flex flex-col items-center gap-4 pt-4 lg:pt-12">
        {/* Meter */}
        <div className="relative">
          <div className="intimacy-meter border-2 border-theme">
            <motion.div
              className={`intimacy-fill ${isPulsing ? 'pulse' : ''}`}
              style={{
                height: `${level}%`,
                backgroundColor: getLevelColor(level)
              }}
              initial={{ height: 0 }}
              animate={{ height: `${level}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          
          {/* Level indicator */}
          <div className="absolute -top-6 lg:-top-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-willow-dark text-white px-2 py-1 rounded-full text-xs font-craftwork-heavy border border-white border-opacity-20 shadow-lg">
              {level}%
            </div>
          </div>
        </div>

        {/* Level label */}
        <div className="text-center">
          <h4 className="font-craftwork-heavy text-base lg:text-xl text-theme-primary mb-2">
            {getLevelLabel(level)}
          </h4>
          <p className="font-craftwork text-xs lg:text-sm text-theme-secondary max-w-[160px] lg:max-w-[180px] leading-relaxed">
            {level < 50 && "Keep going to unlock Vibe Check!"}
            {level >= 50 && level < 75 && "Vibe Check unlocked! Keep going for Lock-In Level!"}
            {level >= 75 && "All tiers unlocked! You're locked in! 💎"}
          </p>
        </div>

        {/* Tier unlock indicators */}
        <div className="flex flex-col gap-2">
          <div className={`flex items-center gap-2 lg:gap-3 text-xs lg:text-sm ${level >= 0 ? 'text-willow-green' : 'text-theme-secondary'}`}>
            <div className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full ${level >= 0 ? 'bg-willow-green' : 'bg-theme-secondary'}`}></div>
            <span className="font-craftwork">Spark Stage</span>
          </div>
          <div className={`flex items-center gap-2 lg:gap-3 text-xs lg:text-sm ${level >= 50 ? 'text-willow-green' : 'text-theme-secondary'}`}>
            <div className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full ${level >= 50 ? 'bg-willow-green' : 'bg-theme-secondary'}`}></div>
            <span className="font-craftwork">Vibe Check</span>
          </div>
          <div className={`flex items-center gap-2 lg:gap-3 text-xs lg:text-sm ${level >= 75 ? 'text-willow-green' : 'text-theme-secondary'}`}>
            <div className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full ${level >= 75 ? 'bg-willow-green' : 'bg-theme-secondary'}`}></div>
            <span className="font-craftwork">Lock-In Level</span>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Layout - 300x50px bottom-placed with safe area */}
      <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[300px] h-[50px] bg-willow-dark bg-opacity-95 backdrop-blur-md rounded-xl border border-white border-opacity-20 shadow-lg z-50" style={{ bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))' }}>
        <div className="flex items-center justify-between h-full px-4">
          {/* Level percentage */}
          <div className="text-white text-sm font-craftwork-heavy">
            {level}%
          </div>
          
          {/* Horizontal progress bar */}
          <div className="flex-1 mx-3 h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${isPulsing ? 'pulse' : ''}`}
              style={{
                width: `${level}%`,
                backgroundColor: getLevelColor(level)
              }}
              initial={{ width: 0 }}
              animate={{ width: `${level}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          
          {/* Tier indicator dots */}
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${level >= 0 ? 'bg-willow-green' : 'bg-white bg-opacity-30'}`}></div>
            <div className={`w-2 h-2 rounded-full ${level >= 50 ? 'bg-willow-green' : 'bg-white bg-opacity-30'}`}></div>
            <div className={`w-2 h-2 rounded-full ${level >= 75 ? 'bg-willow-green' : 'bg-white bg-opacity-30'}`}></div>
          </div>
        </div>
      </div>

      {/* Heart animation for high levels - Desktop only */}
      {isPulsing && (
        <motion.div
          className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <HeartIcon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-willow-green" />
        </motion.div>
      )}
    </>
  );
}

