'use client';

import { motion } from 'framer-motion';
import { SparkIcon, FlowIcon, DiamondIcon, LockIcon } from './Icons';

interface TierSelectorProps {
  currentTier: 'spark' | 'vibe' | 'lockin';
  isUnlocked: {
    spark: boolean;
    vibe: boolean;
    lockin: boolean;
  };
  onTierChange: (tier: 'spark' | 'vibe' | 'lockin') => void;
}

export default function TierSelector({ currentTier, isUnlocked, onTierChange }: TierSelectorProps) {
  const tiers = [
    {
      id: 'spark' as const,
      name: 'Spark',
      icon: <SparkIcon className="w-6 h-6" />,
      color: '#FFD700',
      description: 'Light icebreakers'
    },
    {
      id: 'vibe' as const,
      name: 'Vibe',
      icon: <FlowIcon className="w-6 h-6" />,
      color: '#FF6B6B',
      description: 'Building bonds'
    },
    {
      id: 'lockin' as const,
      name: 'Lock-In',
      icon: <DiamondIcon className="w-6 h-6" />,
      color: '#9B59B6',
      description: 'Deep dreams'
    }
  ];

  return (
    <div className="flex gap-2 lg:gap-3 p-2 lg:p-3 bg-theme bg-opacity-40 rounded-2xl backdrop-blur-md border border-theme">
      {tiers.map((tier) => (
        <motion.button
          key={tier.id}
          onClick={() => onTierChange(tier.id)}
          disabled={!isUnlocked[tier.id]}
          className={`relative flex flex-col items-center gap-1 lg:gap-2 p-2 lg:p-3 rounded-xl transition-all duration-300 min-w-[80px] lg:min-w-[100px] ${
            currentTier === tier.id
              ? 'bg-willow-green text-willow-dark shadow-lg'
              : isUnlocked[tier.id]
              ? 'bg-theme bg-opacity-10 text-theme-primary hover:bg-opacity-20 hover:scale-105'
              : 'bg-theme-secondary bg-opacity-15 text-theme-secondary cursor-not-allowed'
          }`}
          whileHover={isUnlocked[tier.id] ? { scale: 1.05, y: -2 } : {}}
          whileTap={isUnlocked[tier.id] ? { scale: 0.95 } : {}}
        >
            {/* Lock icon for locked tiers */}
            {!isUnlocked[tier.id] && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-willow-gray rounded-full flex items-center justify-center">
                <LockIcon className="w-3 h-3 text-willow-dark" />
              </div>
            )}

          {/* Tier icon */}
          <div 
            className="text-lg lg:text-xl"
            style={{ 
              filter: !isUnlocked[tier.id] ? 'grayscale(100%)' : 'none',
              opacity: !isUnlocked[tier.id] ? 0.4 : 1
            }}
          >
            {tier.icon}
          </div>

          {/* Tier name */}
          <h3 className="font-craftwork-heavy text-xs lg:text-sm">
            {tier.name}
          </h3>

          {/* Tier description */}
          <p className="font-craftwork text-xs text-center opacity-80 hidden lg:block">
            {tier.description}
          </p>

          {/* Active indicator */}
          {currentTier === tier.id && (
            <motion.div
              className="absolute -bottom-1 w-6 h-1 bg-willow-dark rounded-full"
              layoutId="activeTier"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}

